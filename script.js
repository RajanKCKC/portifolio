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

const typedText = document.getElementById('typed-text');
const taglinePhrases = [
  'Web developer from Dang, Nepal.',
  'Building clean web experiences.',
  'Learning every day through code.',
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeTagline() {
  if (!typedText) return;

  const phrase = taglinePhrases[currentPhrase];
  if (!isDeleting) {
    typedText.textContent = phrase.slice(0, currentChar + 1);
    currentChar += 1;
    if (currentChar === phrase.length) {
      isDeleting = true;
      setTimeout(typeTagline, 1400);
      return;
    }
  } else {
    typedText.textContent = phrase.slice(0, currentChar - 1);
    currentChar -= 1;
    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % taglinePhrases.length;
    }
  }

  const delay = isDeleting ? 50 : 120;
  setTimeout(typeTagline, delay);
}

// Fetch GitHub repositories
const GITHUB_USERNAME = 'RajanKCKC';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function fetchGitHubRepos() {
  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const repos = await response.json();
    displayProjects(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    const container = document.getElementById('projects-container');
    if (container) {
      container.innerHTML = '<p style="color: var(--muted);">Unable to load projects. Please try again later.</p>';
    }
  }
}

function displayProjects(repos) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (repos.length === 0) {
    container.innerHTML = '<p style="color: var(--muted);">No public repositories found.</p>';
    return;
  }

  container.innerHTML = repos.map(repo => `
    <article>
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description provided.'}</p>
      <div class="project-meta">
        <span class="language">${repo.language || 'N/A'}</span>
        <span class="stars">⭐ ${repo.stargazers_count}</span>
      </div>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (typedText) {
    typeTagline();
  }
  fetchGitHubRepos();
});
