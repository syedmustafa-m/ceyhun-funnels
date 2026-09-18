/* ============================================================
   CEYHUN FUNNELS — REUSABLE COMPONENTS
   Native Web Components. No framework, no build step, no install.

   Each component renders into the LIGHT DOM, so everything is
   styled by styles.css exactly like the rest of the page.

   USAGE (examples):
     <c-cta href="https://cal.com/you">Book my free call</c-cta>
     <c-proof></c-proof>
     <c-card title="Old Way">Body text here...</c-card>
     <c-testimonial quote='"Result I got..."' name="Customer A.">Review text.</c-testimonial>
     <c-faq q="Your question?">Your answer.</c-faq>
     <c-video type="hero"></c-video>
   ============================================================ */

// Escape text that we drop into markup from an attribute.
function esc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// The conversion trust-block markup (guarantee + social proof), reused a lot.
function proofBlock(guarantee, count) {
  return `
    <div class="conversion">
      <div class="guarantee">
        <img src="assets/check.svg" alt="" />
        <span>${esc(guarantee)}</span>
      </div>
      <div class="social-proof">
        <div class="avatars">
          <span class="avatar"></span><span class="avatar"></span><span class="avatar"></span><span class="avatar"></span><span class="avatar"></span>
        </div>
        <div class="proof-text">
          <span>${esc(count)}</span>
          <img src="assets/stars-proof.svg" alt="5 star rating" />
        </div>
      </div>
    </div>`;
}

/* ---- <c-cta href="#book">Label</c-cta> ---- */
customElements.define('c-cta', class extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '#book';
    const label = this.textContent.trim() || 'Book my free strategy session';
    this.innerHTML = `<a class="btn-cta" href="${esc(href)}">${esc(label)}</a>`;
  }
});

/* ---- <c-proof cta="..." href="..." guarantee="..." count="..."></c-proof>
   Renders the CTA button + guarantee + social proof (the block that repeats
   under the hero, future-pacing, case studies and final CTA). All optional. ---- */
customElements.define('c-proof', class extends HTMLElement {
  connectedCallback() {
    const cta = this.getAttribute('cta') || 'Book my free strategy session';
    const href = this.getAttribute('href') || '#book';
    const guarantee = this.getAttribute('guarantee') || 'x-day money back guarantee';
    const count = this.getAttribute('count') || '1500+ Customers';
    // Add the `no-button` attribute to show only the guarantee + social proof.
    const button = this.hasAttribute('no-button') ? '' : `<a class="btn-cta" href="${esc(href)}">${esc(cta)}</a>`;
    this.innerHTML = `${button}${proofBlock(guarantee, count)}`;
  }
});

/* ---- <c-card title="Old Way" icon="assets/card-icon.svg">Body</c-card> ---- */
customElements.define('c-card', class extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const icon = this.getAttribute('icon') || 'assets/card-icon.svg';
    const body = this.innerHTML.trim();
    this.classList.add('card');
    this.innerHTML = `
      <img class="card-icon" src="${esc(icon)}" alt="" />
      <h5>${esc(title)}</h5>
      <img class="underline" src="assets/underline.svg" alt="" />
      <p>${body}</p>`;
  }
});

/* ---- <c-step-card step="Step 1" title="Watch the video above" image="assets/step-image.svg">Body</c-step-card>
   A numbered "how to prepare" card (image + step label + title + body). ---- */
customElements.define('c-step-card', class extends HTMLElement {
  connectedCallback() {
    const step = this.getAttribute('step') || '';
    const title = this.getAttribute('title') || '';
    const image = this.getAttribute('image') || 'assets/step-image.svg';
    const body = this.innerHTML.trim();
    this.classList.add('step-card');
    this.innerHTML = `
      <img class="step-image" src="${esc(image)}" alt="" />
      <p class="step-num">${esc(step)}</p>
      <h5 class="step-title">${esc(title)}</h5>
      <p class="step-body">${body}</p>`;
  }
});

/* ---- <c-testimonial quote='"..."' name="Customer A.">Review text.</c-testimonial> ---- */
customElements.define('c-testimonial', class extends HTMLElement {
  connectedCallback() {
    const quote = this.getAttribute('quote') || '';
    const name = this.getAttribute('name') || '';
    const review = this.innerHTML.trim();
    this.classList.add('tst-card');
    this.innerHTML = `
      <img class="profile" src="assets/profile.svg" alt="" />
      <img class="stars" src="assets/stars-review.svg" alt="5 star rating" />
      <h5>${esc(quote)}</h5>
      <p class="review">${review}</p>
      <div class="attribution">
        <img src="assets/check-attr.svg" alt="Verified" />
        <span>${esc(name)}</span>
      </div>`;
  }
});

/* ---- <c-faq q="Question?">Answer</c-faq>  (click to expand) ---- */
customElements.define('c-faq', class extends HTMLElement {
  connectedCallback() {
    const q = this.getAttribute('q') || '';
    const answer = this.innerHTML.trim() || 'EDIT: Your answer here.';
    this.classList.add('faq-item');
    this.innerHTML = `
      <button class="faq-q" type="button">${esc(q)} <img src="assets/faq-chevron.svg" alt="" /></button>
      <div class="faq-a"><p>${answer}</p></div>`;
    this.querySelector('.faq-q').addEventListener('click', () => this.classList.toggle('open'));
  }
});

/* ---- <c-video type="hero|case|vertical" bar="Watch the video below"></c-video>
   A black placeholder video frame. Replace the component with your real
   <iframe> embed when you have one, or drop an <iframe> inside it. ---- */
customElements.define('c-video', class extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || 'case';
    const bar = this.getAttribute('bar') || 'Watch the video below';
    if (type === 'hero') {
      this.classList.add('video');
      this.innerHTML = `
        <div class="video-bar"><img src="assets/play-hero-top.svg" alt="" /> ${esc(bar)}</div>
        <div class="video-frame"><img class="play" src="assets/play-hero.svg" alt="Play video" /></div>`;
    } else if (type === 'vertical') {
      this.classList.add('vertical-video');
      this.innerHTML = `<img class="play" src="assets/play-vertical.svg" alt="Play video" />`;
    } else {
      this.classList.add('case-video');
      this.innerHTML = `<img class="play" src="assets/play-hero.svg" alt="Play video" />`;
    }
  }
});

/* Auto year in footer */
document.addEventListener('DOMContentLoaded', function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
