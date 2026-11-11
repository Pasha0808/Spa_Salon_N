/* ==========================================================================
   Neha Salon & Spa — config.js
   Business details and the service list, used across every page.
   Facts come from the salon's current website (nehathreading.com) and the
   owner. Values marked TODO are still placeholders.
   ========================================================================== */

window.NEHA_CONFIG = {
  name: "Neha Salon & Spa",
  tagline: "Threading · Spa · Massage · Skin",
  taglineEs: "Depilación con hilo · Spa · Masaje · Piel",
  email: "neha@nehathreading.com",

  // The EN / ES language switch in the header. Off at the developer's
  // request (2026-11-11): the site shows English only and ignores ?lang=es.
  // The Spanish text is still in js/i18n.js; set this to true to bring the
  // switch back (new English text added since then has no Spanish yet).
  languageSwitch: false,

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
      ],
      spaHours: [
        ["Sunday – Monday", "Closed"],
        ["Tuesday – Friday", "10 AM – 6 PM"],
        ["Saturday", "10 AM – 4 PM"]
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

  // Owner-supplied cancellation policy, normalized on 2026-11-11. The
  // source mixed 24- and 48-hour cancellation cutoffs; 24 hours is used
  // consistently because the detailed source terms define both sides of
  // that cutoff (account credit at 24+ hours, 50% charge under 24 hours).
  cancellationPolicy: {
    eyebrow: "Before your visit",
    title: "Cancellation & appointment policy",
    intro: "We reserve time especially for you. These terms keep deposits, changes and late arrivals clear before your appointment is confirmed.",
    items: [
      {
        title: "Deposits & confirmation",
        body: "A $15 deposit is required for each service and is applied to your service total. Payment information and the deposit are due within 48 hours after the salon requests them, or before the appointment if it is sooner. Otherwise, the unconfirmed reservation will be released."
      },
      {
        title: "Cancellations & rescheduling",
        body: "Please give at least 24 hours’ notice. With 24 hours’ notice or more, there is no cancellation fee and your deposit remains on your salon account as credit. With less than 24 hours’ notice, 50% of the service cost will be charged; the deposit is applied toward that charge."
      },
      {
        title: "Late arrivals & no-shows",
        body: "For spa services, please arrive 10–15 minutes early for paperwork and changing. A late arrival may shorten the service. Arrivals more than 20 minutes late are treated as a no-show and charged the full service price."
      },
      {
        title: "Repeated changes",
        body: "After three or more cancellations or rescheduling requests, future appointments require non-refundable prepayment of the full service cost plus 20% gratuity."
      }
    ],
    contact: "To cancel or reschedule, call or text your service provider, or call the salon."
  },

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

  // The complete service list. Each service has its own page, <slug>.html.
  // This list feeds the Services menu and page, booking form, footer and
  // specialist links. Each service's icon is in js/site.js (ICONS), under
  // the same slug; the five home highlights are configured separately below.
  services: [
    { slug: "threading", name: "Threading", nameEs: "Depilación con hilo", tag: "Brows & face", tagEs: "Cejas y rostro", blurb: "Precise facial hair removal with twisted cotton thread, ideal for sensitive skin.", blurbEs: "Depilación facial precisa con hilo de algodón, ideal para piel sensible." },
    { slug: "hair-styling", name: "Hair Styling", nameEs: "Peluquería", tag: "Cut & colour", tagEs: "Corte y color", blurb: "Cuts, colour, styling and treatments from an experienced team.", blurbEs: "Cortes, color, peinados y tratamientos de un equipo con experiencia." },
    { slug: "facials", name: "Facials", nameEs: "Faciales", tag: "Skin", tagEs: "Piel", blurb: "Customized facials, corrective skin treatments, dermaplaning and HydraFacial.", blurbEs: "Faciales personalizados, tratamientos correctivos, dermaplaning e HydraFacial." },
    { slug: "massages", name: "Massages", nameEs: "Masajes", tag: "Hot stone & more", tagEs: "Piedras calientes y más", blurb: "Relaxation, therapeutic, Ayurvedic, lymphatic and body-contouring massage.", blurbEs: "Masajes relajantes, terapéuticos, ayurvédicos, linfáticos y de contorno corporal." },
    { slug: "nail-care", name: "Nail Care", nameEs: "Cuidado de uñas", tag: "Mani & pedi", tagEs: "Manicura y pedicura", blurb: "Manicures, pedicures, acrylic services and nail enhancements.", blurbEs: "Manicuras, pedicuras, servicios de acrílico y complementos para uñas." },
    { slug: "vichy-shower", name: "Vichy Shower", nameEs: "Ducha Vichy", tag: "Water therapy", tagEs: "Terapia de agua", blurb: "Warm cascading water and a full-body scrub.", blurbEs: "Agua tibia en cascada y exfoliación corporal completa." },
    { slug: "spa-treatments", name: "Spa Treatments", nameEs: "Tratamientos de spa", tag: "Body rituals", tagEs: "Rituales corporales", blurb: "Vichy hydrotherapy, exfoliation and hydrating or detox body wraps.", blurbEs: "Hidroterapia Vichy, exfoliación y envolturas hidratantes o detox." },
    { slug: "spa-parties", name: "Spa Parties", nameEs: "Fiestas de spa", tag: "Celebrate", tagEs: "Celebra", blurb: "Reserve the spa level for a small group and choose services from the salon menu.", blurbEs: "Reserva el nivel del spa para un grupo pequeño y elige servicios del menú." },
    { slug: "waxing", name: "Waxing", nameEs: "Depilación con cera", tag: "Face & body", tagEs: "Rostro y cuerpo", blurb: "Face and full-body hair removal with waxes selected for different hair types.", blurbEs: "Depilación facial y corporal con ceras para distintos tipos de vello." },
    { slug: "other-services", name: "Lashes, Makeup & Henna", nameEs: "Pestañas, maquillaje y henna", tag: "Finishing touches", tagEs: "Toques finales", blurb: "Lash extensions and lifts, makeup for special occasions, and henna tattoos.", blurbEs: "Extensiones y lifting de pestañas, maquillaje para ocasiones y tatuajes de henna." },
    { slug: "microblading", name: "Microblading & Microshading", nameEs: "Microblading y microshading", tag: "Brows", tagEs: "Cejas", blurb: "Hair-like strokes, soft powder shading or a combination for fuller brows.", blurbEs: "Trazos similares al cabello, sombreado suave o una combinación para cejas más llenas." },
    { slug: "slimming-treatments", name: "Body Contouring", nameEs: "Contorno corporal", tag: "Body", tagEs: "Cuerpo", blurb: "Manual contouring and multi-technology cavitation treatments.", blurbEs: "Contorno manual y tratamientos de cavitación con varias tecnologías." }
  ],

  // Five broad, photo-led categories on the home page. The complete menu
  // remains available through `services` above.
  homeServiceHighlights: [
    { name: "Skin Care", nameEs: "Cuidado de la piel", blurb: "Facials & treatments", blurbEs: "Faciales y tratamientos", href: "facials.html", img: "assets/img/services/skin-care.webp", alt: "Facial treatment with a mineral mask", altEs: "Tratamiento facial con mascarilla mineral" },
    { name: "Hair Services", nameEs: "Servicios de cabello", blurb: "Cut, color & style", blurbEs: "Corte, color y peinado", href: "hair-styling.html", img: "assets/img/services/hair-services.webp", alt: "Finished dimensional brunette hairstyle", altEs: "Peinado castaño con ondas y dimensión" },
    { name: "Nail Care", nameEs: "Cuidado de uñas", blurb: "Manicure & pedicure", blurbEs: "Manicura y pedicura", href: "nail-care.html", img: "assets/img/services/nail-care.webp", alt: "Neat neutral manicure", altEs: "Manicura neutra y cuidada" },
    { name: "Massage", nameEs: "Masaje", blurb: "Therapy for body & mind", blurbEs: "Terapia para cuerpo y mente", href: "massages.html", img: "assets/img/services/massage.webp", alt: "Professional hot-stone massage", altEs: "Masaje profesional con piedras calientes" },
    { name: "Brows & Lashes", nameEs: "Cejas y pestañas", blurb: "Threading, waxing & more", blurbEs: "Hilo, cera y más", href: "threading.html", img: "assets/img/services/brows-lashes.webp", alt: "Precisely shaped brow and defined lashes", altEs: "Ceja definida y pestañas cuidadas" }
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
