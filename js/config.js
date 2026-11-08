/* ==========================================================================
   NEHA Threading — config.js
   Business details used across every page. Facts come from the salon's
   current website (nehathreading.com, Contact + Home pages, saved
   2026-11-08). Values still marked TODO are placeholders.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "Neha Threading Salon & Spa",
  tagline: "Threading · Spa · Massage · Skin",
  email: "neha@nehathreading.com",

  // One entry per salon. Each gets a card (map, address, phone, hours,
  // directions, booking) in the Visit section and a column in the footer.
  locations: [
    {
      name: "Pikesville",
      addressLine1: "1501 Reisterstown Road",
      addressLine2: "Pikesville, MD 21208",
      phone: "410-653-BROW (2769)",
      phoneHref: "tel:+14106532769",
      email: "neha@nehathreading.com",
      mapQuery: "1501 Reisterstown Road, Pikesville, MD 21208",
      bookingUrl: "",
      hours: [
        ["Monday – Wednesday", "10 AM – 7 PM"],
        ["Thursday – Friday", "10 AM – 8 PM"],
        ["Saturday", "9 AM – 6 PM"],
        ["Sunday", "11 AM – 5 PM"]
      ]
    },
    {
      // NOTE: the current site still lists Canton on its Contact page, but
      // hides it elsewhere (and carries a hidden "We have closed our Canton
      // Locations" banner). Confirm with the owner that it is open.
      name: "Canton",
      addressLine1: "2931 O'Donnell Street",
      addressLine2: "Baltimore, MD 21224",
      phone: "410-675-BROW (2769)",
      phoneHref: "tel:+14106752769",
      email: "canton@nehathreading.com",
      mapQuery: "2931 O'Donnell Street, Baltimore, MD 21224",
      bookingUrl: "",
      hours: [
        ["Tuesday – Friday", "11 AM – 7 PM"],
        ["Saturday", "9 AM – 6 PM"],
        ["Sunday – Monday", "Closed"]
      ]
    }
  ],

  // The current site has no online booking: guests call. While empty,
  // every "Book" button scrolls to the Visit section (phones + hours).
  bookingUrl: "",                     // TODO if they adopt Vagaro, Square, Fresha…
  // Their existing gift card shop (design, preview, send or print).
  giftCardUrl: "https://www.nehathreading.com/gift-cards",

  // Shown in the footer and Visit section, in this order. Leave a url empty
  // to hide that network.
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/nehathreading" },
    { label: "Facebook", url: "https://www.facebook.com/NehaThreadingSalonSpa/" },
    { label: "Yelp", url: "https://www.yelp.com/biz/neha-threading-salon-and-spa-pikesville" },
    { label: "X", url: "https://x.com/NehaSalonSpa" }
  ],

  announcement: "New clients enjoy 15% off their first visit" // TODO sample offer: confirm with the owner, or "" to hide
};
