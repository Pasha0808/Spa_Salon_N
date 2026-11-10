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

  announcement: "New clients enjoy 15% off their first visit", // confirmed 2026-11-08; "" hides the bar

  // The service list. Each service has its own page, <slug>.html.
  // This one list feeds the Services menu, the home page tiles, the
  // Services page, the booking form and the footer.
  services: [
    { slug: "threading", name: "Threading", blurb: "Eyebrow and facial threading with pure cotton thread — Neha's signature." },
    { slug: "hair-styling", name: "Hair Styling", blurb: "Cuts, colour, styling and treatments from an experienced team." },
    { slug: "facials", name: "Facials", blurb: "Customized facials in our state-of-the-art treatment rooms." },
    { slug: "massages", name: "Massages", blurb: "From Swedish relaxation to hot stone and Ayurvedic massage." },
    { slug: "nail-care", name: "Nail Care", blurb: "Manicures and pedicures." },
    { slug: "vichy-shower", name: "Vichy Shower", blurb: "Warm cascading water and a full-body scrub." },
    { slug: "spa-treatments", name: "Spa Treatments", blurb: "Ayurvedic face and body treatments." },
    { slug: "spa-parties", name: "Spa Parties", blurb: "Celebrate together with a private spa party." },
    { slug: "waxing", name: "Waxing", blurb: "Face and body waxing." },
    { slug: "other-services", name: "Other Services", blurb: "Henna tattoos, makeup and more." },
    { slug: "microblading", name: "Microblading", blurb: "Semi-permanent brows, stroke by stroke." },
    { slug: "slimming-treatments", name: "Slimming Treatments", blurb: "Body treatments to tone and contour." }
  ],

  // Home page product strip: the brands the salon carries (from
  // nehathreading.com/products). Add `img` (square, about 500 × 500 px, in
  // assets/img/products/) and the picture replaces the name tile.
  products: [
    { name: "Bioelements", kind: "Professional skin care", img: "" },   // TODO picture
    { name: "Davines", kind: "Hair care from Parma, Italy", img: "" },  // TODO picture
    { name: "Biotique", kind: "Ayurvedic skin care", img: "" },         // TODO picture
    { name: "Moroccanoil", kind: "Oil-infused hair care", img: "" }     // TODO picture
  ]
};
