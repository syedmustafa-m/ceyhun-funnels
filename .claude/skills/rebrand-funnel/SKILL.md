---
name: rebrand-funnel
description: >
  Rebrand a funnel — swap the colors, logo, brand name, and fonts to match a
  client's brand. Use when the user wants to restyle/theme/reskin the funnel,
  apply a client's branding, change the colors or fonts or logo, or says things
  like "rebrand the funnel", "make it match [brand]", "change the colors",
  "apply their branding", "swap the logo", or "theme it for [client]". The skill
  asks for the brand assets (colors, logo, font) and applies them across the
  funnel. It changes look-and-feel only — not copy (use fill-funnel-content for
  copy) and not layout/components.
---

# Rebrand Funnel

Restyle a funnel to a client's brand. Almost everything lives in **CSS
variables** in `styles.css` `:root`, plus the **logo asset** and the **font
link** — so a full rebrand is a handful of precise edits, no layout changes.

## What this changes
- **Colors** — the `:root` design tokens in `styles.css`
- **Logo** — `assets/brand-logo.svg` and the brand name text
- **Font** — the Google Fonts `<link>` in each page + the `--font` token

It does NOT change copy (that's `fill-funnel-content`) or layout/components.

## Steps (follow in order)

### 1. Pick the target folder
Ask which folder to rebrand. Normally a client copy, e.g.
`ceyhun-funnels/clients/<client-name>/`. If none exists yet, offer to copy the
`template/` folder into a new client folder first (copy `index.html`,
`vsl-call-booked.html`, `styles.css`, `components.js`, and `assets/`). Only
edit `template/` directly if the user explicitly says so.

### 2. Gather the brand
Ask for whatever the client has. Accept any of:
- **Hex values** for the key colors (at minimum a primary/brand color),
- a **brand guide** (file, doc, or Drive/Claude Doc link — read it),
- a **logo image** — you can open it with the Read tool and pull an accurate
  colour palette straight from it,
- a **font** name (any Google Font) or a specific font file.

If they only give one brand color, derive a sensible, accessible set from it
(a darker hover, a muted grey secondary, a light background) and tell them what
you chose so they can adjust.

### 3. Apply colors
Edit the `:root` block in `styles.css`. See `brand-map.md` (in this skill
folder) for exactly what each token controls. Key ones:
`--primary` (CTA buttons), `--primary-hover`, `--secondary` (borders/labels),
`--accent`, `--headline`, `--text`, `--muted`, `--bg`, `--cta-text`.
Check contrast: CTA text must be readable on `--primary`; body `--text` readable
on `--bg`. Flag any pairing that fails.

### 4. Apply the logo + brand name
- Drop the client's logo into `assets/` and point the header `<img>` at it in
  **both** HTML pages. Keep the displayed size sensible (the header logo shows
  ~38px tall). If it's a wordmark that already includes the name, remove or empty
  the `.brand-name` span; if it's just a mark, keep the span and set the text.
- Update the `.brand-name` text and the footer `Your Brand` / copyright name in
  both pages if not already done.

### 5. Apply the font
- Change the Google Fonts `<link>` in the `<head>` of **both** pages to the new
  family (include the weights the design uses: 400, 500, 600, 700, 900).
- Update the `--font` token in `styles.css` to `'New Family', <fallbacks>`.
- If a font file is provided instead, add an `@font-face` block at the top of
  `styles.css` and reference it in `--font`.

### 6. Verify and report
- Take a headless Chrome screenshot of both pages and confirm nothing looks
  broken (contrast, logo size, font loaded).
- **Report directly in the chat**: the final color values used, the font, and
  the logo file. If you derived colors from one input, say so. **Do not create
  any report/notes file** — keep it in the chat.

## Guardrails
- Look-and-feel only — never edit copy or `components.js`, and never change
  layout structure in the HTML beyond the logo `<img>`, brand name, and font link.
- Keep all styling in `:root` where possible; only touch a hardcoded color in
  `styles.css` if a token can't express it, and say which one you changed.
- Never invent a brand — if colors/logo/font aren't provided and can't be read
  from an input, ask.
