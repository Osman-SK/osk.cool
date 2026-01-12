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