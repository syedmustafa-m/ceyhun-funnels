# Brand Map

Everything that controls the funnel's look, and where to change it.

## Colors — `styles.css` `:root` (template defaults shown)

| Token | Default | Controls |
|-------|---------|----------|
| `--primary` | `#b0b0b0` | CTA button background (the main brand color) |
| `--primary-hover` | `#9a9a9a` | CTA button hover — a darker shade of `--primary` |
| `--secondary` | `#7a7a7a` | Card/FAQ/video borders, section labels, muted subtext |
| `--accent` | `#dbdbdb` | Case-study video frame borders |
| `--headline` | `#000000` | All main headings (H1–H5) |
| `--text` | `#363636` | Body copy |
| `--muted` | `#999999` | Fine print |
| `--bg` | `#fdfdfd` | Page background |
| `--white` | `#ffffff` | Card/avatar fills |
| `--cta-text` | `#000000` | Text sitting on the CTA button |
| `--maxw` | `1200px` | Content max width (usually leave) |
| `--radius` | `10px` | Corner rounding (usually leave) |

**Contrast rules to check:** `--cta-text` must be readable on `--primary`;
`--text` must be readable on `--bg`; section labels use `--secondary` on `--bg`.

## Font — two places, keep them in sync

1. **Google Fonts `<link>`** in the `<head>` of `index.html` AND
   `vsl-call-booked.html`. Replace `family=Inter:...` with the new family and
   keep the weights `400;500;600;700;900` (900 = the black headings).
2. **`--font` token** in `styles.css` `:root`, e.g.
   `--font: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`

For a self-hosted font file: add `@font-face { ... }` at the top of `styles.css`
and set `--font` to that family.

## Logo + brand name — both HTML pages

- Header logo: `<img src="assets/brand-logo.svg" ...>` inside `.brand`. Replace
  the file in `assets/` (or add a new one and update `src`). Header shows it at
  ~38px tall (`.brand img { width:38px; height:38px }` in `styles.css`).
- Brand name: the `<span class="brand-name">…</span>` next to the logo. If the
  logo is a full wordmark, empty this span.
- Footer name: `Your Brand` in `.footer-row` and the copyright line.

## Hardcoded colors (only if a client insists — not in :root)

These few values are literal in `styles.css`; change only if needed and say so:
- `#1e1e1e` — social-proof avatar circle borders (`.avatars .avatar`)
- `#ececec` — thin divider between sections (`.section`)
- a few `#000` in `.card h5` / `.case-*` text — deliberately pure black headings
- `#363636` in the footer disclaimer `<span>`s (inline in the HTML)

## Quick self-check after a rebrand
- CTA buttons use the new brand color with readable text.
- Headings/body legible on the background.
- Logo not stretched; brand name correct in header + footer.
- New font actually loads (check a heading renders in it, not the fallback).
