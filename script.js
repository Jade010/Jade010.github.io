/* ─────────────────────────────────────────
   script.js — Jade's Portfolio
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HAMBURGER / MOBILE MENU ────────────────────────────── */
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


  /* ── 2. NAV SHADOW ON SCROLL ────────────────────────────────── */
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


  /* ── 3. SCROLL REVEAL ──────────────────────────────────────── */
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


  /* ── 4. PROJECT FILTER ─────────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const cats = (card.dataset.cats || '').split(' ');
        const visible = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !visible);
        card.classList.remove('filter-in');
        if (visible) {
          card.classList.add('visible');   // skip scroll-reveal once filtered
          void card.offsetWidth;           // restart the fade-in
          card.classList.add('filter-in');
        }
      });
    });
  });

});
