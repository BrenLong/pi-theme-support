---
description: Hands-on investigation of a theme issue through code analysis and storefront inspection
---

# Investigate Theme Issue

Hands-on investigation of a theme issue through code analysis and storefront inspection.

## When to Use
- After running start-ticket
- When the issue requires looking at theme code or the live storefront
- Before drafting merchant response

## Process

1. **Review Starting Context**
   - Re-read the start-ticket summary and replication steps
   - Identify what needs to be checked first

2. **Replicate the Issue**
   - Use Chrome DevTools to browse the live storefront
   - Follow the replication steps from start-ticket
   - Take screenshots of the issue if visible
   - Check browser console for errors or repeating warnings
   - Note if the issue can or cannot be replicated

3. **Analyse Theme Code**
   - Ask Brendan for the relevant theme files (or access via Admin Edit Code)
   - Compare modified files against the original theme source
   - Identify all custom code additions (apps, merchant, previous advisors)
   - For each custom addition, determine: what it does, who added it, whether it could cause the issue
   - Check for: syntax errors, unclosed tags, infinite loops, conflicting CSS, broken Liquid logic

4. **Check App Involvement**
   - Inspect app embeds in the theme editor
   - Check store internal for installed/uninstalled apps
   - Identify app-injected code in theme files (snippets, assets, render tags)
   - Use Chrome DevTools to inspect elements and identify which app owns them
   - Check if the issue occurs with app embeds disabled

5. **Test and Verify**
   - If a fix is identified, explain what needs to change
   - If a duplicate theme exists, compare behaviour between live and duplicate
   - Use Chrome DevTools to verify the fix on the storefront
   - Confirm secondary issues are also addressed (don't leave loose threads)

6. **Research (if needed)**
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
- Always try to replicate the issue before diving into code
- The live storefront is public - Chrome DevTools can access it without authentication
- Compare modified code against the original theme source to isolate changes
- Identify ALL custom code, not just the suspected cause - helps build the full picture
- Address secondary issues found during investigation - don't leave loose threads
- If code analysis alone doesn't explain the issue, then search docs/GitHub/Vault
