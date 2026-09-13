# Hira Baig — Portfolio

Personal portfolio site, built with [Astro](https://astro.build) + React islands + Tailwind CSS v4.
Static, no backend — the contact form runs on Netlify Forms.

## Stack

- **Astro** (static output) for near-zero-JS pages and strong SEO/Core Web Vitals by default
- **React** islands (`client:only`) for the interactive 3D hero only — every other page ships no framework JS
- **Tailwind CSS v4** for styling, with a custom dusk/alpenglow design system defined in `src/styles/global.css`
- **three.js / react-three-fiber** for the hero's layered mountain-silhouette scene

## Commands

| Command           | Action                                      |
| ------------------ | -------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start the local dev server (localhost:4321) |
| `npm run build`     | Build the production site to `./dist/`      |
| `npm run preview`   | Preview the production build locally         |

## Structure

- `src/pages/` — one file per route (Home, About, Projects, Research, Blogs, Contact)
- `src/components/` — shared Astro components (`Nav`, `Footer`, `BaseHead`) and the `Hero3D` React island
- `src/data/` — content (profile, skills, projects, research, education, blogs) kept separate from markup
- `src/layouts/Layout.astro` — base layout: SEO meta, nav/footer, scroll-reveal script

## Deployment

Deployed on Netlify (`netlify.toml` in the repo root). Build command `npm run build`, publish directory `dist`.
