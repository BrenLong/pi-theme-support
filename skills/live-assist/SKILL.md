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

### 1. Analyse the Chat Transcript

When Brendan pastes a transcript, immediately produce a **concise briefing**:

**LIVE ASSIST BRIEFING**

- **Issue:** [One-line description of the problem]
- **Merchant:** [Name if available] | **Store:** [URL if available]
- **Theme:** [Name and type - first-party/third-party]
- **Advisor:** [Name if available]
- **What's been tried:** [Bullet list of troubleshooting already done]
- **What they need from us:** [What the advisor is specifically asking for help with]
- **Scope:** [In Scope / Out of Scope / Needs Investigation] with brief reasoning
- **My take:** [Your quick assessment - what you think the issue is and suggested next steps]

Keep this tight. Brendan is in a live chat and needs to absorb context fast.

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

Draft two things together:

**To the advisor:**

[Brief message letting them know what you're doing / what's happening]

**To the merchant:**

[Direct message from Brendan to the merchant - same professional/friendly tone guidelines as advisor responses]

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

All messages are output inline (not written to files). Brendan copies directly from the Pi output.

All messages should be formatted as Markdown so they render cleanly and copy well.

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
