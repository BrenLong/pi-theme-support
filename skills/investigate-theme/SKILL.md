---
description: Conduct comprehensive research on a theme issue using all available tools
---

# Investigate Theme Issue

Conduct comprehensive research on a theme issue using all available tools.

## When to Use
- After running start-ticket
- When you need to research a theme problem
- Before drafting merchant response
- When issue cause is unclear

## Required MCPs
- dev-mcp (shopify.dev docs, GitHub issues)
- vault-mcp (internal knowledge)
- support-core (past tickets, Help Center)
- scout (merchant patterns)
- shopify-incidents (platform issues)

## Process

1. **Understand the Issue**
   - Review context from start-ticket
   - Identify the specific theme and version
   - Note what merchant is trying to achieve vs. what's happening

2. **Search Documentation**
   - Query dev-mcp for theme documentation
   - Search for Liquid filters/tags if syntax issue
   - Find theme section/block documentation
   - Look up theme settings documentation

3. **Check Known Issues**
   - Search GitHub (via dev-mcp) for:
     * Open issues matching symptoms
     * Closed issues with fixes
     * Theme version history/changelog
   - Search shopify-incidents for platform issues
   - Check if theme version is outdated

4. **Find Similar Cases**
   - Search Zendesk (support-core) for similar tickets
   - Note how they were resolved
   - Identify common patterns
   - Find successful workarounds

5. **Analyze Merchant Patterns**
   - Search Scout for merchant frustrations
   - Check frequency of similar reports
   - Identify if this is a common pain point
   - Determine if escalation needed

6. **Search Internal Knowledge**
   - Query vault-mcp for team documentation
   - Look for existing runbooks/guides
   - Find team Slack discussions
   - Check for known workarounds

7. **Compile Findings**
   - Synthesize all research
   - Identify root cause
   - Determine best solution
   - Note if escalation needed

## Output Format

**INVESTIGATION SUMMARY**
Issue: [Brief restatement]
Theme: [Name & Version]

**ROOT CAUSE**
[Clear explanation of what's causing the issue]

**EVIDENCE**
- Documentation: [shopify.dev links]
- GitHub Issues: [issue numbers with status]
- Similar Tickets: [ticket numbers with outcomes]
- Scout Data: [merchant frustration frequency]
- Platform Status: [any related incidents]

**SOLUTION OPTIONS**

Option 1: [Primary solution]
- Steps: [numbered list]
- Pros: [benefits]
- Cons: [limitations]
- Scope: [In/Out]

Option 2: [Alternative if applicable]
- Steps: [numbered list]
- Pros: [benefits]
- Cons: [limitations]
- Scope: [In/Out]

**RECOMMENDED ACTION**
[What you should do next]

**FILES TO CHECK** (if code analysis needed)
1. [file path] - [reason]
2. [file path] - [reason]

**ESCALATION NEEDED:** [Yes/No]
[If yes, explain why and to whom]

**REFERENCES**
- [Links to all sources]

## Examples

### Example Use
After running /start-ticket, use:
/investigate-theme

Or provide specific focus:
/investigate-theme Focus on CSS syntax issues in base.css

## Notes
- Always search multiple sources before concluding
- Prioritize official documentation over forum posts
- Note theme version - many issues are version-specific
- If multiple options exist, present pros/cons
- Flag if issue requires escalation before responding
