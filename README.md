# Ceyhun Funnels

A **one-page funnel template** plus a set of **Claude skills** that turn a
client's offer into a finished, branded, ready-to-publish funnel — with no build
step and no framework.

Open the project in **Claude Code**, run two skills, and you get a client-ready
funnel you can deploy to Vercel in minutes.

---

## What's inside

```
ceyhun-funnels/
├── README.md                 ← you are here
├── CLAUDE.md                 ← project notes for Claude Code
├── template/                 ← the master template (never published directly)
│   ├── index.html            ← VSL sales page
│   ├── vsl-call-booked.html  ← "your call is booked" / thank-you page
│   ├── styles.css            ← all design tokens (:root) + layout
│   ├── components.js         ← reusable components (native Web Components)
│   └── assets/               ← SVG icons + graphics (from Figma)
├── clients/                  ← one folder per client (copies of template/)
│   └── advisorwebgrowth/     ← example, built + branded as a demo
└── .claude/
    └── skills/               ← the automation
        ├── fill-funnel-content/   ← offer doc → filled copy
        └── rebrand-funnel/        ← colors + logo + font
```

**Rule of thumb:** never edit `template/` for a real client. Copy it into
`clients/<client-name>/` and work there. The skills do this for you.

---

## The templates

Two pages, both plain HTML + CSS + a few lines of vanilla JS:

- **`index.html`** — the VSL page: hero + video, Old Way / Problem / New Way,
  case studies, testimonials, authority story, FAQ, and CTAs.
- **`vsl-call-booked.html`** — the post-booking page: hero video, "before the
  call" steps, resources, case studies, and a closing note.

They share **one** `styles.css`, **one** `components.js`, and **one** `assets/`
folder, so a change to branding updates both pages at once.

### Components (no framework)

Repeated UI is built with **native Web Components** — real custom HTML tags, zero
dependencies, no build. Defined once in `components.js`, used like normal HTML:

| Tag | What it is |
|-----|------------|
| `<c-cta href="">Label</c-cta>` | CTA button |
| `<c-proof cta="" href="" guarantee="" count="">` | CTA + guarantee + social proof (add `no-button` to hide the button) |
| `<c-card title="">Body</c-card>` | problem/step card |
| `<c-step-card step="" title="" image="">Body</c-step-card>` | numbered "before the call" card |
| `<c-testimonial quote="" name="">Review</c-testimonial>` | review card |
| `<c-faq q="">Answer</c-faq>` | click-to-expand FAQ item |
| `<c-video type="hero\|case\|vertical">` | video placeholder frame |

### Rebranding by hand (what the skill automates)

Everything visual is a **CSS variable** in `styles.css` `:root`:

```css
:root {
  --primary: #2d5bb7;      /* CTA buttons */
  --primary-hover: #234a97;
  --secondary: #64748b;    /* borders + labels */
  --accent: #cbd8ee;       /* video frame borders */
  --headline: #1b2a4a;     /* headings */
  --text: #33415c;         /* body */
  --bg: #f8fafc;           /* background */
  --cta-text: #ffffff;     /* text on the CTA button */
  --font: 'Inter', ...;    /* typeface */
}
```

Change those, swap `assets/brand-logo.svg`, and the whole funnel reskins.

---

## Prerequisites

- **Claude Code** (this is where the skills run) — https://claude.com/claude-code
- **Git** (to clone / version the project)
- A modern browser (to preview locally)
- **Node.js** + a free **Vercel** account (only for publishing)

No `npm install` is needed to build or preview the funnel itself — it's static.

---

## Getting started

### 1. Clone the repo

```bash
git clone <your-repo-url> ceyhun-funnels
cd ceyhun-funnels
```

### 2. Open it in Claude Code

```bash
claude
```

The skills in `.claude/skills/` are auto-discovered because you're inside the
project folder.

### 3. Preview the template locally

No server needed — just open a page in your browser:

```bash
open template/index.html            # macOS
# or double-click the file
```

---

## The workflow (per client)

The whole process is: **copy → fill content → rebrand → preview → publish.**
The two skills handle the middle two steps and will create the client copy for
you on first run.

### Step 1 — Fill the content

In Claude Code, just ask:

> **"Set up the funnel content for Acme Advisors"**

This runs the **`fill-funnel-content`** skill. It will:

