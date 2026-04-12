/**
 * Support Core MCP client via shopify-mcp-bridge (stdio transport).
 *
 * Spawns `uvx shopify-mcp-bridge` as a child process with the Support Core
 * MCP environment variables. Communicates via JSON-RPC over stdin/stdout —
 * the bridge handles Minerva/Okta auth and HTTP forwarding internally.
 */

import { spawn, execSync, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createInterface, type Interface } from "node:readline";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface McpTool {
  name: string;
  description?: string;
  inputSchema: Record<string, any>;
}

export interface McpContent {
  type: string;
  text?: string;
  [key: string]: any;
}

export interface McpToolResult {
  content: McpContent[];
  isError?: boolean;
}

export class McpAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "McpAuthError";
  }
}

// ─── Bridge process management ────────────────────────────────────────────────

const MCP_TARGET_URL = "https://support.shopify.io/internal/mcp";
const MCP_MINERVA_CLIENT_ID = "0oa1bpdvm5ia0Zzhs0x8";

let _bridge: ChildProcess | undefined;
let _rl: Interface | undefined;
let _reqId = 0;
let _generation = 0;
let _initialized = false;
let _initPromise: Promise<void> | undefined;
let _pendingResponses = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>();

// ─── uvx binary resolution ────────────────────────────────────────────────────

const UVX_CANDIDATE_PATHS = [
  join(process.env.HOME ?? "", ".local", "bin", "uvx"),   // uv installer / pipx
  "/opt/homebrew/bin/uvx",                                 // Homebrew on Apple Silicon
  "/usr/local/bin/uvx",                                    // Homebrew on Intel Mac
];

function resolveUvx(): string {
  for (const candidate of UVX_CANDIDATE_PATHS) {
    if (existsSync(candidate)) return candidate;
  }

  try {
    const found = execSync("which uvx", { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (found) return found;
  } catch {
    // fall through
  }

  throw new Error(
    "uvx not found. Install uv (https://docs.astral.sh/uv/) or ensure uvx is on your PATH.",
  );
}

function ensureBridge(): ChildProcess {
  if (_bridge && !_bridge.killed) return _bridge;

  const uvxPath = resolveUvx();
  const gen = ++_generation;

  _bridge = spawn(uvxPath, ["shopify-mcp-bridge"], {
    env: {
      ...process.env,
      MCP_TARGET_URL,
      MCP_MINERVA_CLIENT_ID,
    },
    stdio: ["pipe", "pipe", "pipe"],
  });

  _bridge.stderr?.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.error(`[support-core-mcp-bridge stderr] ${msg}`);
  });

  _bridge.on("exit", (code) => {
    if (gen !== _generation) return;
    console.error(`[support-core-mcp-bridge] exited with code ${code}`);
    _initialized = false;
    _initPromise = undefined;
    for (const [, pending] of _pendingResponses) {
      pending.reject(new Error(`Bridge process exited with code ${code}`));
    }
    _pendingResponses.clear();
    _bridge = undefined;
    _rl = undefined;
  });

  _bridge.on("error", (err) => {
    if (gen !== _generation) return;
    console.error(`[support-core-mcp-bridge] spawn error: ${err.message}`);
    _initialized = false;
    _initPromise = undefined;
    for (const [, pending] of _pendingResponses) {
      pending.reject(err);
    }
    _pendingResponses.clear();
    _bridge = undefined;
    _rl = undefined;
  });

  _rl = createInterface({ input: _bridge.stdout! });
  _rl.on("line", (line) => {
    try {
      const msg = JSON.parse(line);
      if (msg.id !== undefined && _pendingResponses.has(msg.id)) {
        const pending = _pendingResponses.get(msg.id)!;
        _pendingResponses.delete(msg.id);
        pending.resolve(msg);
      }
    } catch {
      // Ignore non-JSON lines
    }
  });

  return _bridge;
}

/** Send a JSON-RPC request and wait for the response. */
function rpc(method: string, params: object, timeoutMs = 120_000): Promise<any> {
  return new Promise((resolve, reject) => {
    const bridge = ensureBridge();
    const id = ++_reqId;

    const timer = setTimeout(() => {
      _pendingResponses.delete(id);
      reject(new Error(`Support Core MCP timeout after ${timeoutMs}ms for ${method}`));
    }, timeoutMs);

    _pendingResponses.set(id, {
      resolve: (msg) => {
        clearTimeout(timer);
        if (msg.error) {
          const message = `MCP error in ${method}: ${msg.error.message} (code ${msg.error.code})`;
          const isAuth = msg.error.code === -32001
            || /\bunauthori[zs]ed\b|\bauthenticat(ion|e) (fail|error|requir|expir)|\b401\b|\btoken expired\b|\bforbidden\b|okta.*token/i.test(msg.error.message);
          reject(isAuth ? new McpAuthError(message) : new Error(message));
        } else {
          resolve(msg.result);
        }
      },
      reject: (err) => {
        clearTimeout(timer);
        reject(err);
      },
    });

    const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
    bridge.stdin!.write(payload);
  });
}

/** Send a JSON-RPC notification (no response expected). */
function notify(method: string, params: object): void {
  const bridge = ensureBridge();
  const payload = JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n";
  bridge.stdin!.write(payload);
}

// ─── MCP lifecycle ────────────────────────────────────────────────────────────

async function doInit(): Promise<void> {
  await rpc("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "pi-support-core", version: "1.0.0" },
  });
  notify("notifications/initialized", {});
  _initialized = true;
}

async function ensureInitialized(): Promise<void> {
  if (_initialized) return;
  _initPromise ??= doInit().catch((err) => {
    _initPromise = undefined;
    throw err;
  });
  await _initPromise;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function listTools(): Promise<McpTool[]> {
  await ensureInitialized();
  const result = await rpc("tools/list", {});
  return result?.tools ?? [];
}

export async function callTool(
  name: string,
  args: Record<string, any>,
): Promise<McpToolResult> {
  await ensureInitialized();
  const result = await rpc("tools/call", { name, arguments: args }, 180_000);
  return result ?? { content: [] };
}

export function resetSession(): void {
  if (_bridge && !_bridge.killed) {
    _bridge.kill();
  }
  _bridge = undefined;
  _rl = undefined;
  _initialized = false;
  _initPromise = undefined;
  _pendingResponses.clear();
}
