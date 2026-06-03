// script.js
// Add interactive behavior here.

console.log('Portfolio script loaded successfully.');

const hamburger = document.querySelector('.hamburger');
const body = document.body;
const navLinks = document.querySelectorAll('nav a');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // smooth scroll to section and close mobile nav when open
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }

    if (body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});
