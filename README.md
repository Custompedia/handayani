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

The site runs on Cloudflare Workers via [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`). Config lives in `wrangler.jsonc` and `open-next.config.ts`.

```bash
pnpm preview   # build + run the production Worker locally (http://localhost:8787)
pnpm deploy    # build + deploy to Cloudflare (run `pnpm wrangler login` first)
```

For Git-based deploys (Workers Builds), set the build command to `pnpm opennextjs-cloudflare build` and the deploy command to `pnpm opennextjs-cloudflare deploy`.

Notes:

- The page is fully prerendered, so the incremental cache is served from Workers static assets (no R2 bucket needed). If you add ISR/revalidation later, switch to the R2 cache — see the [caching docs](https://opennext.js.org/cloudflare/caching).
- `patches/@opennextjs__cloudflare@1.20.9.patch` makes OpenNext inline `.next/server/preview-props.json`, which Next.js 16.4 loads at runtime. Drop the patch once upstream handles it.
- Run `pnpm cf-typegen` after changing bindings in `wrangler.jsonc`.
