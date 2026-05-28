/* ══════════════════════════════════════════════════════════
   DateBox Landing — Interactive Scroll & Animations
   ══════════════════════════════════════════════════════════ */

// ─── DOM READY ───
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initThemeToggle();
  initRevealAnimations();
  initParallaxHero();
  initParticles();
  initCounterAnimations();
  initModal();
  initSmoothScroll();
});

/* ─────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ───────────────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        bar.style.width = `${Math.min(scrollPercent, 100)}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   NAVBAR — glass transition on scroll + mobile menu
   ───────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');

  if (!navbar) return;

  // Scroll glass effect
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  // Hamburger menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ─────────────────────────────────────────────────────────
   REVEAL ANIMATIONS — Intersection Observer
   ───────────────────────────────────────────────────────── */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || 0);
          setTimeout(() => {
            el.classList.add('active');
          }, delay * 1000);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────
   PARALLAX — Hero elements move at different speeds
   ───────────────────────────────────────────────────────── */
function initParallaxHero() {
  const hero = document.querySelector('.hero');
  const logoImg = document.querySelector('.hero__logo-img');
  const orbits = document.querySelectorAll('.hero__orbit');
  const gradient = document.querySelector('.hero__gradient');

  if (!hero || !logoImg) return;

  let parallaxTicking = false;

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrollY < heroHeight * 1.2) {
          const factor = scrollY / heroHeight;

          // Logo floats up slower
          logoImg.style.transform = `translateY(${-18 * Math.sin(Date.now() / 1000) + scrollY * 0.15}px)`;

          // Orbits parallax
          orbits.forEach((orbit, i) => {
            const speed = 0.05 * (i + 1);
            orbit.style.transform = `rotate(${Date.now() / (250 * (i + 1))}deg) translateY(${scrollY * speed}px)`;
          });

          // Gradient fades
          if (gradient) {
            gradient.style.opacity = 1 - factor * 0.5;
          }
        }

        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   PARTICLES — Floating ambient particles in hero
   ───────────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 15;
  const isAccent = Math.random() > 0.65;

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}%;
    bottom: -${size}px;
    background: ${isAccent ? 'var(--accent)' : 'var(--text-muted)'};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    box-shadow: 0 0 ${size * 2}px ${isAccent ? 'var(--accent-glow)' : 'var(--accent-glow)'};
  `;

  container.appendChild(particle);
}

/* ─────────────────────────────────────────────────────────
   COUNTER ANIMATIONS — count up on scroll
   ───────────────────────────────────────────────────────── */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stats__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ─────────────────────────────────────────────────────────
   MODAL — coming soon
   ───────────────────────────────────────────────────────── */
function initModal() {
  const modal = document.getElementById('comingSoonModal');
  const closeBtn = document.getElementById('modalClose');
  const overlay = modal?.querySelector('.modal__overlay');

  let unlockTimeoutId;

  if (!modal) return;

  const lockBody = () => {
    if (unlockTimeoutId) {
      clearTimeout(unlockTimeoutId);
      unlockTimeoutId = undefined;
    }

    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    document.body.style.setProperty('--scrollbar-comp', `${scrollbarWidth}px`);
    document.body.classList.add('modal-lock');
  };

  const unlockBody = () => {
    if (modal.classList.contains('open')) return;
    document.body.classList.remove('modal-lock');
    document.body.classList.remove('modal-blur');
    document.body.style.removeProperty('--scrollbar-comp');
  };

  const openModal = () => {
    lockBody();
    document.body.classList.add('modal-blur');
    requestAnimationFrame(() => {
      modal.classList.add('open');
    });
  };

  // Triggers
  const triggers = document.querySelectorAll('#ctaApple, #ctaGoogle');
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  // Close
  const closeModal = () => {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-blur');

    const onTransitionEnd = (e) => {
      if (e.target === modal && e.propertyName === 'opacity') {
        modal.removeEventListener('transitionend', onTransitionEnd);
        unlockBody();
      }
    };

    modal.addEventListener('transitionend', onTransitionEnd);
    unlockTimeoutId = setTimeout(() => {
      modal.removeEventListener('transitionend', onTransitionEnd);
      unlockBody();
    }, 400);
  };

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ─────────────────────────────────────────────────────────
   SMOOTH SCROLL — for anchor links
   ───────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────
   THEME TOGGLE — light / dark mode switching
   ───────────────────────────────────────────────────────── */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Check saved theme or preference, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
