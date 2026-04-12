---
summary: Shopify Dev MCP server for GraphQL APIs, Functions, Polaris, Liquid/Theme validation — tools auto-discovered at startup.
commands: [/dev-mcp]
tools: [dev_mcp_learn_shopify_api, dev_mcp_search_docs_chunks, dev_mcp_fetch_full_docs, dev_mcp_introspect_graphql_schema, dev_mcp_validate_graphql_codeblocks, dev_mcp_validate_theme, dev_mcp_validate_theme_codeblocks]
category: shopify
keywords: [dev-mcp, shopify-api, graphql, admin-api, functions, polaris, liquid, theme, validation, documentation]
status: stable
---

# dev-mcp

Pi extension that wraps the [Shopify Dev MCP server](https://github.com/shopify/dev-mcp) (`@shopify/dev-mcp`) as native Pi tools. Tools are **auto-discovered** at session start — whatever tools the MCP server declares are registered with Pi under a `dev_mcp_` prefix.

## How it works

The extension spawns `npx -y @shopify/dev-mcp@latest` as a child process and communicates via JSON-RPC over stdin/stdout. No authentication is required.

On session start, it runs `tools/list` to discover available tools and registers each one as `dev_mcp_<tool_name>` in Pi.

## Prerequisites

- Node.js and `npx` on your PATH
- Internet access (the server fetches from shopify.dev)

## Commands

| Command | Description |
|---------|-------------|
| `/dev-mcp` | Kill and restart the MCP server process and reload tools |

## Tools available

After startup, all tools from `@shopify/dev-mcp` are registered (prefixed with `dev_mcp_`):

| Tool | Description |
|------|-------------|
| `dev_mcp_learn_shopify_api` | **Start here** — teaches the LLM about supported Shopify APIs and how to use this MCP server's tools |
| `dev_mcp_search_docs_chunks` | Search across all shopify.dev documentation for relevant chunks |
| `dev_mcp_fetch_full_docs` | Retrieve complete documentation for specific shopify.dev paths |
| `dev_mcp_introspect_graphql_schema` | Explore and search Shopify GraphQL schemas for types, queries, mutations |
| `dev_mcp_validate_graphql_codeblocks` | Validate GraphQL code blocks against a schema to catch hallucinated fields |
| `dev_mcp_validate_theme` | Validate entire theme directories using Theme Check (default mode) |
| `dev_mcp_validate_theme_codeblocks` | Validate individual Liquid codeblocks (when `LIQUID_VALIDATION_MODE=partial`) |

## Usage

```
> Use the Shopify Admin GraphQL API to create a product

The agent will call dev_mcp_learn_shopify_api first, then use
dev_mcp_introspect_graphql_schema and dev_mcp_validate_graphql_codeblocks
to generate and validate the mutation.
```
