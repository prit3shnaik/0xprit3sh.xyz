// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  
  if (hamburgerBtn && mobileNavOverlay && mobileNavMenu) {
    function openMobileMenu() {
      mobileNavOverlay.classList.add('active');
      mobileNavMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
      mobileNavOverlay.classList.remove('active');
      mobileNavMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    hamburgerBtn.addEventListener('click', openMobileMenu);
    
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileMenu);
    }
    
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    
    // Close on link click
    const mobileLinks = mobileNavMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }
});

// ── Theme toggle ──────────────────────────────────────────
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isLight ? '[ dark ]' : '[ light ]';
  localStorage.setItem('0xp-theme', isLight ? 'light' : 'dark');
}
 
(function applyStoredTheme() {
  const t = localStorage.getItem('0xp-theme');
  if (t === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '[ dark ]';
  }
})();
 
// ── Typewriter on home ────────────────────────────────────
const typed = document.getElementById('typed-out');
if (typed) {
  const words = ['whoami', 'cat skills.txt', 'ls ./investigations/', 'nmap -sV target'];
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length)  { deleting = true; setTimeout(tick, 1200); return; }
    if (deleting && ci < 0)             { deleting = false; wi = (wi+1) % words.length; ci = 0; }
    setTimeout(tick, deleting ? 60 : 100);
  }
  setTimeout(tick, 800);
}
 
// ── Copy code buttons ─────────────────────────────────────
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.textContent = 'copy';
  btn.className = 'copy-btn';
  pre.style.position = 'relative';
  pre.appendChild(btn);
  btn.addEventListener('click', () => {
    const code = pre.querySelector('code');
    navigator.clipboard.writeText(code ? code.textContent : pre.textContent);
    btn.textContent = 'copied!';
    btn.style.color = 'var(--accent)';
    setTimeout(() => { btn.textContent = 'copy'; btn.style.color = ''; }, 2000);
  });
});
 
// ── Active nav link ───────────────────────────────────────
const path = window.location.pathname;
document.querySelectorAll('.main-nav a, .mobile-nav-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && href !== '/' && path.startsWith(href)) {
    a.classList.add('active');
  }
  if (href === '/' && (path === '/' || path === '/index.html')) {
    a.classList.add('active');
  }
});
 
 // Reading Progress Bar
