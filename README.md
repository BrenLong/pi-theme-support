# Pi Theme Support

> ⚠️ **Work in progress.** This setup is under active development and testing. Not everything described here has been fully validated in production. Use as inspiration and adapt to your own workflow.

## What Is This?

A [Pi](https://github.com/badlogic/pi-mono) coding agent configuration for Shopify Theme Support specialists. The goal is to automate the repetitive parts of ticket work — pulling context, researching issues, drafting responses — while keeping the specialist in control of decisions and merchant communication.

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

The workflow follows a four-phase model: **Intake → Investigate → Draft → Close**.

Each phase is a Pi skill that handles the work for that stage. The specialist still makes scope decisions, reviews all responses, and handles merchant communication.

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

### Phase 4: Investigation Workflow Refinement

- **File-first investigation** — After testing Chrome DevTools storefront access on live tickets, found that asking the specialist for theme files is faster and more reliable than navigating storefronts. Pi now identifies which files are needed and asks the specialist to copy-paste them from Admin Edit Code.
- **Tiered investigation approach** — Code analysis first, browser inspector screenshots second (when code alone isn't enough), Chrome DevTools only when specifically requested.
- **Chrome DevTools** — Still available for when rendered output is genuinely needed (screenshots, console errors, element inspection), but no longer the default investigation method.

### What's Working

- Ticket intake with automatic context gathering across multiple tools
- Session naming and resumption for multi-day ticket work
- File-first investigation: specialist pastes theme files, Pi analyses code
- Tiered investigation: code analysis → inspector screenshots → Chrome DevTools (if needed)
- Email drafting following Shopify style guide, first-touch resolution principles, and team templates
- Post-email close-out: internal notes and Impact Tracker updates in a single step
- Scope assessment against Design Policy
- Bug escalation preparation
- Live Assist chat analysis with real-time troubleshooting
- Zendesk queue scanning via Views API

### What's Not Yet Validated

- Full end-to-end workflow on a high volume of tickets
- Team-wide adoption and feedback

## Skills

| Skill | Phase | Description |
|-------|-------|-------------|
| `start-ticket` | Intake | Pull a Zendesk ticket, extract key info, auto-name the session, build replication steps, and gather context as needed |
| `investigate-theme` | Investigate | Hands-on code analysis, app involvement checks, and fix verification |
| `draft-merchant-email` | Draft | Generate a response following Shopify style guide, first-touch resolution principles, and team templates |
| `close-ticket` | Close | Generate the internal note and update the Impact Tracker in a single step |
| `draft-scope-assessment` | Assess | Determine if a request is in or out of scope per Design Policy |
| `escalate-theme-bug` | Escalate | Prepare a bug report with evidence, reproduction steps, and responsible team info |
| `zendesk-queue` | Queue | Scan Zendesk views: Theme Support Unassigned, My Unresolved Tickets, and Theme Support PQ Unresolved |
| `live-assist` | Live | Analyse a Live Assist chat transcript and provide troubleshooting assistance |
| `chrome-devtools`* | Investigate | Browser automation for storefront debugging, page inspection, screenshots, and console checks |
| `code-review`* | Review | Parallel code review by specialized reviewer agents (scope, architecture, security, performance) |
| `data-portal`* | Data | Data discovery, metadata lookup, and BigQuery queries via Shopify Data Portal |

\* Installed via the `shop-pi-fy` package.

## Structure

```
├── AGENTS.md                  # Core context: role, scope rules, email templates
├── README.md                  # This file
├── SETUP.md                   # Installation and prerequisites
├── USAGE.md                   # Daily workflow reference
├── skills/
│   ├── start-ticket/          # Ticket intake
│   ├── investigate-theme/     # Code analysis and storefront inspection
│   ├── draft-merchant-email/  # Response drafting
│   ├── close-ticket/          # Internal note + Impact Tracker
│   ├── draft-scope-assessment/# Scope check
│   ├── escalate-theme-bug/    # Bug escalation
│   ├── zendesk-queue/         # Zendesk queue scanning via Views API
│   ├── live-assist/           # Live Assist chat analysis
│   ├── chrome-devtools -> *   # Browser automation (via shop-pi-fy)
│   ├── code-review -> *       # Parallel code review (via shop-pi-fy)
│   └── data-portal -> *       # Data Portal queries (via shop-pi-fy)
├── extensions/
│   ├── support-core/          # Custom-built: Zendesk + Help Center access
│   ├── dev-mcp/               # Patched: shopify.dev docs + theme validation
│   ├── beacon-chat-extractor/ # Custom-built: OrangeMonkey userscript for Beacon Live Assist
│   ├── title.ts               # Custom-built: set VS Code terminal tab title per ticket
│   ├── chrome-devtools -> *   # Browser automation (via shop-pi-fy)
│   ├── incidents -> *         # Platform incident search (via shop-pi-fy)
│   ├── perplexity-research -> *  # Web search (via shop-pi-fy)
│   ├── save-to-md -> *        # Export to Markdown (via shop-pi-fy)
│   ├── scout -> *             # Merchant frustrations + feedback (via shop-pi-fy)
│   ├── subagent -> *          # Delegated sub-agent tasks (via shop-pi-fy)
│   ├── shopify-proxy -> *     # Shopify AI proxy (via Nix)
│   └── vscode-bridge -> *    # VS Code integration (via shop-pi-fy)
├── bin/                       # CLI helpers (chrome-devtools, shopify)
├── chrome-devtools.json       # Chrome DevTools config
├── keybindings.json           # Custom keybindings
├── settings.json              # Pi settings
├── config/                    # Pi configuration (credentials gitignored)
└── sessions/                  # Conversation history (gitignored)
```

Entries marked with `-> *` are symlinks to packages installed via `shop-pi-fy` or Nix.

## Tools Connected

**Via custom extensions:**
- support-core — Zendesk ticket search, Help Center articles

**Via Tool Gateway:**
- Slack, Google Workspace, GitHub, Grokt (code search), Vault (internal docs), Observe (logs/errors), Data Portal, GCP Cloud Logging

**Via shop-pi-fy / MCP servers:**
- Scout — merchant frustrations, support tickets, product feedback, app reviews, community posts, sales calls
- Dev MCP — shopify.dev documentation, Liquid/GraphQL/component validation
- Incidents — platform incident search and tracking

## License

Shared for the benefit of other Shopify Theme Support specialists. Use and adapt freely.
