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
Personal research portfolio for Krithika Rajendran. React + Vite SPA.

**Pages:**
- `/` — Landing: hero, pillar cards, focus tags
- `/case-study/visual-metonymy` — Visual Metonymy case study with sticky TOC, timeline, comparison table, callout cards
- `/builder` — Builder's Mindset competency grid
- `/vision` — Vision & Future Work + Living Profile widget
- `/notes` — Placeholder page

**Tech stack:** React 19, Vite 7, TailwindCSS v4, shadcn/ui, Framer Motion, wouter, react-markdown

**Environment variables (VITE_ prefix required for Vite client-side access):**
- `VITE_GITHUB_URL` — GitHub profile URL
- `VITE_LINKEDIN_URL` — LinkedIn profile URL
- `VITE_CONTACT_EMAIL` — Contact email address
- `VITE_DEEPTUTOR_URL` — DeepTutor service URL (for Living Profile widget; hidden if missing)

**TODO markers in the app:**
1. `/notes` page — `{TODO: needs source}` placeholder (no notes content was provided)
2. Case study "Proposed Solutions" section — `{TODO: architecture diagram}` placeholder

**Key files:**
- `artifacts/portfolio/src/pages/` — All 5 page components
- `artifacts/portfolio/src/components/` — Nav, Footer, Timeline, CalloutCard, LivingProfile, ThemeProvider, ThemeToggle
- `artifacts/portfolio/src/index.css` — CSS variables, theme tokens

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
