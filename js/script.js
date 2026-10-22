'use strict';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const i18n = window.portfolioI18n;
i18n.init();

function initThemeToggle() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const update = () => {
    const dark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', i18n.t(dark ? 'theme.light' : 'theme.dark'));
    button.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--bg').trim();
  };
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (error) { /* Storage is optional. */ }
    update();
  });
  document.addEventListener('languagechange', update);
  update();
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return 'greeting.morning';
  if (hour >= 12 && hour < 17) return 'greeting.afternoon';
  if (hour >= 17 && hour < 22) return 'greeting.evening';
  return 'greeting.night';
}

function initGreeting() {
  const update = () => {
    document.getElementById('greeting').textContent = i18n.t(getGreeting(new Date().getHours()));
    ['year', 'hero-year'].forEach((id) => {
      document.getElementById(id).textContent = i18n.number(new Date().getFullYear());
    });
  };
  document.addEventListener('languagechange', update);
  update();
}

function initMotion() {
  const button = document.getElementById('motion-toggle');
  const label = document.getElementById('motion-label');
  const hero = document.querySelector('.hero');
  let paused = false;
  try { paused = localStorage.getItem('motion-paused') === 'true'; } catch (error) { /* Optional preference. */ }
  const update = () => {
    const reduced = motionPreference.matches;
    const stopped = paused || reduced;
    document.documentElement.classList.toggle('motion-paused', stopped);
    button.setAttribute('aria-pressed', String(stopped));
    button.disabled = reduced;
    label.textContent = i18n.t(reduced ? 'motion.reduced' : paused ? 'motion.play' : 'motion.pause');
    button.querySelector('.motion-toggle__icon').textContent = stopped ? '▷' : 'Ⅱ';
  };
  button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('motion-paused', String(paused)); } catch (error) { /* Optional preference. */ }
    update();
  });
  motionPreference.addEventListener('change', update);
  document.addEventListener('languagechange', update);
  update();

  // Compositor animations stop when the atmosphere leaves the viewport.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => hero.classList.toggle('is-offscreen', !entry.isIntersecting)).observe(hero);
  }
}

function initScrollReveal() {
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach((item) => {
    // Content is visible by default, including when JavaScript is unavailable.
    item.classList.add('is-pending');
    observer.observe(item);
  });
  document.addEventListener('focusin', (event) => {
    const item = event.target.closest('.reveal');
    if (item) {
      item.classList.remove('is-pending');
      observer.unobserve(item);
    }
  });
}

function syncScrollLock() {
  document.body.classList.toggle('no-scroll', Boolean(document.querySelector('dialog[open]')));
}

function initHeader() {
  const header = document.querySelector('.site-header');
  let scheduled = false;
  const update = () => {
    const behind = document.elementFromPoint(window.innerWidth / 2, 48);
    const dark = behind && behind.closest('.hero, .skills-section, .portfolio-visual');
    header.classList.toggle('is-on-paper', !dark);
    scheduled = false;
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('languagechange', schedule);
  update();
}

function initMobileMenu() {
  const dialog = document.getElementById('mobile-menu');
  const trigger = document.getElementById('menu-toggle');
  if (typeof dialog.showModal !== 'function') return;
  document.documentElement.classList.add('menu-ready');
  trigger.addEventListener('click', () => {
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    syncScrollLock();
  });
  document.getElementById('menu-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    syncScrollLock();
  });
  dialog.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      dialog.close();
      syncScrollLock();
      // Move keyboard focus to the destination, not back to the menu toggle.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: motionPreference.matches ? 'instant' : 'smooth' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', (event) => {
    if (event.matches && dialog.open) dialog.close();
  });
}

