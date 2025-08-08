# Mozaq Studio — Next.js + Decap CMS

- Next.js 14 (App Router) + Tailwind
- Decap CMS (Git Gateway) at `/admin`
- Netlify ready

## Run

```bash
npm i
npm run dev
```

## Deploy

Connect repo to Netlify.
- Build command: `npm run build`
- Publish dir: `.next`
- Plugin: `@netlify/plugin-nextjs` (via `netlify.toml`)

## Enable visual editing

1) Netlify → **Identity** → Enable (Invite only)
2) Netlify → **Site settings → Identity → Services** → Enable **Git Gateway**
3) Invite your email, accept the invite
4) Visit `/admin` to log in

If the invite opens your site but no login appears, this build includes the **Netlify Identity widget on `/admin`** to capture tokens. Try the invite again.
