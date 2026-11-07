/* ==========================================================================
   NEHA Threading — config.js
   Business details used across every page. Values marked TODO are prototype
   placeholders: confirm them with the owner before launch.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "NEHA Threading",
  tagline: "Threading · Brows · Lashes · Skin",
  phone: "(000) 000-0000",            // TODO real number
  phoneHref: "tel:+10000000000",      // TODO
  email: "hello@nehathreading.com",   // TODO real inbox
  addressLine1: "123 Salon Street",   // TODO
  addressLine2: "Your City, ST 00000",// TODO
  mapQuery: "",                       // TODO e.g. "123 Salon Street, Your City, ST" — enables the map embed
  // Online booking (Vagaro, Square, Fresha, GlossGenius, Phorest...). While
  // empty, every "Book" button scrolls to the Visit section instead.
  bookingUrl: "",                     // TODO
  giftCardUrl: "",                    // TODO
  instagram: "https://www.instagram.com/", // TODO
  facebook: "https://www.facebook.com/",   // TODO
  announcement: "New clients enjoy 15% off their first visit", // TODO confirm offer, or "" to hide
  hours: [                            // TODO
    ["Monday – Friday", "10:00 AM – 8:00 PM"],
    ["Saturday", "10:00 AM – 7:00 PM"],
    ["Sunday", "11:00 AM – 6:00 PM"]
  ]
};
