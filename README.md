# Osman Sarper Kucuk – Personal Website

Minimal dark-mode personal homepage.

Clean, fast, text-focused design inspired by [Vegard Stikbakke](https://www.vegardstikbakke.com/).

Live at: https://osk.cool/

## Features

- Pure static site (Vite + TypeScript)
- Dark theme only
- Responsive & mobile-friendly
- System fonts for fast loading
- Simple navigation: Home · Posts · GitHub · X
- Contact info with direct email and X link
- **Blog system**: Drop `.md` files in `/posts`, run `npm run build`, posts auto-generate

## Blog System

Add posts by creating markdown files in `/posts/` with frontmatter:

```yaml
---
title: Your Post Title
date: 2026-03-18
tags: #tag1 #tag2
---
```

Run `npm run build` to:
- Convert markdown → HTML
- Generate post pages at `/posts/slug.html`
- Update post listing at `/posts` with tags and dates

## Tech Stack

- **Build tool**: Vite
- **Language**: TypeScript
- **Styling**: Plain CSS (variables + modern syntax)
- **Deployment**: Google Cloud App Engine (static)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server @ "http://localhost:5173"
npm run dev

# Build for production (creates /dist folder)
npm run build

# Preview production build locally
npm run preview
```

## Deployment (Google Cloud App Engine)

Install Google Cloud SDK if not already installed
Authenticate and set your project:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

#build and deploy:
npm run build
gcloud app deploy
```

Current app.yaml is configured for static serving of the dist/ folder.