const mizanytiSlides = [
  { src: 'assets/images/mizanyti-overview-en.jpg' },
  { src: 'assets/images/mizanyti-activity-en.jpg' },
  { src: 'assets/images/mizanyti-insights-en.jpg' },
  { src: 'assets/images/mizanyti-plan-en.jpg' },
  { src: 'assets/images/mizanyti-overview-ar.jpg' },
  { src: 'assets/images/mizanyti-overview-ar-dark.jpg' },
  { src: 'assets/images/mizanyti-activity-ar-dark.jpg' }
];

function initGallery() {
  const dialog = document.getElementById('gallery');
  if (typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('gallery-image');
  const caption = document.getElementById('gallery-caption');
  const counter = document.getElementById('gallery-counter');
  const figure = dialog.querySelector('.lightbox__figure');
  let current = 0;

  function renderLabels() {
    image.alt = i18n.t(`gallery.alt${current}`);
    caption.textContent = i18n.t(`gallery.caption${current}`);
    counter.textContent = i18n.t('gallery.counter', { current: i18n.number(current + 1), total: i18n.number(mizanytiSlides.length) });
    document.getElementById('gallery-prev').textContent = i18n.language === 'ar' ? '→' : '←';
    document.getElementById('gallery-next').textContent = i18n.language === 'ar' ? '←' : '→';
  }

  function show(index) {
    current = (index + mizanytiSlides.length) % mizanytiSlides.length;
    const slide = mizanytiSlides[current];
    image.src = slide.src;
    renderLabels();
    new Image().src = mizanytiSlides[(current + 1) % mizanytiSlides.length].src;
  }

  document.querySelectorAll('[data-gallery-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const picture = event.target.closest('[data-slide]');
      show(picture ? Number(picture.dataset.slide) : 0);
      dialog.showModal();
      syncScrollLock();
    });
  });
  document.getElementById('gallery-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('gallery-next').addEventListener('click', () => show(current + 1));
  dialog.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = i18n.language === 'ar' ? -1 : 1;
      show(current + (event.key === 'ArrowLeft' ? -1 : 1) * direction);
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  let touchStart = null;
  figure.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  figure.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    const direction = i18n.language === 'ar' ? -1 : 1;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1) * direction);
  });
  figure.addEventListener('touchcancel', () => { touchStart = null; });
  dialog.addEventListener('close', syncScrollLock);
  document.addEventListener('languagechange', renderLabels);
  renderLabels();
}

const validators = {
  name: (value) => value.length >= 2 ? '' : 'error.name',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'error.email',
  message: (value) => value.length >= 10 ? '' : 'error.message'
};

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const fieldNames = Object.keys(validators);
  let hasPreview = false;
  function renderPreview() {
    const name = document.getElementById('name').value.trim().split(/\s+/)[0];
    status.textContent = i18n.t('form.success', { name: `\u2068${name}\u2069` });
  }
  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const message = validators[fieldName](input.value.trim());
    document.getElementById(`${fieldName}-error`).textContent = message ? i18n.t(message) : '';
    input.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }
  fieldNames.forEach((fieldName) => {
    const input = document.getElementById(fieldName);
    input.addEventListener('blur', () => { if (input.value.trim()) validateField(fieldName); });
    input.addEventListener('input', () => {
      status.textContent = '';
      hasPreview = false;
      if (input.getAttribute('aria-invalid') === 'true') validateField(fieldName);
    });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    hasPreview = false;
    const results = fieldNames.map((fieldName) => ({ fieldName, valid: validateField(fieldName) }));
    const invalid = results.find((result) => !result.valid);
    if (invalid) {
      document.getElementById(invalid.fieldName).focus();
      return;
    }
    hasPreview = true;
    renderPreview();
  });
  document.addEventListener('languagechange', () => {
    fieldNames.forEach(fieldName => {
      if (document.getElementById(fieldName).getAttribute('aria-invalid') === 'true') validateField(fieldName);
    });
    if (hasPreview) renderPreview();
  });
  form.classList.add('is-ready');
}

initThemeToggle();
initGreeting();
initHeader();
initMotion();
initMobileMenu();
initGallery();
initContactForm();
initScrollReveal();
