---
description: Analyse a Live Assist chat transcript and provide troubleshooting assistance with ready-to-send messages
---

# Live Assist

Analyse a Live Assist (Beacon) chat transcript and provide real-time troubleshooting assistance with ready-to-send messages for advisors and merchants.

## When to Use
- Brendan pastes a Live Assist chat transcript
- Brendan needs help troubleshooting a live chat issue
- Brendan needs messages drafted for advisor or merchant communication

## Mode
- **Default: Guidance** - Brendan is advising a Support Advisor who relays messages to the merchant
- **Takeover** - Brendan will tell you when he's taken over the chat and is speaking directly to the merchant
- Never ask which mode - assume Guidance until told otherwise

## Process

### 1. Analyse the Chat Transcript + Provide Holding Message

When Brendan pastes a transcript, IMMEDIATELY produce two things before any investigation:

**A) Concise briefing** (output inline in Pi):

**LIVE ASSIST BRIEFING**

- **Issue:** [One-line description of the problem]
- **Merchant:** [Name if available] | **Store:** [URL if available]
- **Theme:** [Name and type - first-party/third-party]
- **Advisor:** [Name if available]
- **What's been tried:** [Bullet list of troubleshooting already done]
- **What they need from us:** [What the advisor is specifically asking for help with]
- **Scope:** [In Scope / Out of Scope / Needs Investigation] with brief reasoning
- **My take:** [Your quick assessment - what you think the issue is and suggested next steps]

**B) Holding message** (output inline in Pi, immediately after the briefing):

This is a FIXED template - do NOT customise it, add issue details, or hint at what you're investigating. Advisors tend to jump the gun with partial information, so keep it generic. The only dynamic parts are the advisor's first name and the merchant's first name.

Output it exactly like this (plain text, no formatting, no bold, no bullets - just the raw text Brendan can copy):

```
Hey [ADVISOR FIRST NAME]! Taking a look - I'll be back with you shortly when I have more information :)

In the meantime, you can say this to the merchant:

Thanks for your patience, [MERCHANT FIRST NAME]. I've connected with our technical specialist and he's now getting caught up on this issue. I'll be back to you here as soon as we have an update. Thank you again.
```

Replace [ADVISOR FIRST NAME] and [MERCHANT FIRST NAME] with the actual names extracted from the transcript. If a name isn't available, use a neutral fallback (e.g. "there" for the advisor, "" and drop the name for the merchant).

Do NOT:
- Add any details about the issue
- Mention what you're going to check
- Give the advisor any technical context yet
- Vary the wording based on the issue
- Write it to a file - output it inline for speed

If Brendan reports formatting issues when copying the holding message from Pi, fall back to writing it to a file.

Do NOT start any investigation (DevTools, GitHub, Slack, code analysis, etc.) until BOTH the briefing and holding message have been delivered to Brendan.

### 2. Troubleshooting Assistance

Immediately after delivering the briefing and holding message, begin investigation. Speed is everything.

**Investigation priority order (fastest first):**
1. **Ask Brendan** - he's right there in Admin Edit Code. Ask for the specific files you need rather than searching blind. This is almost always the fastest path.
2. **Code analysis** - analyse files Brendan pastes. This is Pi's core strength.
3. **Targeted tool searches** - Dev docs, GitHub, Vault, Help Center - but only when you have a specific question. Don't do broad exploratory searches during live assist.
4. **Chrome DevTools** - last resort, only if Brendan explicitly authorises it.

Do NOT run multiple speculative searches in parallel hoping one hits. Ask Brendan what he sees, form a hypothesis, then verify with a targeted search if needed.

### 2b. Auto-Name Session and Terminal Tab

After the first response/message has been delivered (not before), rename the session and terminal tab:

- Call the `set_terminal_title` tool to set the VS Code terminal tab title
  - Format: `LA - [Advisor's first name]`
  - Example: call `set_terminal_title` with title `LA - Janelyn`
- If the advisor's name isn't available from the transcript yet, use `LA - Unknown` and update later when the information becomes available

This is a low-priority housekeeping step - never delay investigation or responses to do it.

### 3. Draft Messages

#### Guidance Mode (default)

Draft two things together in a single output:

**Message to Advisor** (casual, concise - specialist to colleague):
- Brief explanation of what you found / what's going on
- What to tell the merchant (reference the advisor response below)
- Any internal context the advisor should know but NOT share with merchant

**Advisor Response** (professional, friendly - for the merchant):
- Clear, copy-pasteable message the advisor sends to the merchant
- Follows all communication guidelines from AGENTS.md and the draft-merchant-email skill
- Matches merchant's tone and technical level
- No jargon, active voice, confident language
- No emojis, no em dashes
- Concise - this is chat, not email. Shorter than email responses but still thorough.
- Uses Markdown links for any URLs: `[Link title](url)`

Format the output like this:

---

**To the advisor:**

[Your casual message to the advisor explaining findings, what to do, etc.]

**Advisor response:**

[Copy-pasteable message for the merchant]

---

