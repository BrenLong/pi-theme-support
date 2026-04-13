---
description: Generate a professional Theme Support email response following Brendan's template
---

# Draft Merchant Email

Generate a professional Theme Support email response following Brendan's template.

## When to Use
- After completing investigation
- When ready to respond to merchant
- For both in-scope and out-of-scope issues

## Required MCPs
- support-core (for Help Center article links)
- None required (reads investigation context)

## Process

1. **Review Investigation**
   - Read investigation summary
   - Understand the solution
   - Note any limitations or caveats
   - **Collect all URLs shared during the conversation** - scan the entire chat history for any screenshot URLs, screen recording URLs, or other links Brendan provided during investigation. These MUST be included in the email as Markdown links. Do not wait to be reminded.

2. **Determine Email Type**
   - Solution email (in-scope, you can help)
   - Out-of-scope email (requires Partner)
   - Escalation acknowledgment (investigating with team)
   - Workaround email (temporary solution)

3. **Apply Template**
   - Use Brendan's standard greeting
   - Personalize to merchant's situation
   - Include clear, step-by-step instructions
   - Add relevant Help Center links
   - Close with standard signature

4. **Tone and Language (Shopify Style Guide)**
   Follow Shopify's voice and tone guidelines:
   - **Simple, common words** - avoid jargon, buzzwords, and overly complex language
   - **Active voice** - "I've removed the code" not "the code was removed"
   - **Confident, not uncertain** - "This resolves the issue" not "this might resolve the issue"
   - **Supportive, not condescending** - don't over-explain or patronise
   - **Positive and factual** - focus on what was done and what's working, not what went wrong
   - **No negative-connotation words** - avoid words like "stressful", "worried", "frustrating", "unfortunately", "painful", "struggling". Use neutral or positive alternatives like "impactful", "I understand this affects..."
   - **No apologies unless Shopify is clearly at fault** - do not apologise for third-party app issues, merchant code, or general inconvenience. Only apologise when it's been verified that Shopify (platform, theme, or staff) caused the problem. Saying "sorry" cheapens genuine apologies and implies fault where there is none.
   - **Use contractions** - "I've", "don't", "you'll" for a friendly, natural tone
   - **Keep sentences and paragraphs concise** - break up long blocks of text
   - Match merchant's communication style and technical level
   - If frustrated: extra empathetic but still factual
   - If technical: more detailed explanations
   - If novice: simpler language, avoid jargon
   - Always friendly and professional

5. **First-Touch Resolution**
   First-touch resolution is a key metric. Every email should be written to resolve the ticket in a single response, minimising the chance the merchant needs to reply.
   - **Answer everything** - address every issue the merchant raised across the entire conversation, including secondary concerns. Don't leave loose threads.
   - **Be definitive** - use confident language like "I've fixed this" or "I've removed the code." Avoid hedging like "this might help" or "you could try."
   - **Don't ask direct questions** - never write "Could you let me know...?" or "Can you check...?" Instead, use conditional statements: "If you're still experiencing the issue, please let me know." This way they only reply if there's a problem.
   - **Pre-empt follow-ups** - think about what the merchant is likely to ask next and answer it before they do. Cover edge cases and "what ifs" proactively.
   - **Show your work** - include screenshots, screen recordings, and links that prove the fix is done. This builds trust and removes doubt, so they don't feel the need to reply to confirm.
   - **Don't invite unnecessary responses** - avoid phrasing that prompts a reply (e.g. "Let me know your thoughts" or "What do you think?"). The goal is that if they do reply, it's just to say thanks.

6. **Survey Optimization**
   - Remember: merchant may receive satisfaction survey
   - Write for positive response
   - Be thorough but not overwhelming
   - Show you understood their issue
   - Demonstrate effort and care

## Base Email Template

All emails are built from this single template. The body and closing are adapted to the situation, tone, and context of the conversation.

```
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [issue summary].

[Body - adapted to the situation]

[Closing - adapted to the tone and context of the conversation]

Best regards,
Brendan | Theme Support
```

## Examples

### Example Use
After /investigate-theme, use:
/draft-merchant-email

Or provide context:
/draft-merchant-email merchant_name="Marcos" issue="images not displaying" solution="add missing CSS bracket"

## Notes
- Always include merchant's name (personalization matters)
- Keep tone friendly even for out-of-scope
- Include links when helpful, but don't overwhelm
- If complex issue, consider breaking into numbered steps
- Remember: they might get a survey about this email
- Screenshot references boost clarity
- ALL links MUST use Markdown format: `[Link title](url)` — this applies to Help Center articles, screenshots, screen recordings, app contact pages, and any other URLs
- When Brendan provides a screenshot or recording URL during investigation, include it directly in the email as a Markdown link — never leave it as a placeholder
- ALWAYS write the final email to a .md file on the Desktop (e.g. `~/Desktop/ticket-{number}-reply.md`) so Brendan can open it in VS Code and copy-paste the raw Markdown cleanly into Zendesk - do NOT output the email inline in Pi, as both rendered Markdown and code blocks cause formatting issues when pasting
- When pasting into Zendesk, use **Cmd+Shift+V** (paste without formatting) to avoid double-spaced paragraphs. Remind Brendan of this if it hasn't been mentioned recently.
- NEVER use emojis in emails - no checkmarks, no icons, no symbols
- NEVER use em dashes in emails - use a regular hyphen (-) or rephrase the sentence instead

