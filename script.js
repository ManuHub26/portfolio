const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

function highlightActiveSection() {
  let active = null;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 160) active = section;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    active = sections[sections.length - 1];
  }
  navLinks.forEach(link => {
    const current = !!active && link.hash === `#${active.id}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', highlightActiveSection, { passive: true });
highlightActiveSection();

function setMenu(open) {
  navLinksEl.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
hamburger.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    hamburger.focus();
  }
});
document.addEventListener('click', event => {
  if (!navbar.contains(event.target)) setMenu(false);
});
window.matchMedia('(max-width: 700px)').addEventListener('change', () => setMenu(false));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
document.getElementById('year').textContent = new Date().getFullYear();
