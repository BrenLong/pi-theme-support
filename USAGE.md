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

Pi investigates by asking you for theme files rather than accessing the storefront directly. The typical flow:

1. Pi identifies which files are relevant based on the issue
2. Pi asks you to copy-paste those files from Admin Edit Code
3. Pi analyses the code and identifies the root cause
4. If code alone isn't enough, Pi asks for browser inspector screenshots of specific elements
5. Pi provides the fix or scope determination

### Triggering an Investigation
```
/skill:investigate-theme
```

Or just paste the theme files directly — Pi will often start investigating as part of `start-ticket` without needing a separate skill call.

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

## Live Assist

Paste a Beacon chat transcript and Pi will provide a briefing, holding message, and troubleshooting assistance.

```
/skill:live-assist
```

## Closing a Ticket

After sending the email:

```
/skill:close-ticket
```

This generates the internal note and updates the Impact Tracker in one step.

## Tips

- **Always read the full chat history** before drafting a response — Pi does this automatically with `start-ticket`
- **Name your sessions** immediately so you can find them later
- **Check for previous tickets** from the same merchant to avoid repeating information
- **Match the merchant's tone** — Pi's email templates are starting frameworks, not rigid scripts
- **Paste theme files directly** — Pi analyses code faster than navigating storefronts
