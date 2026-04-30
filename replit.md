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
- `/case-study/visual-metonymy` — Visual Metonymy case study restructured into 5 top-level sections with nested sticky TOC: (1) Executive Summary + Apple Angle callout, (2) Problem Definition & Landscape Analysis (problem cards + Failure callout + Definitions + Landscape comparison table), (3) Proposed Solutions & Theoretical Framework (Core Pillars + Decision callout + Key Concepts Integrated + Theoretical Framework), (4) SFT/RL Workflow Stages (Stage 0/1/2 What·Why·How cards + 4 Decision/Constraint callouts + KaTeX dense reward equation + AWAD/Time-vs-Age paragraph + Principal Decisions + Key Concepts Under Study), (5) Architectural Diagram & Evaluation (DiagramFrame with fullscreen lightbox + cream/green legend + collapsed Mermaid `<details>` block + Evaluation Metrics with 3 Failure callouts + Aspects Yet to be Finalized). Dynamic "Last reviewed" date from build timestamp.
- `/builder` — Builder's Mindset: 3-column competency grid + callout block quote
- `/vision` — Vision & Future Work (clean page, no widget)
- `/profile` — Profile page hosting the Living Profile widget (fetches `VITE_LIVING_PROFILE_URL` on mount; manual Refresh button; falls back to hardcoded `https://living.rkrithika.me/living-profile` if env var unset; shows loading state, error state, summary as markdown, and a collapsible `<details>` "Full profile" section)

**`{TODO}` markers (exact locations):**
1. `artifacts/portfolio/src/pages/case-study.tsx` Section 5 collapsed `<details>` block — `{TODO: paste Mermaid source}` (interactive Mermaid version of the architecture diagram)

**Environment variables (all optional — components gracefully hide when missing):**
- `VITE_GITHUB_URL` — GitHub profile URL; used in Landing CTA button and Case Study footer link
- `VITE_LINKEDIN_URL` — LinkedIn profile URL; used in global footer
- `VITE_CONTACT_EMAIL` — Contact email; used in global footer mailto link
- `VITE_LIVING_PROFILE_URL` — Full URL to the Living Profile JSON endpoint (e.g. `https://living.rkrithika.me/living-profile`); fetched on mount + on user-clicked Refresh by the Living Profile widget on /profile. If unset, the widget falls back to a hardcoded `https://living.rkrithika.me/living-profile`. Endpoint failures show an inline error message instead of hiding the widget.
- `VITE_DEEPTUTOR_URL` — **Deprecated.** Replaced by `VITE_LIVING_PROFILE_URL`. No code references this anymore; safe to remove from the Secrets UI.
- `VITE_SITE_URL` — (optional) Production base URL used for canonical links and og:url/og:image in PageHead; defaults to `https://krithikarajendran.replit.app`

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
│   ├── opengraph.jpg                         # Default og:image (1200×630) used by PageHead
│   └── diagrams/
│       └── vimet-architecture.png            # Architectural diagram (cream/green zones); referenced by DiagramFrame in case-study.tsx Section 5
└── src/
    ├── main.tsx                              # React root mount
    ├── App.tsx                               # HelmetProvider + ThemeProvider + WouterRouter
    ├── index.css                             # CSS variables + theme tokens (navy/blue/off-white)
    ├── types/
    │   └── globals.d.ts                      # declare const __BUILD_DATE__: string
    ├── components/
    │   ├── callout.tsx                       # Variant callout (apple-angle | decision | constraint | failure) with chip + 4px left border; used in case-study sections 1-5
    │   ├── callout-card.tsx                  # Legacy red-tinted failure mode card (kept for compatibility; case-study now uses callout.tsx with variant="failure")
    │   ├── diagram-frame.tsx                 # Wraps a diagram image with caption, fullscreen lightbox (radix Dialog), and Download PNG link; alt+caption required
    │   ├── footer.tsx                        # Global footer with links + "Built {buildDate}"
    │   ├── living-profile.tsx                # Living Profile widget: loading/error/refresh + summary + collapsible Full profile
    │   ├── math.tsx                          # KaTeX renderer (strict:true — full LaTeX faithfulness mode); used for the dense reward equation in case-study Section 4. throwOnError:false renders inline error nodes instead of crashing if invalid TeX is ever introduced.
    │   ├── mermaid-diagram.tsx               # Stub component (returns null); placeholder for future client-side mermaid.render() integration
    │   ├── nav.tsx                           # Top navigation bar
    │   ├── page-head.tsx                     # react-helmet-async per-page SEO: title, description,
    │   │                                     #   og:title, og:description, og:url, og:image, canonical,
    │   │                                     #   twitter:card, twitter:title, twitter:description, twitter:image
    │   ├── theme-provider.tsx                # Custom ThemeProvider (localStorage + documentElement class)
    │   ├── theme-toggle.tsx                  # Light/dark mode toggle button
    │   ├── timeline.tsx                      # Horizontal workflow timeline with HoverCard tooltips (no longer used by case-study; available for future use)
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
        ├── profile.tsx                       # /profile  (Living Profile widget)
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
- `katex` (+ `@types/katex` dev) — math rendering for the dense reward equation in case-study Section 4
- `@radix-ui/react-dialog` — fullscreen lightbox in DiagramFrame
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
