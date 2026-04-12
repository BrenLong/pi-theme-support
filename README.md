# Pi Theme Support

> ⚠️ **This is a work in progress.** This setup is being actively developed and tested. Things may change. Use at your own risk and adapt to your own workflow.

A [Pi](https://github.com/badlogic/pi-mono) coding agent setup tailored for Shopify Theme Support advisors. This configuration turns Pi into an AI-powered assistant for investigating theme issues, analyzing merchant tickets, and drafting responses.

## What This Does

- **Pulls and analyzes Zendesk tickets** with full context (merchant history, similar issues, known bugs)
- **Investigates theme code** by fetching live storefront HTML/CSS or querying theme files via the Admin API
- **Searches across internal tools** — Slack, Vault, GitHub, Scout, Help Center — to find related issues and past solutions
- **Drafts merchant emails** following Theme Support templates and tone guidelines
- **Assesses scope** to quickly determine if a request is in or out of scope
- **Prepares bug escalations** for the Horizon theme team
- **Auto-names sessions** by store and merchant for easy retrieval when a merchant follows up

## Quick Start

1. Install [Pi](https://github.com/badlogic/pi-mono)
2. Copy the contents of this repo to `~/.pi/agent/`
3. Ensure you have access to the required MCPs (support-core, scout, dev-mcp, vault, incidents)
4. Run `pi` and start with `/skill:start-ticket <ticket-number>`

## Structure

```
├── AGENTS.md              # Core context: role, scope rules, email templates
├── skills/                # Task-specific workflows
│   ├── start-ticket/      # Pull and analyze a Zendesk ticket
│   ├── investigate-theme/ # Deep-dive theme investigation
│   ├── draft-merchant-email/  # Generate response emails
│   ├── draft-scope-assessment/  # Quick scope check
│   └── escalate-theme-bug/    # Prepare bug escalation
├── extensions/            # MCP integrations and custom tools
├── config/                # Pi configuration
├── SETUP.md               # Installation and setup guide
└── USAGE.md               # Daily workflow and commands
```

## Skills

| Skill | Description |
|-------|-------------|
| `start-ticket` | Retrieve a ticket, extract key info, auto-name the session, gather context from Scout/Vault/GitHub |
| `investigate-theme` | Comprehensive theme issue investigation using all available tools |
| `draft-merchant-email` | Generate a professional response following Theme Support templates |
| `draft-scope-assessment` | Quickly determine if a request is in or out of scope |
| `escalate-theme-bug` | Prepare a bug escalation for engineering/product teams |

## Key Discoveries

### Session Management
Pi sessions auto-save and can be resumed with `pi -c` (last session) or `pi -r` (browse all). Naming sessions with `/name` makes it easy to find tickets when merchants follow up days later.

### Theme Code Access
Pi can investigate theme issues in two ways:
1. **Reverse-engineering from the live storefront** — Fetching public HTML/CSS to identify layout bugs, CSS rules, and rendering issues
2. **Direct API access** — Using Shopify CLI 3.93+ with `shopify store auth` + `shopify store execute` to query theme files via the Admin GraphQL API (read-only)

### Shopify CLI
The `shopify store` commands require CLI version 3.93.0+. If your system has an older version via Homebrew, install the latest via pnpm:
```bash
pnpm install -g @shopify/cli@latest
```
The new binary installs to `~/.local/share/pnpm/shopify`.

## License

This is a personal workflow setup shared for the benefit of other Shopify Theme Support advisors. Use and adapt freely.
