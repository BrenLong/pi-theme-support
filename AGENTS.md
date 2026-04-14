# Shopify Theme Support Context

## My Role
I'm Brendan, a Shopify Theme Support Specialist. I help merchants troubleshoot theme issues, analyze custom code issues, create custom solutions for first-party themes using Design Time, and determine if requests are in or out of scope.

## My Workflow
1. Merchant submits ticket with theme issue/request via Zendesk
2. I analyze the ticket to understand the problem
3. Identify the theme type (Admin > Online Store > Themes) to determine support level
4. If necessary, I view theme code in Shopify Admin (Edit Code interface)
5. The Admin shows me which files the merchant modified (critical feature)
6. I identify root cause (theme bug, custom code, settings, app conflicts)
7. I provide solution within scope, or refer appropriately
8. If necessary, I submit bug reports or merchant frustrations
9. Track Design Time manually in store's internal page (internal only)

## Tools I Use
- Zendesk for ticket management
- Shopify Admin Edit Code interface (shows merchant modifications)
- I can paste theme files directly or upload full theme zips to Pi for analysis
- Support-Core: Search Zendesk tickets and Help Center articles
- Scout: Search merchant frustrations, product feedback, support patterns, community discussions
- Dev MCP: Search shopify.dev documentation, validate Liquid/theme code
- Incidents: Check platform-wide incidents
- GitHub: Search for known theme bugs and issues
- Slack: Search internal team discussions and past solutions
- Vault: Search internal knowledge base and team documentation
- Grokt: Search Shopify codebase
- Observe: Check production logs and errors

---

## Theme Categories & Support Levels

### First-Party Shopify Themes

Merchants get 60 minutes of complimentary Design Time (tracked in 15-min increments).

#### Horizon Architecture (newest - theme blocks, AI block generator, nested blocks)
Horizon, Tinker, Fabric, Ritual, Vessel, Atelier, Pitch, Heritage, Dwell, Savor

#### Online Store 2.0 / Dawn Architecture (fully supported)
Dawn, Craft, Crave, Refresh, Sense, Ride, Colorblock, Spotlight, Trade, Studio, Origin, Taste, Publisher

#### Vintage Architecture (security fixes only, no feature updates, not recommended)
Debut, Minimal, Simple, Brooklyn, Boundless, Venture, Narrative, Express, Supply, Pop, and numerous others

---

### Third-Party Themes (Theme Store)

Support provided by: Theme developer (not Shopify)

#### Common Third-Party Themes:
- Maestrooo: Prestige, Impact, Focal, Warehouse
- Archetype Themes: Impulse, Motion, Expanse
- Clean Canvas: Enterprise, Symmetry, Alchemy, Canopy
- Pixel Union: Empire
- Fluorescent Design: Stiletto, Cornerstone
- Presidio Creative: Palo Alto, Broadcast
- Others: Pipeline (Groupthought), Be Yours (RoarTheme), Shapes (Switch Themes), Hyper/Sleek (FoxEcom), Wonder (NETHYPE), Ignite (Benchmark), Eurus (BSS Commerce), Taiga (Woolman), Aurora (Getsitecontrol), Blockshop (Troop Themes)

Note: ~1,080 paid themes exist from hundreds of developers.

---

### Third-Party Themes (NOT on Theme Store)

Examples: Ella, Wokiee, Kalles, Avone, and hundreds more

Fully unsupported - Refer to original theme developer or Shopify Partner

---

## Detailed Scope by Theme Type

### First-Party Themes (Horizon / OS 2.0 / Vintage)

#### Troubleshooting:
- Full support - Investigate any issues to determine root cause
- Identify if issue is theme bug, custom code, settings, or app-related
- If custom code is causing issues:
  - Investigate and explain what the custom code is doing wrong
  - Create duplicate theme with custom code removed to demonstrate it's not a theme bug
  - Assess whether duplicate theme is viable solution or if it would remove other needed functionality
  - Cannot provide workarounds for custom code
  - Refer to original developer who added the code, or external developer like a Shopify Partner
- If AI-generated code (Shopify Magic/Sidekick blocks) is causing issues:
  - Cannot support AI-generated blocks - see [limitations documentation](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/shopify-magic/generate-blocks)
  - Refer to external developer like a Shopify Partner
- If theme has "significant code changes":
  - Out of scope even for first-party themes
  - Refer to external developer like a Shopify Partner

