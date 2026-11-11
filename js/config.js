/* ==========================================================================
   NEHA Threading — config.js
   Business details and the service list, used across every page.
   Facts come from the salon's current website (nehathreading.com) and the
   owner. Values marked TODO are still placeholders.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "Neha Threading Salon & Spa",
  tagline: "Threading · Spa · Massage · Skin",
  taglineEs: "Depilación con hilo · Spa · Masaje · Piel",
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
  specialistsLabelEs: "Nuestros especialistas",

  announcement: "New clients enjoy 15% off their first visit", // confirmed 2026-11-08; "" hides the bar
  announcementEs: "Los clientes nuevos reciben un 15 % de descuento en su primera visita",

  // The service list. Each service has its own page, <slug>.html.
  // This one list feeds the Services menu, the home page icons, the
  // Services page, the booking form and the footer. `tag` is the small
  // label under the name on the home page. Each service's icon is in
  // js/site.js (ICONS), under the same slug.
  services: [
    { slug: "threading", name: "Threading", nameEs: "Depilación con hilo", tag: "Brows & face", tagEs: "Cejas y rostro", blurb: "Eyebrow and facial threading with pure cotton thread — Neha's signature.", blurbEs: "Depilación de cejas y rostro con hilo de algodón puro, la especialidad de Neha." },
    { slug: "hair-styling", name: "Hair Styling", nameEs: "Peluquería", tag: "Cut & colour", tagEs: "Corte y color", blurb: "Cuts, colour, styling and treatments from an experienced team.", blurbEs: "Cortes, color, peinados y tratamientos de un equipo con experiencia." },
    { slug: "facials", name: "Facials", nameEs: "Faciales", tag: "Skin", tagEs: "Piel", blurb: "Customized facials in our state-of-the-art treatment rooms.", blurbEs: "Faciales personalizados en nuestras modernas salas de tratamiento." },
    { slug: "massages", name: "Massages", nameEs: "Masajes", tag: "Hot stone & more", tagEs: "Piedras calientes y más", blurb: "From Swedish relaxation to hot stone and Ayurvedic massage.", blurbEs: "Desde masaje sueco relajante hasta piedras calientes y masaje ayurvédico." },
    { slug: "nail-care", name: "Nail Care", nameEs: "Cuidado de uñas", tag: "Mani & pedi", tagEs: "Manicura y pedicura", blurb: "Manicures and pedicures.", blurbEs: "Manicuras y pedicuras." },
    { slug: "vichy-shower", name: "Vichy Shower", nameEs: "Ducha Vichy", tag: "Water therapy", tagEs: "Terapia de agua", blurb: "Warm cascading water and a full-body scrub.", blurbEs: "Agua tibia en cascada y exfoliación corporal completa." },
    { slug: "spa-treatments", name: "Spa Treatments", nameEs: "Tratamientos de spa", tag: "Ayurvedic", tagEs: "Ayurvédicos", blurb: "Ayurvedic face and body treatments.", blurbEs: "Tratamientos ayurvédicos para rostro y cuerpo." },
    { slug: "spa-parties", name: "Spa Parties", nameEs: "Fiestas de spa", tag: "Celebrate", tagEs: "Celebra", blurb: "Celebrate together with a private spa party.", blurbEs: "Celebra en compañía con una fiesta de spa privada." },
    { slug: "waxing", name: "Waxing", nameEs: "Depilación con cera", tag: "Face & body", tagEs: "Rostro y cuerpo", blurb: "Face and body waxing.", blurbEs: "Depilación con cera para rostro y cuerpo." },
    { slug: "other-services", name: "Other Services", nameEs: "Otros servicios", tag: "Henna & makeup", tagEs: "Henna y maquillaje", blurb: "Henna tattoos, makeup and more.", blurbEs: "Tatuajes de henna, maquillaje y más." },
    { slug: "microblading", name: "Microblading", nameEs: "Microblading", tag: "Brows", tagEs: "Cejas", blurb: "Semi-permanent brows, stroke by stroke.", blurbEs: "Cejas semipermanentes, trazo a trazo." },
    { slug: "slimming-treatments", name: "Slimming Treatments", nameEs: "Tratamientos reductores", tag: "Body", tagEs: "Cuerpo", blurb: "Body treatments to tone and contour.", blurbEs: "Tratamientos corporales para tonificar y definir." }
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
