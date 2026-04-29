# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portfolio (`artifacts/portfolio/`) — preview path `/`

Personal research portfolio for Krithika Rajendran. React 19 + Vite 7 SPA.

**Framework note:** Originally specified as Next.js 14 App Router. Implemented as React + Vite SPA because the monorepo uses Vite infrastructure; no Next.js support exists. Env vars use `VITE_*` prefix (not `NEXT_PUBLIC_*`). Per-page meta tags use `react-helmet-async` (not `generateMetadata`).

**Pages:**
- `/` — Landing: hero, 3 pillar cards (Researcher / Engineer / Builder), 4 focus tags, proof line, 2 CTAs
- `/case-study/visual-metonymy` — Visual Metonymy case study with sticky 12-item TOC, definition cards, 3-step workflow timeline (hover tooltips), 3-row landscape comparison table, red-tinted failure mode callout cards, Open Question badges, dynamic "Last reviewed" date from build timestamp
- `/builder` — Builder's Mindset: 3-column competency grid + callout block quote
- `/vision` — Vision & Future Work + Living Profile widget (polls `VITE_DEEPTUTOR_URL/living-profile` every 30s; silently hidden if env var missing or endpoint not reachable)
- `/notes` — Placeholder page

**`{TODO}` markers (exact locations):**
1. `artifacts/portfolio/src/pages/notes.tsx` line 19 — `{TODO: needs source}` (no notes content was supplied)
2. `artifacts/portfolio/src/pages/case-study.tsx` "Proposed Solutions" section — `{TODO: architecture diagram}` (no diagram asset was supplied)

**Environment variables (all optional — components gracefully hide when missing):**
- `VITE_GITHUB_URL` — GitHub profile URL; used in Landing CTA button and Case Study footer link
- `VITE_LINKEDIN_URL` — LinkedIn profile URL; used in global footer
- `VITE_CONTACT_EMAIL` — Contact email; used in global footer mailto link
- `VITE_DEEPTUTOR_URL` — DeepTutor service base URL; used by Living Profile widget on /vision

**Complete file inventory (every file created for the portfolio artifact):**

```
artifacts/portfolio/
├── .replit-artifact/
│   └── artifact.toml                         # Artifact config (previewPath="/", port=21113)
├── components.json                           # shadcn/ui config
├── index.html                                # SPA entry point
├── package.json
├── tsconfig.json
├── vite.config.ts                            # Injects __BUILD_DATE__ via define; PORT+BASE_PATH required
├── public/
│   ├── favicon.svg
│   └── opengraph.jpg                         # Default og:image (1200×630) used by PageHead
└── src/
    ├── main.tsx                              # React root mount
    ├── App.tsx                               # HelmetProvider + ThemeProvider + WouterRouter
    ├── index.css                             # CSS variables + theme tokens (navy/blue/off-white)
    ├── types/
    │   └── globals.d.ts                      # declare const __BUILD_DATE__: string
    ├── components/
    │   ├── callout-card.tsx                  # Red-tinted failure mode card
    │   ├── footer.tsx                        # Global footer with links + "Built {buildDate}"
    │   ├── living-profile.tsx                # Polling widget for DeepTutor /living-profile JSON
    │   ├── nav.tsx                           # Top navigation bar
    │   ├── page-head.tsx                     # react-helmet-async per-page SEO: title, description,
    │   │                                     #   og:title, og:description, og:url, og:image, canonical,
    │   │                                     #   twitter:card, twitter:title, twitter:description, twitter:image
    │   ├── theme-provider.tsx                # Custom ThemeProvider (localStorage + documentElement class)
    │   ├── theme-toggle.tsx                  # Light/dark mode toggle button
    │   ├── timeline.tsx                      # Horizontal workflow timeline with HoverCard tooltips
    │   └── ui/
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── hover-card.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       └── tooltip.tsx
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   └── utils.ts
    └── pages/
        ├── builder.tsx                       # /builder
        ├── case-study.tsx                    # /case-study/visual-metonymy
        ├── landing.tsx                       # /
        ├── not-found.tsx                     # 404 fallback
        ├── notes.tsx                         # /notes  {TODO: needs source}
        └── vision.tsx                        # /vision
```

**Key dependencies:**
- `react`, `react-dom` v19
- `vite` v7, `@vitejs/plugin-react`, `@tailwindcss/vite`
- `tailwindcss` v4
- `wouter` — SPA routing
- `framer-motion` — fade-in animations
- `react-helmet-async` — per-page SEO meta tags
- `react-markdown`, `remark-gfm` — markdown rendering in Living Profile
- `@tanstack/react-query`
- shadcn/ui subset (badge, button, card, hover-card, toast/toaster, tooltip)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