1. Ask **which templates** to fill (VSL page, call-booked page, or both).
2. Ask for the **offer doc** — paste text, a file path, or a Google Doc / Drive
   link. (No doc yet? It'll walk you through the questions — see
   `.claude/skills/fill-funnel-content/offer-doc-outline.md`.)
3. Copy the template into `clients/acme-advisors/`.
4. Replace every placeholder with the client's real copy, wire up the booking
   link, brand name, and support email.
5. **Never invent proof** — anything missing (testimonials, unapproved case
   studies, videos) is left as a clear `TODO:` and **reported back to you in the
   chat** (not written to a file).

### Step 2 — Apply their branding

Then ask:

> **"Rebrand the funnel for Acme Advisors"**

This runs the **`rebrand-funnel`** skill. It will:

1. Ask for the brand — **hex colors**, a **brand guide**, a **font**, or even
   just a **logo image** (it can pull a palette straight from the image).
2. Update the `:root` color tokens in that client's `styles.css`.
3. Swap in the logo and set the brand name across both pages.
4. Update the font (Google Fonts link + `--font`).
5. Screenshot both pages to confirm nothing broke, and report the final
   colors/font/logo in the chat.

> Give one skill the content, the other the look. They never touch each other's
> job — `fill-funnel-content` won't restyle, `rebrand-funnel` won't rewrite copy.

### Step 3 — Preview

```bash
open clients/acme-advisors/index.html
```

Check the page, clear any `TODO:` items (real logo, videos, testimonials), and
you're ready to publish.

---

## Publishing on Vercel

Each client funnel is a **static site**, so deployment is fast and free. Deploy
the **client folder**, not the repo root.

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel          # once
cd clients/acme-advisors
vercel                   # preview deploy — follow the prompts
vercel --prod            # production deploy
```

- When asked for settings, accept the defaults. There's **no build command** and
  **no framework** — it's static files.
- `index.html` is served at `/`, and `vsl-call-booked.html` at
  `/vsl-call-booked`.

### Option B — Vercel Dashboard (Git-connected, auto-deploys)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** your repo.
3. Set **Root Directory** to `clients/acme-advisors`.
4. **Framework Preset:** *Other*. Leave **Build Command** empty and **Output
   Directory** empty (static).
5. **Deploy.** Every push to the repo now redeploys automatically.

> One repo can host many clients — create a separate Vercel project per client,
> each pointed at its own `clients/<name>` root directory.

### Custom domain

In the Vercel project → **Settings → Domains**, add the client's domain and
follow the DNS instructions. Then point the funnel's CTAs at their real booking
link (the skill already wires this, but double-check `href` on the `<c-proof>` /
`<c-cta>` tags).

### Before you go live — checklist

- [ ] All `TODO:` items resolved (logo, videos, testimonials, support email)
- [ ] CTAs point to the real booking link (Cal.com etc.)
- [ ] Brand colors + logo applied
- [ ] Legal disclaimer reviewed for the client's situation
- [ ] Both pages previewed on desktop **and** mobile
- [ ] Custom domain connected

---

## The skills, in detail

| Skill | Trigger examples | What it does |
|-------|------------------|--------------|
| **fill-funnel-content** | "fill the funnel", "set up the funnel content", "build a funnel for X" | Turns an offer doc into filled copy; reports gaps in chat |
| **rebrand-funnel** | "rebrand the funnel", "change the colors", "swap the logo", "match X's brand" | Applies colors, logo, and font via the `:root` tokens |

Each skill folder contains a `SKILL.md` (the instructions) plus reference files
(`placeholder-map.md`, `offer-doc-outline.md`, `brand-map.md`). To adjust how a
skill behaves, edit its `SKILL.md`.

---

## FAQ

**Do I need to know how to code?** No. Run the two skills in Claude Code and
resolve the `TODO:` items it lists.

**Why no React / Next.js?** The funnel is static on purpose — it opens straight
from a file, deploys anywhere, and a client can edit the copy without a build.
Components are done with the browser's built-in Web Components instead.

**Can one repo serve multiple clients?** Yes — one folder per client under
`clients/`, one Vercel project each.

**Something looks off after rebranding?** Almost everything is in `styles.css`
`:root`. Re-run `rebrand-funnel` or tweak the tokens directly.

---

Built with design-to-code from Figma. Powered by AdvisorWebGrowth.
