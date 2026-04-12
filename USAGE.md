# Daily Usage Guide

## Starting a Ticket

```
/skill:start-ticket <ticket-number>
```

This will:
1. Pull the full ticket from Zendesk
2. Extract merchant name, store, theme, and issue details
3. Auto-name the session (e.g., "Store Name - Merchant Name - Ticket #12345")
4. Search for similar tickets, known bugs, and team knowledge
5. Provide an initial assessment with scope determination

## Resuming Work on a Ticket

When a merchant replies the next day:

```bash
# From terminal — continue last session
pi -c

# From terminal — browse all sessions
pi -r

# From inside Pi — switch to a different session
/resume
```

## Session Commands

| Command | Description |
|---------|-------------|
| `/name <name>` | Name the current session |
| `/session` | Show session info (path, tokens, cost) |
| `/resume` | Browse and switch to a past session |
| `/new` | Start a fresh session |
| `/tree` | Navigate to any point in session history |
| `/export` | Export session to HTML |

## Investigation Workflow

### Quick Investigation
Ask Pi directly: "Can you check the live storefront for [issue]?"
Pi will fetch the public HTML/CSS and analyze the rendered output.

### Deep Investigation
```
/skill:investigate-theme
```

### Theme File Access (Requires On-Shift Auth)
```bash
# Authenticate to the merchant's store (one time per store)
~/.local/share/pnpm/shopify store auth --store <store>.myshopify.com --scopes read_themes

# Pi can then query theme files directly (read-only)
```

## Drafting Responses

```
/skill:draft-merchant-email
```

## Scope Assessment

```
/skill:draft-scope-assessment
```

## Bug Escalation

```
/skill:escalate-theme-bug
```

## Tips

- **Always read the full chat history** before drafting a response — Pi does this automatically with `start-ticket`
- **Name your sessions** immediately so you can find them later
- **Check for previous tickets** from the same merchant to avoid repeating information
- **Match the merchant's tone** — Pi's email templates are starting frameworks, not rigid scripts
