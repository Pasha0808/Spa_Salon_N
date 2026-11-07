# NEHA Threading

Website for NEHA Threading, a threading salon and spa. Static HTML, CSS and
vanilla JavaScript, built on the same approach as the Elite Dental Lab site:
shared header and footer injected by `js/site.js`, a full-screen hero video
that phones never download, strict Content-Security-Policy, and no build step.

**Status: prototype.** Content marked as a placeholder still has to be
replaced; see [docs/client-brief.md](docs/client-brief.md) for the owner's
preferences, the reference sites and the list of what we still need.

## Run locally

```bash
npm start
```

Then open <http://127.0.0.1:4173/>. Add `?review` to any URL
(e.g. `/index.html?review`) to outline every placeholder on the page.

## Where things live

| File | Purpose |
| --- | --- |
| `js/config.js` | Business details: phone, address, hours, booking URL, gift card URL, offer bar. Change them here once and every page updates. |
| `js/site.js` | Header (transparent over the hero, solid on scroll), mobile menu, footer, booking links, scroll reveal. |
| `js/main.js` | Hero video rules, menu tabs, contact-form validation (all carried over from Elite). |
| `css/styles.css` | Design tokens at the top (`--forest`, `--lime`, `--sun`…), then components. |
| `index.html` | Home page. |
| `services.html` | Menu & prices with tabs; `services.html#lashes` opens a tab directly. |
| `assets/img/neha-mark.svg` | Vector redraw of the leaf mark (favicon too). |
| `assets/video/hero-loop.mp4` | **Placeholder** ambient loop (generated). Replace with real salon footage, keep the poster in `assets/img/hero-poster.jpg` in step. |

## Booking

Set `bookingUrl` in `js/config.js` to the salon's online booking page and
every "Book" button opens it in a new tab. While it is empty the buttons
scroll to the Visit section.

## Contact form

Validation works, but messages are **not delivered yet**: the form shows a
"preview" notice. To go live, port the Elite Dental Lab Cloudflare Worker
(`src/worker.js`: Turnstile check + Resend email) and point it at the salon
inbox.

## Checks

```bash
npm test
```

Verifies local links and asset references, CSP / title / description on each
page, no inline scripts or styles, JavaScript syntax, and prints how many
placeholders remain. GitHub Actions runs the same on pushes and pull requests.

## Deploy

`wrangler.jsonc` publishes the repository root as Cloudflare Workers static
assets (files in `.assetsignore` are excluded), the same host as Elite.
Connect the repository in Cloudflare → Workers & Pages → Create → Import a
repository, with no build command.
