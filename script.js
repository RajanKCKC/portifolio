// script.js
// Add interactive behavior here.

console.log('Portfolio script loaded successfully.');

const hamburger = document.querySelector('.hamburger');
const body = document.body;
const hashLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

hashLinks.forEach(link => {
  link.addEventListener('click', (e) => {
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

if ('IntersectionObserver' in window && sections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sectionId = entry.target.id;
        hashLinks.forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${sectionId}`);
        });
      });
    },
    {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark');
  }

  darkModeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', String(isCurrentlyDark));
  });
}
