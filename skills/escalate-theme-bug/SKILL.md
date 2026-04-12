---
description: Prepare escalation for confirmed theme bugs to engineering or product teams
---

# Escalate Theme Bug

Prepare escalation for confirmed theme bugs to engineering/product teams.

## When to Use
- Confirmed bug in default theme
- Widespread issue affecting multiple merchants
- Theme bug with no workaround
- Feature request with strong merchant demand

## Required MCPs
- dev-mcp (search GitHub, find team)
- vault-mcp (find team contacts, Slack channels)
- scout (merchant frustration data)
- support-core (related ticket counts)

## Process

1. **Confirm It's a Bug**
   - Reproduced the issue
   - Happens in fresh theme (not custom code)
   - Not expected behavior per documentation
   - Affects multiple merchants or critical functionality

2. **Gather Evidence**
   - Ticket numbers showing the issue
   - Scout data on merchant frustration
   - Reproduction steps
   - Expected vs. actual behavior
   - Screenshots/videos

3. **Check If Already Reported**
   - Search GitHub (dev-mcp) for existing issues
   - Search Vault for past escalations
   - Check team Slack channels
   - Avoid duplicate reports

4. **Find Responsible Team**
   - Query vault-mcp for theme ownership
   - Find relevant Slack channel
   - Identify team leads

5. **Prepare Escalation**
   - Clear title and description
   - Reproduction steps
   - Evidence and impact
   - Related tickets
   - Suggested priority

## Output Format

**ESCALATION SUMMARY**

**Title:** [Clear, concise bug description]

**Theme:** [Name] [Version]

**Impact:** [High/Medium/Low]
- Affects: [number of merchants/tickets]
- Severity: [Critical/Major/Minor]
- Workaround available: [Yes/No]

**Description:**
[Clear explanation of the bug]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Reproduction Steps:**
1. [Step 1]
2. [Step 2]
3. [Expected vs actual]

**Evidence:**
- Support Tickets: [list ticket numbers]
- Scout Frustrations: [frequency data]
- Merchant Impact: [quotes or descriptions]
- Screenshots: [reference if available]

**Related Issues:**
- GitHub: [existing issues if any]
- Past Escalations: [Vault references]

**Suggested Priority:** [High/Medium/Low]
**Reason:** [Why this priority]

**Responsible Team:** [Team name]
**Slack Channel:** [#channel]

**DRAFT SLACK MESSAGE:**
---
Hey [Team],

I'm seeing a bug in [Theme] affecting [impact description].

**Issue:** [One-line description]

**Repro:**
1. [Steps]

**Impact:** [Number] merchants affected, [Severity]

Related tickets: [list]

GitHub: [link if exists, or "Should I create an issue?"]

[Any questions or requests]
---

**DRAFT GITHUB ISSUE:** (if creating new)
---
**Title:** [Bug description]

**Description:**
[Detailed explanation]

**Reproduction:**
[Steps]

**Expected vs Actual:**
[Comparison]

**Environment:**
- Theme: [Name & version]
- Related tickets: [numbers]
- Merchant impact: [data]

**Screenshots:**
[If available]
---

## Examples

### Example: Craft Theme Variant Image Bug
TITLE: Craft theme variant images don't update in checkout

THEME: Craft v2.3.1

IMPACT: High
- Affects: 23 merchants (based on Scout)
- Severity: Major (checkout experience broken)
- Workaround available: No

DESCRIPTION:
When a customer selects a different product variant, the variant image doesn't update in the checkout. The default product image is shown instead, causing confusion.

EXPECTED BEHAVIOR:
Checkout should show the selected variant's image

ACTUAL BEHAVIOR:
Checkout shows the default product image regardless of variant

REPRODUCTION STEPS:
1. Add product with multiple variants (each with unique image) to cart
2. Select a specific variant
3. Proceed to checkout
4. Observe: Default image shown, not variant image

EVIDENCE:
- Support Tickets: #59385971, #58472012, #59234561
- Scout: 23 merchant frustrations in last 90 days
- GitHub: Issue #1234 (open, acknowledged)

SUGGESTED PRIORITY: High
REASON: Affects checkout experience, no workaround, multiple merchants

RESPONSIBLE TEAM: Themes
SLACK CHANNEL: #themes-team

## Notes
- Only escalate after confirming it's not custom code
- Include reproduction steps - crucial for engineering
- Quantify impact with ticket/Scout data
- Check for existing GitHub issue first
- Be respectful of team's time - provide complete info
- Include workaround if you found one (even if not ideal)
