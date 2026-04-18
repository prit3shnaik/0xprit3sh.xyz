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
document.querySelectorAll('.main-nav a').forEach(a => {
  if (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/') {
    a.classList.add('active');
  }
});
 
 
