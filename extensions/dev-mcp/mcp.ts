/**
 * Stdio MCP client for @shopify/dev-mcp.
 *
 * Spawns `pnpx @shopify/dev-mcp@latest` as a child process and communicates
 * via JSON-RPC over stdin/stdout. No authentication required.
 */

import { spawn, type ChildProcess } from "node:child_process";
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

// ─── Process management ───────────────────────────────────────────────────────

let _proc: ChildProcess | undefined;
let _rl: Interface | undefined;
let _reqId = 0;
let _generation = 0;
let _initialized = false;
let _initPromise: Promise<void> | undefined;
let _pendingResponses = new Map<
  number,
  { resolve: (v: any) => void; reject: (e: Error) => void }
>();

function ensureProcess(): ChildProcess {
  if (_proc && !_proc.killed) return _proc;

  const gen = ++_generation;

  _proc = spawn("pnpx", ["@shopify/dev-mcp@latest"], {
    env: {
      ...process.env,
      OPT_OUT_INSTRUMENTATION: "true",
    },
    stdio: ["pipe", "pipe", "pipe"],
  });

  _proc.stderr?.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.error(`[dev-mcp stderr] ${msg}`);
  });

  _proc.on("exit", (code) => {
    if (gen !== _generation) return;
    console.error(`[dev-mcp] exited with code ${code}`);
    _initialized = false;
    _initPromise = undefined;
    for (const [, pending] of _pendingResponses) {
      pending.reject(new Error(`dev-mcp process exited with code ${code}`));
    }
    _pendingResponses.clear();
    _proc = undefined;
    _rl = undefined;
  });

  _proc.on("error", (err) => {
    if (gen !== _generation) return;
    console.error(`[dev-mcp] spawn error: ${err.message}`);
    _initialized = false;
    _initPromise = undefined;
    for (const [, pending] of _pendingResponses) {
      pending.reject(err);
    }
    _pendingResponses.clear();
    _proc = undefined;
    _rl = undefined;
  });

  _rl = createInterface({ input: _proc.stdout! });
  _rl.on("line", (line) => {
    try {
      const msg = JSON.parse(line);
      if (msg.id !== undefined && _pendingResponses.has(msg.id)) {
        const pending = _pendingResponses.get(msg.id)!;
        _pendingResponses.delete(msg.id);
        pending.resolve(msg);
      }
    } catch {
      // Ignore non-JSON lines (e.g. pnpx download progress)
    }
  });

  return _proc;
}

/** Send a JSON-RPC request and wait for the response. */
function rpc(method: string, params: object, timeoutMs = 120_000): Promise<any> {
  return new Promise((resolve, reject) => {
    const proc = ensureProcess();
    const id = ++_reqId;

    const timer = setTimeout(() => {
      _pendingResponses.delete(id);
      reject(new Error(`dev-mcp timeout after ${timeoutMs}ms for ${method}`));
    }, timeoutMs);

    _pendingResponses.set(id, {
      resolve: (msg) => {
        clearTimeout(timer);
        if (msg.error) {
          reject(
            new Error(
              `dev-mcp error in ${method}: ${msg.error.message} (code ${msg.error.code})`,
            ),
          );
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
    proc.stdin!.write(payload);
  });
}

/** Send a JSON-RPC notification (no response expected). */
function notify(method: string, params: object): void {
  const proc = ensureProcess();
  const payload = JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n";
  proc.stdin!.write(payload);
}

// ─── MCP lifecycle ────────────────────────────────────────────────────────────

async function doInit(): Promise<void> {
  await rpc("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "pi-dev-mcp", version: "1.0.0" },
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

/** Fetch the list of tools the dev-mcp server exposes. */
export async function listTools(): Promise<McpTool[]> {
  await ensureInitialized();
  const result = await rpc("tools/list", {});
  return result?.tools ?? [];
}

/** Invoke a named tool with the given arguments. */
export async function callTool(
  name: string,
  args: Record<string, any>,
): Promise<McpToolResult> {
  await ensureInitialized();
  const result = await rpc("tools/call", { name, arguments: args }, 180_000);
  return result ?? { content: [] };
}

/** Kill the process and reset all state. */
export function resetSession(): void {
  if (_proc && !_proc.killed) {
    _proc.kill();
  }
  _proc = undefined;
  _rl = undefined;
  _initialized = false;
  _initPromise = undefined;
  _pendingResponses.clear();
}
