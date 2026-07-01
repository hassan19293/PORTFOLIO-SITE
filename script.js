// ===== Nav burger =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Neural node field (hero signature element) =====
(function(){
  const field = document.getElementById('nodeField');
  const canvas = document.createElement('canvas');
  field.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = field.clientWidth;
    h = canvas.height = field.clientHeight;
  }
  function initNodes(){
    const count = window.innerWidth < 640 ? 16 : 26;
    nodes = Array.from({length: count}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.25,
      vy: (Math.random()-0.5)*0.25,
      r: Math.random()*1.6 + 1
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > h) n.vy *= -1;
    });
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 130){
          ctx.strokeStyle = `rgba(255,90,31,${(1 - dist/130) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,177,153,0.9)';
      ctx.fill();
    });
    if(!reduceMotion) requestAnimationFrame(step);
  }
  resize(); initNodes();
  window.addEventListener('resize', () => { resize(); initNodes(); });
  if(reduceMotion){ step(); } else { requestAnimationFrame(step); }
})();

// ===== Animated stat counters =====
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const duration = 1200;
      const startTime = performance.now();
      function tick(now){
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1-progress, 3);
        current = Math.round(eased * target);
        el.textContent = current;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    }
  });
}, {threshold: 0.5});
statNums.forEach(el => statObserver.observe(el));

// ===== Skill ring animation =====
const rings = document.querySelectorAll('.skill-ring');
const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const ring = entry.target;
      const pct = parseInt(ring.dataset.pct, 10);
      const circle = ring.querySelector('.ring-fill');
      const circumference = 2 * Math.PI * 52;
      const offset = circumference - (pct/100) * circumference;
      circle.style.strokeDashoffset = offset;
      ringObserver.unobserve(ring);
    }
  });
}, {threshold: 0.4});
rings.forEach(r => ringObserver.observe(r));

// ===== Portfolio filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// ===== Scroll reveal for sections =====
const revealTargets = document.querySelectorAll('.service-card, .portfolio-card, .about-copy, .about-visual');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.animation = 'rise .7s ease forwards';
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
revealTargets.forEach(el => { el.style.opacity = 0; revealObserver.observe(el); });

// ===== Contact form (static site — no backend) =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Thanks — I'll get back to you soon. (Connect a form service like Formspree to receive these live.)";
  form.reset();
});

// ===== Nav background on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 8px 30px -20px rgba(0,0,0,.6)' : 'none';
});