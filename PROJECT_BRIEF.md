# Project brief: Neha Salon & Spa website

**Read this first.** It records what the client and the developer asked
for, what was decided, the facts about the business, and what is still
open. How the code works is in [README.md](README.md). Rules for AI coding
agents are in [AGENTS.md](AGENTS.md).

- **Client:** Neha Salon & Spa, Pikesville, Maryland (called "Neha Threading Salon & Spa" until 2026-11-11)
- **Developer / repo owner:** Pasha0808
- **Review link:** <https://pasha0808.github.io/Spa_Salon_N/>
- **Status:** prototype under client review. The real specialist menus and
  portraits supplied on 2026-11-11 are now in the site, along with a warmer
  khaki direction and a new photographic home-services section.

## Contents

1. [Current decisions at a glance](#1-current-decisions-at-a-glance)
2. [Request log](#2-request-log)
3. [Site map](#3-site-map)
4. [Design direction](#4-design-direction)
5. [Reference websites](#5-reference-websites)
6. [Business facts](#6-business-facts)
7. [Open items](#7-open-items)
8. [Ideas not yet requested](#8-ideas-not-yet-requested)

---

## 1. Current decisions at a glance

| Topic | Decision |
| --- | --- |
| Name | **Neha Salon & Spa**. The logo reads NEHA / SALON & SPA. Web address, email and social accounts keep "nehathreading" |
| Look | **Soft "botanical calm" style with crisp details** (§4). The hard-edged Craft-style version was tried and rejected |
| Colour | **Warm khaki and olive green** inspired by the owner's 2026-11-11 reference image, with cream backgrounds and tiny orange accents |
| Hero | Full-screen background video in HD (placeholder clip for now) |
| Home page | Video hero with three selling points → thin facts strip → **five wide photographic service cards** → gallery → one slim row of reviews in italic serif, no boxes (gallery, reviews and products share one background) → product strip → **khaki “Give the Gift of Self Care” band** |
| Header | **No phone number in the menu bar.** Phone is in the footer and on the Contact and Booking pages |
| Languages | **English only.** The EN / ES switch was removed on 2026-11-11. The Spanish text is kept in the code, switched off (`languageSwitch` in `js/config.js`) |
| Locations | **One: Pikesville.** Canton is closed. No "two locations" wording anywhere |
| Menu | **Home** · Services ▾ · **Our Specialists** · About Us ▾ (The Founder, Careers) · Contact Us · **Book Now**. The menu and logo are 25% larger than before. Gallery and Gift Certificates are not menu items |
| Services | 12 services, each with **its own page**. A service page describes the service and lists **the specialists who offer it** |
| Prices | **Per specialist, not one salon price list.** Prices appear **only on a specialist's own page** (prices at the top, work photos below). **Service pages show no prices**, so nobody is picked for being cheapest |
| Booking | **Email request form** on its own page, with service tick boxes and a **specialist dropdown**. The salon does not want an integrated booking service |
| Cancellation policy | **24 hours’ notice.** Full policy appears on Services and Booking; the footer links to it. The original 24/48-hour contradiction was normalized on 2026-11-11 |
| Old website | nehathreading.com is for **facts and prices only. No design inspiration**: the owner dislikes it |
| New-client offer | "New clients enjoy 15% off their first visit" stays |
| Tech | Static HTML/CSS/JS on GitHub Pages, following the Elite Dental Lab site |

---

## 2. Request log

Newest first. "Dev" is the developer; "owner" is the salon owner.

### 2026-11-11 (latest): reviews fill the screen width

- **Fill the screen horizontally with the reviews.** Done: the row of four
  reviews now runs the full width of the screen, like the gallery above it,
  and the lettering grows slightly on wide screens. The section became a
  little shorter as a result (about 310 px on a laptop). Phones keep the
  sideways-swipe row.

### 2026-11-11 (latest): reviews without boxes, one background for three sections

- **Home-page reviews should not sit in boxes; write them in the nice
  calligraphy already used on the site.** Done: the four reviews are set in
  the site's italic serif (the lettering of "shaped by hand." in the hero),
  centred, with thin dividing lines between them and no cards or shadows.
  The section is still one slim row; on phones the reviews are swiped
  sideways.
- **"Fresh from the chair", the reviews and "Our handpicked products" had
  different backgrounds; make all three the same.** Done: the reviews now
  use the same warm mist background as the gallery and the product strip.
- Before this, Claude reviewed the four Codex commits made since its last
  session (real team, khaki palette, service photos, slower product strip,
  cancellation policy, Sushma's waxing prices) and kept them all.

### 2026-11-11 (latest): reconcile the remaining specialist-price gaps

- Rechecked the combined Services PDF and each person’s source file from
  `Salon.zip`. Sushma’s individual document does contain a complete waxing
  price list; it has now been added to her profile.
- The combined Services PDF includes salon-wide threading and waxing prices,
  but does not say which specialist charges them. Because this site keeps
  prices per specialist, those generic prices were not assigned to Pinal,
  Sandy or Sara.
- Still needed: Destiny and Rosemary’s roles, services and prices; Pinal’s
  threading and waxing prices; Sandy’s threading and waxing prices; and
  Sara’s threading and waxing prices.

### 2026-11-11 (latest): publish a consistent cancellation policy

- The supplied policy contradicted itself: it credited deposits with more
  than 24 hours’ notice, required 48 hours to avoid a fee, specified a 50%
  charge only inside 24 hours, and left the 24–48-hour window undefined.
  It also mentioned a percentage-based late fee without stating the
  percentage, and its 48-hour deposit deadline did not account for
  appointments booked sooner than that.
- **Resolved to one 24-hour cutoff**, because the detailed source terms
  already define both sides of it: 24+ hours means no cancellation fee and
  salon credit; under 24 hours means a 50% charge. The deposit is applied
  toward any charge.
- The deposit is now due within 48 hours after the salon requests it **or
  before the appointment when sooner**. The undefined late-fee wording was
  removed; late services may be shortened, and arrivals over 20 minutes
  late remain full-price no-shows.
- The full policy now appears on Services and Booking. A Cancellation
  Policy link sits in the site’s bottom footer, including on the home page.

### 2026-11-11 (latest): slower handpicked-products strip

- **Make “Our handpicked products” move 50% slower.** Done: the CSS
  animation duration is now 67.5 seconds instead of 45 seconds. Hover,
  pause-button and reduced-motion behaviour are unchanged.

### 2026-11-11 (latest): real team, khaki reference and home-page refresh

- The dev supplied the owner's current service menus, specialist menus,
  staff portraits, salon/spa hours and cancellation policy in `Salon.zip`.
  The 24 fictional sample profiles were replaced with **11 real profiles**:
  Alinah, Charles, Destiny, Kyra, Mariquita, Olga, Pinal, Rosemary, Sandy,
  Sara and Sushma. Neha's supplied portrait is used in The Founder section;
  she is not listed as a bookable specialist until the owner confirms that
  she takes clients.
- **Show no more than three specialists across.** Done: three columns on
  wide desktop, two on tablet and one on phones.
- **Use the warm khaki colour from the supplied design example.** Done with
  khaki/olive tokens while retaining the approved rounded, soft design.
- **Replace the home service artwork, make the section about 25% slimmer and
  let it fill the screen horizontally.** Done: five purpose-generated
  photographic cards for Skin Care, Hair Services, Nail Care, Massage and
  Brows & Lashes use a wide 1500 px container. Generation notes are in
  `assets/img/services/README.md`.
- **Replace the existing “Give the Gift of Self Care” area with the
  reference composition.** Done in the global band and on the Gift
  Certificates page, using an original khaki banner and card mock-up rather
  than copying the reference image itself.
- Service-page descriptions and visible service names now reflect the
  supplied owner material. Prices remain only on specialist profiles.

### 2026-11-11 (later): the name is "Neha Salon & Spa"

- **Change the name to "Neha Salon & Spa", in the logo as well.** Done on
  every page: page titles, descriptions, the About text, the footer
  copyright and the gift band. The logo keeps the leaf mark and now reads
  **NEHA / SALON & SPA** (was NEHA / THREADING).
- Left as they are, because they are real addresses and accounts: the
  website and email address (`nehathreading.com`), the Instagram handle
  `@nehathreading`, the Facebook and Yelp links, and the wording of client
  reviews. The logo file the owner first sent still says "Threading"; a new
  logo file in the new name would be worth asking for.

### 2026-11-11: owner's layout example, Home tab, larger header, no language switch

The owner supplied a picture of a home-page layout he likes ("Neha Salon &
Spa": hero with three selling points, a thin facts strip, "Our services"
photo cards, a gift card band). The dev: keep what we have, it is similar,
and borrow these parts. All **done** unless marked.

1. **Add a Home tab as the first menu item.**
2. **Make the navigation menu and logo 25% larger.** Done: the logo, menu
   text and Book Now button. The menu now turns into the ☰ button below
   1340 px wide (was 1120) so the larger items never crowd.
3. **Put the Expert Care / Quality Products / Relaxing Environment items
   over the video, as in the picture**, replacing "6,000 sq ft day spa ·
   Ayurvedic face & body treatments · Vichy showers". Done, with the
   picture's wording: *Skilled & certified professionals*, *Top-rated
   brands we trust*, *Clean, comfortable & welcoming space*.
4. **Add "Pikesville" to the hero paragraph.** Done: "…and a calm,
   full-service spa in Pikesville for massage, facials and body treatments."
5. **A thin strip under the video, same as the picture:** Walk-ins Welcome
   · Open 7 Days a Week · Gift Cards Available. Done. ⚠️ "Walk-ins Welcome"
   comes from the picture; confirm it with the owner (§7).
6. **Replace "What brings you in today?" with the picture's "Our services"
   layout, and keep the old section as a backup.** Done: "Everything you
   need, all in *one* place." with five photo cards (Skin Care, Hair
   Services, Nail Care, Massage, Brows & Lashes), "Learn more" links and a
   "View All Services" button. The old icon row is saved in
   `backups/what-brings-you-in.html` with instructions for restoring it.
   The later Codex pass supplied five generated service photographs.
7. **Make the testimonials much slimmer vertically.** Done: one row of four
   compact review cards, about 300 px tall (was about 760 px). On phones the
   four cards sit in one row that is swiped sideways.
8. **Replace the Book a visit / Our Specialists / Spa parties band with
   "Give the Gift of Self Care", exactly as in the picture but in a
   different colour.** First done as a green illustrated strip, then replaced
   with the requested khaki editorial composition. Gift Certificates is
   linked again from the facts strip and footer, but is still not a menu item.
9. **Remove the language change option.** Done: the EN / ES control is gone
   and the site is English only (`?lang=es` is ignored). The Spanish text
   Codex added is still in `js/i18n.js`, switched off, so it can return by
   setting `languageSwitch: true`. Text added since has no Spanish.
10. **Update the specialists' photos, prices and services from the folder
    `/Users/pavloromanyuk/Downloads/Salon`.** Done in the later Codex pass
    from the supplied `Salon.zip`; missing facts remain explicitly pending.
11. **Review what was done with ChatGPT Codex.** Done: the five Codex
    commits (bilingual content, AI sample portraits, eight gallery photos,
    wider grids, the commit-and-push rule) were read and kept, apart from
    the language switch now being off.

### 2026-11-10 (latest): language dropdown and reliable English return

- **Replace the hover language interaction with a dropdown and fix switching
  back to English.** Done: the compact translucent circle opens a frosted
  `EN` / `ES` menu on click or tap. Both choices are always explicit, and
  navigation now writes `?lang=en` or `?lang=es` so either direction is
  deterministic while other URL parameters remain intact.

### 2026-11-10 (latest): quieter language control

- **Make the language switch smaller and less prominent.** Done: the header
  now shows one compact translucent-white language pill. It displays the
  current language (`EN` or `ES`), previews the other language on hover or
  keyboard focus, and switches on click or tap. On the solid header it uses
  a subtle light treatment so it remains readable without drawing attention.

### 2026-11-10 (latest): full-width services and gallery spacing

- **Keep all 12 “What brings you in today?” services on one desktop line
  and use the screen width.** Done: the section breaks out of the normal
  content width, uses all 12 columns on wide screens and grows the icons up
  to 112 px where space allows. Tablets and phones still wrap so labels
  remain readable and touch targets remain usable.
- **Add `bed.jpeg` and `bed2.jpg` to “Fresh from the chair,” remove empty
  spaces and spread the photos horizontally.** Done: both were converted
  to WebP, the gallery now has eight equal grid cells, and the photo grid
  spans the viewport instead of the standard content container.
- **Increase vertical space between specialists.** Done on the Our
  Specialists grid and the specialist rows within service pages, so each
  “Book with …” action is clearly separated from the next portrait.

### 2026-11-10: project delivery convention

- A request to change this project also means **commit and push the finished,
  tested result**. Stop and ask only when the request appears mistaken,
  unsafe, harmful or clearly detrimental. This convention is recorded in
  `AGENTS.md` and `.cursor/rules/commit-and-push.mdc` so Codex and Claude
  follow it in later sessions.

### 2026-11-10 (latest): larger service choices, English/Spanish and photography

- **Make every home-page service icon and service name 50% larger.** Done.
  The heading now uses the same stronger 600 weight as “Fresh from the
  chair.” The larger tiles use six columns on desktop, three on English
  phones, and two on Spanish phones so the longer labels never overflow.
- **Add a language tab with English and Spanish.** Done with a compact
  `EN / ES` control in the header. Spanish covers shared navigation,
  marketing pages, forms, services, specialist roles and menus. The
  selection is stored in the browser; `?lang=es` makes a Spanish URL
  shareable. English remains the no-JavaScript default.
- **Fill the specialist portrait placeholders with AI-generated images.**
  Done for all 24 sample profiles: one distinct fictional portrait per
  profile, optimized to 800 × 1000 WebP. The names, bios and prices are
  still visibly marked **Sample profile** and must not be confused with the
  real salon team.
- **Put the six supplied photos in “Fresh from the chair.”** Done: two brow
  photos, nail art, massage, reception and treatment room, all served as
  WebP in a responsive editorial grid.
- **Review after Claude's changes.** `npm test` passes all 21 pages and 24
  profiles. Browser QA covered desktop and exact 390 px English/Spanish
  layouts; a Spanish mobile overflow found during review was fixed.

### 2026-11-11: no prices on service pages, five per service, no Gallery tab

- **Remove the "from $10", "from $40" prices under "Choose your
  specialist" on service pages.** The dev: people should not click on a
  specialist just because their prices are lower. Done: a service page
  shows each specialist's name and role only. Prices are on the
  specialist's own page.
- **Add more placeholders under "Choose your specialist", about five per
  service.** Done: the sample team grew from 7 to 24 ("Specialist One" …
  "Twenty-Four"), arranged so every service lists five. Spa Parties still
  has none and invites a request. The Our Specialists page now shows four
  cards per row to fit the larger team.
- **Remove the Gallery tab.** Done: it is out of the menu. The "Fresh from
  the chair" gallery section is still on the home page.

### 2026-11-10 (night): the team page is called "Our Specialists"

- The dev chose **"Our Specialists"** over "Our Professionals". Done
  everywhere: the menu, page headings, "Choose your specialist" on service
  pages, the booking form's "Specialist" dropdown, and the sample profiles
  ("Specialist One" … "Seven"). The pages and data file were renamed to
  match: `specialists.html`, `specialist.html`, `js/specialists.js`.
  Entries below were written before the rename and now use the new word.

### 2026-11-10 (evening): specialists with their own prices

The dev, after more input from the salon. All **done** unless marked.

1. **Prices are per worker, not one price for all.** The salon has many
   workers who each set their own prices. Customers choose a worker and
   then see that worker's services and prices. The model is
   <https://craftsalonglendora.com/> (their Our Team page, per-stylist
   portfolios, and a booking page with a "Select a Professional" filter).
2. **Two ways to reach a worker's own page:**
   - **Services → a service page**, which lists the workers who can do that
     service. Clicking one opens their page.
   - **Our Specialists**, a new menu item after Services, like
     <https://craftsalonglendora.com/our-team>: each worker's picture, a
     short description, a link to their own page and a **booking link**.
3. **A worker's own page** shows **their pricing at the top and photos of
   their work at the bottom.**
4. **Booking:** add a **dropdown of workers** to "Your booking request".
   A booking link from a worker arrives with that worker already selected.
5. Menu changes: **remove Gift Certificates for now**; **remove Our Team
   from About Us**; add a team page after Services. The dev first called
   it "Our Professionals" and asked for other name ideas; "Our Specialists"
   was suggested, and the dev chose it (see the entry above).
   The label is one setting (`specialistsLabel` in `js/config.js`).
6. **Make "What brings you in today?" much slimmer**, and remove the "Our
   services" and "Shape. Smooth. Restore. Relax." lines. Done: one heading
   and one row of icons, about 230 px tall on desktop.
7. **Use the four supplied pictures in the product strip** (Bioelements,
   Biotique, Davines, Moroccanoil). Done: they replace the name tiles.
8. Before this round, the dev made changes with ChatGPT Codex (the two
   entries below). Those were kept.

How it was built: all specialists are in one file, `js/specialists.js`.
One template page, `specialist.html?p=<slug>`, shows any specialist, so
adding or removing staff means editing only that file. As of 2026-11-11,
all 11 entries are real people from the owner's supplied files; incomplete
facts and price groups are explicitly marked pending. The Gift Certificates
page is still out of the menu, while the home gift banner links to the
existing online shop.

### 2026-11-10 (latest follow-up): home-page order and full-site audit

- **Remove the descriptive paragraph from “Our handpicked products” and
  make the section slimmer without changing product sizes.** Done. The
  tiles remain 230 px on desktop and 170 px on phones.
- **Switch “Fresh from the chair” and “Our handpicked products.”** Done:
  the gallery now follows the service icons; products come after reviews.
- **Remove “Follow on Instagram” below the gallery.** Done. Instagram
  remains available in the footer and on the Contact page.
- **Review the whole site for glaring bugs and needed changes.** Done across
  all 20 pages at desktop, 390 px and 320 px widths. The audit fixed a
  narrow-phone horizontal overflow, repeated product names announced by
  screen readers, and one hard-coded phone number. Remaining launch and
  follow-up items are recorded in §7.

### 2026-11-10 (latest): dev feedback on home-page height

- **Make the “What brings you in today?” section about half as tall.** Done:
  the 12 services now use one compact row on wide desktop screens, with
  tighter heading and tile spacing. They still wrap for tablets and phones.
- **Reduce the space taken by the “Our handpicked products” intro, but keep
  the brand tiles the same size.** Done initially with a side-by-side intro;
  the later follow-up above removed the description completely and made the
  section slimmer again. The 230 px desktop brand tiles remain unchanged.

### 2026-11-10 (later): dev feedback on the sharper restyle

- **Remove the phone number from the navigation menu.** Done, on every page.
- "I like the sharpness, but I strongly prefer the older, softer edging and
  contours, and general style. Let's go back to it, but keep the sharpness.
  For example, the old *What brings you in today?* section looked much
  nicer." Done: the soft style is back (§4). Kept: the HD video with a
  lighter overlay, and darker, clearer text. The icon row now covers all
  12 services.
- The new structure from round 2 (pages, menu, booking form, product strip)
  is unchanged.

### 2026-11-10: owner consultation (round 2)

The owner likes the prototype. Requests, all **done** unless marked:

1. **Make it sharper, similar to <https://craftsalonglendora.com/>.** First
   done as a full Craft-style restyle. The dev then asked to go back to the
   soft style and keep only the sharpness (see the entry above and §4).
2. **The home page was too long.** Shortened from about 9,000 px to about
   4,700 px on a desktop screen.
3. Remove the **"Precision for every face"** section (featured service cards). Removed.
4. Remove the **"Fifteen calm minutes"** section (three steps). Removed.
5. **Canton is closed: one location only.** Remove anything that mentions two locations.
6. Rename **Menu & Prices → Services** and remove the old Services tab.
7. Move **Our Story** off the home page to its own page. Rename the tab
   **About Us**, with submenus **The Founder, Our Team, Careers**.
8. Rename **Visit → Contact Us** and give it its own page with the contact
   form, map and social links. Not on the home page.
9. Add a **Gift Certificate** tab with its own page.
10. Add a **products strip: pictures that scroll sideways on their own**,
    like "Elevate Your Wellness with Our Handpicked Products!" on
    <https://salonnordine.com/>, using the products on
    nehathreading.com/products. Done with the four real brands as name
    tiles. ⏳ **Pictures still needed** (§7).
11. **Booking gets its own page with a message form.** The salon prefers to
    receive an **email** with the request and not use a booking service.
    Fields: name, email, phone, short message, and a choice of service from
    the list below. **Under each service, a link to that service's own
    page**, in case the customer wants more detail. Done. One addition by the
    developer's assistant: an optional "Preferred day and time" field.
12. **Each service gets a dedicated page.** The dev will supply the content
    later. The list, with the old site's addresses:
    Threading (`/pikesville-services`), Hair Styling (`/hair-styling`),
    Facials (`/facials`), Massages (`/massages`), Nail Care (`/nail-care`),
    Vichy Shower (`/vichy-shower`), Spa Treatments (`/spa-treatments`),
    Spa Parties (`/spa-parties`), Waxing (`/waxing`), Other Services
    (`/other-services`), Microblading (`/microblading-pikes`), Slimming
    Treatments (`/slimming-treatments`).
    Done: 12 pages exist. ⏳ Only Massages has real content so far.
13. **Document all requests and ideas in a dedicated project file** that
    ChatGPT Codex can read quickly. This file.
14. The dev supplied the saved **Products** page from the old site (brands
    and descriptions, §6).

### 2026-11-08

15. Keep the **15% off** new-client banner.
16. Remove the thin white vertical line over the hero video (it was a
    decorative scroll marker, not part of the video).
17. Use the old site for facts: addresses, phones, email, social links,
    Yelp. The dev saved its Home, Contact and Massages pages by hand,
    because the site's firewall blocks automated access.
18. Social links supplied by the dev: Instagram, Facebook, Yelp, X (§6).

### 2026-11-07: project start

19. Build a spa website **similar to the Elite Dental Lab site** and reuse
    its code where it makes sense.
20. The owner likes **shades of green** as the background colour and tone.
21. The owner sent **five websites he likes** (§5). Keep a note of them.
22. One of them has a **background video**, like Elite's. The dev wants to
    convince the owner to do the same. (The owner has since seen it and
    liked the prototype.)
23. **Logo:** only the little leaf image and the name matter. The green
    background behind the logo is optional.
24. Use the supplied *Sharq Hotel SPA Promo Video* as a **placeholder** hero video.
25. Set up **GitHub Pages** so the owner can review by link.
26. Keep a **detailed write-up** of requests and reference sites so another
    tool (ChatGPT Codex) can understand the project.

---

## 3. Site map

All pages are flat files in the repository root. Service page names match
the old site's addresses where possible, which helps with redirects at launch.

| Page | File | Notes |
| --- | --- | --- |
| Home | `index.html` | Video hero + three selling points · facts strip · five photographic service cards · gallery · slim reviews · product strip · khaki gift band |
| Services | `services.html` | The 12 services with a one-line description each, followed by the cancellation and appointment policy |
| 12 service pages | `threading.html`, `hair-styling.html`, `facials.html`, `massages.html`, `nail-care.html`, `vichy-shower.html`, `spa-treatments.html`, `spa-parties.html`, `waxing.html`, `other-services.html`, `microblading.html`, `slimming-treatments.html` | A description, then **"Choose your specialist"**: everyone who offers the service, with their role, a link to their page and a booking link. **No prices here.** Spa Parties has no specialists and invites a request instead |
| About Us | `about.html` | The spa's story, then **The Founder** (`about.html#founder`) |
| Our Specialists | `specialists.html` | Every specialist: portrait, role, short description, their services, **Prices & Work** and **Book with …** |
| A specialist's page | `specialist.html?p=<slug>` | One template for everyone. **Top: their services and prices. Bottom: photos of their work.** Arriving from a service page (`&service=<slug>`) lists that service first |
| Careers | `careers.html` | Short text and an enquiry form |
| Gift Certificates | `gift-certificates.html` | Linked from the facts strip and footer but not the menu; its khaki banner links to the existing online shop |
| Contact Us | `contact.html` | Address, phone, email, hours, social links, message form, map, FAQ |
| Book a Visit | `booking.html` | The booking request form plus the cancellation and appointment policy. `booking.html?service=massages&pro=<slug>` ticks the service and selects the specialist |

Menu: **Home** · **Services** (submenu: the 12 services) · **Our Specialists** ·
**About Us** (submenu: The Founder, Careers) · **Contact Us** · **Book Now**
button. The gallery is a section on the home page, with no menu item. There is no phone number
in the menu bar (dev request, 2026-11-10).

### The two routes to a specialist

1. Services → a service (e.g. Threading) → "Choose your specialist" →
   **Prices & Work** → that specialist's page → **Book with …**
2. Our Specialists → a card → **Prices & Work**, or **Book with …** directly.

Every "Book with …" link opens the booking form with that specialist
selected, and the service ticked when the visitor came through a service.

### How the forms deliver

The booking, contact and careers forms all work the same way. With no server
configured (the prototype), pressing Send opens the visitor's own email app
with the request already written and addressed to neha@nehathreading.com;
the visitor presses Send there. Before launch, set `formEndpoint` in
`js/config.js` to a small server (the Elite Dental Lab Cloudflare Worker can
be ported) and requests arrive by email without that extra step.

---

## 4. Design direction

**"Botanical calm": the soft look, with crisp details.** This is the
owner's settled preference after trying a harder-edged version.

**The style (keep this):**
- Cream and warm khaki backgrounds, muted olive for the footer and page headings.
- **Soft edges and contours:** gently rounded corners, soft shadows, no hard
  black borders.
- Headings in *Cormorant Garamond*, mixed case with italic accents. Body
  text and the NEHA wordmark in *Jost*.
- The home service showcase uses five landscape photographs with compact
  white descriptions; the full Services page keeps the complete 12-service
  list.
- The current core palette is olive `#626548`, deep olive `#4c5038`, cream
  `#f7f3ed` and warm mist `#ebe6d9`. Orange remains a tiny accent only;
  pale lime/khaki is never used as text on a light background.

**The sharpness (keep this too):**
- The hero video in full HD (1920×1080), lightly sharpened, with only a
  light dark overlay behind the text so the footage stays clear.
- Darker text and regular-weight body copy, for clearer reading than the
  first prototype.

**Tried and rejected (do not bring back):** on 2026-11-10 the site was
restyled after craftsalonglendora.com: black-green and pure white, all-caps
*Bodoni Moda* headings, square corners, thin black borders, boxed service
tiles, a dark leaf-pattern background. The dev liked the added sharpness
but **strongly preferred the older, softer edging, contours and general
style**, so it was reverted the same day. That version is in the git
history at commit `b0d84ff`.

Logo notes: the owner's file is low resolution (434 × 116 px). The leaf
mark was redrawn as a vector (`assets/img/neha-mark.svg`, and inline in
`js/site.js`), and the name is set as live text. Ask for a vector original.

---

## 5. Reference websites

The owner's five (2026-11-07), plus what each contributed.

| Site | What stands out | Used for |
| --- | --- | --- |
| [Craft Salon, Glendora](https://craftsalonglendora.com/) | Black background with leaves, white card over a photo, tall serif capitals, black-and-white contrast, one BOOK button | The owner's example of "sharper". Its hard-edged style was tried and rejected; only the crispness was kept (HD video, clearer text) |
| [The Pearl Spa](https://www.thepearlspa.com/) | Full-screen background video, deep green and cream, soft serif headings, "What do you need today?" strip | **The overall soft look**; video hero; "What brings you in today?" icon row |
| [Nordine Salon & Day Spa](https://salonnordine.com/) ([Reston page](https://salonnordine.com/locations/reston/)) | Auto-scrolling product brand strip; menu with dotted lines to prices; menu: Home, About Us ▾, Locations ▾, Gift Certificate ▾, Contact Us, Booking | **Product strip**; price lists; the menu structure the owner asked for |
| [Christie Adam Salon & Spa](https://www.christieadam.com/) | Offer bar ("15% off your first visit"), phone and Book button in the header, one large testimonial | Offer bar; header layout; featured review |
| [Spa in the Valley](https://www.spainthevalley.com/) | Band of three calls to action (mailing list / book / gift cards) | Book / Gift certificates / Spa parties band above the footer |

**Not a reference:** <https://www.nehathreading.com/> (their current site).
Facts only.

---

## 6. Business facts

Sources: the old site's Home, Contact, Massages and Products pages (saved by
the dev), and the owner.

**Business:** **Neha Salon & Spa** (the name used on the new site from
2026-11-11). The old website and listings say "Neha Threading Salon and
Spa". Founder: **Neha Gupta**.

**Location (the only one):** 1501 Reisterstown Road, Pikesville, MD 21208,
half a mile south of the Beltway.
Phone **410-653-BROW (2769)** · Email **neha@nehathreading.com**
Hours: Mon–Wed 10–7 · Thu–Fri 10–8 · Sat 9–6 · Sun 11–5

**Spa hours (by appointment only):** Sun–Mon closed · Tue–Fri 10–6 ·
Sat 10–4.

**Closed:** Canton (2931 O'Donnell Street, Baltimore). Confirmed by the
owner on 2026-11-10. Do not mention it.

**Social:** [Instagram](https://www.instagram.com/nehathreading) ·
[Facebook](https://www.facebook.com/NehaThreadingSalonSpa/) ·
[Yelp](https://www.yelp.com/biz/neha-threading-salon-and-spa-pikesville) ·
[X](https://x.com/NehaSalonSpa)

**Gift cards:** the old site sells them online at
<https://www.nehathreading.com/gift-cards> ("Select your design, preview it,
and send or print it immediately").

**Story:** Neha Gupta has been part of the Baltimore community for "over 18
years" (the old site's wording; it is out of date, see §7). She worked in
several salons before opening her own and is known throughout Maryland for
threading. The 6,000+ sq ft Pikesville spa was formally opened in March 2013
by Baltimore Mayor Stephanie Rawlings-Blake. It has a hair salon and
treatment rooms for facials, massages and body treatments. Highlights:
Vichy showers and Ayurvedic face and body treatments. Old-site tagline:
"It's all about feeling beautiful."

**Guest and cancellation policy supplied and normalized 2026-11-11:** a
$15 deposit per service is applied to the service total. It is due within
48 hours after the salon requests it, or before the appointment when sooner.
Cancellations and rescheduling use one 24-hour cutoff: with 24+ hours’
notice there is no fee and the deposit stays as salon credit; under 24 hours
costs 50%, with the deposit applied toward the charge. Spa guests should
arrive 10–15 minutes early. Arrivals over 20 minutes late and no-shows are
charged in full. After three or more cancellations/rescheduling requests,
future appointments require non-refundable full prepayment plus 20% gratuity.

**Products the salon carries:**
- **Bioelements** (skin care): professional formulas since 1991
- **Biotique** (skin care): Ayurvedic, 100% natural botanicals
- **Davines** (hair care): made in Parma, Italy; B Corp
- **Moroccanoil** (hair care): argan-oil-infused

**Specialist menus captured:** Alinah, Charles, Kyra, Mariquita, Olga,
Sandy and Sushma have detailed supplied menus; Sushma’s supplied menu includes
threading, waxing, Vichy and lash prices. The remaining missing price groups
are listed in §7. Prices live only in `js/specialists.js`.

**Reviews on the site** (from the old site): Erin L., Nancy S., Kabir B.
(who praises a threader named Sara), Cynthia B.

**Other old-site sections not yet used:** Spa Packages, Specials, Products
(full brand descriptions), Gallery, Testimonials, Newsletter signup.

---

## 7. Open items

Waiting on the dev or the owner:

| Needed | For |
| --- | --- |
| **Confirm "Walk-ins Welcome"** (from the owner's layout picture) and that the salon is open 7 days a week (the hours on file say yes) | The facts strip under the hero |
| **Confirm the updated service descriptions and category names** derived from the owner-supplied menus | All 12 service pages now have substantive copy; prices remain on specialist profiles only |
| ~~Product pictures~~ | ✅ Supplied by the dev on 2026-11-10 and in the strip |
| **The salon's own video** (10–20 s, calm) | The hero uses a hotel's promo clip, which **must not go live** |
| **Kyra's portrait** and work/portfolio photos for every specialist | Ten specialist portraits and Neha's founder portrait were supplied. Kyra currently has a clearly marked photo placeholder; work galleries remain placeholders |
| **Confirm rights and attribution for the eight supplied gallery images**, and confirm any pictured interiors are actually appropriate for the salon | Required before public launch; source-to-output mapping is in `assets/img/gallery/README.md` |
| **Destiny and Rosemary:** roles, services and price lists | Only their portraits were supplied, so their cards are real but explicitly marked “Profile details coming soon” and cannot be booked yet |
| **Missing individual price groups:** Pinal — threading and waxing; Sara — threading and waxing; Sandy — threading and waxing | Their individual documents name these services but do not include the prices. The generic salon-wide menu cannot establish each person’s prices, so their profiles mark these groups pending instead of inventing prices |
| **Confirm whether Neha takes clients** and whether all supplied portraits are approved for public use | Neha appears only in The Founder section for now |
| Optional short biographies and Instagram links for the real team | Current bios are concise factual summaries of each supplied menu; no social handles were invented |
| **Careers wording**: which roles, how to apply | `careers.html` |
| **How many years** Neha has been in Baltimore (the old site's "over 18" is out of date; a client review says 19 as a customer) | `about.html` |
| **Gift certificates:** confirm whether the old online shop remains the long-term destination when the new site replaces the old domain | The page stays out of the menu; the new home banner links to the current shop |
| **Where form emails should go** and a server to send them (`formEndpoint`). The prototype opens the visitor's email app, which is unreliable for visitors without one configured | Booking, contact and careers forms |
| **Confirm the threading FAQ claims** about discomfort and how long results last. They are not identified as owner-supplied or old-site facts | `contact.html` |
| ~~Strengthen the keyboard focus indicator~~ | ✅ Replaced with a dual light/dark focus ring on 2026-11-11 |
| **Launch SEO:** remove `noindex`, add canonical URLs, absolute Open Graph image URLs, a sitemap, LocalBusiness structured data and old-URL redirects | Launch |
| Vector logo; domain plan | Launch |

Open any page with `?review` added to the address to see every placeholder
outlined in orange.

---

## 8. Ideas not yet requested

Suggestions to raise with the owner; none are built.

- A **Products page** using the brand descriptions from the old site.
- **Spa Packages** and **Specials** pages (the old site has both).
- A real **Gallery page** once photos arrive; the home page then shows a few.
- A **newsletter signup** (the old site has one).
- Re-enable Spanish after the new English-only sections and specialist menus
  receive a complete translation review.
- **Online gift certificate sales** built into the new site.
- Redirects from the old site's addresses to the new pages at launch.