#### Takeover Mode (when Brendan says he's taking over)

"Taking over" means Brendan is taking over the live chat itself - he connects directly with the merchant in the same chat session. The advisor stays in the chat but steps back. This is NOT an email handoff.

Draft three things together:

**To the advisor:**

[Brief message letting them know Brendan is taking over the chat and they can step back]

**Advisor response:**

[A short message the advisor sends to the merchant introducing Brendan / letting them know the specialist is connecting directly]

**To the merchant:**

[Brendan's first direct message to the merchant in the chat - introduces himself, summarises the situation, explains next steps (e.g., deeper investigation needed, Design Time usage, follow-up via email if async work is required). Same professional/friendly tone guidelines as advisor responses]

---

### 4. Ongoing Conversation

Live Assist is a continuous conversation. As Brendan pastes follow-up messages or asks for more help:
- Maintain full context from the original transcript
- Provide updated troubleshooting assistance
- Draft new messages as needed
- Adapt if switching from Guidance to Takeover mode

## Communication Guidelines

### Messages to Advisor (Brendan's colleague communication)
- Casual, concise, direct
- Technical shorthand is fine
- Focus on what matters - skip pleasantries
- Example: "It's a custom code issue - they've got a broken Liquid loop in product.liquid. Here's what to tell them:"

### Messages to Merchant (via advisor or direct in takeover)
- Follow ALL tone and language guidelines from the draft-merchant-email skill:
  - Simple, common words - no jargon
  - Active voice
  - Confident, not uncertain
  - Supportive, not condescending
  - Positive and factual
  - No negative-connotation words
  - No apologies unless Shopify is clearly at fault
  - Use contractions for natural tone
  - Match merchant's communication style and technical level
- Keep it chat-length - shorter and more conversational than emails
- Still thorough enough to resolve the issue
- No emojis, no em dashes
- All links in Markdown format

## Output Format

- ALL draft messages (to advisor, advisor responses, to merchant) MUST be written to `~/Desktop/Pi comms/live-assist-{descriptive-name}.md` - never output inline in Pi as copy-pasting from Pi causes formatting issues (extra spaces/line breaks)
- The `{descriptive-name}` should be a short, kebab-case summary of the topic (e.g. `slideshow-issue`, `header-alignment`, `app-conflict`)
- Use a **single file per session** - overwrite the same file (`live-assist-{descriptive-name}.md`) each time with the latest message. Brendan only needs the current message, not a history. Do NOT create numbered files (no `-1.md`, `-2.md`, etc.)
- Only create a separate file when the content type is genuinely different (e.g. an internal note is a different file from the messages)
- ALWAYS open the file automatically after writing it
- Use plain text headers like `TO THE ADVISOR:`, `ADVISOR RESPONSE:`, `TO THE MERCHANT:` - no Markdown bold/formatting in headers
- Briefings and analysis can still be output inline in Pi - only copy-pasteable messages go to the file

## Closing a Live Assist

When Brendan asks to close/end a Live Assist session, generate both an internal note and Impact Tracker entry - same as close-ticket but adapted for Live Assist.

### Internal Note

- ALWAYS write to a `.md` file (`~/Desktop/Pi comms/live-assist-internal-note-{descriptive-name}.md`) and open in VS Code using `code` command. The `{descriptive-name}` should match the topic used for the session's message files.
- NEVER use HTML format for Live Assist internal notes
- NEVER include a Zendesk ticket number - Live Assist tickets are created after the chat ends, so the number doesn't exist yet
- Follow the same internal note template structure from the close-ticket skill, minus the ticket number
- Keep detail proportional to the session's complexity

### Store Internal Link

The internal link format is `https://app.shopify.com/services/internal/shops/{shop_id}`. Unlike Zendesk tickets (where the internal link is already in the ticket data), Live Assist requires extracting the shop ID from the storefront.

If the storefront is open in Chrome DevTools, use `chrome_evaluate_script`:
```js
() => { const m = document.documentElement.outerHTML.match(/shop_id["\s:=]+(\d+)/i); return m ? m[1] : null; }
```

Build the link: `https://app.shopify.com/services/internal/shops/{shop_id}`

NEVER guess or fabricate the internal link - always extract the shop ID from the storefront page source.

### Impact Tracker

- Same document and process as close-ticket skill
- Omit the Zendesk ticket number field - replace with `Zendesk ticket number: Live Assist (no ticket number)`
- All other fields remain the same

## Required MCPs
- support-core (Help Center, Zendesk)
- dev-mcp (theme documentation, code validation)
- scout (merchant frustrations, patterns)
- vault-mcp (team knowledge)

## Notes
- Speed is critical - Brendan is in a live chat
- Keep briefings and advisor messages concise
- Merchant-facing messages should still be thorough enough to resolve the issue
- Maintain context across the entire Live Assist session
- If the issue requires async work (e.g., code fix via email), say so in the advisor message
- Follow all scope rules from AGENTS.md - theme type determines everything
- Refer to the draft-merchant-email skill for detailed tone/language/first-touch-resolution guidelines
