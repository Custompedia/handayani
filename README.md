This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare

The site is a static export (`output: "export"` in `next.config.ts`): `next build` writes plain HTML/CSS/JS to `out/`. Each branch is served by its own Cloudflare project, so the two never mix.

### Branches & domains

| Branch            | Cloudflare project                                             | Domains                                                                       | Google             |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------ |
| `main`            | Worker `handayani` (Workers Builds)                            | https://handayanigorden.com, https://www.handayanigorden.com                  | indexed            |
| `handayanigorden` | Pages `handayani-gorden` (subdomain `handayani-bz2.pages.dev`) | https://gordensemarang.custompedia.id, https://handayanigorden.custompedia.id | `noindex` (review) |

The two branches now carry different designs, so do not merge one into the other wholesale; port the specific changes the client approves.

`src/app/layout.tsx` emits `noindex, nofollow` whenever the build runs on Cloudflare Pages (Pages sets `CF_PAGES=1`), and `index, follow` everywhere else. This keeps the review domains out of Google even if the branches are merged.

### Worker `handayani` (`main`)

Workers Builds settings (Workers & Pages > `handayani`, the Worker, not the Pages project): production branch `main`, build command `pnpm run build`, deploy command `npx wrangler deploy`, **Builds for Preview branches off**. The deploy settings live in `wrangler.jsonc`, which uploads `out/` as static assets with no Worker script. Without that file `wrangler deploy` tries to set the app up for OpenNext and the build fails.

### Pages `handayani-gorden` (`handayanigorden`)

Pages build settings: production branch `handayanigorden`, build command `npx next build`, output directory `out`.

Because `handayanigorden` is the production branch, every custom domain must point at the project itself. In the `custompedia.id` DNS, each CNAME (`gordensemarang`, `handayanigorden`) targets `handayani-bz2.pages.dev` and stays **Proxied**. Do not target a branch alias such as `handayanigorden.handayani-bz2.pages.dev`: production deploys do not update branch aliases, so the domain would freeze on an old build.

Because there is no server, features that need one (image optimization, Cache Components/PPR, ISR, Server Actions, route handlers that read the request) are not available. Images are served as-is, so keep them pre-sized WebP. `public/_headers` sets the cache headers that both Pages and the Worker apply.
