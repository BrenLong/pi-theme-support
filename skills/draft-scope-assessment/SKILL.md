---
description: Quickly determine if a merchant request is within Theme Support scope
---

# Draft Scope Assessment

Quickly determine if a merchant request is within Theme Support scope.

## When to Use
- Merchant asks for custom functionality
- Unclear if request is in or out of scope
- Before spending time investigating
- When deciding how to route a ticket

## Scope Guidelines Reference

Refer to the detailed scope decision tree, theme categories, and support levels in AGENTS.md. Do not duplicate those rules here.

Key points:
- Always identify the theme type first (first-party, third-party Theme Store, third-party not on Theme Store)
- Theme type determines the entire scope
- For first-party themes, determine if it's troubleshooting or customisation
- Check for custom code and significant code changes
- Check AGENTS.md for the full decision tree

## Process

1. **Understand Request**
   - What is the merchant trying to achieve?
   - Is it modifying existing behaviour or adding new?
   - Can it be done with theme settings?

2. **Identify Theme Type**
   - Follow the scope decision tree in AGENTS.md
   - Theme type determines everything else

3. **Check Theme Capabilities**
   - Search dev-mcp for theme documentation if needed
   - Check if theme has a built-in setting for this
   - Browse the theme editor to verify

4. **Make Decision**
   - Clear in/out determination
   - Reasoning based on AGENTS.md guidelines
   - Alternative suggestions if out of scope

## Output Format

**SCOPE ASSESSMENT**

Request: [What merchant wants to do]

**DETERMINATION:** [IN SCOPE / OUT OF SCOPE / NEEDS INVESTIGATION]

**REASONING:**
[Explain why this falls in or out of scope, referencing the relevant AGENTS.md guideline]

**THEME CAPABILITIES CHECK:**
[Can their theme already do this with settings?]

**ALTERNATIVE SOLUTIONS:**
1. [Settings-based approach if exists]
2. [App recommendations]
3. [Shopify Partner referral]

**RECOMMENDED RESPONSE:**
[How to communicate this to merchant]

## Examples

### Example: Product Cards Open in New Tab
Request: "Make product card images and titles open in new tab"

DETERMINATION: OUT OF SCOPE

REASONING: Requires modifying theme code (add target="_blank"). Not a bug - this is a feature request. Not available via theme settings. Requires custom development.

ALTERNATIVE SOLUTIONS:
1. No settings-based solution exists in Dawn
2. Shopify Partner can add this via code customisation

### Example: Images Not Displaying
Request: "Featured Collection images aren't showing"

DETERMINATION: IN SCOPE

REASONING: Troubleshooting default functionality. Images should display - this is a potential bug. Not adding new features, fixing existing.

## Notes
- When in doubt, lean toward investigating before ruling out of scope
- Always offer alternatives for out-of-scope requests
- Partner referrals are not a failure - they're proper routing
- Reference AGENTS.md for any scope edge cases
