---
description: Generate the internal note and update the Impact Tracker after sending an email
---

# Close Ticket

Handle all post-email tasks for closing out a ticket: generate the internal note and update the Impact Tracker.

## When to Use
- After the email has been sent on a ticket
- Brendan will say something like "I've sent it", "sent", "done", "close it out", "write the internal note"
- Run both tasks (internal note + Impact Tracker) together without prompting

## Process

1. **Generate Internal Note**
   - Always write to an `.html` file (`~/Desktop/Pi comms/ticket-{number}-internal-note.html`) and open in the browser using `open` command, regardless of merchant language. Internal notes are for the team, not the merchant.
   - Use the same HTML formatting rules as merchant emails: `<h3>` for section headers, `<ul>/<li>` for bullets, `<br><br>` between sections for spacing, `<b><u><a href="url">text</a></u></b>` for links. Internal/services links should display the full URL as link text. No font/colour styling.
   - ALWAYS include the copy button as the first element in the HTML file with label "Copy Internal Note". See the copy button template in the draft-merchant-email skill.
   - NEVER append to the email file
   - **Determine if this is a First Touch or Follow-up:**
     - Check the Zendesk ticket history (from start-ticket or PQ data) for existing internal notes from Brendan
     - If no prior internal note exists from Brendan, this is a **First Touch** - generate the full internal note
     - If Brendan has already posted an internal note on this ticket, this is a **Follow-up Update** - reproduce the FULL existing internal note (including all previous updates) unchanged, then append the new update section at the bottom. Brendan will paste the entire thing as a single internal note, so it must be complete.
   - Use the appropriate template below
   - Keep detail proportional to the ticket's complexity

2. **Update Impact Tracker**
   - Document: "2026 Q4 Impact Tracker - Personal"
   - Document ID: 1jVRYIeDQr4I2sT5ICZJMZijXDFaTFfKbLwhETiUs-x8
   - First touch: append to end of doc using `gws_docs_write`
   - Follow-up: use `gws_docs_read` to find the existing entry, then insert the update at the correct position using `gws_docs_write` with the `index` parameter
   - Use the appropriate template below (First Touch or Follow-up Update)

3. **Confirm Completion**
   - Briefly confirm both tasks are done
   - No need to repeat the full content back to Brendan

## PRIVATE - Do not commit the Google Doc ID to any public repository

## Internal Note Templates

### First Touch

Use this for the first response on a ticket. Keep detail proportional to the ticket's complexity - simple tickets get brief notes, complex tickets get more detail. Do not add extra sections or bullet points beyond this structure.

```
### TL;DR of Issue
A quick, 1-2 sentence overview of the merchant's problem.

### Investigation & Troubleshooting
- Key step taken and result (3-6 bullets typical)
- Focus on outcomes (what was tested, what worked/failed)

### Relevant Links
- Internal: [link]
- Slack convo: [link]
- Shared with Merchant: [link]
- Dev/GitHub: [link]
- Screen recordings/screenshots: [link]
(Omit any that are not relevant)

### Next Steps / Resolution
Status: Solved | Blocked | Escalated | Waiting on Merchant | Waiting on Other Team
(Delete statuses that are not relevant)

Next step (if not solved): what's needed, who owns it, and by when.
```

### Follow-up Update

For each subsequent email on the same ticket, append an update to the existing internal note.

```
### Update - [Date]
- Brief bullet points summarising what was done/found/communicated
- Status change if applicable
```

## Impact Tracker Templates

### First Touch

Plain text only. Use a single hyphen (-) on its own line between each field as a visual separator since Google Docs plain text does not render line breaks reliably. Start with the date in DD/MM/YYYY format.

```
---
[Date in DD/MM/YYYY format]
-
Ticket Summary: [One-line title describing the issue and outcome]
-
Zendesk ticket number: [number]
-
Store/Services Internal link: [URL to services internal page]
-
Issue: [1-2 sentences describing the merchant's problem]
-
Investigation: [1-2 sentences on what was done to find the root cause]
-
Resolution: [1-2 sentences on the outcome and what was communicated]
-
Other context: [Brief note highlighting impact]
```

### Follow-up Update

Insert this below the existing entry for the ticket, before the next "---" separator.

```
-
Update - [DD/MM/YYYY]:
- [Brief bullet point on what was done]
- [Brief bullet point on outcome]
- [Status change if applicable]
```

## Notes
- Internal note and Impact Tracker always happen together - don't do one without the other
- Be concise in both - these are quick references, not full reports
- Always frame "Other context" in the Impact Tracker to reflect positively on Brendan's work
- Plain text only in the Impact Tracker - use hyphens (-) for bullets, line breaks for structure
- Do not include emojis in either output
- The separator (---) at the top of Impact Tracker entries keeps them visually distinct
