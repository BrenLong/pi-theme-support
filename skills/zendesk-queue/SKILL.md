---
name: zendesk-queue
description: Scan the Theme Support unassigned queue and My Unresolved Tickets in Zendesk
---

# Zendesk Queue Scanner

Scan Zendesk views to see what's in the Theme Support unassigned queue and your current unresolved tickets.

## When to Use
- User asks to check the queue, scan the queue, or see what tickets are waiting
- User wants to see their own unresolved/open tickets
- User asks "what's in the queue?" or "do I have any open tickets?"
- Starting a shift and wanting to see the current state of things

## Prerequisites
- For Brendan's personal queue (PQ): Use `search_zendesk_tickets_by_advisor` with `brendan.long@shopify.com` - no browser needed
- For the unassigned team queue: Use the browser method below (requires Zendesk login)

### Browser method (unassigned queue only)
- Pi's browser must be logged into Zendesk (`shopify.zendesk.com`)
- The browser session must be active (visible mode via `chrome-devtools.json` set to `{"launchMode":"visible"}`)
- If not logged in, navigate to `https://shopify.zendesk.com/agent/` and ask the user to sign in

### IMPORTANT: Automatic visible mode switching
When the browser method is needed and `~/.pi/agent/chrome-devtools.json` is set to `{"launchMode":"isolated"}` (the default), Pi MUST:
1. Write `{"launchMode":"visible"}` to `~/.pi/agent/chrome-devtools.json`
2. **Ask Brendan to reload Pi** (the extension reads the config on startup, so a reload is required for the change to take effect)
3. After reload, navigate to `https://shopify.zendesk.com/agent/` — the visible browser window will appear for Brendan to sign in
4. Once Zendesk queries are complete, **revert** `~/.pi/agent/chrome-devtools.json` back to `{"launchMode":"isolated"}`
5. No further reload is needed after reverting — it will take effect next time Pi starts

The config file location is `~/.pi/agent/chrome-devtools.json` (NOT in the skills directory). Do NOT write to `~/.pi/agent/skills/chrome-devtools/chrome-devtools.json` — that is not the correct location.

## Preferred Method: Personal Queue

Always use `search_zendesk_tickets_by_advisor` with `advisor_email: brendan.long@shopify.com` when checking Brendan's PQ. This avoids browser login issues and is faster.

## Zendesk View IDs
| View | ID | URL |
|------|----|-----|
| Theme Support \| Unassigned | `4469570815501` | `https://shopify.zendesk.com/agent/filters/4469570815501` |
| My Unresolved Tickets | `32208473` | `https://shopify.zendesk.com/agent/filters/32208473` |
| Theme Support PQ Unresolved | `11227426874381` | `https://shopify.zendesk.com/agent/filters/11227426874381` |
| Technical Merchant Support - Unassigned | `36090153865229` | `https://shopify.zendesk.com/agent/filters/36090153865229` |
| Technical Support Triage | `7926941474061` | `https://shopify.zendesk.com/agent/filters/7926941474061` |

## How It Works

The Zendesk Views API is accessed via `chrome_evaluate_script` running fetch calls inside a page already authenticated with Zendesk. This piggybacks on the browser's session cookies (`credentials: 'include'`).

### Key API Endpoints
- `GET /api/v2/views/{id}/tickets.json` - List tickets in a view
- `GET /api/v2/views/{id}/count.json` - Get ticket count for a view
- `GET /api/v2/tickets/{id}.json` - Get ticket details
- `GET /api/v2/tickets/{id}/comments.json?sort_order=desc&per_page=3` - Get recent comments

### Step 1: Verify Zendesk Session

Before querying, confirm Pi's browser is on a Zendesk page:

```
chrome_list_pages → look for a page on shopify.zendesk.com
```

If no Zendesk page exists, navigate to one:

```
chrome_navigate_page → https://shopify.zendesk.com/agent/
```

If the page redirects to Google sign-in, ask the user to log in via the visible browser window.

### Step 2: Query Views

Use `chrome_evaluate_script` to fetch tickets from each view. Example for both views at once:

```javascript
async function() {
  const views = {
    'Theme Support | Unassigned': 4469570815501,
    'My Unresolved Tickets': 32208473,
    'Theme Support PQ Unresolved': 11227426874381
  };
  const results = {};

  for (const [name, viewId] of Object.entries(views)) {
    const resp = await fetch(`/api/v2/views/${viewId}/tickets.json`, { credentials: 'include' });
    const data = await resp.json();
    results[name] = {
      count: data.tickets?.length || 0,
      tickets: data.tickets?.map(t => ({
        id: t.id,
        subject: t.subject,
        status: t.status,
        created_at: t.created_at,
        updated_at: t.updated_at,
        requester_id: t.requester_id,
        tags: t.tags
      }))
    };
  }
  return results;
}
```

### Step 3: Enrich Ticket Details (Optional)

For each ticket, fetch the latest comments to get context on what the merchant needs:

```javascript
async function(ticketId) {
  const [ticketResp, commResp] = await Promise.all([
    fetch(`/api/v2/tickets/${ticketId}.json`, { credentials: 'include' }),
    fetch(`/api/v2/tickets/${ticketId}/comments.json?sort_order=desc&per_page=3`, { credentials: 'include' })
  ]);
  const ticket = (await ticketResp.json()).ticket;
  const comments = (await commResp.json()).comments;
  const lastPublic = comments?.find(c => c.public);

  return {
    id: ticket.id,
    subject: ticket.subject,
    status: ticket.status,
    created: ticket.created_at,
    updated: ticket.updated_at,
    priority: ticket.priority,
    description: lastPublic?.plain_body?.substring(0, 300),
    tags: ticket.tags
  };
}
```

## Output Format

Present results as a clear summary table:

### Theme Support | Unassigned (X tickets)
| # | Ticket | Merchant | Age | Key Tags |
|---|--------|----------|-----|----------|

### My Unresolved Tickets (X tickets)
| # | Ticket | Status | Last Updated | Key Tags |
|---|--------|--------|--------------|----------|

## Notes
- The Zendesk API is rate-limited. If you get a 429 response, wait 60 seconds before retrying.
- View ticket lists are paginated. Check `next_page` in the response for additional pages.
- The `credentials: 'include'` option is required to use the browser's session cookies.
- This approach only works while the Pi browser has an active Zendesk session.
- If the session expires, the user will need to log in again via the visible browser window.

## Future Extensibility
- Add more views by adding their IDs to the view table above
- Build ticket assignment workflows on top of this
- Add queue monitoring/alerting
- Combine with `/skill:start-ticket` to pick up tickets directly from the queue
