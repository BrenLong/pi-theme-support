---
description: Retrieve and analyze a Shopify Theme Support ticket to begin work
---

# Start Ticket

Retrieve and analyze a Shopify Theme Support ticket to begin work.

## When to Use
- User provides a Zendesk ticket number
- User pastes ticket content
- Beginning work on a new support case

## Required MCPs
- support-core (Zendesk access, Help Center)
- scout (merchant frustrations)
- vault-mcp (past tickets, team knowledge)
- dev-mcp (known theme issues)

## Process

1. **Retrieve Ticket** (if ticket number provided)
   - Get full ticket details from Zendesk
   - Include all customer messages and SA notes
   - Pull ticket metadata (priority, tags, timestamps)

2. **Extract Key Information**
   - Merchant name and store URL
   - Theme name and version
   - Specific issue description
   - Steps merchant has already tried
   - Screenshots/videos mentioned
   - Any error messages

3. **Auto-Name Session and Terminal Tab**
   - After extracting ticket info, immediately run `/name` to set the session name
   - Format: `[Store Name] - [Merchant Name] - Ticket #[number]`
   - Example: `/name Marcos Store - Marcos Andrade - Ticket #58893236`
   - This makes the session easy to find later with `pi -r` or `/resume`
   - Also call the `set_terminal_title` tool to set the VS Code terminal tab title
   - Format: `[ticket-number] - [subject]`
   - The subject is a brief description of the issue
   - Example: call `set_terminal_title` with title `58893236 - Product images not displaying`

4. **Check for Theme Files**
   - After extracting the store URL, check if a theme zip has been downloaded for this store
   - Look in `~/Desktop/` for zip files matching the store handle (e.g. `theme_export__marcos-andrade-myshopify-com*.zip`)
   - Also check if files have already been extracted in `~/Desktop/themes/[store-handle]/`
   - If a zip is found but not yet extracted, unzip it to `~/Desktop/themes/[store-handle]/`
   - If no zip is found, let Brendan know: "I don't have the theme files for this store yet. If you'd like me to have direct access, you can download the theme zip from Admin (three-dot menu > Download theme file) and drop it on your Desktop."
   - This is optional - investigation can proceed without it (Brendan can paste files as needed)
   - Having the full theme locally means Pi can search across all files, check for modifications, and read any file instantly without asking Brendan

5. **Gather Context (as needed)**
   Context searches are optional and should be done when they'd add value, not on every ticket. Use judgement based on the issue type:
   - **Widespread/recurring issues:** Search Scout for merchant frustration patterns and Zendesk for similar resolved tickets
   - **Suspected theme bugs:** Search dev-mcp/GitHub for known issues
   - **Unfamiliar issues:** Search Vault for team documentation and past solutions
   - **Simple/clear-cut issues:** Skip context gathering and move straight to investigation

6. **Initial Assessment**
   - Categorize issue type:
     * Default theme bug
     * Custom code conflict
     * Third-party app issue
     * Settings misconfiguration
     * Performance/compatibility
     * Feature request (out of scope)
   - Determine likely scope (in/out)
   - Identify files to check
   - Flag if similar issue has known solution

## Output Format

**TICKET SUMMARY**
- Ticket #: [number]
- Merchant: [name] ([store-url])
- Theme: [name] [version if known]
- Issue: [one-line description]
- Priority: [priority level]
- Created: [date]

**ISSUE DETAILS**
[Clear description of what's wrong]

**MERCHANT'S STEPS TAKEN**
- [what they already tried]

**REPLICATION STEPS**
Clear, numbered steps to reproduce and verify the issue. Build these from the merchant's description, chat transcript, and any advisor observations.
1. [Step-by-step instructions to trigger the issue]
2. [What to look for / expected vs actual behavior]
3. [Any specific pages, devices, or conditions noted]

- **Verification after fix:** [Quick steps to confirm the issue is resolved]
- **Known non-factors:** [Things already ruled out, e.g. browser, device, network, cache]

**RELATED CONTEXT**
- Similar tickets: [list with ticket numbers]
- Scout patterns: [merchant frustration trends]
- Known bugs: [GitHub issues if any]
- Team knowledge: [relevant Vault docs]

**INITIAL ASSESSMENT**
- Category: [issue type]
- Scope: [In Scope / Out of Scope / Needs Investigation]
- Likely Cause: [hypothesis]
- Files to Check: [list of theme files]
- Priority Actions: [numbered list]

**READY FOR INVESTIGATION:** [Yes/No with explanation]

## Examples

### Example Input
/start-ticket 58893236

### Example Input (Paste)
Ticket #58893236
From: marcos@example.com
Store: marcos-andrade.myshopify.com
Theme: Dawn
Issue: Product images not displaying in Featured Collection

## Notes
- If ticket number provided, use support-core MCP to retrieve
- If pasted content, extract information from text
- Always search for similar issues before concluding
- Flag high-priority or time-sensitive tickets
