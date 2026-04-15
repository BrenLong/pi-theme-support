---
description: Hands-on investigation of a theme issue through code analysis
---

# Investigate Theme Issue

Hands-on investigation of a theme issue through code analysis.

## When to Use
- After running start-ticket
- When the issue requires looking at theme code or the live storefront
- Before drafting merchant response

## Process

1. **Review Starting Context**
   - Re-read the start-ticket summary and replication steps
   - Identify what needs to be checked first

2. **Get Theme Files from Brendan**
   - Based on the issue, identify which theme files are likely relevant
   - Ask Brendan to copy-paste those files (e.g. "Can I see `sections/header.liquid` and `assets/base.css`?")
   - Brendan is in the Admin Edit Code interface and can provide files quickly
   - If the initial files don't reveal the cause, ask for additional files as needed
   - Do NOT try to access the live storefront via Chrome DevTools unless Brendan specifically asks for it

3. **Analyse Theme Code**
   - Compare modified files against the original theme source
   - Identify all custom code additions (apps, merchant, previous advisors)
   - For each custom addition, determine: what it does, who added it, whether it could cause the issue
   - Check for: syntax errors, unclosed tags, infinite loops, conflicting CSS, broken Liquid logic

4. **Check App Involvement**
   - Look for app-injected code in the theme files (snippets, assets, render tags)
   - Ask Brendan to check app embeds in the theme editor if needed
   - Ask Brendan to check store internal for installed/uninstalled apps
   - If app code is found in theme files, identify which app owns it
   - Suggest Brendan check if the issue occurs with app embeds disabled

5. **Test and Verify**
   - If a fix is identified, explain what needs to change and provide the corrected code
   - If a duplicate theme exists, ask Brendan to compare behaviour between live and duplicate
   - Ask Brendan to verify the fix on the storefront after applying it
   - Confirm secondary issues are also addressed (don't leave loose threads)

6. **Ask for Browser Inspector Screenshots (if needed)**
   - If code analysis alone doesn't fully explain the issue, ask Brendan for browser inspector screenshots
   - Be specific about what to inspect (e.g. "Can you right-click the header logo and Inspect Element, then screenshot the Elements panel?")
   - Useful for: identifying which app is injecting an element, seeing computed CSS on a misbehaving element, spotting console errors, understanding the rendered HTML when Liquid isn't telling the full story
   - Ask for specific things:
     * Elements panel showing the HTML structure around the affected area
     * Computed styles on a specific element
     * Console tab filtered for errors or warnings
     * Network tab if something isn't loading
   - This is a second-tier investigation step - most issues will be resolved through code analysis alone

7. **Research (if needed)**
   - Only if the above steps don't reveal the cause:
     * Search dev-mcp for known theme bugs or documentation
     * Search GitHub for open/closed issues matching symptoms
     * Search Zendesk for similar resolved tickets
     * Search Vault for team knowledge
     * Check shopify-incidents for platform issues

## Output Format

**INVESTIGATION SUMMARY**
Issue: [Brief restatement]
Theme: [Name & Version]

**REPLICATION RESULT**
[Could/could not replicate. What was observed. Screenshots if taken.]

**ROOT CAUSE**
[Clear explanation of what's causing the issue]

**CODE ANALYSIS**
- Custom code found: [list of additions with who added them]
- Problematic code: [specific code causing the issue, if any]
- App involvement: [apps identified and their role]

**SOLUTION**
- What needs to change: [specific action]
- Steps: [numbered list]
- Scope: [In Scope / Out of Scope / App Issue]

**SECONDARY ISSUES**
[Any other issues found during investigation that should be addressed]

**ESCALATION NEEDED:** [Yes/No]
[If yes, explain why and to whom]

## Notes
- Ask Brendan for theme files rather than trying to access the storefront - this is faster and more reliable
- Only use Chrome DevTools if Brendan specifically asks for it, or for tasks where rendered output is genuinely needed
- Compare modified code against the original theme source to isolate changes
- Identify ALL custom code, not just the suspected cause - helps build the full picture
- Address secondary issues found during investigation - don't leave loose threads
- If code analysis alone doesn't explain the issue, then search docs/GitHub/Vault
