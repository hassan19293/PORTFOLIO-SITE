// ---- Theme: locked to dark by default; manual toggle still available ----
const root = document.documentElement;
root.setAttribute('data-theme', 'dark');
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
});

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// =====================================================================
// ---- HERO SIGNATURE: build console typewriter ------------------------
// Types out a short "build log" once on load, then loops on a longer
// delay. Pure text/DOM, no external assets or libraries.
// =====================================================================
(function initBuildConsole(){
  const codeEl = document.getElementById('consoleCode');
  if (!codeEl) return;

  const lines = [
    { text: '$ buildifo deploy --client acme-co', cls: 'ln-cmd' },
    { text: '> scoping requirements ......... done', cls: '' },
    { text: '> designing UI/UX .............. done', cls: '' },
    { text: '> writing custom code .......... done', cls: '' },
    { text: '> wiring AI automation ......... done', cls: '' },
    { text: '> shipping to production ....... done', cls: '' },
    { text: '✓ site is live', cls: 'ln-ok' },
    { text: '', cls: '' },
    { text: '$ status', cls: 'ln-cmd' },
    { text: '> 1 engineer · fixed price · no retainer', cls: 'ln-accent' },
  ];

  if (reduceMotionQuery.matches){
    codeEl.innerHTML = lines.map(l => `<span class="${l.cls}">${l.text}</span>`).join('\n');
    return;
  }

  let cancelled = false;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeLine(line){
    const span = document.createElement('span');
    if (line.cls) span.className = line.cls;
    codeEl.appendChild(span);
    for (let i = 0; i < line.text.length; i++){
      if (cancelled) return;
      span.textContent += line.text[i];
      await sleep(line.cls === 'ln-cmd' ? 26 : 10);
    }
    codeEl.appendChild(document.createTextNode('\n'));
  }

  async function runOnce(){
    codeEl.innerHTML = '';
    for (const line of lines){
      if (cancelled) return;
      await typeLine(line);
      await sleep(line.text === '' ? 120 : 90);
    }
  }

  async function loop(){
    while (!cancelled){
      await runOnce();
      await sleep(4200);
    }
  }

  loop();
})();

// =====================================================================
// ---- REVEAL SYSTEM: IntersectionObserver, fail-safe -------------------
// Every .reveal element is visible by default (see CSS). This only
// ADDS the hidden state right before observing, so if this script
// never runs — blocked, error, disabled JS — nothing stays invisible.
// No external library, no CDN dependency.
// =====================================================================
(function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotionQuery.matches || !('IntersectionObserver' in window)){
    return; // leave everything at its default visible state
  }

  items.forEach(el => el.classList.add('reveal-armed'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => observer.observe(el));
})();

// =====================================================================
// ---- NAV background on scroll -----------------------------------------
// =====================================================================
(function initNavShadow(){
  const nav = document.querySelector('.nav-inner');
  if (!nav) return;
  const update = () => {
    nav.style.boxShadow = window.scrollY > 60 ? 'var(--shadow)' : 'none';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();
