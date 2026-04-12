# Support Core Extension

Pi extension that connects to Shopify's **Support Core MCP server** — giving you access to Zendesk ticket search, Help Center article search, and other support tools directly in Pi.

## How it works

The extension spawns `uvx shopify-mcp-bridge` as a child process with the Support Core MCP environment variables. The bridge handles Minerva/Okta authentication — on first use, it opens a browser window for you to log in. Credentials are cached for subsequent sessions.

Tools are **auto-discovered** at session start: whatever tools the Support Core MCP server declares are registered with Pi automatically.

## Prerequisites

- `uvx` installed (comes with `dev` CLI at Shopify)
- Shopify VPN/WARP connected
- Shopify Okta account (for Minerva auth)

## Commands

| Command | Description |
|---------|-------------|
| `/support-core-auth` | Kill and restart the bridge process (re-authenticates and reloads tools) |

## First use

1. Start Pi — the extension will attempt to connect on session start
2. Your browser will open for Minerva/Okta login
3. Complete the login flow
4. Tools are discovered and loaded automatically

If auth fails or expires, run `/support-core-auth` to re-authenticate.

## Expected tools

The Support Core MCP server typically exposes tools like:
- `search_help_center` — Search Shopify Help Center articles
- `search_zendesk_tickets` — Search Zendesk support tickets
- Additional support tools as they're added by the CX R&D team

Tools are discovered dynamically, so new tools added to the server appear automatically.

## Troubleshooting

- **"uvx not found"** — Make sure `dev` is installed and you've run `dev setup`
- **Auth fails on first use** — Make sure WARP is connected and you're on a Shopify-managed device
- **Tools not loading** — Run `/support-core-auth` to restart the bridge
- **Timeout errors** — The MCP server may be slow; try again or check VPN connectivity
