// ── Navbar : effet au scroll ───────────────────────────────────────
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveSection();
}, { passive: true });

function highlightActiveSection() {
  let active = null;
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= 150) active = sec;
  });
  navLinks.forEach(link => link.classList.remove('active'));
  if (active) {
    const link = document.querySelector(`.nav-link[href="#${active.id}"]`);
    if (link) link.classList.add('active');
  }
}

// ── Hamburger menu ─────────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const navLinksEl  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── Typewriter ─────────────────────────────────────────────────────
const typeEl  = document.getElementById('typewriter');
const phrases = ['Développeur Full Stack', 'Développeur Back-end', 'Développeur Front-end', 'DevOps'];
let pIdx = 0, cIdx = 0, deleting = false;

(function type() {
  const phrase = phrases[pIdx];
  typeEl.textContent = deleting
    ? phrase.slice(0, --cIdx)
    : phrase.slice(0, ++cIdx);

  if (!deleting && cIdx === phrase.length) {
    setTimeout(() => { deleting = true; type(); }, 2200);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    pIdx = (pIdx + 1) % phrases.length;
  }
  setTimeout(type, deleting ? 55 : 85);
})();

// ── Scroll reveal via IntersectionObserver ─────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const idx = parseInt(el.dataset.delay ?? '0', 10);
    setTimeout(() => el.classList.add('visible'), idx * 120);
    observer.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});
