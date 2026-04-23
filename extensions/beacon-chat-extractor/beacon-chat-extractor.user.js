// ==UserScript==
// @name         Beacon Chat Extractor
// @namespace    https://github.com/BrenLong/pi-theme-support
// @version      0.6.0
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
    'top: 9px',
    'right: 130px',
    'z-index: 99999',
    'padding: 8px 16px',
    'background: #2563eb',
    'color: #fff',
    'border: 1px solid #1d4ed8',
    'border-radius: 8px',
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    'font-size: 13px',
    'font-weight: 600',
    'cursor: pointer',
    'box-shadow: 0 2px 8px rgba(0,0,0,0.3)',
    'transition: background 0.15s, transform 0.1s',
  ].join(';');

  btn.addEventListener('mouseenter', () => { btn.style.background = '#1d4ed8'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = '#2563eb'; });
  btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.96)'; });
  btn.addEventListener('mouseup', () => { btn.style.transform = 'scale(1)'; });

  document.body.appendChild(btn);

  // --- Show button only when status is "Chats" ---

  function updateButtonVisibility() {
    const statusSpan = document.querySelector('span.text-text-on-fill');
    const isChats = statusSpan && statusSpan.textContent.trim() === 'Chats';
    btn.style.display = isChats ? 'block' : 'none';
  }

  updateButtonVisibility();
  const observer = new MutationObserver(updateButtonVisibility);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-status-name'] });

  // --- Account Tab Extraction ---

  function extractAccountInfo() {
    const lines = [];
    let storeHandle = null;

    // Name - via aria-label "Copy name"
    const nameBtn = document.querySelector('button[aria-label="Copy name"]');
    if (nameBtn) {
      const nameDiv = nameBtn.closest('.grid')?.querySelector('.overflow-auto.break-words');
      if (nameDiv) {
        const name = nameDiv.textContent.trim();
        if (name) lines.push('Name: ' + name);
      }
    }

    // Email - via aria-label "Copy email"
    const emailBtn = document.querySelector('button[aria-label="Copy email"]');
    if (emailBtn) {
      const emailDiv = emailBtn.closest('.grid')?.querySelector('.overflow-auto.break-words');
      if (emailDiv) {
        const email = emailDiv.textContent.trim();
        if (email) lines.push('Email: ' + email);
      }
    }

    // Store URL - via aria-label "Copy store link"
    const storeBtn = document.querySelector('button[aria-label="Copy store link"]');
    if (storeBtn) {
      const storeDiv = storeBtn.closest('.grid')?.querySelector('.overflow-auto.break-words');
      if (storeDiv) {
        const storeLink = storeDiv.querySelector('a');
        const storeText = storeLink ? storeLink.textContent.trim() : storeDiv.textContent.trim();
        if (storeText) {
          lines.push('Store: ' + storeText);
          const handleMatch = storeText.match(/([\w-]+)\.myshopify\.com/);
          if (handleMatch) storeHandle = handleMatch[1];
        }
      }
    }

    // Details from information-item elements (Plan, Location, Permissions, Design Time)
    const infoItems = document.querySelectorAll('[data-testid="information-item"]');
    const infoLabels = ['Plan', 'Location', 'Permissions', 'Design Time'];
    infoItems.forEach((item, index) => {
      const textEl = item.querySelector('[data-testid="text-component"]');
      if (textEl && index < infoLabels.length) {
        const text = textEl.textContent.trim();
        if (text) lines.push(infoLabels[index] + ': ' + text);
      }
    });

    // Build links from store handle
    if (storeHandle) {
      lines.push('Storefront: https://' + storeHandle + '.myshopify.com/');
      lines.push('Admin: https://admin.shopify.com/store/' + storeHandle);

      // Try to find internal shop ID from the page
      const html = document.body.innerHTML;
      const internalMatch = html.match(/services\/internal\/shops\/(\d+)/);
      if (internalMatch) {
        lines.push('Internal: https://app.shopify.com/services/internal/shops/' + internalMatch[1]);
      }
    }

    return lines.length > 0 ? lines.join('\n') : null;
  }

  // --- Details Section Extraction (Topic, Merchant issue, Troubleshooting) ---

  function extractDetails() {
    const lines = [];
    const form = document.querySelector('#account-info-form');
    if (!form) return null;

    const detailsSection = form.querySelector('.mt-4.pt-4');
    if (!detailsSection) return null;

    const allEls = detailsSection.querySelectorAll('*:not(:has(*))');
    let currentLabel = '';

    for (const el of allEls) {
      const text = el.textContent.trim();
      if (!text) continue;

      if (text === 'Topic' || text === 'Merchant issue' || text === 'Troubleshooting steps completed') {
        currentLabel = text;
        continue;
      }

      if (currentLabel && text.length > 2) {
        if (text.match(/^(Details|Ticket history)$/)) continue;
        lines.push(currentLabel + ': ' + text);
        currentLabel = '';
      }
    }

    return lines.length > 0 ? lines.join('\n') : null;
  }

  // --- Chat Extraction (all panels - merchant + internal) ---

  function extractMessages(list) {
    return [...list.querySelectorAll('[data-testid="message-container"]')].map(el => {
      const isAdvisor = el.classList.contains('prose-advisor-link');
      const fullText = el.innerText.trim();

      // Parse timestamp - handles "HH:MM AM/PM" and "DD/MM/YYYY, HH:MM:SS AM" formats
      const timeMatch = fullText.match(/(\d{1,2}\/\d{1,2}\/\d{4},?\s*\d{1,2}:\d{2}(?::\d{2})?\s*[AP]M|\d{1,2}:\d{2}\s*[AP]M)/i);

      let sender = '';
      let time = '';
      let message = '';

      if (timeMatch) {
        const idx = fullText.indexOf(timeMatch[0]);
        sender = fullText.slice(0, idx).trim();
        time = timeMatch[0].trim();
        message = fullText.slice(idx + timeMatch[0].length).trim();
      } else {
        // Fallback: get message from bubble
        message = el.querySelector('[class*="message-bubble"]')?.innerText.trim() ?? fullText;
        // Try to get sender and time from header elements
        const senderEl = el.querySelector('[data-testid="text-component"].font-semibold');
        if (senderEl) sender = senderEl.textContent.trim();
        const timeEl = el.querySelector('[data-testid="text-component"].font-normal');
        if (timeEl) time = timeEl.textContent.trim();
      }

      // Clean up message
      message = message.replace(/See (original|translation) \([^)]+\)/g, '').trim();
      message = message.replace(/\bDelivered\b/g, '').trim();

      return { isAdvisor, sender, time, message };
    }).filter(x => x.message);
  }

  function extractAllChats() {
    const lists = [...document.querySelectorAll('[data-testid="ChatMessageList"]')];
    if (!lists.length) {
      // Fallback to SidekickMessageList if ChatMessageList not found
      const fallback = document.querySelector('[data-testid="SidekickMessageList"]');
      if (fallback) lists.push(fallback);
    }
    if (!lists.length) return null;

    const sections = lists.map(list => {
      // Determine if this is the internal (DSA ↔ Advisor) panel or merchant chat
      const parentClasses = list.parentElement?.className || '';
      const isInternal = parentClasses.includes('justify-end') ||
                         list.closest('[class*="consulting"]') !== null;

      return {
        label: isInternal ? 'INTERNAL (Advisor ↔ Specialist)' : 'MERCHANT CHAT',
        messages: extractMessages(list),
        isInternal
      };
    }).filter(s => s.messages.length > 0)
      .sort((a, b) => a.isInternal ? 1 : -1); // Merchant chat first

    if (!sections.length) return null;

    const parts = sections.map(({ label, messages, isInternal }) => {
      const formatted = messages.map(m => {
        let role;
        if (isInternal) {
          role = m.sender; // In internal chat, just use the name
        } else {
          role = m.isAdvisor ? 'ADVISOR' : 'MERCHANT';
        }
        const header = [role, m.sender, m.time].filter(Boolean);
        // Avoid duplicate name if role === sender
        if (isInternal) {
          return `[${m.time}] ${m.sender}:\n${m.message}`;
        }
        return `[${role} | ${m.sender} | ${m.time}]\n${m.message}`;
      }).join('\n\n');

      return `=== ${label} ===\n\n${formatted}`;
    });

    if (lists.length === 1) {
      parts.push('\nNOTE: Only merchant chat captured. Open internal panel for specialist notes.');
    }

    return parts.join('\n\n');
  }

  // --- Build Full Output ---

  function buildTranscript() {
    const accountTab = document.querySelector('button[data-component-extra-event-name="beacon_chat_account_tab"]');
    const monitorTab = document.querySelector('button[data-component-extra-event-name="beacon_chat_monitor_chat_tab"]');

    // Check if account tab content is already in the DOM
    const hasAccountData = document.querySelector('button[aria-label="Copy name"]');

    if (!hasAccountData && accountTab) {
      // Account tab not loaded - click to load, extract, then switch back
      accountTab.click();

      setTimeout(() => {
        const result = doBuildTranscript();
        if (monitorTab) monitorTab.click();
        copyAndFlash(result);
      }, 300);
      return '__DEFERRED__';
    }

    return doBuildTranscript();
  }

  function doBuildTranscript() {
    const accountInfo = extractAccountInfo();
    const details = extractDetails();
    const chat = extractAllChats();

    if (!accountInfo && !details && !chat) return null;

    const header = [
      '== BEACON CHAT TRANSCRIPT ==',
      'URL: ' + location.href,
      'Captured: ' + new Date().toLocaleString(),
    ].join('\n');

    const parts = [header, ''];
    if (accountInfo) {
      parts.push('--- ACCOUNT INFO ---\n' + accountInfo);
    }
    if (details) {
      parts.push('--- DETAILS ---\n' + details);
    }
    if (chat) {
      parts.push(chat);
    }
    return parts.join('\n\n');
  }

  // --- Copy and visual feedback ---

  function copyAndFlash(transcript) {
    if (!transcript) {
      btn.textContent = 'No chat found';
      btn.style.background = '#8b0000';
      setTimeout(() => {
        btn.textContent = 'Copy Chat';
        btn.style.background = '#2563eb';
      }, 2000);
      return;
    }

    if (typeof GM_setClipboard === 'function') {
      GM_setClipboard(transcript, 'text');
    } else {
      navigator.clipboard.writeText(transcript).catch(() => {
        // Fallback: open in new window
        const w = window.open();
        w.document.write('<pre style="white-space:pre-wrap">' + transcript + '</pre>');
      });
    }

    btn.textContent = 'Copied!';
    btn.style.background = '#1a6b3c';
    setTimeout(() => {
      btn.textContent = 'Copy Chat';
      btn.style.background = '#2563eb';
    }, 1500);
  }

  // --- Click handler ---

  btn.addEventListener('click', () => {
    const transcript = buildTranscript();
    if (transcript === '__DEFERRED__') return;
    copyAndFlash(transcript);
  });
})();
