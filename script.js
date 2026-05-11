/* ─────────────────────────────────────────
   script.js — Jade's Portfolio
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. ROLE BLUR-FLIP ─────────────────────────────────────
     Words slide upward and blur out; next word rises in from
     below and sharpens into focus. No typewriter cursor.
  ──────────────────────────────────────────────────────────── */
  const roles = [
    'Data Analyst',
    'Developer',
    'Problem Solver',
    'Dashboard Builder',
  ];

  let roleIndex = 0;
  const current = document.getElementById('role-current');
  const next    = document.getElementById('role-next');

  if (current && next) {
    // Initial state
    current.style.transform = 'translateY(0)';
    current.style.opacity   = '1';
    current.style.filter    = 'blur(0px)';

    next.style.transform = 'translateY(100%)';
    next.style.opacity   = '0';
    next.style.filter    = 'blur(8px)';

    const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
    const DUR  = '0.55s';

    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;

      // Stage the next word below, invisible
      next.textContent     = roles[roleIndex];
      next.style.transition = 'none';
      next.style.transform  = 'translateY(100%)';
      next.style.opacity    = '0';
      next.style.filter     = 'blur(8px)';

      // Force reflow so transition applies cleanly
      void next.offsetWidth;

      // Animate current → exit upward
      current.style.transition = `transform ${DUR} ${EASE}, opacity 0.38s ease, filter 0.38s ease`;
      current.style.transform  = 'translateY(-100%)';
      current.style.opacity    = '0';
      current.style.filter     = 'blur(8px)';

      // Animate next → enter from below
      next.style.transition = `transform ${DUR} ${EASE}, opacity 0.38s ease, filter 0.38s ease`;
      next.style.transform  = 'translateY(0)';
      next.style.opacity    = '1';
      next.style.filter     = 'blur(0px)';

      // After animation: swap roles so we only ever animate two elements
      setTimeout(() => {
        current.textContent    = roles[roleIndex];
        current.style.transition = 'none';
        current.style.transform  = 'translateY(0)';
        current.style.opacity    = '1';
        current.style.filter     = 'blur(0px)';

        next.style.transition = 'none';
        next.style.transform  = 'translateY(100%)';
        next.style.opacity    = '0';
        next.style.filter     = 'blur(8px)';
      }, 600);

    }, 3000);
  }


  /* ── 2. HAMBURGER / MOBILE MENU ────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* ── 3. NAV SHADOW ON SCROLL ────────────────────────────────── */
  const nav = document.getElementById('nav');

  if (nav) {
    const updateNav = () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(30,26,20,0.10)'
        : 'none';
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }


  /* ── 4. SCROLL REVEAL ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly for grouped elements
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.max(0, idx * 70);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ── 5. PROJECT FILTER ─────────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const visible = filter === 'all' || tags.split(' ').includes(filter);
        card.classList.toggle('hidden', !visible);
      });
    });
  });

});
