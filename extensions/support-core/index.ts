/**
 * Support Core MCP extension for Pi.
 *
 * Connects to Shopify's Support Core MCP server (Zendesk tickets, Help Center
 * articles) via shopify-mcp-bridge. Tools are auto-discovered at session start.
 *
 * Commands:
 *   /support-core-auth — restart the bridge and re-authenticate
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { listTools, callTool, resetSession, type McpTool, McpAuthError } from "./mcp.js";

export default function (pi: ExtensionAPI) {
  const registeredTools = new Set<string>();

  // ─── Session start: discover and register Support Core tools ────────────

  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("Support Core: starting tool discovery...", "info");
    try {
      const { total } = await discoverAndRegister();
      ctx.ui.notify(
        `Support Core: ${total} tool(s) loaded`,
        total > 0 ? "info" : "warning",
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      ctx.ui.notify(`Support Core: failed — ${msg}`, "error");
      ctx.ui.notify("Run /support-core-auth to authenticate", "info");
    }
  });

  // ─── /support-core-auth: (re)authenticate and load tools ────────────────

  pi.registerCommand("support-core-auth", {
    description:
      "Authenticate with Support Core MCP (Zendesk/Help Center) via Minerva/Okta and reload tools",
    handler: async (_args, ctx) => {
      try {
        resetSession();
        ctx.ui.notify("Support Core: restarting bridge...", "info");
        const { total, newlyRegistered } = await discoverAndRegister();
        const detail =
          newlyRegistered < total
            ? `${total} tool(s) active (${newlyRegistered} new)`
            : `${total} tool(s) loaded`;
        ctx.ui.notify(`Support Core: ${detail}`, "info");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        ctx.ui.notify(`Support Core auth failed: ${msg}`, "error");
      }
    },
  });

  // ─── Cleanup on shutdown ────────────────────────────────────────────────

  pi.on("session_shutdown", async () => {
    resetSession();
  });

  // ─── Helpers ────────────────────────────────────────────────────────────

  async function discoverAndRegister(): Promise<{
    total: number;
    newlyRegistered: number;
  }> {
    const tools = await listTools();
    let newlyRegistered = 0;
    for (const tool of tools) {
      if (registeredTools.has(tool.name)) continue;
      registeredTools.add(tool.name);
      registerMcpTool(pi, tool);
      newlyRegistered++;
    }
    return { total: registeredTools.size, newlyRegistered };
  }
}

// ─── MCP content → string ─────────────────────────────────────────────────────

function summariseContent(
  content: Array<{ type: string; text?: string; [k: string]: any }>,
): string {
  return content
    .map((c) => {
      if (c.type === "text" && c.text) return c.text;
      if (c.type === "image") return "[image]";
      if (c.type === "resource" || c.type === "embedded_resource") {
        const uri = c.resource?.uri ?? c.uri ?? "";
        return `[resource: ${uri}]`;
      }
      return `[${c.type}]`;
    })
    .join("\n");
}

// ─── Tool registration ───────────────────────────────────────────────────────

function registerMcpTool(pi: ExtensionAPI, tool: McpTool) {
  const schema =
    tool.inputSchema && typeof tool.inputSchema === "object" && Object.keys(tool.inputSchema).length > 0
      ? Type.Unsafe<Record<string, any>>(tool.inputSchema as any)
      : Type.Object({});

  pi.registerTool({
    name: tool.name,
    label: `Support Core — ${tool.name}`,
    description: tool.description ?? `Call the Support Core tool "${tool.name}".`,
    parameters: schema,

    async execute(_id, params, signal, _onUpdate, _ctx) {
      try {
        const result = await callTool(tool.name, params as Record<string, any>);
        const text = summariseContent(result.content);

        return {
          content: [{ type: "text" as const, text }],
          details: { toolName: tool.name, isError: result.isError ?? false, text },
          isError: result.isError,
        };
      } catch (err) {
        if (err instanceof McpAuthError) {
          return {
            content: [{
              type: "text" as const,
              text: "Support Core: authentication expired. Run /support-core-auth to re-authenticate.",
            }],
            details: { toolName: tool.name, isError: true, text: "auth expired" },
            isError: true,
          };
        }
        const msg = err instanceof Error ? err.message : String(err);
        return {
          content: [{ type: "text" as const, text: `Support Core tool failed: ${msg}` }],
          details: { toolName: tool.name, isError: true, text: msg },
          isError: true,
        };
      }
    },
  });
}
