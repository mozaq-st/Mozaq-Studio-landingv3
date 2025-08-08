# Mozaq Studio — Next.js Landing

Next.js 14 + App Router + Tailwind, ready for Netlify.

## Local dev

```bash
npm i
npm run dev
```

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify: *Add new site* → *Import an existing project*.
3. Pick the repo. Use build command `npm run build` and publish directory `.next`.
4. Ensure plugin `@netlify/plugin-nextjs` is enabled (provided in `netlify.toml`).

## Theme

- Permanent dropdown (System / Dark Luxe / Editorial Luxe / Creative Luxe)
- `System` follows device theme automatically.
- Fonts loaded with `next/font` in `app/layout.tsx`:
  - Display: Newsreader
  - Body: Inter

## Replace placeholders

- Portfolio CTA → Behance: https://www.behance.net/moazzan (already wired)
- WhatsApp CTA with prefilled text (edit in `app/page.tsx`)
- Swap project thumbnails in the grid with real images (use `/public` and `<Image>` later).

## Tailwind

Utilities already configured. Add your components in `components/` if you split files later.

---

© Mozaq Studio


## Netlify TypeScript note
Netlify sometimes requires explicit `@types/react` and `@types/node`. These are now included in `devDependencies`.
