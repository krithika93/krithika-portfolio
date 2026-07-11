# Deploying rkrithika.me — GitHub → DigitalOcean App Platform → Cloudflare

The portfolio is a fully static Vite build (verified: no backend calls except the
Living Profile widget fetching `https://living.rkrithika.me/living-profile` at runtime).
Hosting = DO App Platform **static site** (free tier) + Cloudflare DNS/CDN in front.

---

## Step 1 — Push the repo to GitHub (on your Mac)

1. Create an empty repo on github.com (e.g. `krithika-portfolio`). Private is fine.
   Do NOT initialize it with a README (the repo already has history).
2. In Terminal:

```bash
cd ~/Downloads/ReplitExport-KrithikaRajendr/Krithika-Portfolio
git add package.json DEPLOY.md
git commit -m "Prepare for DigitalOcean deployment (engines pin + deploy runbook)"
git remote add origin https://github.com/<YOUR-USERNAME>/krithika-portfolio.git
git push -u origin main
```

The old Replit remotes (`gitsafe-backup`, `subrepl-*`) can stay; they're just dead entries.
Optional cleanup: `git remote remove gitsafe-backup` etc.

## Step 2 — Create the App Platform static site

1. DigitalOcean → **Create → App Platform** (Apps).
2. Source: **GitHub** → authorize → pick `krithika-portfolio`, branch `main`,
   autodeploy ON.
3. DO will detect Node. Edit the detected component and change its **Resource Type
   to "Static Site"** (important — otherwise it tries to run a web service).
4. Static site settings:
   - **Build command:**
     `pnpm --filter @workspace/portfolio run build`
   - **Output directory:** `artifacts/portfolio/dist/public`
   - **Catchall document:** `index.html`   ← this is the SPA rewrite; without it
     deep links like /case-study/visual-metonymy 404 on refresh.
5. Environment variables (build-time, on the static site component):

   | Key | Value | Why |
   |---|---|---|
   | `PORT` | `21113` | vite.config.ts throws without it (legacy Replit requirement) |
   | `BASE_PATH` | `/` | same — required by vite.config.ts |
   | `VITE_SITE_URL` | `https://rkrithika.me` | canonical URLs + og:image links |
   | `VITE_LIVING_PROFILE_URL` | `https://living.rkrithika.me/living-profile` | Living Profile widget endpoint |
   | `VITE_GITHUB_URL` | your GitHub profile URL | landing CTA + footer (falls back to `#` if unset) |
   | `VITE_LINKEDIN_URL` | your LinkedIn URL | footer (hidden if unset) |
   | `VITE_CONTACT_EMAIL` | your contact email | footer mailto (hidden if unset) |

6. Plan: the free **Starter / static site** tier (3 static sites free per account).
7. Create. First build takes a few minutes → you get `https://<app-name>.ondigitalocean.app`.
8. Smoke-test that URL: `/`, `/case-study/visual-metonymy`, `/profile`, `/builder`,
   `/vision`, and a garbage path (should show the styled 404).

## Step 3 — Point rkrithika.me at it via Cloudflare

⚠️ This is the step that changes the live domain. Check what `rkrithika.me`'s
apex record currently points to before replacing it.

1. DO app → **Settings → Domains → Add Domain** → `rkrithika.me` →
   choose **"You manage your domain"**. DO shows the CNAME target
   (your `<app-name>.ondigitalocean.app`). Repeat for `www.rkrithika.me` if wanted.
2. Cloudflare dashboard → `rkrithika.me` zone → **DNS**:
   - Apex: `CNAME  @  <app-name>.ondigitalocean.app` — start **DNS only (grey cloud)**.
     (Cloudflare auto-flattens CNAME at the apex.)
   - `CNAME  www  <app-name>.ondigitalocean.app` — DNS only for now.
   - **Do not touch** the `living` or `learn` records.
3. Wait for the DO Domains panel to show the domain **Active** (DO issues the
   Let's Encrypt cert — needs the grey-cloud state to validate, usually < 15 min).
4. Flip both records to **Proxied (orange cloud)**, then Cloudflare →
   **SSL/TLS → Overview → Full (strict)**.
5. Optional: SSL/TLS → Edge Certificates → enable "Always Use HTTPS".

## Step 4 — Verify live

- All 5 routes + 404 render on https://rkrithika.me (hard-refresh deep links).
- Dark-mode toggle persists; KaTeX equation renders in case study §4.
- Diagram lightbox opens (case study §5); `/profile` NodeRAG image loads.
- View-source: `og:url` / canonical point at rkrithika.me (VITE_SITE_URL took).
- `/profile` Living Profile widget loads (or shows its inline error if the
  endpoint is down — that's the widget's designed behavior).
- `curl -sI https://rkrithika.me | grep -i server` → shows cloudflare (proxy on).

## Future deploys

Push to `main` → App Platform rebuilds automatically. Nothing else to do.
