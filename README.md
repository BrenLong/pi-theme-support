# Pi Theme Support

> ⚠️ **Work in progress.** This setup is under active development and testing. Not everything described here has been fully validated in production. Use as inspiration and adapt to your own workflow.

## What Is This?

A [Pi](https://github.com/badlogic/pi-mono) coding agent configuration for Shopify Theme Support advisors. The goal is to automate the repetitive parts of ticket work — pulling context, researching issues, drafting responses — while keeping the advisor in control of decisions and merchant communication.

This repo is the live `~/.pi/agent/` directory. Changes made during Pi sessions are tracked here automatically.

## Background

### The Problem

Theme Support work involves a lot of context-gathering:

- Reading the ticket and full chat history
- Searching the merchant's previous tickets to understand what's already been tried, what failed, and what their experience has been across multiple interactions
- Identifying the theme type and determining scope
- Searching for similar issues across Zendesk, GitHub, Slack, and internal docs
- Investigating theme code
- Drafting a response that accounts for all of this context and follows team templates and tone guidelines

Most of this is research and synthesis — exactly the kind of work an AI agent can accelerate.

### The Approach

The workflow follows a three-phase model: **Intake → Investigate → Draft**.

Each phase is a Pi skill that automates the research and presents findings for the advisor to review. The advisor still makes scope decisions, reviews all responses, and handles merchant communication.

A key part of this workflow is **merchant history awareness**. Before any response is drafted, the system searches for the merchant's previous tickets to build a complete picture — what solutions were already offered, which ones failed, and how the merchant's experience has been so far. This prevents repeating information, avoids suggesting solutions that have already been tried, and ensures the response acknowledges the merchant's full journey.

## Development History

### Phase 1: Initial Setup

- Installed Pi and connected to Shopify's AI proxy
- Set up Tool Gateway for access to internal MCP servers (Vault, Slack, Google Workspace, GitHub, Data Portal, Observe, and others)
- Installed the `shop-pi-fy` community package for Shopify-specific extensions (scout, incidents, dev-mcp)

### Phase 2: Building Missing Pieces

Not everything worked out of the box:

- **support-core MCP extension** — The Support Core MCP server (Zendesk tickets, Help Center) didn't have a ready-made Pi extension. Built a custom TypeScript extension from scratch, including MCP client setup, child process management, JSON-RPC communication, and Minerva/Okta authentication. Debugged uvx path resolution issues along the way.
- **dev-mcp extension fix** — The dev-mcp extension failed because Shopify blocks `npx` globally. Patched the local copy to use `pnpx` instead.

### Phase 3: Skills and Context

- Created 5 workflow skills (see below)
- Built a comprehensive AGENTS.md context file (~600 lines) covering scope rules, theme categorization, email templates, and decision trees
- Added auto-session-naming to the start-ticket skill so sessions are easy to find when merchants follow up days later

### Phase 4: Theme Code Access (Current)

Exploring ways for Pi to access theme source code directly:

- **Live storefront analysis** — Pi can fetch the public HTML/CSS from a merchant's storefront and reverse-engineer CSS/layout issues from the rendered output. Useful for quick triage but can't see Liquid source or merchant modifications. This works today.
- **Admin GraphQL API** — The Admin API has a `theme.files` query that can read theme files directly. Validated the query, upgraded Shopify CLI from 3.84.1 → 3.93.2 to get the required `shopify store auth` / `shopify store execute` commands. Requires on-shift authentication to the merchant's store. **Not yet tested during a live shift.**

### What's Working

- Ticket intake with automatic context gathering across multiple tools
- Session naming and resumption for multi-day ticket work
- Investigation across Scout, Zendesk, GitHub, Vault, Slack, and shopify.dev
- Email drafting following team templates
- Scope assessment against Design Policy
- Bug escalation preparation
- Live storefront HTML/CSS analysis

### What's Not Yet Validated

- Direct theme file access via Admin API (needs on-shift auth test)
- Full end-to-end workflow on a high volume of tickets
- Edge cases in skill workflows
- Team-wide adoption and feedback

## Skills

| Skill | Phase | Description |
|-------|-------|-------------|
| `start-ticket` | Intake | Pull a Zendesk ticket, extract key info, auto-name the session, search the merchant's previous tickets, and gather context from similar issues across tools |
| `investigate-theme` | Investigate | Deep-dive research using shopify.dev, GitHub, past tickets, Scout, Vault, and Slack |
| `draft-merchant-email` | Draft | Generate a response following team email templates, adapted to the merchant's tone |
| `draft-scope-assessment` | Assess | Determine if a request is in or out of scope per Design Policy |
| `escalate-theme-bug` | Escalate | Prepare a bug report with evidence, reproduction steps, and responsible team info |

## Structure

```
├── AGENTS.md                  # Core context: role, scope rules, email templates
├── README.md                  # This file
├── SETUP.md                   # Installation notes
├── USAGE.md                   # Daily workflow reference
├── skills/
│   ├── start-ticket/          # Ticket intake
│   ├── investigate-theme/     # Issue research
│   ├── draft-merchant-email/  # Response drafting
│   ├── draft-scope-assessment/# Scope check
│   └── escalate-theme-bug/    # Bug escalation
├── extensions/
│   ├── support-core/          # Custom-built: Zendesk + Help Center access
│   ├── dev-mcp/               # Patched: shopify.dev docs + theme validation
│   └── ...                    # Other extensions via Tool Gateway / shop-pi-fy
├── config/                    # Pi configuration (credentials gitignored)
└── sessions/                  # Conversation history (gitignored)
```

## Tools Connected

**Via custom extensions:**
- support-core — Zendesk ticket search, Help Center articles

**Via Tool Gateway:**
- Slack, Google Workspace, GitHub, Grokt (code search), Vault (internal docs), Observe (logs/errors), Data Portal, GCP Cloud Logging

**Via shop-pi-fy / MCP servers:**
- Scout — merchant frustrations, support tickets, product feedback, app reviews, community posts, sales calls
- Dev MCP — shopify.dev documentation, Liquid/GraphQL/component validation
- Incidents — platform incident search and tracking

## Shopify CLI Note

The `shopify store` commands (for direct theme file API access) require CLI version 3.93.0+. If you have an older version installed via Homebrew, the pnpm-installed version lives at `~/.local/share/pnpm/shopify`.

```bash
# Check version
shopify version

# Upgrade if needed
pnpm install -g @shopify/cli@latest

# New binary location
~/.local/share/pnpm/shopify version
```

## License

Shared for the benefit of other Shopify Theme Support advisors. Use and adapt freely.
