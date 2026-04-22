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

1. **Determine Note Type (MANDATORY FIRST STEP)**
   - Before writing anything, check the Zendesk ticket history for existing internal notes from Brendan
   - Explicitly state the determination: "This is a First Touch" or "This is a Follow-up - existing note found at [timestamp]"
   - If Follow-up: retrieve the full text of the existing internal note from the ticket history before proceeding to Step 2. This text must be reproduced verbatim.
   - Do NOT skip this step. Do NOT start writing the internal note until this determination is made.

2. **Generate Internal Note**
   - Always write to an `.html` file (`~/Desktop/Pi comms/ticket-{number}-internal-note-{descriptive-name}.html`) and open in the browser using `open` command, regardless of merchant language. The `{descriptive-name}` should be a short, kebab-case summary of the topic (e.g. `header-alignment`, `mobile-menu-fix`, `out-of-scope-custom-code`). Use the same descriptive name as the corresponding email file for consistency. Internal notes are for the team, not the merchant.
   - Use the same HTML formatting rules as merchant emails: `<h3>` for section headers, `<ul>/<li>` for bullets, `<b><u><a href="url">text</a></u></b>` for links. Internal/services links should display the full URL as link text. No font/colour styling.
   - IMPORTANT: Zendesk strips heading margin/padding when pasting, so explicit line breaks between sections are required to maintain readable spacing. Use `<br><br>` after paragraph text before the next `<h3>`, but only a single `<br>` after closing `</ul>` tags before the next `<h3>` (since lists already carry some trailing space).
   - ALWAYS include the copy button as the first element in the HTML file with label "Copy Internal Note". See the copy button template in the draft-merchant-email skill.
   - NEVER append to the email file
   - **First Touch:** Generate the full internal note using the First Touch template below.
   - **Follow-up Update:** Reproduce the FULL existing internal note (including all previous updates) **completely unchanged**. Do NOT modify any part of the existing note - not the TL;DR, not the Investigation, not the Next Steps/Resolution, not even the status. Every word, heading, bullet point, and link must remain exactly as it was originally written. Then append the new update section at the bottom. ALL new information, findings, status changes, and context go exclusively in the update section. Brendan will paste the entire thing as a single internal note, so it must be complete.
   - Use the appropriate template below
   - Keep detail proportional to the ticket's complexity

3. **Update Impact Tracker**
   - Document: "2026 Q4 Impact Tracker - Personal"
   - Document ID: 1jVRYIeDQr4I2sT5ICZJMZijXDFaTFfKbLwhETiUs-x8
   - First touch: append to end of doc using `gws_docs_write`
   - Follow-up: use `gws_docs_read` to find the existing entry by matching the Zendesk ticket number, then use `gws_docs_replace` to insert the update directly below that ticket's entry (before the next ticket's date separator). Always verify you're targeting the correct ticket - do NOT just append to the end of the doc.
   - Use the appropriate template below (First Touch or Follow-up Update)

4. **Confirm Completion**
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
Status: Solved | Waiting on Merchant | Further Investigation Required | Escalated | Blocked | Waiting on Other Team
(Delete statuses that are not relevant)

Status logic:
- Solved: Default for first touch responses. Use when a fix has been provided (even if speculative/untested), a solution is offered and merchant is asked to try it, the issue is explained with a resolution path, or an out-of-scope determination with referral is provided. We expect first touch resolution - do not use "Waiting on Merchant" just because we asked them to test a fix.
- Waiting on Merchant: Use ONLY when we have explicitly asked the merchant to provide something we need to proceed (e.g. "Can you send me the file?", "Can you check X and let me know?") on a long-running ticket where we genuinely cannot move forward without their input.
- Further Investigation Required: Use when we have told the merchant we will carry out a customization (Design Time work), the ticket has been moved to the queue for deeper investigation, we need to do more research/testing before providing a solution, or a live assist where we told the advisor we will follow up.
- Escalated: Handed off to another team (e.g. engineering, app team).
- Blocked: Cannot proceed due to an external dependency.
- Waiting on Other Team: We have reached out internally and need a response before we can continue.

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
