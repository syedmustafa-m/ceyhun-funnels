# ceyhun-funnels

A one-page funnel template plus Claude skills that Ceyhun can use to set up funnels
for himself and his clients.

## What this is

- **One-page funnel template** — a reusable, single-page landing/funnel page that can
  be quickly rebranded and re-copied per client.
- **Claude skills** — self-contained skills that walk Ceyhun (or a client) through
  standing up a new funnel: filling in copy, swapping branding, wiring up the
  call-to-action, and publishing.

The goal: Ceyhun opens this folder, runs a skill, answers a few questions, and gets a
finished, client-ready funnel page — no hand-editing HTML required.

## Who uses it

- **Ceyhun** — sets up funnels for himself and for his clients.
- **Ceyhun's clients** — may run the skills themselves to spin up their own funnel.

Write everything (skills, prompts, docs) so a non-technical person can follow it.

## Structure

```
ceyhun-funnels/
├── README.md          # full guide: setup, skills, Vercel deploy
├── CLAUDE.md          # this file
├── template/               # the funnel template (plain HTML + CSS)
│   ├── index.html          # VSL page (built from reusable components)
│   ├── vsl-call-booked.html# call-booked / thank-you page (same components)
│   ├── styles.css          # design tokens (:root) + layout
│   ├── components.js       # reusable components (native Web Components, no build)
│   └── assets/             # SVG icons/graphics (from Figma)
└── .claude/
    └── skills/
        ├── fill-funnel-content/  # skill: offer doc -> filled templates
        │   ├── SKILL.md
        │   ├── placeholder-map.md
        │   └── offer-doc-outline.md
        └── rebrand-funnel/       # skill: apply colors, logo, font
            ├── SKILL.md
            └── brand-map.md
```

Filled/branded client funnels go in `clients/<client-name>/` (copies of the
template), keeping the master `template/` clean.

### Template notes

- **Stack:** plain HTML + CSS + a few lines of vanilla JS (FAQ accordion, footer
  year). No build step — open `index.html` in any browser or host it anywhere.
- **Source of truth:** design-to-code from the Figma file "DigitusPro-Website",
  page *Landing Pages*, frame *VSL-PAGE*.
- **Rebranding:** edit the CSS variables in `styles.css` `:root` (colors, fonts,
  radius) then swap the copy in `index.html` (marked with `EDIT:` comments and
  `[bracketed]` placeholders).
- **CTAs** all point to `#book` — replace with the client's booking link (e.g.
  Cal.com) when setting up.
- **Videos** are black placeholder frames — replace `.video-frame` / `.case-video`
  / `.vertical-video` contents with the client's embed (YouTube/Vimeo/Wistia).

### Components (`components.js`)

Reusable UI is defined as **native Web Components** (custom elements) — no
framework, no build, no `npm install`. They render into the light DOM so
`styles.css` styles them like any other markup. Available tags:

- `<c-cta href="#book">Label</c-cta>` — CTA button
- `<c-proof cta="" href="" guarantee="" count=""></c-proof>` — CTA + guarantee +
  social proof (the block repeated under most sections; all attrs optional).
  Add the `no-button` attribute to show only guarantee + social proof.
- `<c-card title="Old Way">Body text</c-card>` — problem card (icon + title + body)
- `<c-step-card step="Step 1" title="..." image="assets/step-image.svg">Body</c-step-card>`
  — numbered "before the call" card (image + step label + title + body)
- `<c-testimonial quote='"..."' name="Customer A.">Review text</c-testimonial>`
- `<c-faq q="Question?">Answer</c-faq>` — click-to-expand FAQ item
- `<c-video type="hero|case|vertical" bar="Watch the video below"></c-video>`

To add a new component: define one `customElements.define(...)` block in
`components.js` following the same pattern, then use the tag in `index.html`.

## Conventions

- Keep the template self-contained and easy to duplicate per client.
- Skills should be conversational and beginner-friendly — assume the person running
  them is not a developer.
- Prefer clear, editable placeholders over clever code.

## Status

- ✅ VSL page built (`template/index.html`) — design-to-code from Figma.
- ✅ Call-booked / thank-you page built (`template/vsl-call-booked.html`) —
  reuses all existing components; only `<c-step-card>` was added new.
- ✅ Skill `fill-funnel-content` — asks for an offer doc + which templates, then
  fills the placeholder copy (reports gaps in chat, never a file).
- ✅ Skill `rebrand-funnel` — applies a client's colors, logo, and font via the
  `:root` design tokens.
- ⏳ Next: publishing/hosting skill (deploy a client folder + wire the domain).
