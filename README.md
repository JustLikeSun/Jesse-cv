# Jesse Tremblay — CV (web + PDF)

Bilingual (FR/EN) résumé site built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui. Two CV versions (**general** vs **IT**) are selected **only via URL** (no public switcher). Use **Exporter en PDF** to open the print layout, then the browser’s **Print → Save as PDF**.

## Local development

```bash
npm install
npm run dev
```

## Add the headshot

Put a square-ish photo in `public/`. The site looks for (in order): `jesse-profile.png`, then `jesse.jpg`, `jesse.jpeg`, `jesse.png`, `jesse.webp`. If none load, a **JT** placeholder is shown.

## Deploy (Vercel)

1. Push the project to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`, output directory: `dist`.
4. Deploy. Optional: add a custom domain in Project → **Domains**.

## Deploy (Netlify)

1. **Add new site** → import repo, or drag-and-drop the `dist` folder after `npm run build`.
2. Build settings: build command `npm run build`, publish directory `dist`.

## CV version (URL only)

- **`v=gen`** — general / broad applications (default when `v` is omitted).
- **`v=tech`** — IT / tech-emphasis copy and extra skills block.

Examples:

- `https://your-domain.com/?v=gen`
- `https://your-domain.com/?lang=en&v=tech`
- Print: `/print?lang=fr&v=tech`

Legacy `?variant=general` / `?variant=it` still works for old bookmarks.
