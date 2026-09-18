# Placeholder Map

Every placeholder in each template and what to replace it with. Work top to
bottom. Text in `code` is the current placeholder value to find.

Legend for offer-doc fields: `{brand}`, `{logo}`, `{booking_url}`, `{avatar}`,
`{outcome}`, `{timeframe}`, `{mechanism}`, `{support_email}`, etc.

---

## Shared (both pages)

| Where | Find | Replace with |
|-------|------|--------------|
| `<title>` | template title | `{page headline} \| {brand}` |
| `<meta description>` | placeholder text | one-line summary of the offer |
| Brand name | `BrandLogo` | `{brand}` |
| Brand logo | `assets/brand-logo.svg` | client logo (drop new SVG/PNG in `assets/`, update `src`) |
| Booking links | every `href="#book"` | `{booking_url}` (keep `#book` only if used as a scroll anchor) |
| Footer year/brand | `Your Brand` | `{brand}` |
| Footer email | `support@yourbrand.com` | `{support_email}` |
| Disclaimer | keep as-is | (only edit if the client's compliance requires it) |
| Powered by | `ADVISORWEBGROWTH` | keep as-is |

---

## VSL page — `template/index.html`

### Hero
| Find | Replace with |
|------|--------------|
| `Avatar Callout` | who this is for, e.g. "For {avatar}" |
| `Achieve X Outcome In Y Time` | `{outcome} in {timeframe}` |
| `With unique solution` | the `{mechanism}` (one line) |
| `Without common objections.` | the main objection removed |
| `bar="Watch the video below"` | keep or customize the video bar label |

### Future Pacing
| Find | Replace with |
|------|--------------|
| `Here’s what we do differently.` | section label |
| `If you’ve been struggling with x, this is why...` | H2 hook for the avatar's problem |
| `<c-card title="Old Way">…</c-card>` | Old Way title + body |
| `<c-card title="Problem">…</c-card>` | Problem title + body |
| `<c-card title="New Way">…</c-card>` | New Way title + body |
| `Ready to try a different approach?` | outro H3 |
| `Book your free call now` | outro subline |

### Conversion blocks (`<c-proof>`)
Set attributes on each `<c-proof>` (there are several): `cta` (button text),
`href="{booking_url}"`, `guarantee` (e.g. "30-day money back guarantee"),
`count` (e.g. "1500+ Customers"). Defaults live in `components.js`; overriding
per tag is fine.

### Case Studies
| Find | Replace with |
|------|--------------|
| `Just some of the results our customers have achieved` | H2 |
| `Hear what they have to say...` | subline |
| `“I had x problem”` / `“I had y problem”` | each case study's headline quote |
| `Customer name` | real client name (only if permitted) |
| the 4 `[bracketed]` paragraphs per case | the real story: problem → attempts → what you did → result |
| `Final result: Result` | the concrete result |
| `Ready to get results like these?` | outro H3 |

### Testimonials (`<c-testimonial>`)
For each of the 3 cards set `quote="{short result headline}"`,
`name="{customer name}"`, and inner text = the review. Replace
`"Result I got..."`, `Customer A.`, and `Review text.`.

### Authority & Trust
| Find | Replace with |
|------|--------------|
| `How I Discovered Solution` | label |
| `Why work with us?` | H2 |
| `“My low point...”` | H4 story hook |
| the 6 story paragraphs | the personal story (low point → turning point → result → why the offer exists) |

### FAQ (`<c-faq>`)
For each of the 6 items set `q="{question}"` and inner text = the answer.
Replace `EDIT: Your answer here.` in each.

### Final CTA
| Find | Replace with |
|------|--------------|
| `Ready to get x result?` | H2 |
| `Join x others that have already joined` | subline (real number if known) |

---

## Call-booked page — `template/vsl-call-booked.html`

### Hero
| Find | Replace with |
|------|--------------|
| `Congratulations` | label (keep or customize) |
| `Your Call Is Locked In` | H1 |
| `Watch This Before We Chat` | H1 sub |
| the hero `lead` paragraph | what the video covers / why to watch |

### Next Steps (`<c-step-card>`)
Three cards. Usually kept generic, but customize titles/bodies if the client
has a specific pre-call process. Replace `Step 1/2/3`, the titles, and bodies.
Swap `assets/step-image.svg` for real images if available.

### Resources
| Find | Replace with |
|------|--------------|
| `Resources` | label |
| `Helpful resources to review before the call` | H2 |
| the lead paragraph | short intro |
| the four `<c-video type="case">` | replace each with the real resource video embed |

### Case Studies
Same as the VSL page — fill with the same real case studies.

### CTA
| Find | Replace with |
|------|--------------|
| `See you on our call!` | H2 |
| `Please go through these resources to ensure you’re ready for the call.` | note |
| `<c-proof no-button>` | keep `no-button`; set `guarantee` / `count` attributes |

---

## Video embeds
The black `<c-video>` frames are placeholders. To use a real video, put the
embed **inside** the component, e.g.:

```html
<c-video type="hero"><iframe src="https://www.youtube.com/embed/XXXX"
  style="width:100%;height:100%;border:0" allowfullscreen></iframe></c-video>
```

Only do this when the client provides embed URLs; otherwise leave the placeholder
frame and note it as a `TODO:`.

---

## Final sweep — leftover placeholders to search for
`BrandLogo`, `X Outcome`, `Y Time`, `[`, `Customer name`, `Result I got`,
`Review text`, `yourbrand`, `#book`, `x-day`, `1500+ Customers`, `EDIT:`, `TODO:`
