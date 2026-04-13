// ==UserScript==
// @name         Beacon Chat Extractor
// @namespace    https://github.com/BrenLong/pi-theme-support
// @version      0.3.0
// @description  Extract Beacon Live Assist chat transcripts for Pi
// @match        https://beacon.shopify.io/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // --- Button UI ---

  const btn = document.createElement('button');
  btn.textContent = 'Copy Chat';
  btn.style.cssText = [
    'position: fixed',
    'bottom: 16px',
    'right: 16px',
    'z-index: 99999',
    'padding: 8px 16px',
    'background: #1a1a1a',
    'color: #fff',
    'border: 1px solid #333',
    'border-radius: 8px',
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    'font-size: 13px',
    'font-weight: 600',
    'cursor: pointer',
    'box-shadow: 0 2px 8px rgba(0,0,0,0.3)',
    'transition: background 0.15s, transform 0.1s',
  ].join(';');

  btn.addEventListener('mouseenter', () => { btn.style.background = '#333'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = '#1a1a1a'; });
  btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.96)'; });
  btn.addEventListener('mouseup', () => { btn.style.transform = 'scale(1)'; });

  document.body.appendChild(btn);

  // --- Store Info Extraction (DOM selectors) ---

  function extractStoreInfo() {
    const lines = [];

    // Store URL - <a> with class "hover:underline" inside a link-colored span
    const storeLinks = document.querySelectorAll('a.hover\\:underline');
    for (const link of storeLinks) {
      const text = link.textContent.trim();
      if (text.match(/[\w-]+\.myshopify\.com/)) {
        lines.push('Store: ' + text);
        break;
      }
    }

    // Email - <div> with class "overflow-auto break-words" containing an email
    const emailDivs = document.querySelectorAll('div.overflow-auto.break-words');
    for (const div of emailDivs) {
      const text = div.textContent.trim();
      const match = text.match(/^[\w.+-]+@[\w.-]+\.\w{2,}$/);
      if (match) {
        lines.push('Email: ' + match[0]);
        break;
      }
    }

    // Plan - <span> with theme text classes containing plan name
    const planSpans = document.querySelectorAll('span.text-base.font-normal');
    for (const span of planSpans) {
      const text = span.textContent.trim();
      const match = text.match(/(Starter|Basic|Grow|Advanced|Plus|Retail|Agentic|Lite)\s*\([^)]*\)/i);
      if (match) {
        lines.push('Plan: ' + match[0]);
        break;
      }
    }

    // Location - same span class, look for "City, Country" pattern after plan
    let foundPlan = false;
    for (const span of planSpans) {
      const text = span.textContent.trim();
      if (foundPlan) {
        // Next text span after plan might be location
        if (text.match(/,/) && !text.match(/design\s*time/i) && text.length < 80) {
          lines.push('Location: ' + text);
          break;
        }
      }
      if (text.match(/(Starter|Basic|Grow|Advanced|Plus|Retail|Agentic|Lite)\s*\(/i)) {
        foundPlan = true;
      }
    }

    // Account role
    for (const span of planSpans) {
      const text = span.textContent.trim();
      if (text.match(/^(Account\s+owner|Staff\s+member|Collaborator)$/i)) {
        lines.push('Role: ' + text);
        break;
      }
    }

    // Design time - <span> containing "minutes of design time used"
    for (const span of planSpans) {
      const text = span.textContent.trim();
      const match = text.match(/(\d+)\s*minutes?\s*of\s*design\s*time\s*used/i);
      if (match) {
        lines.push('Design Time Used: ' + match[1] + ' minutes');
        break;
      }
    }

    // Topic - <p> containing "Themes - ..."
    const paragraphs = document.querySelectorAll('p');
    for (const p of paragraphs) {
      const text = p.textContent.trim();
      const match = text.match(/Themes\s*[-–]\s*.+/i);
      if (match) {
        lines.push('Topic: ' + match[0]);
        break;
      }
    }

    return lines.length > 0 ? lines.join('\n') : null;
  }

  // --- Chat Message Extraction ---

  function extractChat() {
    const container = document.querySelector('.py-5.px-4.overflow-auto.w-full.h-full');
    if (!container) return null;

    const msgs = container.querySelectorAll('[class*="chat-message"]');
    if (!msgs.length) return null;

    const lines = [];

    // Skip index 0 - aggregate blob
    for (let i = 1; i < msgs.length; i++) {
      const m = msgs[i];

      // Determine role
      let role = 'SYSTEM';
      if (m.classList.contains('self-end')) role = 'ADVISOR';
      if (m.classList.contains('self-start')) role = 'MERCHANT';

      // Sender name
      const senderEl = m.querySelector('[class*="space-x-3"]');
      let sender = '';
      if (senderEl) {
        const raw = senderEl.textContent.trim();
        sender = raw.split(/\d/)[0].trim();
      }

      // Timestamp
      let time = '';
      if (senderEl) {
        const match = senderEl.textContent.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
        if (match) time = match[0].trim();
      }

      // Message body
      const bodyEls = m.querySelectorAll('[class*="py-\\[2px\\]"]');
      let body = '';
      if (bodyEls.length) {
        const parts = [];
        bodyEls.forEach((b) => {
          let text = b.textContent.trim();
          text = text.replace(/See (original|translation) \([^)]+\)/g, '').trim();
          if (text) parts.push(text);
        });
        body = parts.join('\n');
      } else {
        body = m.textContent.trim().substring(0, 500);
      }

      // Strip delivery status
      body = body.replace(/\bDelivered\b/g, '').trim();

      if (!body) continue;

      // Format line
      const header = [role, sender, time].filter(Boolean).join(' | ');
      lines.push('[' + header + ']\n' + body);
    }

    return lines.join('\n\n');
  }

  // --- Build Full Output ---

  function buildTranscript() {
    const storeInfo = extractStoreInfo();
    const chat = extractChat();

    if (!storeInfo && !chat) return null;

    const parts = [];
    if (storeInfo) {
      parts.push('--- STORE INFO ---\n' + storeInfo);
    }
    if (chat) {
      parts.push('--- CHAT TRANSCRIPT ---\n' + chat);
    }
    return parts.join('\n\n');
  }

  // --- Click handler ---

  btn.addEventListener('click', () => {
    const transcript = buildTranscript();

    if (!transcript) {
      btn.textContent = 'No chat found';
      btn.style.background = '#8b0000';
      setTimeout(() => {
        btn.textContent = 'Copy Chat';
        btn.style.background = '#1a1a1a';
      }, 2000);
      return;
    }

    // Copy to clipboard
    if (typeof GM_setClipboard === 'function') {
      GM_setClipboard(transcript, 'text');
    } else {
      navigator.clipboard.writeText(transcript).catch(() => {});
    }

    // Visual feedback
    btn.textContent = 'Copied!';
    btn.style.background = '#1a6b3c';
    setTimeout(() => {
      btn.textContent = 'Copy Chat';
      btn.style.background = '#1a1a1a';
    }, 1500);
  });
})();
