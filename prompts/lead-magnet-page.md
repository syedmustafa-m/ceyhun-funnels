# Prompt: Build a Lead-Magnet Page

Paste everything in the code block below into **Claude Code**, opened inside the
`ceyhun-funnels` project. It builds a new lead-magnet page (form on the left,
video on the right) by reusing the existing components and only creating new
input components if they don't already exist.

Fill in the two lines at the top (client folder + the copy) before running, or
just leave them and answer when Claude asks.

---

```
You are working in the ceyhun-funnels project — a plain HTML + CSS funnel
template with reusable native Web Components. Build a new LEAD-MAGNET page.

FIRST, READ THESE so you follow the existing conventions exactly:
- README.md and CLAUDE.md (project rules)
- template/components.js (the existing <c-*> components)
- template/styles.css (the :root design tokens and layout classes)
- template/index.html (how pages/components are used)

HARD RULES:
- Reuse existing components wherever possible. Do NOT recreate anything that
  already exists.
- Only CREATE a new component if the project genuinely doesn't have it. Follow
  the exact same pattern as the components in components.js: a native custom
  element, hyphenated <c-*> tag, rendered into the LIGHT DOM (no shadow DOM),
  styled by classes in styles.css.
- Use ONLY the CSS variables in styles.css :root for colors/font. No new hardcoded
  colors. Reuse the --radius / --maxw tokens and existing utility classes.
- No build step, no framework, no npm. It must open straight from the file.
- Do not change any other page's layout or the shared components' existing behavior
  (you may ADD new components and new CSS blocks).

WHERE TO BUILD:
- Ask which client folder to build in (e.g. clients/<name>/). If none is given,
  build the master version in template/ as lead-magnet.html. Put the new page
  next to index.html so it shares styles.css, components.js and assets/.

THE PAGE — a two-column hero:
- LEFT column: a lead-capture form.
- RIGHT column: the EXISTING <c-video> component (use type="hero" or a plain
  frame). Reuse it as-is; do not build a new media component. (If the client
  supplies an image of the lead magnet instead of a video, place a plain <img>
  there — but default to the existing <c-video>.)
- On mobile the two columns stack (form first, media second). Use the existing
  responsive approach in styles.css.

LEFT COLUMN CONTENT (top to bottom) — use the existing type classes
(.label, h1, .lead, etc.):
1. Small eyebrow label (uppercase) — e.g. "THE WHOLE SYSTEM — FREE"
2. Big headline (h1) — e.g. "Turn LinkedIn into a pipeline you own."
3. Sub-paragraph (.lead) — 2–4 sentences describing the offer.
4. The form fields (see components below):
   - Your Name  (text, required, placeholder "Full name")
   - Email      (email, required, placeholder "Your email")
   - Mobile Number (tel, required, with a country-code selector + placeholder "+61")
5. Submit button — full width, styled with the EXISTING .btn-cta look
   (e.g. text "Send me the system"). Reuse .btn-cta styling; don't invent a new
   button style.
6. Fine-print consent line under the button (with a Privacy Policy link).
7. A checklist of 3 benefit bullets, each with the existing check icon
   (assets/check.svg or assets/check-attr.svg) — e.g.
   "The profile that turns a visit into a reply", etc.
8. A closing one-liner — e.g. "Read it in an afternoon. No fluff."

COMPONENTS TO CREATE ONLY IF MISSING (check components.js first). Match the
existing code style, and register their tags in the styles.css component
display:block rule. Suggested APIs — adjust to fit what's already there:

- <c-input label="Your Name" name="name" type="text" placeholder="Full name" required></c-input>
    Renders a label (with a red * if required) + an <input> styled to the brand.
- <c-phone label="Mobile Number" name="phone" required></c-phone>
    Renders a label + a country-code selector + a tel input (placeholder "+61").
    A simple <select> of country codes is fine — no external library.
- <c-check>Benefit text</c-check>
    Renders a check icon + text row for the benefit list.
- <c-form action="" method="post"> ...fields + submit... </c-form>  (optional)
    A light wrapper that groups the fields; on submit it can do nothing yet
    (leave a clear TODO for wiring to the client's form handler / email tool).

FORM WIRING:
- Leave the form endpoint as a clear TODO (comment) for the client to connect
  their tool (e.g. their email/CRM or a form service). Do not invent an endpoint.
- Basic HTML5 validation only (required, type="email", type="tel").

STYLING:
- Inputs: full width, comfortable padding, 1px border in --secondary, rounded with
  --radius, focus state using --primary. Labels use the existing label styling
  weight; required asterisk in a red accent.
- Keep everything on-brand via :root tokens so a later rebrand still works.

FINISH:
- Take a headless screenshot (Chrome --headless --screenshot) of the new page and
  confirm it renders: two columns on desktop, stacked on mobile, video on the
  right, form usable.
- Report in the chat: which components you reused, which (if any) you created and
  why, and any TODOs (form endpoint, real copy, media). Do NOT write a report file.
```

---

## Notes for Ceyhun

- The screenshot this is based on: eyebrow + big headline + subtext on the left,
  a **Name / Email / Mobile (with country flag)** form, a blue **"Send me the
  system"** button, a consent line, and a 3-item checklist — with the lead-magnet
  media on the right.
- After it's built, you can **rebrand** it with the same `rebrand-funnel` skill
  (it uses the same `:root` tokens) and **fill copy** conventions from
  `fill-funnel-content`.
- New components created here (like `<c-input>`) become part of `components.js`,
  so every future page can reuse them too.
