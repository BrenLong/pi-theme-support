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

**B) Holding message** (written to file immediately alongside the briefing):

A draft message to the advisor + an advisor response for the merchant, letting them know the specialist is investigating and will be back shortly. This gives Brendan something to send RIGHT AWAY while investigation happens in the background.

Do NOT start any investigation (DevTools, GitHub, Slack, code analysis, etc.) until BOTH the briefing and holding message have been delivered to Brendan.

### 2. Troubleshooting Assistance

After the briefing, assist with investigation using the same tools and approach as the investigate-theme skill:
- Chrome DevTools for storefront inspection
- Code analysis (theme files pasted or accessed)
- Dev docs, GitHub, Vault, Help Center searches as needed
- Scope assessment per AGENTS.md guidelines

Speed matters - this is real-time. Prioritise quick wins and actionable answers.

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

- ALL draft messages (to advisor, advisor responses, to merchant) MUST be written to `~/Desktop/live-assist-messages.md` - never output inline in Pi as copy-pasting from Pi causes formatting issues (extra spaces/line breaks)
- ALWAYS overwrite the same file with the latest messages
- ALWAYS open the file automatically after writing it (`open ~/Desktop/live-assist-messages.md`)
- Use plain text headers like `TO THE ADVISOR:`, `ADVISOR RESPONSE:`, `TO THE MERCHANT:` - no Markdown bold/formatting in headers
- Briefings and analysis can still be output inline in Pi - only copy-pasteable messages go to the file

## Internal Notes

When Brendan asks for an internal note during or after a Live Assist session:

- ALWAYS write to a `.md` file (e.g. `~/Desktop/Pi comms/live-assist-internal-note.md`) and open in VS Code using `code` command
- NEVER use HTML format for Live Assist internal notes
- NEVER include a Zendesk ticket number - Live Assist tickets are created after the chat ends, so the number doesn't exist yet
- Keep the internal URL (services/internal link) in relevant links
- Follow the same internal note template structure from the close-ticket skill, minus the ticket number
- Impact Tracker entries for Live Assist also omit the Zendesk ticket number

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
