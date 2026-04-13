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

4. **Tone Calibration**
   - Match merchant's communication style
   - If frustrated: extra empathetic
   - If technical: more detailed explanations
   - If novice: simpler language
   - Always friendly and professional

5. **Survey Optimization**
   - Remember: merchant may receive satisfaction survey
   - Write for positive response
   - Be thorough but not overwhelming
   - Show you understood their issue
   - Demonstrate effort and care

## Output Format

**EMAIL DRAFT**
---
Subject: [Clear subject line]

Hi [Merchant Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [brief restatement of issue].

[Solution body - clear, step-by-step]

[Any additional context or helpful links]

If I can clarify anything above please let me know. Thanks for getting in touch!

Best regards,
Brendan | Theme Support
---

**EMAIL TYPE:** [Solution/Out-of-Scope/Escalation/Workaround]

**LINKS INCLUDED:**
- [List any Help Center or doc links]

**NOTES FOR REVIEW:**
- [Anything to double-check before sending]

## Email Templates

### Solution Email (In-Scope)
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [issue summary].

I've identified the issue - [root cause explanation].

Here's how to fix this:

1. [Step 1]
2. [Step 2]
3. [Step 3]

Once you've completed these steps, [expected outcome].

If I can clarify anything above please let me know. Thanks for getting in touch!

Best regards,
Brendan | Theme Support

### Out-of-Scope Email
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that you'd like to [request summary].

While I'd love to help, this falls outside the scope of Theme Support as it requires custom code modifications. Theme Support focuses on troubleshooting default theme functionality and helping you use built-in theme features.

For custom development work like this, I'd recommend:

1. Hiring a Shopify Partner: https://experts.shopify.com/
2. Checking the Shopify App Store for apps that provide this functionality: https://apps.shopify.com/
3. Exploring if your theme has built-in settings that achieve a similar result

If I can clarify anything above please let me know. Thanks for getting in touch!

Best regards,
Brendan | Theme Support

### Escalation Acknowledgment
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [issue summary].

I've investigated this issue and it appears to be [brief explanation]. I'm escalating this to our theme development team for further investigation.

I'll keep you updated as I learn more. In the meantime, [any workaround if available].

Thank you for your patience while we look into this.

If I can clarify anything above please let me know. Thanks for getting in touch!

Best regards,
Brendan | Theme Support

### Workaround Email
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [issue summary].

I've identified this as [root cause]. While this is [known bug/limitation], I can offer you a workaround in the meantime:

[Workaround steps]

Please note: [any limitations of workaround]

If I can clarify anything above please let me know. Thanks for getting in touch!

Best regards,
Brendan | Theme Support

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
- NEVER use emojis in emails - no checkmarks, no icons, no symbols
- NEVER use em dashes in emails - use a regular hyphen (-) or rephrase the sentence instead

## Internal Notes (Zendesk)

After the first email on a ticket, Brendan may ask for an internal note. NEVER generate one proactively - only when explicitly asked (e.g. "write the internal note", "generate the note").

Write the note to the same Desktop .md file as the email (append below), or a separate file if requested.

### First Touch - Internal Note Template

Use this template for the first response on a ticket. Keep detail proportional to the ticket's complexity - simple tickets get brief notes, complex tickets get more detail. Do not add extra sections or bullet points beyond this structure.

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

Always include the final email text at the bottom of the internal note under a "Here's the final email I sent:" heading.

### Follow-up Emails - Update Section

For each subsequent email on the same ticket, Brendan may ask for an update to append to the existing internal note. NEVER generate one proactively.

The update section should be:
- Brief and concise
- Bullet pointed
- Appended below the existing note content
- Formatted as:

```
### Update - [Date]
- Brief bullet points summarising what was done/found/communicated
- Status change if applicable
```
