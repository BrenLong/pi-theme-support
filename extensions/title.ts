import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

export default function (pi: ExtensionAPI) {
  // Register as a tool so the model can call it from skills
  pi.registerTool({
    name: "set_terminal_title",
    label: "Set Terminal Title",
    description: "Set the VS Code terminal tab title. Use this when starting a new ticket to label the tab with the store handle and issue summary.",
    parameters: Type.Object({
      title: Type.String({ description: "The title to set on the terminal tab" }),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      ctx.ui.setTitle(params.title);
      return {
        content: [{ type: "text", text: `Terminal tab title set to: ${params.title}` }],
        details: {},
      };
    },
  });

  // Keep the slash command too for manual use
  pi.registerCommand("title", {
    description: "Set the terminal tab title (e.g. /title Ticket #12345 - Dawn Footer)",
    handler: async (args, ctx) => {
      const title = args?.trim();
      if (!title) {
        ctx.ui.notify("Usage: /title My Tab Name", "warn");
        return;
      }
      ctx.ui.setTitle(title);
      ctx.ui.notify(`Tab title set to: ${title}`, "info");
    },
  });
}
