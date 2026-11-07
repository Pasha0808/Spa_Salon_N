# NEHA Threading: salon & spa website

A website for **NEHA Threading**, a threading salon and spa. It is built on
the same approach as the earlier
[Elite Dental Lab](https://github.com/Pasha0808/EliteDentalLab) site.

> **Status: working prototype for client review.** Both pages work, but most
> business details, photos, prices and reviews are placeholders. The hero
> video is a borrowed stand-in. See [§8 Placeholders](#8-placeholders--what-is-still-missing).

- **Review link (GitHub Pages):** <https://pasha0808.github.io/Spa_Salon_N/>
  (live once Pages is switched on; see [§10](#10-hosting--deployment))
- **Pages:** `index.html` (home) and `services.html` (menu & prices)
- **Stack:** static HTML + CSS + vanilla JavaScript. No framework, no build
  step, no dependencies.

This README is the full project brief. It records what the client and the
developer asked for, the reference websites and what was taken from each,
the design decisions, and how the code is organised. It is written so that a
person or an AI coding agent (Claude Code, ChatGPT Codex…) can pick the
project up cold. Agent-specific working rules are in [AGENTS.md](AGENTS.md).

---

## Contents

1. [The brief: what was asked for](#1-the-brief-what-was-asked-for)
2. [The client & brand](#2-the-client--brand)
3. [Reference websites the owner likes](#3-reference-websites-the-owner-likes)
4. [Design direction](#4-design-direction)
5. [Page structure](#5-page-structure)
6. [Code organisation](#6-code-organisation)
7. [What was reused from Elite Dental Lab](#7-what-was-reused-from-elite-dental-lab)
8. [Placeholders & what is still missing](#8-placeholders--what-is-still-missing)
9. [Run, check and preview](#9-run-check-and-preview)
10. [Hosting & deployment](#10-hosting--deployment)
11. [How-to recipes](#11-how-to-recipes)
12. [Roadmap](#12-roadmap)
13. [Project history](#13-project-history)

---

## 1. The brief: what was asked for

The developer (repo owner, Pasha0808) was commissioned to build a spa salon
website. Requests so far, in order:

1. **"Something similar to Elite Dental Lab, but for a spa."** Elite went
   well, so reuse as much of its code and approach as makes sense.
2. **Colour:** the salon owner likes **shades of green** as the background
   colour and the general tone.
3. **Style references:** the owner sent five websites they really like
   ([§3](#3-reference-websites-the-owner-likes)). Record them.
4. **Background video:** one of the references (The Pearl Spa) has a video
   playing in the background, much like the Elite Dental Lab hero. The
   developer plans to convince the owner to do the same.
5. **Logo:** the owner sent their logo (dark teal banner, lime square with
   white leaves and an orange dot, "NEHA / THREADING"). **The green
   background behind it is not required. Only the leaf image and the name
   matter.**
6. **A prototype homepage**, built as a real webpage.
7. **Placeholder video:** use the supplied spa clip (*Sharq Hotel SPA Promo
   Video*) as the hero video until the salon has its own footage.
8. **GitHub Pages**, so the developer can send the salon owner a link to
   review.
9. **A detailed README** (this file), so another tool such as ChatGPT Codex
   can read it and understand the project.
10. **The salon's current website, <https://www.nehathreading.com/>, is for
    facts only.** The owner does **not** like it at all, so take **no design
    inspiration** from it. Use it as the source for **prices and factual
    information**: they have **two locations**, so use its addresses, phone
    numbers, email, and links to their social media and **Yelp**.

---

## 2. The client & brand

| | |
| --- | --- |
| Business | NEHA Threading: eyebrow and face threading salon / spa |
| Services (assumed for the prototype; confirm with owner) | Threading, henna, lash lift & tinting, facials, waxing |
| Owner | Referred to as "he". Name not yet known. |
| Current website | <https://www.nehathreading.com/>: **facts only, no design inspiration** (the owner dislikes it) |
| Locations | **Two.** Addresses, phones and hours to be copied from the current site into `locations` in `js/config.js` |
| Email, social media, Yelp, booking system | To be copied from the current site. Placeholders in `js/config.js` until then |

### Logo

- `assets/img/logo-original.png`: the file the owner sent (434 × 116 px, low
  resolution, white text on dark teal). Kept for reference and not used on
  the site. **Ask for a vector (SVG/AI/EPS/PDF) or a large PNG.**
- `assets/img/neha-mark.svg`: a hand-made vector redraw of the leaf mark,
  used as the favicon and as the base for the header/footer mark. Leaf tips
  that extend outside the lime square are drawn in forest green, so the mark
  works on light backgrounds as well as dark ones. In the original, those
  tips sit on the teal background.
- `assets/img/neha-mark-light.svg`: the same mark with white overflow, for
  dark backgrounds.
- The **NEHA / THREADING wordmark** is live text in *Jost* (300 weight for
  NEHA, 500 + wide tracking for THREADING). It closely matches the logo's
  geometric lettering, stays sharp and can change colour.
- The header and footer marks are **inline SVG generated by `js/site.js`**
  (function `markSVG`), so the overflow colour follows the header state.
  If the mark's paths change, update both `site.js` and the two SVG files.

### Colours (sampled from the logo)

| Token | Hex | Use |
| --- | --- | --- |
| `--forest` | `#285F5F` | Logo background teal: primary brand colour, buttons, CTA band |
| `--forest-deep` | `#173F3D` | Darker sections, hover |
| `--forest-ink` | `#102C2A` | Footer, offer bar, hero overlay |
| `--lime` | `#AECD54` | Logo leaf square: Book buttons, accents on dark backgrounds. **Never as text on light backgrounds** (fails contrast) |
| `--lime-soft` | `#E9F1D2` | Soft highlight, form notice |
| `--sun` | `#E6883C` | Logo dot: tiny accents only (bullets, stars, focus ring) |
| `--cream` | `#F8F7F1` | Page background |
| `--mist` | `#EDF2EA` | Pale sage alternate sections |
| `--ink` / `--ink-soft` | `#1B2A28` / `#56655F` | Text |

### Typography

- **Cormorant Garamond** (Google Fonts) for headings and prices. Elegant,
  spa-like, the same family The Pearl Spa and Nordine use. Prices and step
  numbers use `font-variant-numeric: lining-nums`.
- **Jost** (Google Fonts) for body text, navigation and buttons. A geometric
  sans close to the logo lettering and to the Avenir/Futura used by the
  references. Navigation, eyebrows and buttons are uppercase with wide
  letter-spacing.

---

## 3. Reference websites the owner likes

Studied on 2026-11-07 from screenshots and the computed styles of each live
site.

### 3.1 Craft Salon, Glendora: <https://craftsalonglendora.com/>
- Squarespace. Fonts: *ambroise-std* (tall editorial serif, all caps) and *omnes-pro*.
- **Dark botanical background** (leaves over black marble). A large photo of
  the salon with a **white text card overlapping it** ("PERFECTING THE CRAFT
  OF HAIR ARTISTRY.").
- Square outline logo centred top, small two-row nav at left, social icons at right.
- One rounded **BOOK** button (booking: GlossGenius). Black footer.
- **Taken:** the white card overlapping a photo → *Our Story* section.

### 3.2 Christie Adam Salon & Spa, Reston VA: <https://www.christieadam.com/>
- Font: *proxima-nova*. White, airy, minimal.
- **Offer bar** at the top: "WELCOME NEW CLIENTS! ENJOY 15% OFF YOUR FIRST VISIT! BOOK TODAY!"
- Header: nav left (About, Services, Gallery, Our Team, Contact Us),
  **monogram centred**, phone, map and gift icons, and a black **BOOK ONLINE**
  button on the right. Script + serif name lockup under the header.
- **Round photos** for the two categories (SALON / SPA) with thin outlined
  "VIEW SERVICES" buttons. About section with rounded-corner photos.
- **One large centred testimonial**, then a photo grid. Booking: Phorest.
- **Taken:** the offer bar, phone + Book Now on the right of the header, the
  single featured review and the photo grid.

### 3.3 Spa in the Valley, Cockeysville MD: <https://www.spainthevalley.com/>
- Wix. Fonts: *futura-lt light*, *proxima-n*. The same town as Elite Dental Lab.
- Pink Himalayan salt texture hero with a script "Spa in the Valley" logo,
  coral nav strip.
- **Dark green labels** (`#304736`) on promotion cards (Spa / Nails /
  HydraFacial / Skin Care / Retail) with seasonal offers.
- Feature block for their **Salt Cave**. A band of **three calls to action**:
  *Join the mailing list / Book services / Purchase gift cards*. Big sitemap
  footer. Booking: Meevo.
- **Taken:** the three-CTA band → *Book a visit / Gift cards / Walk-ins
  welcome* above the footer.

### 3.4 Nordine Salon & Day Spa, Reston VA: <https://salonnordine.com/locations/reston/>
- Fonts: **Cormorant Garamond** headings in muted gold (`#B69A55`), Open Sans body. White and cream.
- Gold offer bar ("October Special — 15% OFF All Hammam Rituals").
  Wordmark logo left, gold **BOOKING** button right.
- Location page: intro card + photo, then **Hours / Get in Touch / Map**.
- **"Our Menu": tabs** (Hair, Nails, Facials, Wax, Massage, Lashes,
  Makeup) with **dotted lines from each service name to its price** and a
  one-line description.
- Team cards with booking/Instagram icons, newsletter signup.
- **Taken:** the tabbed menu with dotted lines to the price → `services.html`;
  the hours/contact/map layout → *Visit* section.

### 3.5 The Pearl Spa: <https://www.thepearlspa.com/>
- Wix. Fonts: **Cormorant Garamond** + *Avenir Light*.
- **Colours: deep green `#244036` / `#244C49`, cream `#FDF9F7`,
  blush `#FFF5F0`, gold `#C6A56A`.** This is the closest match to the owner's
  green preference.
- **Full-screen background video** (a waterfall over a mosaic wall with
  tropical plants) behind "WELCOME TO THE PEARL / *A sanctuary for
  self-care*" and a dark green **BOOK AN EXPERIENCE** button. **This is the
  background video the developer mentioned, similar to Elite Dental Lab.**
- Under the hero, a category strip (Spa / The Healing Waters / Movement…),
  then **"What do you need today?"** ("Rest. Relief. Movement. Connection.
  Reset."), a seasonal spotlight, and a Memberships / Gatherings / Packages
  trio with dark green buttons.
- **Taken:** the overall direction: video hero, deep green and cream,
  Cormorant + light sans, and the "What brings you in today?" category
  strip.

---

## 4. Design direction

**"Botanical calm":** The Pearl Spa's video hero and deep greens, rebuilt
in NEHA's own logo colours, with ideas from the other four references
(see "Taken" above).

Principles:
- Green is the dominant tone (owner request): forest teal for the hero
  overlay, CTA band and footer; pale sage and cream for content sections.
- Lime and orange come from the logo and are used sparingly as accents.
- Generous white space, thin rules, outlined buttons, uppercase tracked labels.
- Short, calm copy. Every key screen has a **Book** action.
- Mobile first-class: the hamburger menu appears below 960 px, and phones
  get a still image instead of the video.

---

## 5. Page structure

### `index.html` (home)

| # | Section | Notes |
| --- | --- | --- |
| 0 | Offer bar | Text from `announcement` in `js/config.js` (empty string hides it). |
| 1 | Header | Logo, nav (Services, Menu & Prices, Our Story, Gallery, Visit), "2 Locations" link (or the phone number if there is only one location), **Book Now**. **Transparent over the hero, turns solid cream after 40 px of scroll.** Hamburger menu under 960 px. |
| 2 | Hero | Full-screen muted looping video, dark green gradient overlay, "Natural beauty, *shaped by hand.*", two CTAs, three selling points, pause/play button. |
| 3 | What brings you in today? `#services` | Six icon links: Brows, Face, Lashes, Henna, Skin, Waxing. Each deep-links to a menu tab. |
| 4 | Our Story `#about` | Photo placeholder with an overlapping white card (placeholder text). |
| 5 | Signature services | Six cards: photo, description, "from $X", link to the menu. |
| 6 | The NEHA experience | Three steps: Consult → Thread → Soothe. |
| 7 | Reviews `#reviews` | One featured quote + three cards. **Sample text, not real reviews.** |
| 8 | Gallery `#gallery` | Grid of photo placeholders + Instagram button. |
| 9 | FAQ `#faq` | `<details>` accordion, five questions. |
| 10 | Visit `#visit` | **One card per location**, rendered from `locations` in config: map (when `mapQuery` is set), name, address, phone, hours, *Book here* (or *Send a note* while there is no booking link), *Directions* (Google Maps). Below: email, social links (incl. Yelp), contact form. |
| 11 | CTA band | Book a visit / Gift cards / Walk-ins welcome. |
| 12 | Footer | Logo, tagline, social links, email, Explore links, then one column per location (address, phone, hours). |

### `services.html` (menu & prices)

- Green page hero ("Our *services*") + Book button.
- Accessible tabs: **Threading, Henna, Lashes & Tinting, Facials, Waxing**.
  Each item has a name, dotted line, price, optional description and
  duration. **All prices are samples.**
- The URL hash opens a tab: `services.html#threading`, `#henna`, `#lashes`,
  `#skin`, `#wax`.
- The page was first generated from a Python list. It is now maintained by
  hand as plain HTML.

---

## 6. Code organisation

```
index.html            Home page
services.html         Menu & prices
css/styles.css        All styles; design tokens at the top, responsive rules at the bottom
js/config.js          ★ Business details (phone, address, hours, booking URL, offer…)
js/site.js            Shared chrome: header, mobile menu, footer, CTA band, booking links,
                      map embed, scroll reveal, ?review placeholder outlines
js/main.js            Menu tabs, hero video logic, contact-form validation
assets/img/           neha-mark.svg, neha-mark-light.svg, leaf-line.svg (decorative),
                      hero-poster.jpg, logo-original.png
assets/video/         hero-loop.mp4 (placeholder; see §8)
tests/static-audit.mjs   Repository checks (npm test)
.github/workflows/quality.yml   Runs npm test on pushes to main and on pull requests
wrangler.jsonc, .assetsignore   Optional Cloudflare Workers static-assets deploy
.nojekyll             Tells GitHub Pages to serve files as-is
AGENTS.md / CLAUDE.md Working rules for AI coding agents
```

### How the pages fit together
- Each page has `<div id="neha-header"></div>` before `<main>` and
  `<div id="neha-footer"></div>` after it. `js/site.js` replaces them with the
  header and the CTA band + footer.
- `<body class="header-over-hero">` makes the header start transparent
  (both current pages use it, because both open on a dark hero).
- Elements marked `data-book` get the booking URL, and `data-gift` the gift
  card URL. `data-email` gets the email, and `data-socials` gets the list of
  social links. `data-social="instagram"` (any label, lowercase) links to
  that one network, or is hidden if it has no URL. `data-locations` is
  filled with one card per location.
- Scripts load at the end of `<body>` in this order: `config.js`,
  `site.js`, `main.js`. Each URL has a `?v=N` cache-buster: **bump it when
  the file changes.**
- `.reveal` elements fade up on scroll. They are hidden only after JS adds
  `reveal-ready` to `<html>`, so the content still shows if JS fails.
  Reduced-motion users see no animation.

### Hero video rules (`js/main.js`, carried over from Elite)
- The `<video>` has `data-src` instead of `src`. JS attaches the source only
  when the screen is wider than 760 px, the visitor has **not** asked to
  save data, and has **not** asked for reduced motion. Otherwise the poster
  (`assets/img/hero-poster.jpg`) stays up and **nothing is downloaded**.
- The hero also has the poster as a CSS background, so it never flashes empty.
- The pause/play button is shown only while the video can play.

### Security
- Each page has a **Content-Security-Policy `<meta>`**: scripts only from
  this site (plus the Cloudflare analytics beacon), styles from this site and
  Google Fonts, frames only from Google Maps. **No inline `<script>` and no
  `style="…"` attributes.** `npm test` fails on either.
- Prototype pages carry `<meta name="robots" content="noindex, nofollow">`
  so the review link is not indexed. **Remove it at launch.**

### Contact form
- Validation (name, email) is the Elite Dental Lab logic. **Delivery is not
  wired up:** on a valid submit it shows a "this is a preview, your note was
  not sent" notice. See the roadmap.

---

## 7. What was reused from Elite Dental Lab

Elite Dental Lab repo: `Pasha0808/EliteDentalLab` (static HTML/CSS/JS,
Supabase portal, Cloudflare Workers).

| Reused (adapted) | Elite source |
| --- | --- |
| Header/footer injected from one script with mount points | `js/site.js` |
| Mobile menu open/close, Escape, outside-click handling | `js/site.js` |
| Hero video: `data-src`, phone / save-data / reduced-motion rules, pause button | `js/main.js`, `index.html` |
| Accessible tabs (arrow keys, Home/End, `aria-selected`) | `js/main.js` (service tabs) |
| Contact-form name/email validation | `js/main.js` |
| CSP `<meta>` approach, no inline scripts | every page |
| Static audit + GitHub Actions workflow | `tests/static-audit.mjs`, `.github/workflows/quality.yml` |

**Not carried over yet** (can be ported when needed):
- `src/worker.js` contact delivery: a Cloudflare Worker with a Turnstile
  check and Resend email.
- `js/i18n.js` multilingual system (EN/ES/DE with `data-i18n` keys) and the
  language switcher.
- The Desktop/Mobile view toggle in the utility bar.
- Supabase login and case portal (not relevant to a salon).

---

## 8. Placeholders & what is still missing

Open any page with **`?review`** at the end of the address (e.g.
`index.html?review`) to outline every placeholder in orange. `npm test`
also prints how many remain.

| Item | Where | Status |
| --- | --- | --- |
| **Hero video** | `assets/video/hero-loop.mp4` | Placeholder: the *Sharq Village & Spa* (Ritz-Carlton) promo clip supplied by the developer, trimmed to 0–16.9 s to cut the hotel's end logo, muted, 1280×720 H.264, 0.5 s fades. **It belongs to that hotel. Do not launch with it.** Ask the salon for 10–20 s of calm footage (threading close-up, treatment room, plants, aloe). |
| Hero poster | `assets/img/hero-poster.jpg` | Frame at 1.2 s of the video above. Regenerate with the new video. |
| Photos | Every `.ph-photo` tile (green gradient + label) | Salon interior, each service, before/after, treatment room, front desk, henna art, lashes |
| **Both locations**: name, address, phone, hours, map address | `locations` in `js/config.js` (`// TODO`) | Copy from nehathreading.com. Third-party listings (MapQuest/Yelp aggregators) show *Neha Threading Salon and Spa, 1501 Reisterstown Rd, Pikesville, MD 21208* (Yelp 4.5★, 188 reviews). **Unverified; confirm against their site.** |
| Email | `email` in config | Copy from nehathreading.com |
| Social links: Instagram, Facebook, **Yelp**, Google, TikTok | `socials` in config | Copy from nehathreading.com. Empty URLs are hidden. |
| Booking system & link | `bookingUrl` in config (or per location) | Copy from nehathreading.com if they book online. While empty, Book buttons scroll to *Visit*. |
| Gift cards link | `giftCardUrl` in config | Unknown |
| New-client offer | `announcement` in config | "15% off first visit" is a **sample** borrowed from the references. Confirm or set `""`. |
| Services & prices | `services.html`, home service cards | **Sample prices.** Replace with the real list and prices from nehathreading.com |
| Owner story | Home *Our Story* card | Generic text; owner's name and story needed |
| Reviews | Home *Reviews* | **Sample text. Must be replaced with real Google reviews before launch.** |
| "Walk-ins welcome", "most services in 15 minutes", "sensitive-skin friendly" | Hero, CTA band, FAQ | Assumptions; confirm with owner |
| Logo file | `assets/img/logo-original.png` | Low resolution; ask for vector |
| Domain | — | Unknown |

---

## 9. Run, check and preview

Requirements: Node.js 20+ (checks only) and Python 3 (local server). Nothing
to install.

```bash
npm start          # serves the site at http://127.0.0.1:4173/
```

```bash
npm test           # static audit
```

`npm test` checks:
- every local `src` / `href` / `poster` / `data-src` and every CSS `url()` exists
- every page has `lang`, `<title>`, a meta description and a CSP
- no inline scripts or inline styles
- all JS files parse
- it also prints the count of placeholders and `TODO` config values

Screenshots during development were taken with Playwright (pre-installed in
the cloud environment), at 1440×900 desktop and iPhone 13. Check for no
horizontal overflow on mobile.

---

## 10. Hosting & deployment

### GitHub Pages (review link for the salon owner)

The site is fully static with relative links, so it runs from the
`/Spa_Salon_N/` sub-path with no changes.

**One-time setup (repo owner, in the browser):**
1. Open <https://github.com/Pasha0808/Spa_Salon_N/settings/pages>.
2. *Build and deployment* → **Source: Deploy from a branch**.
3. **Branch: `main`**, folder **`/ (root)`** → **Save**.
4. After a minute or two the site is live at
   **<https://pasha0808.github.io/Spa_Salon_N/>** (menu page:
   `…/Spa_Salon_N/services.html`). Every push to `main` republishes it.

Notes:
- `.nojekyll` makes Pages serve the files exactly as they are.
- Branch publishing serves the whole repository, so `README.md`, `docs/`
  and `tests/` are reachable by URL too. Harmless for a prototype.
- The placeholder hero video is publicly reachable on Pages. Replace it
  with the salon's own footage before sharing widely.

### Cloudflare Workers (optional, for production)
`wrangler.jsonc` publishes the repository root as static assets, excluding
the files in `.assetsignore`. It is the same host as Elite Dental Lab.
Import the repository in Cloudflare → Workers & Pages with no build
command. **Not yet tested.** Use this host when the contact-form Worker is
ported.

---

## 11. How-to recipes

**Change business details:** edit `js/config.js`, then bump `config.js?v=` in both pages.

**Add or remove a location:** add or remove an object in `locations` in
`js/config.js`. The Visit cards, footer columns and the header "N Locations"
link all update automatically. Set `mapQuery` to the full street address to
show its map.

**Turn on online booking:** set `bookingUrl` in `js/config.js`. Every Book
button opens it in a new tab.

**Add or edit a service:** in `services.html`, copy an `<li class="menu-item">`
inside the right panel. Keep the `menu-line` → `h3` / `menu-dots` /
`menu-price` structure. Update the matching home card in `index.html` if it
is a featured service.

**Add a menu tab:** add a `<button role="tab" id="tab-X" data-tab="X"
aria-controls="panel-X">` in `.menu-tabs` and a matching
`<div class="menu-panel" role="tabpanel" id="panel-X" aria-labelledby="tab-X">`.
The tab JS picks it up automatically. Link to it with `services.html#X`.

**Replace a photo placeholder:** swap `<div class="ph-photo" data-label="…">`
for `<img src="assets/img/….jpg" alt="…" loading="lazy">`. Give it the same
sizing class (e.g. `story-photo`, or wrap it to keep the aspect ratio) and add
`object-fit: cover` if needed. Compress photos to ~200 KB (≈1600 px wide).

**Replace the hero video:**
```bash
ffmpeg -i source.mp4 -t 17 -an -vf "fps=25,scale=1280:-2,fade=t=in:st=0:d=0.5,fade=t=out:st=16.4:d=0.6,format=yuv420p" -c:v libx264 -crf 26 -preset slow -movflags +faststart assets/video/hero-loop.mp4
```
```bash
ffmpeg -ss 1.2 -i assets/video/hero-loop.mp4 -frames:v 1 -q:v 4 assets/img/hero-poster.jpg
```
Then bump `hero-loop.mp4?v=` in `index.html`. Aim for 1–3 MB. Use H.264,
because Safari does not play AV1 everywhere.

**Change colours or fonts:** edit the `:root` tokens at the top of
`css/styles.css`. If you change fonts, update the Google Fonts `<link>` in
both pages.

**Mark new placeholder content:** add `data-placeholder="What it is"` to the
element so `?review` and `npm test` count it.

---

## 12. Roadmap

- [ ] Owner reviews the prototype on GitHub Pages; collect feedback
- [ ] Real business details in `js/config.js`
- [ ] Real hero video + poster; real photos
- [ ] Real service list and prices
- [ ] Owner story, real Google reviews
- [ ] Booking system link and gift cards
- [ ] Contact form delivery: port the Elite Cloudflare Worker (Turnstile + Resend) to `/api/contact`
- [ ] Production hosting (Cloudflare Workers like Elite) and custom domain
- [ ] SEO at launch: remove `noindex`, add canonical + absolute `og:image`, LocalBusiness/BeautySalon JSON-LD (as Elite has), `sitemap.xml`, `robots.txt`
- [ ] Optional: Spanish (or other) translation via Elite's `i18n.js`
- [ ] Optional: About/team page, gift card page, bridal henna page

---

## 13. Project history

| Date | Change |
| --- | --- |
| 2026-11-07 | Repository created. First prototype: home page, menu page, vector logo mark, green palette, generated ambient placeholder video, static audit, CI, Cloudflare config, client brief. |
| 2026-11-07 | Placeholder video replaced with the supplied Sharq spa promo clip (logo trimmed, muted, H.264). |
| 2026-11-07 | GitHub Pages preparation (`.nojekyll`, `noindex` for the review link). Client brief merged into this README; `AGENTS.md` added for AI agents. |
| 2026-11-07 | Two-location support (Visit cards with map/directions/booking, footer columns, "2 Locations" header link) and social links incl. Yelp, all from `js/config.js`. Current site nehathreading.com recorded as the facts-only source. Its firewall blocks automated access, so the real details are still pending. |
