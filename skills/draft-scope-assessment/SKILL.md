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

## Required MCPs
- support-core (Help Center scope guidelines)
- dev-mcp (check if feature exists in theme)

## Scope Guidelines Reference

### IN SCOPE
- Default theme functionality bugs
- Theme settings configuration help
- Understanding how theme features work
- Troubleshooting standard theme behavior
- Theme editor issues
- Liquid syntax errors in default code
- CSS/styling issues in default code
- Section/block configuration
- Theme updates and compatibility

### OUT OF SCOPE
- Custom code modifications
- Adding new features via code
- Performance optimization (advanced)
- Third-party app integration code
- Custom functionality requests
- Advanced customizations beyond settings
- Building new sections/blocks
- Complex Liquid programming
- JavaScript custom development

### GRAY AREA (Needs Assessment)
- Minor CSS tweaks (might be settings-based)
- Liquid code explanations (education vs. building)
- App conflicts (could be theme bug)
- Performance issues (could be theme bug vs. optimization)

## Process

1. **Understand Request**
   - What is merchant trying to achieve?
   - Is it modifying existing behavior or adding new?
   - Can it be done with theme settings?

2. **Check Theme Capabilities**
   - Search dev-mcp for theme documentation
   - Check if theme has built-in setting for this
   - Look for similar feature requests

3. **Apply Scope Guidelines**
   - Does it require code changes?
   - Is it troubleshooting vs. building?
   - Is it understanding vs. implementing?

4. **Search Help Center**
   - Find relevant scope guidance articles
   - Find alternative solutions articles
   - Get Partner referral links

5. **Make Decision**
   - Clear in/out determination
   - Reasoning for decision
   - Alternative suggestions if out

## Output Format

**SCOPE ASSESSMENT**

Request: [What merchant wants to do]

**DETERMINATION:** [IN SCOPE / OUT OF SCOPE / NEEDS INVESTIGATION]

**REASONING:**
[Explain why this falls in or out of scope]

**THEME CAPABILITIES CHECK:**
[Can their theme already do this with settings?]
- [Yes/No with explanation]

**ALTERNATIVE SOLUTIONS:**
1. [Settings-based approach if exists]
2. [App recommendations]
3. [Shopify Partner referral]

**RECOMMENDED RESPONSE:**
[How to communicate this to merchant]

**HELP CENTER REFERENCES:**
- [Relevant articles about scope]
- [Relevant articles about features]

## Examples

### Example: Product Cards Open in New Tab
Request: "Make product card images and titles open in new tab"

DETERMINATION: OUT OF SCOPE

REASONING:
- Requires modifying theme code (add target="_blank")
- Not a bug - this is a feature request
- Not available via theme settings
- Requires custom development

ALTERNATIVE SOLUTIONS:
1. No settings-based solution exists in Dawn
2. No app specifically for this functionality
3. Shopify Partner can add this via code customization

RECOMMENDED RESPONSE:
Out-of-scope email with Partner referral

### Example: Images Not Displaying
Request: "Featured Collection images aren't showing"

DETERMINATION: IN SCOPE

REASONING:
- Troubleshooting default functionality
- Images should display - this is a bug
- Not adding new features, fixing existing
- Within Theme Support expertise

THEME CAPABILITIES CHECK:
Images should display by default in Featured Collection section.

RECOMMENDED RESPONSE:
Investigate → Find root cause → Provide fix

## Notes
- When in doubt, lean toward OUT OF SCOPE
- Better to route correctly than investigate unnecessarily
- Always offer alternatives for out-of-scope
- If gray area, quick investigation to clarify
- Partner referrals are not a failure - they're proper routing