(function() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--accent);width:0%;z-index:9998;transition:width .1s linear;pointer-events:none;box-shadow:0 0 6px rgba(0,255,65,.5)';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// Full-text Search
(function() {
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <div id="search-modal">
      <div id="search-input-wrap">
        <span style="color:var(--dim);font-size:1.1rem">⌕</span>
        <input type="text" id="search-input" placeholder="search posts, investigations, alerts..." autocomplete="off">
        <kbd id="search-esc">esc</kbd>
      </div>
      <div id="search-results"></div>
      <div id="search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>esc</kbd> close</span>
        <span id="search-count" style="margin-left:auto"></span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #search-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:10000;align-items:flex-start;justify-content:center;padding-top:80px;backdrop-filter:blur(4px)}
    #search-overlay.open{display:flex}
    #search-modal{background:var(--bg2);border:1px solid var(--border2);border-radius:8px;width:min(640px,90vw);box-shadow:0 20px 60px rgba(0,0,0,.6);overflow:hidden}
    #search-input-wrap{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border)}
    #search-input{flex:1;background:none;border:none;color:var(--text);font-family:var(--font);font-size:.9rem;outline:none}
    #search-input::placeholder{color:var(--dim)}
    #search-esc{background:var(--bg3);border:1px solid var(--border2);color:var(--dim);font-family:var(--font);font-size:.65rem;padding:2px 6px;border-radius:3px;cursor:pointer}
    #search-results{max-height:380px;overflow-y:auto}
    #search-results::-webkit-scrollbar{width:3px}
    #search-results::-webkit-scrollbar-thumb{background:var(--border2)}
    .sr-item{display:flex;align-items:flex-start;gap:10px;padding:10px 16px;cursor:pointer;border-bottom:1px solid var(--border);text-decoration:none;color:inherit;transition:background .1s}
    .sr-item:hover,.sr-item.active{background:var(--bg3)}
    .sr-badge{font-size:.6rem;font-weight:700;padding:2px 6px;border-radius:2px;flex-shrink:0;margin-top:2px;background:var(--bg3);border:1px solid var(--border2);color:var(--dim)}
    .sr-badge.blog{background:rgba(188,140,255,.1);color:var(--purple);border-color:rgba(188,140,255,.2)}
    .sr-badge.osint{background:rgba(0,212,255,.1);color:var(--accent2);border-color:rgba(0,212,255,.2)}
    .sr-badge.writeups{background:rgba(255,68,68,.1);color:var(--red);border-color:rgba(255,68,68,.2)}
    .sr-badge.alerts{background:rgba(232,197,71,.1);color:var(--yellow);border-color:rgba(232,197,71,.2)}
    .sr-badge.actors{background:rgba(240,136,62,.1);color:var(--orange);border-color:rgba(240,136,62,.2)}
    .sr-title{font-size:.85rem;color:var(--text);margin-bottom:2px}
    .sr-title mark{background:rgba(0,255,65,.15);color:var(--accent);border-radius:2px;padding:0 2px}
    .sr-summary{font-size:.72rem;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .sr-empty{padding:2rem;text-align:center;color:var(--dim);font-size:.82rem}
    #search-footer{display:flex;gap:1rem;padding:8px 16px;border-top:1px solid var(--border);font-size:.68rem;color:var(--dim);flex-wrap:wrap}
    #search-footer kbd{background:var(--bg3);border:1px solid var(--border2);padding:1px 5px;border-radius:3px;font-family:var(--font);font-size:.6rem;margin:0 2px}
  `;
  document.head.appendChild(style);

  let index = [], selected = -1;

  async function loadIndex() {
    if (index.length) return;
    try { index = await fetch('/index.json').then(r => r.json()); }
    catch(e) { console.warn('Search index unavailable'); }
  }

  function openSearch() { overlay.classList.add('open'); document.getElementById('search-input').focus(); loadIndex(); selected = -1; }
  function closeSearch() {
    overlay.classList.remove('open');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-count').textContent = '';
    selected = -1;
  }

  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
    if (!overlay.classList.contains('open')) return;
    const items = document.querySelectorAll('.sr-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected+1, items.length-1); items.forEach((el,i) => el.classList.toggle('active', i===selected)); items[selected]?.scrollIntoView({block:'nearest'}); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); selected = Math.max(selected-1, 0); items.forEach((el,i) => el.classList.toggle('active', i===selected)); items[selected]?.scrollIntoView({block:'nearest'}); }
    if (e.key === 'Enter' && selected >= 0) items[selected]?.click();
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.getElementById('search-esc').addEventListener('click', closeSearch);

  function hl(text, q) {
    return text.replace(new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')', 'gi'), '<mark>$1</mark>');
  }

  document.getElementById('search-input').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById('search-results');
    const countEl = document.getElementById('search-count');
    selected = -1;
    if (!q) { resultsEl.innerHTML = ''; countEl.textContent = ''; return; }
    const hits = index.filter(p =>
      (p.title||'').toLowerCase().includes(q) ||
      (p.content||'').toLowerCase().includes(q) ||
      (p.tags||[]).join(' ').toLowerCase().includes(q)
    ).slice(0, 10);
    countEl.textContent = hits.length + ' results';
    if (!hits.length) { resultsEl.innerHTML = `<div class="sr-empty">no results for "${q}"</div>`; return; }
    resultsEl.innerHTML = hits.map(p => `
      <a class="sr-item" href="${p.permalink}" onclick="closeSearch()">
        <span class="sr-badge ${p.section||''}">${p.section||'page'}</span>
        <div><div class="sr-title">${hl(p.title||'',q)}</div><div class="sr-summary">${p.summary||''}</div></div>
      </a>`).join('');
  });

  // Add search hint to header
  window.addEventListener('DOMContentLoaded', () => {
    const hint = document.createElement('button');
    hint.textContent = '⌕ search';
    hint.style.cssText = 'background:var(--bg3);border:1px solid var(--border2);color:var(--dim);font-family:var(--font);font-size:.7rem;padding:4px 10px;border-radius:4px;cursor:pointer;transition:all .2s';
    hint.onclick = openSearch;
    const actions = document.querySelector('.header-actions');
    if (actions) actions.insertBefore(hint, actions.firstChild);
  });
})();

// ── Theme toggle ──────────────────────────────────────────
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isLight ? '[ dark ]' : '[ light ]';
  localStorage.setItem('0xp-theme', isLight ? 'light' : 'dark');
  
  // ✦ Sync mobile menu button text
  const mobileBtn = document.querySelector('.mobile-theme-btn');
  if (mobileBtn) mobileBtn.textContent = isLight ? '☾ dark mode' : '☀ light mode';
}

(function applyStoredTheme() {
  const t = localStorage.getItem('0xp-theme');
  if (t === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '[ dark ]';
    // ✦ Sync mobile menu button text on load
    const mobileBtn = document.querySelector('.mobile-theme-btn');
    if (mobileBtn) mobileBtn.textContent = '☾ dark mode';
  }
})();
