# Neha Salon & Spa: website

A website for **Neha Salon & Spa** in Pikesville, Maryland. It is
built the same way as the earlier
[Elite Dental Lab](https://github.com/Pasha0808/EliteDentalLab) site: static
HTML, CSS and vanilla JavaScript, with no framework, no build step and no
dependencies.

> **Status: prototype under client review.** The structure and design are
> in place. Much of the content is still placeholder, and the hero video is
> a borrowed stand-in.

- **Review link:** <https://pasha0808.github.io/Spa_Salon_N/>
- **What was asked for, decisions, business facts, open items:**
  **[PROJECT_BRIEF.md](PROJECT_BRIEF.md)** (read this first)
- **Rules for AI coding agents:** [AGENTS.md](AGENTS.md)

This README covers how the code works.

## Contents

1. [Run, check and preview](#1-run-check-and-preview)
2. [Files](#2-files)
3. [How the pages fit together](#3-how-the-pages-fit-together)
4. [The settings file](#4-the-settings-file-jsconfigjs)
5. [Forms](#5-forms)
6. [Design system](#6-design-system)
7. [Hero video](#7-hero-video)
8. [Security and search engines](#8-security-and-search-engines)
9. [Placeholders](#9-placeholders)
10. [Hosting](#10-hosting)
11. [How-to recipes](#11-how-to-recipes)
12. [What came from Elite Dental Lab](#12-what-came-from-elite-dental-lab)
13. [History](#13-history)

---

## 1. Run, check and preview

Requirements: Node.js 20+ (checks only) and Python 3 (local server).
Nothing to install.

```bash
npm start
```

Then open <http://127.0.0.1:4173/>.

```bash
npm test
```

`npm test` checks that:
- every local link, image, video and CSS `url()` points at a real file
- every page has a language, title, description and security policy
- there are no inline scripts or inline styles
- every page has the shared header/footer mount points and scripts
- every service in `js/config.js` has its own page
- every specialist service has prices or is explicitly marked pending
- all JavaScript parses

It also prints how many placeholders remain. GitHub Actions runs the same
checks on pushes to `main` and on pull requests.

---

## 2. Files

```
index.html                Home
services.html             The 12 services
threading.html … slimming-treatments.html   One page per service (12)
about.html                About Us (story + The Founder at #founder)
specialists.html        Our Specialists (everyone, with links to book)
specialist.html         One template for every specialist: ?p=<slug>
careers.html              Careers (with enquiry form)
gift-certificates.html    Gift Certificates (out of the menu; linked by the facts strip and footer)
contact.html              Contact Us (details, form, map, FAQ)
booking.html              Book a Visit (booking request form)

css/styles.css            All styles: tokens at the top, responsive rules at the bottom
js/config.js              ★ Business details, the service list, product brands
js/specialists.js         ★ The specialists: their services, prices and work photos
js/i18n.js                Spanish copy and language selection (switched off; English only)
backups/                  Sections taken off the site but kept, with restore notes
js/site.js                Header, menus, footer, and everything filled in from config
js/main.js                Hero video rules and the request forms

assets/img/               neha-mark.svg (logo mark + favicon), leaf-line.svg
                          (leaf drawing for backgrounds), hero-poster.jpg, logo-original.png
assets/img/products/      The four brand pictures in the home page strip
assets/img/gallery/       Eight supplied photos used by Fresh from the chair
assets/img/services/      Five generated home-service photographs, 900 × 780 WebP
assets/img/team/          Supplied real-team portraits, optimized to 800 × 1000 WebP
assets/img/specialists/   Legacy fictional samples; retained but no longer used
assets/video/             hero-loop.mp4 (placeholder)

tests/static-audit.mjs    npm test
.github/workflows/quality.yml   CI
PROJECT_BRIEF.md          Requests, decisions, facts, open items
AGENTS.md / CLAUDE.md     Rules for AI coding agents
wrangler.jsonc, .assetsignore   Optional Cloudflare deploy (untested)
.nojekyll                 Tells GitHub Pages to serve files as they are
```

The image folders include their own `README.md` manifests with source
mapping and generation notes where applicable.

---

## 3. How the pages fit together

Every page has the same skeleton:

```html
<body class="header-over-hero">
<div id="neha-header"></div>
<main id="main"> … </main>
<div id="neha-footer"></div>
<script src="js/config.js?v=13"></script>
<script src="js/specialists.js?v=4"></script>
<script src="js/i18n.js?v=8"></script>
<script src="js/site.js?v=17"></script>
<script src="js/main.js?v=6"></script>
```

`js/site.js` replaces the two mount points with the offer bar + header and
the gift band + footer. So the **menu and footer are edited in
one place**, `js/site.js`.

- `class="header-over-hero"` makes the header start transparent over the
  dark page heading and turn solid white on scroll. Every page uses it.
- `data-no-cta` on `<body>` leaves out the "Give the Gift of Self Care"
  band above the footer (used on `booking.html` and `gift-certificates.html`).
- The `?v=N` on CSS and JS addresses is a cache-buster. **Raise it on every
  page when that file changes**, or returning visitors see the old version.

### Languages: English only (Spanish switched off)

The EN / ES switch was removed at the developer's request (2026-11-11).
`languageSwitch: false` in `js/config.js` makes `js/i18n.js` always use
English and ignore `?lang=es` and any stored choice, and `js/site.js` does
not draw the header control.

The Spanish layer is still in the code, dormant:
- Shared/static copy: the `ES` dictionary in `js/i18n.js`.
- Services: `nameEs`, `tagEs` and `blurbEs` in `js/config.js`.
- Specialists: optional `nameEs`, `titleEs`, `bioEs` and `noteEs` fields in
  `js/specialists.js`.

Setting `languageSwitch: true` brings the switch back. Text added after
2026-11-11 (Home, the hero selling points, the facts strip, the "Our
services" cards, the gift band) is not complete in Spanish and would need
review before the switch is re-enabled.

### Hooks filled in from `js/config.js`

Put these attributes in a page and `js/site.js` fills them:

| Attribute | Becomes |
| --- | --- |
| `data-phone` (on a link) | Phone number and `tel:` link |
| `data-email` (on a link) | Email address and `mailto:` link |
| `data-address` | Street address, two lines |
| `data-hours` (on a `<ul class="hours-list">`) | Opening hours |
| `data-spa-hours` (on a `<ul class="hours-list">`) | Spa hours, by appointment only |
| `data-directions` (on a link) | Google Maps directions |
| `data-map` | Google Maps embed |
| `data-socials` | All social links |
| `data-social="instagram"` (on a link) | That one network's address |
| `data-gift-shop` (on a link) | The online gift card shop |
| `data-service-tiles="featured"` / `="detailed"` | Five photographic home highlights / all 12 Services-page cards |
| `data-other-services` | Links to every service except the current page |
| `data-service-options` | The booking form's service checkboxes with "About this service" links |
| `data-products` (on the strip's `<ul>`) | The product strip items |
| `data-service-pros="<slug>"` | Service pages: a row for each specialist who offers that service |
| `data-pro-list` | The cards on the Our Specialists page |
| `data-pro-page` | The whole body of `specialist.html` |
| `data-pro-name`, `data-pro-title` | The specialist's name and role in that page's heading |
| `data-pro-select` (on a `<select>`) | The booking form's specialist dropdown |

### Menus

- Items: Home, Services (submenu of the 12 services), Our Specialists,
  About Us (submenu: The Founder, Careers), Contact Us, and the Book Now
  button. Gallery and Gift Certificates are not in the menu.
- The header was enlarged by 25% on 2026-11-11 (logo 62 px, menu text
  0.98 rem, header 104 px tall), and its container is wider (1400 px).
- Desktop: "Services" and "About Us" are normal links. Their submenus open
  on hover and on keyboard focus.
- Below 1340 px the menu becomes a panel behind the ☰ button, and each
  submenu opens with its small arrow button.
- The service submenu, footer service list and booking checkboxes come from
  `services` in `js/config.js`; the five home photographs come from
  `homeServiceHighlights`.
- The header has no phone number (dev request). The phone is in the footer
  and on the Contact and Booking pages.

### Specialists and prices

Prices belong to specialists, not to services. Everything comes from
`js/specialists.js` (the fields are explained at the top of that file).

- **Service page:** `data-service-pros` lists who offers the service, with
  their role, **Prices & Work** and **Book with …**. It shows **no prices**
  on purpose: visitors should choose a specialist for their work, not for
  the lowest price. A service nobody offers shows an invitation to send a
  request.
- **Our Specialists** (`specialists.html`): a portrait card per person.
- **A specialist's page** is one template, `specialist.html`. The
  address picks the person: `specialist.html?p=<slug>`. Adding
  `&service=<slug>` lists that service first. The page shows their services
  and prices at the top and their work photos at the bottom. An unknown
  slug shows a "couldn't find" message with a link to the team page.
- **Booking links** carry the choice: `booking.html?pro=<slug>&service=<slug>`.
- **Current team:** all 11 entries are real people from the owner-supplied
  files; no sample profile is rendered. Destiny and Rosemary are marked
  `incomplete: true` because only their portraits were supplied. Price
  groups that were named without prices use `pending: true`, and the UI
  says the details are being confirmed instead of inventing a menu.
- The Our Specialists grid is limited to three columns on wide screens,
  two on tablets and one on phones.

### Home page sections

In order: video hero with three selling points (`.hero-features`), the
facts strip (`.info-strip`), "Our services" photo cards
(`.services-showcase`), the gallery, one slim row of reviews
(`.reviews-slim`), the product strip. The "Give the Gift of Self Care" band
(`.gift-band` + `.gift-banner`, generated in `js/site.js`) sits above the
footer on every page except Booking and the Gift Certificates page itself.

The five "Our services" cards come from `homeServiceHighlights` in
`js/config.js`. To change a card's photo, update its `img` and `alt` fields.

**Backup:** the earlier "What brings you in today?" icon row is saved in
`backups/what-brings-you-in.html`, with restore instructions at the top.
Its styles (`.needs…`) and its code (`data-service-tiles`, `ICONS`) are
still in place, so restoring it is a paste.

### Product strip (home page)

A row of square tiles that scrolls sideways on its own (pure CSS animation).
The full animation takes 67.5 seconds, 50% longer than the previous
45-second cycle for a noticeably calmer pace.
It pauses on hover and with its pause button. For visitors who ask their
device to reduce motion, it does not move and can be swiped. A product with
an `img` shows the picture; without one it shows the brand name.

---

## 4. The settings file: `js/config.js`

| Setting | What it controls |
| --- | --- |
| `name`, `tagline`, `email` | Used in the header, footer and forms |
| `locations` | One entry (Pikesville): address, phone, map address, hours. The first entry is used everywhere |
| `locations[0].spaHours` | Spa-only hours shown on Contact; every entry is by appointment only |
| `formEndpoint` | Where forms are sent. Empty = open the visitor's email app (see §5) |
| `giftCardUrl` | The "Choose a Design" button on the gift certificates page |
| `socials` | Footer and Contact page links. An empty `url` hides that network |
| `announcement` | Text of the top bar. `""` hides the bar |
| `services` | **The complete service list.** `slug` is the page's file name without `.html`; `tag` and `blurb` feed the Services page and shared UI |
| `homeServiceHighlights` | The five photo-led home cards: destination service, image, alt text, name and short description in both languages |
| `products` | Brands in the home page strip: `name`, `kind`, optional `img` |
| `specialistsLabel` | The menu name of the team page ("Our Specialists") |

---

## 5. Forms

Three forms share one handler in `js/main.js`: booking (`booking.html`),
contact (`contact.html`) and careers (`careers.html`). Any
`<form data-request-form="Subject">` is picked up.

- Name and email are always validated (the checks come from Elite).
- `data-require-services` on the form means at least one service must be ticked.
- Each field's `data-label` is the label used in the email.
- **Delivery:**
  - `formEndpoint` empty (now): the visitor's email app opens with the
    request written and addressed to `email`. The visitor presses Send.
  - `formEndpoint` set: the form POSTs
    `{ "subject": "…", "fields": { "Name": "…", … } }` as JSON and shows a
    thank-you message. The server must send the email. Elite's Cloudflare
    Worker (`src/worker.js`, Turnstile + Resend) is the model; when it is
    ported, add its origin to `connect-src` in every page's security policy
    and add spam protection.

`booking.html?service=<slug>` ticks that service, and `&pro=<slug>` selects
that specialist in the dropdown. Service and specialist pages link to
it that way.

---

## 6. Design system

"Botanical calm": soft, with crisp details. The reasoning and the rejected
hard-edged version are in the brief, §4.

| Token (`css/styles.css`) | Value | Use |
| --- | --- | --- |
| `--forest` | `#626548` | Warm olive: buttons, links, labels and call-to-action band |
| `--forest-deep` / `--forest-ink` | `#4c5038` / `#2f3427` | Hover / footer, offer bar, hero overlay |
| `--lime` / `--lime-soft` | `#d2cda8` / `#eee9d9` | Khaki accents on dark / notices and selected options. Never text on a light background |
| `--sun` | `#a87849` | Muted bronze: stars and tiny accents |
| `--cream` / `--mist` | `#f7f3ed` / `#ebe6d9` | Page background / alternating warm sections |
| `--ink` / `--ink-soft` | `#282a22` / `#5b5b50` | Text |
| `--radius`, `--shadow` | `6px`, soft | Rounded corners and soft shadows on cards |

- **Headings:** Cormorant Garamond, mixed case, weight 500, italic `<em>` accents.
- **Body, menu, buttons, wordmark:** Jost, weight 400.
- Cards are white with a soft shadow and no border. Sections alternate
  cream and `.section-mist`.
- Remaining photo placeholders (`.ph-photo`) are warm olive gradient tiles with
  a leaf drawing (`assets/img/leaf-line.svg`) and a label. The home gallery
  and real-team portrait cards use optimized WebP photography.
- Service icons are small line drawings in `js/site.js` (`ICONS`), keyed by
  the service's slug. A service without one gets a leaf.
- Useful classes: `.section`, `.section-mist`, `.page-hero`,
  `.home-services-grid` / `.home-service-card` (photo-led home services),
  `.gift-banner` (home and Gift Certificates page), `.service-cards`
  (Services page), `.split`
  (photo + text), `.card`, `.service-layout` (content + side panel),
  `.menu-list` (price list with dotted lines), `.notice-soon`,
  `.request-form`, `.ph-photo`.

A price list item:

```html
<li class="menu-item">
  <div class="menu-line"><h3>Hot Stone Massage</h3><span class="menu-dots" aria-hidden="true"></span><span class="menu-price">$145</span></div>
  <p>Short description.</p>
  <p><span class="dur">75 min</span></p>
</li>
```

---

## 7. Hero video

- `assets/video/hero-loop.mp4`: **placeholder.** It is the *Sharq Village &
  Spa* promo clip supplied by the developer: first 16.9 s (the hotel's end
  logo is cut), no sound, 1920×1080 H.264, lightly sharpened, 3 MB.
  **It belongs to that hotel and must be replaced before launch.**
- `assets/img/hero-poster.jpg`: a still from the clip, shown before the
  video loads and on phones.
- Rules (`js/main.js`, from Elite): the `<video>` has `data-src`, not
  `src`. The source is attached only on screens wider than 760 px, and only
  if the visitor has not asked to save data or reduce motion. **Phones
  never download the video.**

---

## 8. Security and search engines

- Every page has a Content-Security-Policy `<meta>`: scripts only from this
  site, styles from this site and Google Fonts, frames only from Google
  Maps. **No inline `<script>` and no `style="…"`.** `npm test` fails on
  either. A new outside service needs its origin added on every page.
- Every page has `<meta name="robots" content="noindex, nofollow">` while
  the site is a prototype. **Remove it at launch.**

---

## 9. Placeholders

- Anything unconfirmed carries `data-placeholder="…"`. Add `?review` to a
  page address (e.g. `index.html?review`) to outline them in orange.
- Photo placeholders are `.ph-photo` tiles (a green gradient with a label).
- `// TODO` comments in `js/config.js` mark settings still to confirm.
- The list of what is still needed is in
  [PROJECT_BRIEF.md §7](PROJECT_BRIEF.md#7-open-items).

---

## 10. Hosting

**GitHub Pages (live):** Settings → Pages → "Deploy from a branch" →
`main`, `/ (root)`. Every push to `main` republishes
<https://pasha0808.github.io/Spa_Salon_N/> within a minute or two. All links
are relative, so the site works under that sub-path.

**Cloudflare Workers (optional, untested):** `wrangler.jsonc` publishes the
repository root as static assets, without the files in `.assetsignore`.
This is the likely production host, because the form server can live there.

At launch: remove `noindex`, add canonical addresses, a sitemap and
LocalBusiness data (as Elite has), and redirect the old site's addresses
(`/massages`, `/facials`, `/pikesville-services` → `threading.html`,
`/microblading-pikes` → `microblading.html`, `/the-spa` → `about.html`,
`/contact` → `contact.html`).

---

## 11. How-to recipes

**Add a specialist:** add a block to `REAL_SPECIALISTS` in
`js/specialists.js`, following the example in that file's header: `slug`,
`name`, `title`, `bio`, `photo` (about 800 × 1000 px, in `assets/img/team/`),
their `services` with their own `items` (name, price, time, note) and their
`work` photos (square, in `assets/img/team/work/`). No new page is needed.
Then raise `specialists.js?v=` in every page.

**Change someone's prices, or remove them:** edit or delete their block in
`js/specialists.js`.

**Fill in a service page** (e.g. `facials.html`): replace the
`<p data-placeholder="Service details">` text and remove that attribute.
Prices do not go here; they come from the specialists who list the service.

**Add a service:** add `{ slug, name, tag, blurb }` to `services` in
`js/config.js`, copy an existing service page to `<slug>.html` and edit its
title, description, heading and the `booking.html?service=<slug>` link.
Optionally draw an icon for it in `ICONS` in `js/site.js`. Menus, icons,
footer and booking form update on their own.

**Rename or remove a service:** edit or delete its entry in `services` and
rename or delete its page.

**Add a product picture:** save a square image (about 600 × 600 px) in
`assets/img/products/` and set `img: "assets/img/products/davines.jpg"` on
that product in `js/config.js`.

**Replace a photo placeholder:** swap
`<div class="ph-photo …" data-label="…">` for
`<img class="…" src="assets/img/….jpg" alt="…" loading="lazy">`, keeping
the sizing class (`split-photo`, or a gallery class). Add
`object-fit: cover` for that class if needed. Keep photos around 200 KB.

**Change the menu or footer:** edit `headerHTML` / `footerHTML` in `js/site.js`.

**Replace the hero video:**

```bash
ffmpeg -i source.mp4 -t 17 -an -vf "fps=25,scale=1920:-2,fade=t=in:st=0:d=0.5,fade=t=out:st=16.4:d=0.6,format=yuv420p" -c:v libx264 -crf 24 -preset slow -movflags +faststart assets/video/hero-loop.mp4
```

```bash
ffmpeg -ss 1.2 -i assets/video/hero-loop.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 assets/img/hero-poster.jpg
```

Then raise `hero-loop.mp4?v=` in `index.html`. Aim for under 4 MB. Use
H.264; AV1 does not play everywhere in Safari.

**Mark new unconfirmed content:** add `data-placeholder="What it is"`.

---

## 12. What came from Elite Dental Lab

| Reused (adapted) | Elite source |
| --- | --- |
| Header/footer injected by one script | `js/site.js` |
| Mobile menu and dropdown handling | `js/site.js` |
| Hero video rules and pause button | `js/main.js` |
| Form name/email validation | `js/main.js` |
| Security policy approach, no inline scripts | every page |
| Static audit and CI workflow | `tests/static-audit.mjs`, `.github/workflows/quality.yml` |

Not carried over (available to port): the contact-form Cloudflare Worker
(`src/worker.js`), the EN/ES/DE translation system (`js/i18n.js`), the
Desktop/Mobile view toggle, and the Supabase portal (not relevant here).

---

## 13. History

| Date | Change |
| --- | --- |
| 2026-11-07 | First prototype: home page, tabbed menu page, vector logo mark, green palette, static audit, CI. |
| 2026-11-07 | Placeholder hero video from the supplied Sharq spa clip. GitHub Pages set up. |
| 2026-11-07 | Two-location support and social links from `js/config.js`. |
| 2026-11-08 | Real facts from nehathreading.com: addresses, phones, hours, maps, socials, story, reviews, massage prices. 15% offer confirmed. |
| 2026-11-10 | **Owner feedback round 2.** Sharper Craft-style redesign (Bodoni Moda capitals, black-green and white, leaf background, square edges, 1080p video). Home page cut to about half its length. One location (Canton closed). New menu: Services ▾, About Us ▾ (The Founder, Our Team, Careers), Gallery, Gift Certificates, Contact Us, Book Now. New pages: 12 service pages, About, Team, Careers, Gift Certificates, Contact, Booking. Booking is an email request form with a link under each service. Product strip with the salon's four brands. Requests and decisions moved to `PROJECT_BRIEF.md`. |
| 2026-11-10 | **Back to the soft style, keeping the sharpness.** The Craft-style look was rejected: Cormorant Garamond headings, cream and sage, rounded corners and soft shadows are restored. "What brings you in today?" is an icon row again, now for all 12 services; the Services page uses matching icon cards. Kept: 1080p video, lighter hero overlay, darker text. Phone number removed from the header. |
| 2026-11-10 | **Compact home-page sections.** The 12 service icons use one wide desktop row with tighter spacing, making “What brings you in today?” about half as tall. The products intro is a compact two-column heading/description on desktop; brand tile sizes are unchanged. |
| 2026-11-10 | **Homepage reorder and full-site audit.** Gallery moved above reviews; products moved below reviews. Removed the product description and gallery Instagram CTA, and tightened product-section spacing without changing tile sizes. Audited all 20 pages at desktop, 390 px and 320 px; fixed narrow-phone overflow, duplicate carousel announcements for screen readers and a hard-coded FAQ phone number. Remaining recommendations are in `PROJECT_BRIEF.md` §7. |
| 2026-11-10 | **Specialists with their own prices.** New `js/specialists.js`, an Our Specialists page and one template page for every specialist (prices on top, work photos below). Service pages list the specialists who offer the service. The booking form has a specialist dropdown, preselected from "Book with …" links. Menu: Our Specialists added after Services; Our Team and Gift Certificates removed. "What brings you in today?" is a slim one-row band. Product strip uses the four supplied brand pictures. |
| 2026-11-10 | **Renamed to "Our Specialists".** The team page, each person's page and the data file are now `specialists.html`, `specialist.html` and `js/specialists.js`; all visible wording says "specialist". CSS classes and `data-` hooks keep their short `pro-` prefix. |
| 2026-11-11 | **No prices on service pages; five specialists per service; Gallery out of the menu.** "from $…" removed from the "Choose your specialist" rows. The sample team is now 24 generated placeholders, with a `REAL_SPECIALISTS` list ready for real people. Our Specialists shows four cards per row. |
| 2026-11-10 | **Larger service choices, bilingual site and photography.** Home service icons and labels are 50% larger, with a stronger heading and responsive columns. Added persistent EN/ES switching and Spanish copy across navigation, pages, forms and specialist menus. Added six supplied WebP gallery images and 24 distinct fictional AI sample portraits. Verified desktop and exact 390 px layouts in both languages; `npm test` passes all 21 pages. |
| 2026-11-10 | **Full-width home grids and clearer specialist spacing.** Added two supplied treatment-room photos as WebP, rebuilt Fresh from the chair as a hole-free eight-cell grid that uses the viewport width, and changed the service choices to one 12-item desktop row with fluid icon sizing. Increased the vertical separation between specialist cards and service-page specialist rows. |
| 2026-11-10 | **Quieter language switch.** Replaced the two-option `EN / ES` control with one compact translucent pill that shows the active code, previews the alternate language on hover/focus and toggles on click or tap. |
| 2026-11-10 | **Explicit language dropdown.** Replaced the hover-swap interaction with a translucent circular control and an `EN` / `ES` dropdown. Both language URLs are now explicit, fixing the return from Spanish to English. |
| 2026-11-11 | **Owner's layout example applied.** Home tab added first; menu and logo 25% larger (menu collapses below 1340 px). Hero: three selling points replace the bullet points, "Pikesville" added to the text. New facts strip under the video. "What brings you in today?" replaced by "Our services" photo cards (old section kept in `backups/`). Reviews reduced to one slim row. The band above the footer is now "Give the Gift of Self Care", linking to the gift certificates page. Language switch removed; English only, Spanish kept dormant. |
| 2026-11-11 | **Renamed to "Neha Salon & Spa".** Titles, descriptions, body text, footer and the logo wordmark (NEHA / SALON & SPA). The web address, email and social handles are unchanged. |
| 2026-11-11 | **Real team, menus and warm khaki refresh.** Replaced 24 fictional samples with 11 owner-supplied specialists and their available menus, clearly marking incomplete roles and price groups. Added spa hours, real founder/team portraits, substantive service-page copy, and updated service category names. Limited the team grid to three cards per desktop row. Restyled the site in warm khaki/olive, generated five original home-service photographs, rebuilt that section as a wider and slimmer showcase, and replaced the gift area with an original “Give the Gift of Self Care” banner. |
| 2026-11-11 | **Slower handpicked-products strip.** Increased its CSS animation cycle from 45 to 67.5 seconds while preserving hover pause, the pause button and reduced-motion behaviour. Updated the audit to accept price groups explicitly marked pending while still rejecting accidental empty menus. |
