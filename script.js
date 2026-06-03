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
  link.addEventListener('click', () => {
    if (body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});
