// ── Reading Progress Bar ──────────────────────────────────
(function() {
  const bar = document.createElement('div');
  bar.id = 'read-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--accent);width:0%;z-index:9998;transition:width .1s linear;pointer-events:none;box-shadow:0 0 6px rgba(0,255,65,.5)';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ── Full-text Search (press /) ────────────────────────────
(function() {
  // Inject search overlay HTML
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <div id="search-modal">
      <div id="search-input-wrap">
        <span id="search-icon">⌕</span>
        <input type="text" id="search-input" placeholder="search posts, investigations, writeups..." autocomplete="off" spellcheck="false">
        <kbd id="search-esc">esc</kbd>
      </div>
      <div id="search-results"></div>
      <div id="search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>esc</kbd> close</span>
        <span id="search-count"></span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #search-overlay {
      display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:10000;
      align-items:flex-start;justify-content:center;padding-top:80px;backdrop-filter:blur(4px);
    }
    #search-overlay.open { display:flex; }
    #search-modal {
      background:var(--bg2);border:1px solid var(--border2);border-radius:8px;
      width:min(640px,90vw);box-shadow:0 20px 60px rgba(0,0,0,.6);overflow:hidden;
    }
    #search-input-wrap {
      display:flex;align-items:center;gap:10px;padding:12px 16px;
      border-bottom:1px solid var(--border);
    }
    #search-icon { font-size:1.1rem;color:var(--dim); }
    #search-input {
      flex:1;background:none;border:none;color:var(--text);font-family:var(--font);
      font-size:.9rem;outline:none;
    }
    #search-input::placeholder { color:var(--dim); }
    #search-esc {
      background:var(--bg3);border:1px solid var(--border2);color:var(--dim);
      font-family:var(--font);font-size:.65rem;padding:2px 6px;border-radius:3px;
    }
    #search-results { max-height:360px;overflow-y:auto; }
    #search-results::-webkit-scrollbar { width:3px; }
    #search-results::-webkit-scrollbar-thumb { background:var(--border2); }
    .sr-item {
      display:flex;align-items:flex-start;gap:10px;padding:10px 16px;
      cursor:pointer;border-bottom:1px solid var(--border);text-decoration:none;color:inherit;
      transition:background .1s;
    }
    .sr-item:hover,.sr-item.active { background:var(--bg3); }
    .sr-item:last-child { border-bottom:none; }
    .sr-section {
      font-size:.6rem;font-weight:700;padding:2px 6px;border-radius:2px;
      flex-shrink:0;margin-top:2px;
    }
    .sr-sec-blog    { background:rgba(188,140,255,.1);color:var(--purple);border:1px solid rgba(188,140,255,.2); }
    .sr-sec-osint   { background:rgba(0,212,255,.1);color:var(--accent2);border:1px solid rgba(0,212,255,.2); }
    .sr-sec-writeups{ background:rgba(255,68,68,.1);color:var(--red);border:1px solid rgba(255,68,68,.2); }
    .sr-sec-alerts  { background:rgba(232,197,71,.1);color:var(--yellow);border:1px solid rgba(232,197,71,.2); }
    .sr-sec-actors  { background:rgba(240,136,62,.1);color:var(--orange);border:1px solid rgba(240,136,62,.2); }
    .sr-body { flex:1;min-width:0; }
    .sr-title { font-size:.85rem;color:var(--text);margin-bottom:2px; }
    .sr-title mark { background:var(--accent-dim);color:var(--accent);border-radius:2px;padding:0 2px; }
    .sr-summary { font-size:.72rem;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
    .sr-empty { padding:2rem;text-align:center;color:var(--dim);font-size:.82rem; }
    #search-footer {
      display:flex;gap:1rem;padding:8px 16px;border-top:1px solid var(--border);
      font-size:.68rem;color:var(--dim);flex-wrap:wrap;
    }
    #search-footer kbd {
      background:var(--bg3);border:1px solid var(--border2);padding:1px 5px;
      border-radius:3px;font-family:var(--font);font-size:.6rem;margin:0 2px;
    }
    #search-count { margin-left:auto; }
    body.light-mode #search-overlay { background:rgba(0,0,0,.4); }
  `;
  document.head.appendChild(style);

  let index = [];
  let selected = -1;

  // Load search index
  async function loadIndex() {
    if (index.length) return;
    try {
      const res = await fetch('/index.json');
      if (!res.ok) return;
      const data = await res.json();
      index = data;
    } catch(e) { console.warn('Search index not available'); }
  }

  function open() {
    overlay.classList.add('open');
    document.getElementById('search-input').focus();
    loadIndex();
    selected = -1;
  }
  function close() {
    overlay.classList.remove('open');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-count').textContent = '';
    selected = -1;
  }

  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault(); open();
    }
    if (e.key === 'Escape') close();
    if (!overlay.classList.contains('open')) return;
    const items = document.querySelectorAll('.sr-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selected = Math.min(selected + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === selected));
      items[selected]?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selected = Math.max(selected - 1, 0);
      items.forEach((el, i) => el.classList.toggle('active', i === selected));
      items[selected]?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter' && selected >= 0) {
      items[selected]?.click();
    }
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.getElementById('search-esc').addEventListener('click', close);

  // Search logic
  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function search(q) {
    q = q.trim().toLowerCase();
    const resultsEl = document.getElementById('search-results');
    const countEl = document.getElementById('search-count');
    selected = -1;
    if (!q) { resultsEl.innerHTML = ''; countEl.textContent = ''; return; }

    const hits = index.filter(item => {
      const title = (item.title || '').toLowerCase();
      const content = (item.content || '').toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      return title.includes(q) || content.includes(q) || tags.includes(q);
    }).slice(0, 12);

    countEl.textContent = hits.length + ' results';

    if (!hits.length) {
      resultsEl.innerHTML = `<div class="sr-empty">no results for "${q}"</div>`;
      return;
    }

    const secClass = s => `sr-sec-${s}`;
    resultsEl.innerHTML = hits.map(item => `
      <a class="sr-item" href="${item.permalink}">
        <span class="sr-section ${secClass(item.section || 'blog')}">${item.section || 'page'}</span>
        <div class="sr-body">
          <div class="sr-title">${highlight(item.title || '', q)}</div>
          <div class="sr-summary">${item.summary || ''}</div>
        </div>
      </a>
    `).join('');

    resultsEl.querySelectorAll('.sr-item').forEach(el => {
      el.addEventListener('click', close);
    });
  }

  document.getElementById('search-input').addEventListener('input', e => search(e.target.value));
})();
