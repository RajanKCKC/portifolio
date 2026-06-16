# Rajan KC — Portfolio

A clean, responsive personal portfolio website showcasing projects, skills, education, and contact information.

![Portfolio screenshot](pic.jpg)

**Try it:** Open `index.html` in your browser or run a simple local server (see Quick start).

---

## Quick start

Open the site locally with one command (recommended):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser. Alternatively, just double-click `index.html` to open the static file.

## What it is

A small, static portfolio built with plain HTML, CSS, and JavaScript that:

- Displays a hero/profile section with a short tagline
- Shows skills with local icon assets
- Fetches and lists public GitHub repositories for the configured username
- Includes an education section and a contact area with email and GitHub links
- Supports a dark mode toggle that persists with `localStorage`

## Features

- Responsive layout (desktop + mobile)
- Dark mode toggle (persisted)
- Smooth scrolling navigation
- Dynamic projects section that fetches public repos from GitHub
- Simple, local SVG/PNG icons for skills
- Contact cards and education entries

## How to run it locally

Requirements: a modern browser. No build tools required.

1. Clone or download this repository.
2. From the repo root, run a local static server (example):

```bash
python -m http.server 8000
```

3. Open `http://localhost:8000`.

Notes:
- If you want a different GitHub username, edit `GITHUB_USERNAME` inside `script.js`.
- The projects UI depends on GitHub's public API and may be rate-limited for unauthenticated requests.

## How it works

The site is intentionally lightweight and client-side only. Key decisions:

- GitHub data: the projects section fetches public repository metadata using the GitHub REST API (`/users/:username/repos`) from `script.js`. This keeps the site static while showing live repo data.
- Icons: skill icons live in the `icons/` folder as small SVG/PNG files so the page loads without external CDN dependencies.
- Dark mode: toggled in the UI and persisted to `localStorage` so preferences survive reloads.

## Customization

- Replace `pic.jpg` with your preferred hero image.
- Edit `index.html` to add or remove skills, education, or contact entries.
- Update styles in `style.css` for different colors, spacing, or typography.

## Common pitfalls

- If the projects list is empty, confirm the GitHub username in `script.js` and that the repositories are public.
- If the GitHub API fails due to rate limits, consider using a server-side proxy or authenticated requests.

