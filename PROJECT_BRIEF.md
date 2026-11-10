# Project brief: Neha Threading Salon & Spa website

**Read this first.** It records what the client and the developer asked
for, what was decided, the facts about the business, and what is still
open. How the code works is in [README.md](README.md). Rules for AI coding
agents are in [AGENTS.md](AGENTS.md).

- **Client:** Neha Threading Salon & Spa, Pikesville, Maryland
- **Developer / repo owner:** Pasha0808
- **Review link:** <https://pasha0808.github.io/Spa_Salon_N/>
- **Status:** prototype under client review. Second round of owner feedback
  applied on 2026-11-10, then restyled back to the soft look the same day.

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
| Look | **Soft "botanical calm" style with crisp details** (§4). The hard-edged Craft-style version was tried and rejected |
| Colour | Shades of green: the owner's preference from day one |
| Hero | Full-screen background video in HD (placeholder clip for now) |
| Home page | **Short**: hero → 12 service icons → product strip → reviews → gallery |
| Header | **No phone number in the menu bar.** Phone is in the footer and on the Contact and Booking pages |
| Locations | **One: Pikesville.** Canton is closed. No "two locations" wording anywhere |
| Menu | Services ▾ · About Us ▾ (The Founder, Our Team, Careers) · Gallery · Gift Certificates · Contact Us · **Book Now** |
| Services | 12 services, each with **its own page** |
| Booking | **Email request form** on its own page. The salon does not want an integrated booking service |
| Old website | nehathreading.com is for **facts and prices only. No design inspiration**: the owner dislikes it |
| New-client offer | "New clients enjoy 15% off their first visit" stays |
| Tech | Static HTML/CSS/JS on GitHub Pages, following the Elite Dental Lab site |

---

## 2. Request log

Newest first. "Dev" is the developer; "owner" is the salon owner.

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
| Home | `index.html` | Video hero · 12 service icons · product strip · reviews · gallery |
| Services | `services.html` | The 12 services with a one-line description each |
| 12 service pages | `threading.html`, `hair-styling.html`, `facials.html`, `massages.html`, `nail-care.html`, `vichy-shower.html`, `spa-treatments.html`, `spa-parties.html`, `waxing.html`, `other-services.html`, `microblading.html`, `slimming-treatments.html` | Description, prices, a "Book this service" panel, links to the other services |
| About Us | `about.html` | The spa's story, then **The Founder** (`about.html#founder`) |
| Our Team | `team.html` | Placeholder cards until names and photos arrive |
| Careers | `careers.html` | Short text and an enquiry form |
| Gift Certificates | `gift-certificates.html` | Buy online (their existing shop) or at the spa / by phone |
| Contact Us | `contact.html` | Address, phone, email, hours, social links, message form, map, FAQ |
| Book a Visit | `booking.html` | The booking request form. `booking.html?service=massages` ticks that service |

Menu: **Services** (submenu: the 12 services) · **About Us** (submenu: The
Founder, Our Team, Careers) · **Gallery** (a section on the home page) ·
**Gift Certificates** · **Contact Us** · **Book Now** button. There is no
phone number in the menu bar (dev request, 2026-11-10).

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
- Cream and pale sage backgrounds, deep green for the footer and page headings.
- **Soft edges and contours:** gently rounded corners, soft shadows, no hard
  black borders.
- Headings in *Cormorant Garamond*, mixed case with italic accents. Body
  text and the NEHA wordmark in *Jost*.
- "What brings you in today?" is a row of **round icons** with the service
  name underneath, as in the first prototype. The dev singled this out as
  looking much nicer than the boxed tiles.
- Logo colours as accents: lime `#AECD54` for Book buttons, orange `#E6883C`
  for tiny details, teal `#285F5F` for buttons and the call-to-action band.

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

**Business:** Neha Threading Salon and Spa. Founder: **Neha Gupta**.

**Location (the only one):** 1501 Reisterstown Road, Pikesville, MD 21208,
half a mile south of the Beltway.
Phone **410-653-BROW (2769)** · Email **neha@nehathreading.com**
Hours: Mon–Wed 10–7 · Thu–Fri 10–8 · Sat 9–6 · Sun 11–5

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

**Guest policy:** arrive 15 minutes early for spa services to change into a
robe and slippers. The old site also has a Cancellation Policy page (not
yet captured).

**Products the salon carries:**
- **Bioelements** (skin care): professional formulas since 1991
- **Biotique** (skin care): Ayurvedic, 100% natural botanicals
- **Davines** (hair care): made in Parma, Italy; B Corp
- **Moroccanoil** (hair care): argan-oil-infused

**Prices captured:** massages only (13 massages and 14 add-ons, on
`massages.html`), and the Vichy shower scrub add-on ($60, 30 min).

**Reviews on the site** (from the old site): Erin L., Nancy S., Kabir B.
(who praises a threader named Sara), Cynthia B.

**Other old-site sections not yet used:** Spa Packages, Specials, Products
(full brand descriptions), Gallery, Testimonials, Newsletter signup.

---

## 7. Open items

Waiting on the dev or the owner:

| Needed | For |
| --- | --- |
| **Content and prices for 11 service pages** (all except Massages). The dev will supply them; saving each old-site page from the browser works | The service pages now say "details and prices coming soon" |
| **Product pictures** for Bioelements, Biotique, Davines, Moroccanoil (square, about 500 px). The saved Products page did not include its image files | The product strip shows brand names until then |
| **The salon's own video** (10–20 s, calm) | The hero uses a hotel's promo clip, which **must not go live** |
| **Photos**: the spa, Neha, treatment rooms, before/after, team | Every green gradient tile is a photo placeholder |
| **Team names, roles and photos** | `team.html` |
| **Careers wording**: which roles, how to apply | `careers.html` |
| **How many years** Neha has been in Baltimore (the old site's "over 18" is out of date; a client review says 19 as a customer) | `about.html` |
| **Gift certificates**: keep the old online shop, move it, or sell in person only? Its address will change when the new site replaces the old one | `gift-certificates.html` |
| **Where form emails should go** and a server to send them (`formEndpoint`) | Booking, contact and careers forms |
| Vector logo; domain plan; cancellation policy text | Launch |

Open any page with `?review` added to the address to see every placeholder
outlined in orange.

---

## 8. Ideas not yet requested

Suggestions to raise with the owner; none are built.

- A **Products page** using the brand descriptions from the old site.
- **Spa Packages** and **Specials** pages (the old site has both).
- A real **Gallery page** once photos arrive; the home page then shows a few.
- A **newsletter signup** (the old site has one).
- **Spanish** or other languages, using Elite Dental Lab's translation system.
- **Online gift certificate sales** built into the new site.
- Redirects from the old site's addresses to the new pages at launch.
