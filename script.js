// ---- Theme: locked to dark by default (bold aesthetic); manual toggle still available ----
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dark');
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });

  // =====================================================================
  // ---- DETECTION OVERLAY: confidence-score tick-up --------------------
  // Purely cosmetic counter that ticks 0.00 -> 0.98 in sync with the CSS
  // corner-bracket / scan-line animation on the hero photo (see style.css
  // ".detect-*" rules). Skipped entirely if reduced motion is requested.
  // =====================================================================
  (function initConfidenceCounter(){
    const el = document.getElementById('confScore');
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion){ el.textContent = '0.98'; return; }

    const target = 0.98;
    const startDelay = 1300;   // sync with .detect-tag-bottom's animation-delay
    const duration = 650;

    setTimeout(() => {
      const start = performance.now();
      function tick(now){
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (eased * target).toFixed(2);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(2);
      }
      requestAnimationFrame(tick);
    }, startDelay);
  })();

  // =====================================================================
  // ---- LIFT SCROLL: hand-written, zero dependencies -----------------
  // No CDN, no library. This intercepts mouse-wheel input and moves the
  // page toward a target position with heavy lag + a strong ease-out,
  // like an elevator car catching up to the floor you pressed.
  // =====================================================================
  (function initLiftScroll(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return; // respect accessibility setting, skip custom scroll entirely

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = null;
    const DAMPING = 0.065; // lower = heavier / slower lift feel, higher = snappier

    function maxScroll(){
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function loop(){
      current += (target - current) * DAMPING;
      if (Math.abs(target - current) < 0.4){
        current = target;
        window.scrollTo(0, current);
        raf = null;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(loop);
    }

    function kick(){
      if (!raf) raf = requestAnimationFrame(loop);
    }

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY));
      kick();
    }, { passive: false });

    // keep target in sync if the user drags the scrollbar or the OS scrolls directly
    window.addEventListener('scroll', () => {
      if (!raf){ current = window.scrollY; target = window.scrollY; }
    }, { passive: true });

    window.addEventListener('resize', () => {
      target = Math.min(target, maxScroll());
    });

    // smooth, eased anchor-link scrolling using the same lift feel
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href');
        if (id.length > 1){
          e.preventDefault();
          const el = document.querySelector(id);
          if (!el) return;
          const dest = Math.min(maxScroll(), Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90));
          const startY = current;
          const startTime = performance.now();
          const duration = 1300;
          function step(now){
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4); // strong deceleration, elevator-style stop
            current = startY + (dest - startY) * eased;
            target = current;
            window.scrollTo(0, current);
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      });
    });
  })();

  // =====================================================================
  // ---- Everything below is decorative (GSAP) and optional -----------
  // If the CDN scripts didn't load, this block is skipped entirely and
  // the CSS-only reveal/float/glow animations still run on their own.
  // =====================================================================
  const libsLoaded = (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined');

  if (!libsLoaded){
    console.warn('GSAP did not load from the CDN (offline, blocked, or opened via file:// — try a local server instead). Lift scroll still works; using CSS-only reveals.');
    document.querySelectorAll('.reveal, .proj-card').forEach(el=>{
      el.style.opacity = 1; el.style.transform = 'none';
    });
  } else {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // ---- Hero entrance timeline ----
      const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });
      tl.from('.hero-title', { y:50, opacity:0, duration:1 })
        .from('.tag-row .tag', { y:16, opacity:0, stagger:.05, duration:.6 }, '-=.6')
        .from('.hero-cta > *', { y:16, opacity:0, stagger:.08, duration:.6 }, '-=.5')
        .from('.eyebrow', { opacity:0, x:-16, duration:.6 }, 0)
        .from('#detectFrame img', { scale:1.15, opacity:0, duration:1.2, ease:'power2.out' }, .2)
        .from('.hero-stats div', { opacity:0, y:10, stagger:.08, duration:.5 }, .8);

      // ---- Scroll reveals ----
      gsap.utils.toArray('.reveal').forEach((el)=>{
        gsap.to(el, {
          opacity:1, y:0, duration:1, ease:'power3.out',
          scrollTrigger:{ trigger: el, start:'top 85%' }
        });
      });

      gsap.utils.toArray('.proj-card').forEach((el, i)=>{
        gsap.to(el, {
          opacity:1, y:0, duration:.9, ease:'power3.out', delay: i*0.05,
          scrollTrigger:{ trigger: el, start:'top 90%' }
        });
      });

      // ---- Nav background on scroll ----
      ScrollTrigger.create({
        trigger: 'body', start: 'top -60',
        onUpdate: (self)=>{
          document.querySelector('.nav-inner').style.boxShadow = self.progress ? 'var(--shadow)' : 'none';
        }
      });
    } catch (err){
      console.error('GSAP animation setup failed:', err);
      document.querySelectorAll('.reveal, .proj-card').forEach(el=>{
        el.style.opacity = 1; el.style.transform = 'none';
      });
    }
  }
