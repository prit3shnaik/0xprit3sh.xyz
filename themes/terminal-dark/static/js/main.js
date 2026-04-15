// Typewriter effect on home page
const typedEl = document.getElementById('typed');
if (typedEl) {
  const text = 'whoami';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      typedEl.textContent += text[i++];
      setTimeout(type, 100);
    }
  };
  setTimeout(type, 500);
}

// Copy code blocks on click
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.textContent = 'copy';
  btn.className = 'copy-btn';
  btn.style.cssText = 'position:absolute;top:8px;right:8px;background:#1a1a1a;color:#484f58;border:1px solid #2a2a2a;padding:2px 8px;font:0.75rem monospace;cursor:pointer;border-radius:3px;';
  pre.style.position = 'relative';
  pre.appendChild(btn);
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent);
    btn.textContent = 'copied!';
    btn.style.color = '#00ff41';
    setTimeout(() => { btn.textContent = 'copy'; btn.style.color = '#484f58'; }, 2000);
  });
});
