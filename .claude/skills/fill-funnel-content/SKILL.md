---
name: fill-funnel-content
description: >
  Fill the funnel templates (VSL page and/or call-booked page) with a client's
  real content taken from an offer document. Use when the user wants to set up
  funnel content, populate or customize the funnel template, turn an offer doc
  into a funnel, or says things like "fill the funnel", "set up the funnel
  content", "build a funnel for [client]", or "fill the templates". The skill
  asks for the offer doc and asks which templates to fill, then replaces the
  placeholder copy with the client's content.
---

# Fill Funnel Content

Turn a client's **offer document** into finished funnel pages by replacing the
placeholder copy in the templates. This skill only edits **text/content** — it
does not change layout, styles, or components.

## Templates this fills

Both live in the `template/` folder of the `ceyhun-funnels` project:

- **VSL page** — `template/index.html` (the main sales/opt-in page)
- **Call-booked page** — `template/vsl-call-booked.html` (the thank-you /
  "your call is booked" page)

They share `styles.css`, `components.js`, and `assets/`.

## Steps (follow in order)

### 1. Ask which templates to fill
Ask the user (use AskUserQuestion): **VSL page**, **Call-booked page**, or
**Both**. Do not proceed until you know.

### 2. Ask for the offer doc
Ask the user to provide the **offer document**. Accept any of:
- a **file path** (read it with the Read tool),
- **pasted text** in the chat,
- a **Google Doc / Drive link** (read it with the Google Drive MCP tools, e.g.
  `read_file_content`), or
- a **Claude Doc / artifact link** (load the docs skill/guide first, then read).

If the user has no doc yet, point them to the field checklist in
`offer-doc-outline.md` (in this skill folder) and offer to collect the answers
conversationally instead.

### 3. Decide where to write (protect the master template)
By default, **do not overwrite the master template**. Ask for a short client
name and copy the needed files into a new sibling folder first, e.g.
`ceyhun-funnels/clients/<client-name>/`, copying `index.html` and/or
`vsl-call-booked.html` **plus** `styles.css`, `components.js`, and `assets/`.
Then fill the copy. Only fill `template/` in place if the user explicitly says so.

### 4. Extract the client's content from the offer doc
Pull out these fields (ask for any that are missing rather than inventing them):
brand name, logo, booking link, target avatar, core outcome + timeframe, unique
mechanism, common objections, old-way/problem/new-way framing, 2 case studies,
3 short testimonials, the personal story (low point → turning point → result),
6 FAQs, guarantee terms, customer count, support email, and any video embed URLs.

### 5. Replace the placeholders
Use `placeholder-map.md` (in this skill folder) — it lists **every** placeholder
string in each template and what to replace it with. Work through it top to
bottom. Rules:
- Match the tone and length of the original copy so the layout stays balanced.
- Fill component **attributes** where relevant (`<c-proof cta="..." href="..."
  guarantee="..." count="...">`, `<c-faq q="...">`, `<c-testimonial quote="..."
  name="...">`, etc.).
- Set the **booking link** everywhere: replace every `href="#book"` with the
  client's booking URL (e.g. their Cal.com link). Keep `#book` only on the
  anchor that scrolls to the final CTA section, if that behavior is wanted.
- Update `<title>`, `<meta name="description">`, brand name, and support email.
- Keep the **legal disclaimer** and the **POWERED BY ADVISORWEBGROWTH** footer
  as-is unless the user says otherwise.

### 6. Handle missing content honestly
If the offer doc is missing something, do **not** fabricate testimonials,
results, or numbers. Leave a clear `TODO:` marker in the file and list every gap
back to the user at the end.

### 7. Verify and report
- Confirm no leftover template placeholders remain (search for `X outcome`,
  `[bracketed]`, `Customer name`, `Result I got`, `yourbrand`, `#book`, etc.).
- Offer to preview: open the file in the browser, or take a headless screenshot
  with Chrome to visually confirm it renders.
- **Report the gaps directly in the chat** as a numbered list — every `TODO:`
  still needing the client's input (missing logo, support email, video embeds,
  unpermissioned proof, testimonials, etc.). **Do NOT create a `gaps.md` or any
  other gaps file** — the gap list lives in the chat message only.
- Also state which templates were filled and where they were written.

## Guardrails
- Content only — never edit `styles.css` or `components.js` from this skill.
- Never invent proof (testimonials, case-study numbers, customer counts).
- Reuse the existing components; do not add new markup patterns here.
