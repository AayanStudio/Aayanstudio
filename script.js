// ── HEADER SCROLL SHADOW ──────────────────────────────
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── ACTIVE NAV LINK ───────────────────────────────────
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── HAMBURGER MENU ────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navMenu.classList.add('active');
  menuBtn.classList.add('open');
  navOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('active');
  menuBtn.classList.remove('open');
  navOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  // keyboard accessibility
  menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navMenu.classList.contains('active') ? closeMenu() : openMenu();
    }
  });
}

if (navOverlay) navOverlay.addEventListener('click', closeMenu);

// Close menu when a link is clicked
navLinks.forEach(link => link.addEventListener('click', closeMenu));

// ── TYPEWRITER EFFECT ─────────────────────────────────
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const words = ['Frontend Developer', 'UI Designer', 'Web Creator'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = words[wordIndex];
    typewriterEl.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex > current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// ── SCROLL REVEAL (Intersection Observer) ────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current < target) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-num[data-target]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

// ── EMAILJS CONTACT FORM ──────────────────────────────
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    emailjs.sendForm('service_mj7ctr1', 'template_gpmo9nk', this)
      .then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        btn.style.background = '#22c55e';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed';
        btn.style.background = '#ef4444';
        console.error(error);
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  });
}