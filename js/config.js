/* ==========================================================================
   NEHA Threading — config.js
   Business details used across every page. Source of truth for facts is the
   salon's current website (nehathreading.com): copy addresses, phones,
   email, hours, prices and social links from there.
   Values marked TODO are still placeholders.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "NEHA Threading",
  tagline: "Threading · Brows · Lashes · Skin",
  email: "hello@nehathreading.com",   // TODO real inbox

  // One entry per salon. Each gets a card (map, address, phone, hours,
  // directions, booking) in the Visit section and a column in the footer.
  locations: [
    {
      name: "Location One",                 // TODO e.g. "Pikesville"
      addressLine1: "123 Salon Street",     // TODO
      addressLine2: "Your City, ST 00000",  // TODO
      phone: "(000) 000-0000",              // TODO
      phoneHref: "tel:+10000000000",        // TODO
      mapQuery: "",                         // TODO full address: enables the map embed
      bookingUrl: "",                       // optional: overrides the shared bookingUrl
      hours: [                              // TODO
        ["Monday – Friday", "10:00 AM – 8:00 PM"],
        ["Saturday", "10:00 AM – 7:00 PM"],
        ["Sunday", "11:00 AM – 6:00 PM"]
      ]
    },
    {
      name: "Location Two",                 // TODO
      addressLine1: "456 Main Avenue",      // TODO
      addressLine2: "Your City, ST 00000",  // TODO
      phone: "(000) 000-0000",              // TODO
      phoneHref: "tel:+10000000000",        // TODO
      mapQuery: "",                         // TODO
      bookingUrl: "",
      hours: [                              // TODO
        ["Monday – Friday", "10:00 AM – 8:00 PM"],
        ["Saturday", "10:00 AM – 7:00 PM"],
        ["Sunday", "11:00 AM – 6:00 PM"]
      ]
    }
  ],

  // Online booking (Vagaro, Square, Fresha, GlossGenius, Phorest...). While
  // empty, every "Book" button scrolls to the Visit section instead.
  bookingUrl: "",                     // TODO
  giftCardUrl: "",                    // TODO

  // Shown in the footer and Visit section, in this order. Leave a url empty
  // to hide that network.
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/" }, // TODO
    { label: "Facebook", url: "https://www.facebook.com/" },   // TODO
    { label: "Yelp", url: "https://www.yelp.com/" },           // TODO
    { label: "Google", url: "" },                              // TODO Google Business profile, optional
    { label: "TikTok", url: "" }                               // optional
  ],

  announcement: "New clients enjoy 15% off their first visit" // TODO confirm offer, or "" to hide
};
