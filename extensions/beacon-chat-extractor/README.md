# Beacon Chat Extractor

> **Status: WIP / First Draft (v0.2.0)**
> This is a work-in-progress. Sidebar selectors are based on regex fallbacks and need to be validated against the live Beacon DOM. See [Issue #4](https://github.com/BrenLong/pi-theme-support/issues/4) for details.

An OrangeMonkey userscript that extracts Beacon Live Assist chat transcripts for pasting into Pi during Theme Support sessions.

## What it does

- Adds a **"Copy Chat"** button (bottom-right corner) to Beacon
- On click, extracts:
  - **Store info** (email, store URL, plan, location, role, design time, topic)
  - **Full chat transcript** with sender labels (ADVISOR/MERCHANT) and timestamps
- Copies everything to clipboard, ready to paste into Pi
- Strips noise (delivery status, translation labels)

## Output format

```
--- STORE INFO ---
Store: example.myshopify.com
Email: merchant@example.com
Plan: Basic (monthly)
Location: City, Country
Role: Account owner
Design Time Used: 0 minutes
Topic: Themes - Bug/Issue

--- CHAT TRANSCRIPT ---
[ADVISOR | Ayush | 1:31 PM]
Hi, this is Ayush from Shopify Support. Thanks for reaching out!

[MERCHANT | merchant@example.com | 1:35 PM]
I need help with my theme header.
```

## Installation

1. Install [OrangeMonkey](https://chromewebstore.google.com/detail/orangemonkey) browser extension
2. Open OrangeMonkey dashboard
3. Create new script
4. Paste contents of `beacon-chat-extractor.user.js`
5. Save
6. Reload Beacon

## Known limitations

- Store info extraction uses regex on page text (not proper DOM selectors) - needs refinement
- Skips first message (index 0) which is an aggregate blob in Beacon's DOM
- Image/screenshot handling not yet implemented
- No keyboard shortcut yet

## Related

- [Issue #4: Build OrangeMonkey userscript to extract Beacon chat content for Pi](https://github.com/BrenLong/pi-theme-support/issues/4)
