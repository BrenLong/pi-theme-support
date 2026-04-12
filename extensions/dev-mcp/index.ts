/**
 * Shopify Dev MCP extension — auto-discovers and registers tools from the
 * @shopify/dev-mcp stdio MCP server.
 *
 * Tools are discovered via `tools/list` and dynamically registered with pi.
 * No authentication required.
 *
 * Commands:
 *   /dev-mcp — restart the MCP server and reload tools
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { keyHint } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { Text } from "@mariozechner/pi-tui";
import { listTools, callTool, resetSession, type McpTool } from "./mcp.js";

export default function (pi: ExtensionAPI) {
  const registeredTools = new Set<string>();

  // ─── Session start: discover tools ────────────────────────────────────────

  pi.on("session_start", async (_event, ctx) => {
    try {
      const { total } = await discoverAndRegister();
      if (total > 0) {
        ctx.ui.notify(`Dev MCP: ${total} tool(s) loaded`, "info");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      ctx.ui.notify(`Dev MCP: failed to load tools — ${msg}`, "warning");
    }
  });

  // ─── Clean up on session shutdown ─────────────────────────────────────────

  pi.on("session_shutdown", async () => {
    resetSession();
  });

  // ─── /dev-mcp command: restart and reload ─────────────────────────────────

  pi.registerCommand("dev-mcp", {
    description: "Restart the Shopify Dev MCP server and reload tools",
    handler: async (_args, ctx) => {
      try {
        resetSession();
        const { total, newlyRegistered } = await discoverAndRegister();
        const detail =
          newlyRegistered < total
            ? `${total} tool(s) active (${newlyRegistered} new)`
            : `${total} tool(s) loaded`;
        ctx.ui.notify(`Dev MCP: ${detail}`, "info");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        ctx.ui.notify(`Dev MCP restart failed: ${msg}`, "error");
      }
    },
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async function discoverAndRegister(): Promise<{
    total: number;
    newlyRegistered: number;
  }> {
    const tools = await listTools();
    let newlyRegistered = 0;
    for (const tool of tools) {
      const piName = tool.name.startsWith("dev_mcp_")
        ? tool.name
        : `dev_mcp_${tool.name}`;
      if (registeredTools.has(piName)) continue;
      registeredTools.add(piName);
      registerMcpTool(pi, tool, piName);
      newlyRegistered++;
    }
    return { total: registeredTools.size, newlyRegistered };
  }
}

// ─── MCP content → string ─────────────────────────────────────────────────────

function summariseContent(
  content: Array<{ type: string; text?: string; [k: string]: any }>,
): string {
  if (content.length === 0) return "(no output)";

  const parts: string[] = [];
  for (const item of content) {
    switch (item.type) {
      case "text":
        if (item.text) parts.push(item.text);
        break;
      case "image": {
        const mime = item.mimeType ?? "unknown";
        const sizeKB = item.data
          ? Math.round((item.data.length * 3) / 4 / 1024)
          : 0;
        parts.push(`[image: ${mime}, ~${sizeKB}KB]`);
        break;
      }
      case "resource":
      case "embedded_resource": {
        const res = item.resource ?? {};
        const uri: string = res.uri ?? "(unknown uri)";
        const mime: string | undefined = res.mimeType;
        if (res.text) {
          const header = mime
            ? `[${item.type}: ${uri}, ${mime}]`
            : `[${item.type}: ${uri}]`;
          parts.push(`${header}\n${res.text}`);
        } else if (res.blob) {
          const sizeKB = Math.round((res.blob.length * 3) / 4 / 1024);
          const suffix = mime ? `, ${mime}, ~${sizeKB}KB` : `, ~${sizeKB}KB`;
          parts.push(`[${item.type}: ${uri}${suffix}]`);
        } else {
          const suffix = mime ? `, ${mime}` : "";
          parts.push(`[${item.type}: ${uri}${suffix}]`);
        }
        break;
      }
      default:
        parts.push(`[unknown content type: ${JSON.stringify(item.type)}]`);
    }
  }

  return parts.join("\n") || "(no output)";
}

// ─── Tool registration ────────────────────────────────────────────────────────

function registerMcpTool(pi: ExtensionAPI, tool: McpTool, piName: string) {
  const schema =
    tool.inputSchema &&
    typeof tool.inputSchema === "object" &&
    Object.keys(tool.inputSchema).length > 0
      ? Type.Unsafe<Record<string, any>>(tool.inputSchema as any)
      : Type.Object({});

  pi.registerTool({
    name: piName,
    label: `Dev MCP — ${tool.name}`,
    description: tool.description ?? `Call the Shopify Dev MCP tool "${tool.name}".`,
    parameters: schema,

    async execute(_id, params) {
      try {
        const result = await callTool(tool.name, params as Record<string, any>);
        const text = summariseContent(result.content);

        return {
          content: [{ type: "text" as const, text }],
          details: {
            toolName: tool.name,
            isError: result.isError ?? false,
            text,
          },
          isError: result.isError,
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
          content: [
            {
              type: "text" as const,
              text: `Dev MCP tool failed: ${msg}`,
            },
          ],
          details: { toolName: tool.name, isError: true, text: msg },
          isError: true,
        };
      }
    },

    renderCall(_args, theme) {
      return new Text(
        theme.fg("toolTitle", theme.bold("Dev MCP ")) +
          theme.fg("muted", tool.name),
        0,
        0,
      );
    },

    renderResult(result, { expanded }, theme) {
      const d = result.details as any;
      if ((result as any).isError || d?.isError) {
        return new Text(theme.fg("error", `✗ ${tool.name}`), 0, 0);
      }
      const size = d?.text
        ? `${(d.text.length / 1024).toFixed(1)}KB`
        : "";
      if (expanded && d?.text) {
        return new Text(
          theme.fg("success", "✓ ") +
            theme.fg("muted", tool.name) +
            theme.fg("dim", ` — ${size}`) +
            "\n\n" +
            d.text,
          0,
          0,
        );
      }
      const hint = keyHint("app.tools.expand", "expand");
      return new Text(
        theme.fg("success", "✓ ") +
          theme.fg("muted", tool.name) +
          theme.fg("dim", ` — ${size}  ${hint}`),
        0,
        0,
      );
    },
  });
}
