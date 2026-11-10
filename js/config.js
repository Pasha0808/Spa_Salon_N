/* ==========================================================================
   NEHA Threading — config.js
   Business details and the service list, used across every page.
   Facts come from the salon's current website (nehathreading.com) and the
   owner. Values marked TODO are still placeholders.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "Neha Threading Salon & Spa",
  tagline: "Threading · Spa · Massage · Skin",
  email: "neha@nehathreading.com",

  // One salon: Pikesville. (The Canton location is closed, confirmed by
  // the owner on 2026-11-10.) The code still accepts more than one entry.
  locations: [
    {
      name: "Pikesville",
      addressLine1: "1501 Reisterstown Road",
      addressLine2: "Pikesville, MD 21208",
      phone: "410-653-BROW (2769)",
      phoneHref: "tel:+14106532769",
      email: "neha@nehathreading.com",
      mapQuery: "1501 Reisterstown Road, Pikesville, MD 21208",
      hours: [
        ["Monday – Wednesday", "10 AM – 7 PM"],
        ["Thursday – Friday", "10 AM – 8 PM"],
        ["Saturday", "9 AM – 6 PM"],
        ["Sunday", "11 AM – 5 PM"]
      ]
    }
  ],

  // Booking, contact and careers forms. The salon wants requests by email,
  // not a booking system. While formEndpoint is empty, the forms open the
  // visitor's email app with the request ready to send to `email` above.
  // Set formEndpoint to a server URL (e.g. the Elite Dental Lab Cloudflare
  // Worker, ported) to deliver requests without the visitor's email app.
  formEndpoint: "",                   // TODO before launch

  // Their existing online gift card shop (design, preview, send or print).
  giftCardUrl: "https://www.nehathreading.com/gift-cards", // TODO: this address changes when the new site replaces the old one

  // Shown in the footer and on the Contact page, in this order.
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/nehathreading" },
    { label: "Facebook", url: "https://www.facebook.com/NehaThreadingSalonSpa/" },
    { label: "Yelp", url: "https://www.yelp.com/biz/neha-threading-salon-and-spa-pikesville" },
    { label: "X", url: "https://x.com/NehaSalonSpa" }
  ],

  // Menu label for the team page. The specialists themselves, with their
  // own services and prices, are in js/specialists.js.
  specialistsLabel: "Our Specialists",

  announcement: "New clients enjoy 15% off their first visit", // confirmed 2026-11-08; "" hides the bar

  // The service list. Each service has its own page, <slug>.html.
  // This one list feeds the Services menu, the home page icons, the
  // Services page, the booking form and the footer. `tag` is the small
  // label under the name on the home page. Each service's icon is in
  // js/site.js (ICONS), under the same slug.
  services: [
    { slug: "threading", name: "Threading", tag: "Brows & face", blurb: "Eyebrow and facial threading with pure cotton thread — Neha's signature." },
    { slug: "hair-styling", name: "Hair Styling", tag: "Cut & colour", blurb: "Cuts, colour, styling and treatments from an experienced team." },
    { slug: "facials", name: "Facials", tag: "Skin", blurb: "Customized facials in our state-of-the-art treatment rooms." },
    { slug: "massages", name: "Massages", tag: "Hot stone & more", blurb: "From Swedish relaxation to hot stone and Ayurvedic massage." },
    { slug: "nail-care", name: "Nail Care", tag: "Mani & pedi", blurb: "Manicures and pedicures." },
    { slug: "vichy-shower", name: "Vichy Shower", tag: "Water therapy", blurb: "Warm cascading water and a full-body scrub." },
    { slug: "spa-treatments", name: "Spa Treatments", tag: "Ayurvedic", blurb: "Ayurvedic face and body treatments." },
    { slug: "spa-parties", name: "Spa Parties", tag: "Celebrate", blurb: "Celebrate together with a private spa party." },
    { slug: "waxing", name: "Waxing", tag: "Face & body", blurb: "Face and body waxing." },
    { slug: "other-services", name: "Other Services", tag: "Henna & makeup", blurb: "Henna tattoos, makeup and more." },
    { slug: "microblading", name: "Microblading", tag: "Brows", blurb: "Semi-permanent brows, stroke by stroke." },
    { slug: "slimming-treatments", name: "Slimming Treatments", tag: "Body", blurb: "Body treatments to tone and contour." }
  ],

  // Home page product strip: the brands the salon carries (from
  // nehathreading.com/products). Pictures are square, 600 × 600 px, in
  // assets/img/products/. Without `img`, a tile shows the brand name.
  products: [
    { name: "Bioelements", kind: "Professional skin care", img: "assets/img/products/bioelements.jpg" },
    { name: "Davines", kind: "Hair care from Parma, Italy", img: "assets/img/products/davines.jpg" },
    { name: "Biotique", kind: "Ayurvedic skin care", img: "assets/img/products/biotique.jpg" },
    { name: "Moroccanoil", kind: "Oil-infused hair care", img: "assets/img/products/moroccanoil.jpg" }
  ]
};
