# Blogweb — AEC Group Product Blog & Catalogue

Product catalogue and blog website for **Anhui Eastern Communication Imp. & Exp. Co., Ltd. (AEC GROUP)** — BOPP, BOPET, CPP, POF and other packaging films.

- **Live site:** https://blog.boppfilmsale.com
- **Preview:** https://preview.blogweb-43o.pages.dev (latest preview deployment)
- **Products:** 167, bilingual (English / Chinese)

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **Tailwind CSS 3** + `next-intl`
- **Cloudflare D1** (`blogweb-db`) — product data, visitors, page content
- **Cloudflare R2** (`blogweb-images`) — product images
- **@cloudflare/next-on-pages** — builds the app for Cloudflare Pages

## Features

- Product catalogue: pagination (20 per page), 12 product series + category filtering, search
- Product detail pages: image gallery, specifications, features and applications lists
- Bilingual content (English / Chinese)
- Admin panel at `/admin` — product management, bulk import, visitor statistics
- Contact / inquiry form
- JSON API: `GET /api/products`, `GET /api/products/[id]`
- SEO meta tags

## Project structure

```
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   ├── products/         # Catalogue + product detail pages
│   │   ├── admin/            # Admin panel
│   │   └── api/              # API routes (products, upload, images, visitors, …)
│   ├── components/           # UI components (layout, home, products)
│   └── lib/                  # D1 access (db.ts), Cloudflare env, R2 URL helpers
├── scripts/
│   ├── seed-d1.mjs           # Seed D1 from products_mapped.json
│   └── upload-images-to-r2.mjs  # Upload product images to R2
├── d1-schema.sql             # D1 table definitions (products, visitors)
├── wrangler.toml             # Pages project config + D1/R2 bindings
├── .npmrc                    # legacy-peer-deps=true (required for install)
└── products_mapped.json      # Base catalogue data used for seeding
```

## Getting started

### Prerequisites

- Node.js 18+
- npm
- `wrangler` (for D1 / R2 work)

### Local development

```bash
npm install        # .npmrc sets legacy-peer-deps=true; plain install otherwise fails
npm run dev        # http://localhost:3000
```

Local data (D1 runs locally through Wrangler):

```bash
npx wrangler d1 execute blogweb-db --local --file=d1-schema.sql
npm run seed:d1    # seeds from products_mapped.json in the repo root
```

### Build

```bash
npm run build      # next build
```

## Deployment — Cloudflare Pages (direct upload)

This repo deploys **only** to Cloudflare Pages. There is no Vercel deployment:
the old Vercel deployment (`blogweb-green.vercel.app`) stopped working when its
free quota was exhausted and is not recoverable, so all Vercel configuration
(`vercel.json`, the Vercel deploy workflow) has been removed from this repo.

Build for Pages, then deploy the static output directory:

```bash
npx @cloudflare/next-on-pages
# Preview:
npx wrangler pages deploy .vercel/output/static --project-name blogweb --branch preview
# Production:
npx wrangler pages deploy .vercel/output/static --project-name blogweb
```

Deploy **`.vercel/output/static`**, not `.vercel/output` itself — deploying the
parent directory uploads it verbatim, attaches no Function, and the site 404s.

### Bindings (Pages dashboard → project `blogweb` → Settings → Bindings)

Set these for **both Production and Preview**:

| Type | Variable / binding | Value |
| --- | --- | --- |
| D1 database | `DB` | `blogweb-db` |
| R2 bucket | `IMAGES` | `blogweb-images` |
| Variable | `R2_PUBLIC_URL` | public URL of the `blogweb-images` bucket |
| Compatibility flag | — | `nodejs_compat` |

### Admin password

Set `ADMIN_PASSWORD` as an **environment variable in the Pages dashboard**
(same place as the bindings, Production and Preview). The code has **no
default password**: until this variable is set, `/admin/login` cannot log in.
Never commit a password to this repo.

## Data

- **Product copy lives in D1** (`blogweb-db`, 167 products). The repo's
  `products_mapped.json` is the base catalogue used for seeding; the enriched
  descriptions shown on the live site are stored in D1.
- **Product images live in R2** (`blogweb-images`). To upload: `npm run upload:images`.
- The admin panel's page-content edits are kept in memory only on this
  deployment (not persisted to D1).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License.