#### Customizations:
- Always assess customization requests to determine if possible
- Will investigate to see if request can be completed
- Will NOT do if:
  - Overly complex
  - Violates [Design Policy](https://help.shopify.com/manual/online-store/themes/theme-support#shopify-design-policy)
  - Would require modifying custom code
  - Theme has significant code changes

##### What design time work includes:
- CSS adjustments (colors, sizing, alignment, spacing, visibility)
- Liquid template edits (minor logic changes, reordering elements, toggling features)
- HTML modifications within theme files
- Basic JavaScript tweaks where needed
- Email notification template edits (Admin > Settings > Notifications)
- Any of the above applies regardless of theme type (Horizon, OS 2.0, or Vintage)

##### Quick fixes via Theme Editor (no design time deducted):
- If a fix is simple enough to do via the theme editor's built-in Custom CSS fields, we often won't deduct design time because it's so quick
- **Global Custom CSS:** Theme Settings > Custom CSS — applies site-wide without modifying source code
- **Section-level Custom CSS:** Within each section in the theme editor — scoped to that section only (e.g., product information, header, footer)
- Examples: simple color change, font size tweak, alignment fix, `display: none` on an element

##### Design Time tracking:
- Tracked in 15-minute increments (always)
- Typical request: 15 minutes
- Complex request: 30 minutes
- Multiple requests: Can use full 60 minutes
- Merchant must have Design Time available
- Track manually in store's internal page

#### Limitations (Cannot Support):
- Edit checkout pages
- Modify custom code (including AI-generated code from Shopify Magic/Sidekick)
- Troubleshoot themes with significant code changes
- Troubleshoot or modify third-party app code
- Edit rich text editor content (pages, blog posts)
- Add custom fonts
- Edit images (crop, color adjust, remove backgrounds)
- Make changes that reduce accessibility or provide misleading info
- Custom translation services
- Troubleshoot [AI-generated theme blocks](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/shopify-magic/generate-blocks)

---

### Third-Party Themes (Theme Store)

#### Troubleshooting:
- Will investigate issues to determine root cause
- May identify issue as:
  - Theme bug → Refer to theme developer
  - Custom code → Refer to external developer like a Shopify Partner
  - Theme developer also does not support custom code
- Help navigate theme settings
- Explain how built-in features work
- Identify if issue is theme-related vs. platform/app

#### Customizations:
- Never provide customizations on third-party themes
- Reason: Lack context to work on these themes safely
- Not supported under [Design Policy](https://help.shopify.com/manual/online-store/themes/theme-support#shopify-design-policy)
- Refer to external developer like a Shopify Partner

#### How to Help:
- Direct merchant to theme documentation (Admin > Themes > Edit theme > Theme name > View documentation)
- Direct merchant to theme developer support (Admin > Themes > Edit theme > Theme name > Get support)
- Do NOT facilitate contact with theme developer - just point to docs/contact info
- For customizations: Refer to external developer like a Shopify Partner

---

### Third-Party Themes (NOT on Theme Store)

#### Troubleshooting:
- Fully unsupported in every aspect
- No investigation, no troubleshooting, no assistance

#### How to Help:
- Confirm theme is not on Theme Store (therefore unsupported per Design Policy)
- Recommend:
  1. Contact original theme developer (wherever they purchased/downloaded it)
  2. Hire an external developer like a Shopify Partner: https://www.shopify.com/partners/directory
  3. Switch to a supported theme from Shopify Theme Store

---

### App Issues (Any Theme Type)

#### First-Party Shopify Apps:
- If issue is caused by a first-party Shopify app → Investigate and escalate internally
- Do NOT respond to merchant until consulting with the app team
- Find responsible team and escalate via Slack or internal channels
- Wait for guidance from app team before providing merchant response
- App team will determine if it's an app bug, theme compatibility issue, or other cause

Examples of first-party apps:
- Shopify Email
- Shopify Inbox
- Shopify Messaging
- Order Printer
- Point of Sale
- Shop (channel)
- And others built by Shopify

#### Third-Party Apps:
- If issue is caused by a third-party app → Contact app developer
- Access app support: Settings > Apps > Click app > Look for support option
- Some apps have chat widgets or contact details in settings
- Even on first-party themes: App issues are app developer's responsibility
- App developer must ensure their app works with themes

#### Third-Party App + Third-Party Theme:
1. Contact app developer first to check compatibility with theme
2. If app developer says incompatible or can't help:
   - Contact theme developer, OR
   - Contact external developer like a Shopify Partner

#### What We Do:
- First-party apps: Escalate internally, consult app team before responding
- Third-party apps: Do NOT facilitate contact with app developers
- Point merchant to app support locations
- Explain app developer's responsibility (third-party apps only)

#### What We Do:
- First-party apps: Escalate internally, consult app team before responding
- Third-party apps: Do NOT facilitate contact with app developers
- Point merchant to app support locations
- Explain app developer's responsibility (third-party apps only)

---

## Scope Decision Tree

### Step 1: Identify Theme Type
- Go to Admin > Online Store > Themes
- Check theme name

First-party Shopify theme?
- Horizon, Tinker, Fabric, Ritual, Vessel, Atelier, Pitch, Heritage, Dwell, Savor, Dawn, Craft, Crave, Refresh, Sense, Ride, Colorblock, Spotlight, Trade, Studio, Origin, Taste, Publisher, Debut, Minimal, Simple, Brooklyn, Boundless, Venture, Narrative, Express, Supply, Pop
- → Continue to Step 2

Third-party (Theme Store)?
- Check if available at themes.shopify.com
- → Troubleshooting only, no customizations
- → Refer to theme developer for bugs/customizations

Third-party (NOT Theme Store)?
- Not found on themes.shopify.com
- → Fully out of scope
- → Refer to original developer or Shopify Partner

### Step 2: Assess Request Type (First-Party Only)

Is it troubleshooting?
- → In scope, investigate fully
- → If custom code involved: Identify issue but don't provide workarounds
- → If significant code changes: Out of scope

Is it a customization?
- → Assess if possible and within Design Policy
- → Check Design Time availability
- → If overly complex or violates policy: Refer to external developer like a Shopify Partner
- → If possible: Use Design Time (15-min increments)

Is it app-related?
- → Refer to app developer (regardless of theme type)

Is it checkout-related?
- → Out of scope

---

## Email Templates

### CRITICAL: Analyse Before Responding
- ALWAYS read back over the **entire chat history** for the current ticket before drafting a response
- ALWAYS check for **previous tickets** from the same merchant (via Zendesk) related to the same issue — understand what's already been tried, what solutions were offered, and what the merchant's experience has been so far
- Use this full context to craft the best possible response — don't repeat information the merchant already has, don't suggest solutions that have already failed, and acknowledge their journey if they've been dealing with this across multiple interactions

### CRITICAL: Date Format
- ALL dates, everywhere, must use DD/MM/YYYY format (e.g., 14/04/2026)
- This applies to emails, internal notes, Impact Tracker entries, follow-up updates, and any other output
- Never use YYYY-MM-DD, MM/DD/YYYY, or written-out formats like "April 14, 2026"

### CRITICAL: Tone and Communication Style
- Match the merchant's tone and communication style
- Adjust language to their technical ability level
- Address ALL issues they've mentioned throughout the conversation
- If merchant is frustrated: Extra empathy and patience
- If merchant is technical: More detailed explanations
- If merchant is non-technical: Simpler language, avoid jargon
- Always remain professional and friendly
- Provide exemplary customer service experience
- Remember: Responses are measured via satisfaction surveys

### CRITICAL: Links and Screenshots in Emails
- ALL links in emails MUST use Markdown format: `[Link title](url)`
- Examples:
  - `[Design Policy](https://help.shopify.com/manual/online-store/themes/theme-support#shopify-design-policy)`
  - `[Screenshot](https://screenshot.click/13-35-pyglu-31sji.jpg)`
  - `[Shopify Partner](https://www.shopify.com/partners/directory)`
- When Brendan provides a screenshot URL during investigation, it is intended to be included in the merchant email as a Markdown link — do NOT leave it as a placeholder or ask for confirmation
- Apply this to ALL links: Help Center articles, screenshots, screen recordings, app contact pages, external resources, etc.
- For **English-speaking merchants**: write the email to an `.html` file (e.g. `~/Desktop/Pi comms/ticket-{number}-reply.html`) and open it in the browser using `open` command. Use `<br><br>` for paragraph breaks, `<b>` for section headers, `<b><u><a href="url">text</a></u></b>` for links. No font/colour styling - let Zendesk handle that. Brendan will copy from the browser and paste into Zendesk as rich text.
- For **non-English-speaking merchants**: write the email to a `.md` file (e.g. `~/Desktop/Pi comms/ticket-{number}-reply.md`) and open it in VS Code using `code` command. Use inline Markdown formatting. Brendan will copy the raw Markdown into Zendesk's translation tool (`#translate_to_merchant`).
- Do NOT output emails inline in Pi - always write to a file
- Internal notes are ALWAYS created as HTML files regardless of merchant language - they are for the team, not the merchant
- When writing code snippets for Brendan (e.g. Liquid, CSS, HTML for theme work), ALWAYS save them to an .html file in Pi comms (e.g. `~/Desktop/Pi comms/ticket-{number}-code.html`) and open it - do NOT output code inline in Pi
- NEVER use emojis in emails - no checkmarks, no icons, no symbols
- NEVER use em dashes in emails - use a regular hyphen (-) or rephrase the sentence instead

### CRITICAL: Internal Notes (Zendesk)
- Internal notes and Impact Tracker updates are handled by the close-ticket skill
- See the close-ticket skill for templates and format

---

### Base Email Template

All emails are built from this single template. The body and closing are adapted to the situation, tone, and context of the conversation. Refer to the draft-merchant-email skill for detailed tone, style, and first-touch resolution guidelines.

```
Hi [Name],

This is Brendan from Shopify Theme Support. It's a pleasure to be in touch with you today. I understand that [issue summary].

[Body - adapted to the situation]

[Closing - adapted to the tone and context of the conversation]

Best regards,
Brendan | Theme Support
```

---

## Important Notes
- Always verify theme type first (Admin > Online Store > Themes) - this determines entire scope
- I work in Admin Edit Code interface (shows merchant modifications)
- I can paste theme files directly or upload full theme zips to Pi for analysis
- Design Time tracked manually in store's internal page (internal only)
- Design Time used in 15-minute increments (always)
- Speed and accuracy are critical
- Customer satisfaction measured via surveys after responses
- ALWAYS read entire chat history before responding
- Match merchant's tone, technical level, and communication style
- Address ALL issues mentioned throughout conversation
- Always include links to screenshots/recordings if merchant shared them
- Tone should be friendly and professional to ensure positive survey results
- Do NOT facilitate contact with theme developers - point to docs/support info only
- Do NOT facilitate contact with app developers - point to app support locations only
