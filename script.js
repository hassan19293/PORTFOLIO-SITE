// ===== Nav burger =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Hero terminal — signature element =====
// Simulates a model inference log, tying directly to the ML subject matter.
(function(){
  const body = document.getElementById('terminalBody');
  if (!body) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { text: '$ python inference.py --model churn_v3', cls: '' },
    { text: 'Loading model weights...', cls: 't-dim' },
    { text: 'Model loaded (auc=0.91)', cls: 't-accent' },
    { text: 'Running batch prediction...', cls: 't-dim' },
    { text: 'customer_04821 → churn_risk: 0.83', cls: '' },
    { text: 'customer_04822 → churn_risk: 0.12', cls: '' },
    { text: 'customer_04823 → churn_risk: 0.67', cls: '' },
    { text: 'Batch complete: 2,000 records', cls: 't-accent' },
    { text: 'p95 latency: 340ms', cls: 't-dim' },
  ];

  function render(){
    body.innerHTML = '';
    lines.forEach((line, i) => {
      const div = document.createElement('div');
      div.className = 't-line ' + line.cls;
      div.style.animationDelay = `${i * 0.35}s`;
      div.textContent = line.text;
      body.appendChild(div);
    });
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    body.appendChild(cursor);
  }

  if (reduceMotion) {
    lines.forEach(l => { l.text = l.text; });
    render();
  } else {
    render();
  }
})();

// ===== Skill bar reveal =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.pct + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
skillFills.forEach(el => skillObserver.observe(el));

// ===== Contact form (static site — no backend) =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Thanks — I'll get back to you soon.";
  form.reset();
});
