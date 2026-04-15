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
   - Output the internal note directly in Pi as a Markdown code block. Do NOT write to a file - just present it inline so Brendan can copy it.
   - Internal notes are for the team, not the merchant, so no special formatting or files are needed.
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
   - Follow-up: use `gws_docs_read` to find the existing entry by matching the Zendesk ticket number, then use `gws_docs_replace` to insert the update directly below that ticket's entry (before the next ticket's date separator). Always verify you're targeting the correct ticket - do NOT just append to the end of the doc.
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
- Design Time is ONLY for customization requests (new functionality, styling changes). Never mention Design Time when the ticket involves fixing a bug or issue - it does not apply.
