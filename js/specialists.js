/* ==========================================================================
   NEHA Threading — specialists.js
   The salon's specialists, each with their own services and prices.
   This one list feeds:
     - the Our Specialists page (specialists.html)
     - each specialist's own page (specialist.html?p=<slug>)
     - the "Choose your specialist" cards on every service page
     - the specialist dropdown on the booking form

   To add someone, copy a block and change it. To remove someone, delete
   their block. Nothing else needs editing.

   Fields
     slug      Used in the page address. Lowercase letters and hyphens only.
     name      As shown on the site.
     shortName Optional. Used in "Book with …". Defaults to the first name.
     title     Their role, e.g. "Threading Artist".
     sample    true = placeholder profile. Shows a "Sample profile" note.
               Remove the line once the details are real.
     photo     Portrait, e.g. "assets/img/team/priya.jpg" (about 800 × 1000 px).
               Empty = a green placeholder tile.
     bio       Two or three sentences.
     instagram Optional full link.
     services  What they offer. `service` is a slug from `services` in
               js/config.js. `items` are their own prices:
               { name, price, time (optional), note (optional) }.
               `title` (optional) replaces the service name as the heading.
     work      Photos of their work: { img, label }. Empty = placeholders.

   ALL SEVEN PROFILES BELOW ARE SAMPLES. Names, bios and prices are
   placeholders until the salon supplies its real team. One exception: the
   massage prices under "Specialist Four" are the salon's real menu from
   nehathreading.com/massages, kept here until each therapist's own prices
   are known.
   ========================================================================== */

window.NEHA_SPECIALISTS = [
  {
    slug: "specialist-one",
    name: "Specialist One",
    title: "Senior Threading Artist",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "threading", items: [
        { name: "Eyebrows", price: "$18", time: "10 min" },
        { name: "Upper Lip", price: "$10", time: "5 min" },
        { name: "Chin", price: "$12", time: "5 min" },
        { name: "Full Face", price: "$50", time: "30 min", note: "Brows, lip, chin, cheeks and forehead." }
      ] },
      { service: "microblading", items: [
        { name: "Microblading", price: "$350", time: "2 hr", note: "Includes consultation and brow mapping." },
        { name: "Touch-Up", price: "$120", time: "1 hr" }
      ] },
      { service: "other-services", items: [
        { name: "Henna Tattoo", price: "from $20", time: "15+ min" }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-two",
    name: "Specialist Two",
    title: "Threading Artist",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "threading", items: [
        { name: "Eyebrows", price: "$14", time: "10 min" },
        { name: "Upper Lip", price: "$8", time: "5 min" },
        { name: "Chin", price: "$10", time: "5 min" },
        { name: "Full Face", price: "$45", time: "30 min", note: "Brows, lip, chin, cheeks and forehead." }
      ] },
      { service: "waxing", items: [
        { name: "Underarms", price: "$15", time: "10 min" },
        { name: "Half Legs", price: "$35", time: "25 min" },
        { name: "Full Legs", price: "$55", time: "40 min" }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-three",
    name: "Specialist Three",
    title: "Esthetician",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "facials", items: [
        { name: "Express Facial", price: "$45", time: "30 min" },
        { name: "Signature Facial", price: "$75", time: "50 min" },
        { name: "Ayurvedic Facial", price: "$95", time: "60 min" }
      ] },
      { service: "spa-treatments", items: [
        { name: "Ayurvedic Body Treatment", price: "$120", time: "60 min" },
        { name: "Body Scrub", price: "$80", time: "45 min" }
      ] },
      { service: "waxing", items: [
        { name: "Underarms", price: "$18", time: "10 min" },
        { name: "Half Legs", price: "$40", time: "25 min" },
        { name: "Full Legs", price: "$60", time: "40 min" }
      ] },
      { service: "slimming-treatments", items: [
        { name: "Contouring Body Wrap", price: "$90", time: "60 min" }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-four",
    name: "Specialist Four",
    title: "Massage Therapist",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      // Real prices: the salon's massage menu from nehathreading.com/massages
      { service: "massages", items: [
        { name: "Elemental Relaxation Massage", price: "$105", time: "60 min", note: "Light and soothing Swedish massage for stress relief and well-being." },
        { name: "Hot Oil Relaxation Massage", price: "$115", time: "60 min", note: "A deep-moisturizing blend of hot oils for full-body relaxation and skin rejuvenation." },
        { name: "Aromatherapy", price: "$115 · $150", time: "60 min · 90 min", note: "Relaxation massage enhanced with essential oil blends." },
        { name: "Ayurvedic Massage", price: "$120", time: "50 min", note: "Traditional Indian techniques and herb-infused oils to balance your mind, body and soul." },
        { name: "Hot Stone Massage", price: "$145", time: "75 min", note: "Warm stones glide over the body for a much deeper sense of relaxation and tension relief." },
        { name: "Combination Massage", price: "$135 · $165", time: "60 min · 90 min", note: "Light Swedish massage, hot stones and aromatherapy." },
        { name: "Himalayan Salt Massage Treatment", price: "$165", time: "75 min", note: "Inhalable salt minerals and Himalayan salt hot stones soothe away stress, tension and toxins, replenishing the body with 84 minerals." },
        { name: "Muscle Melt", price: "$170 · $210", time: "60 min · 90 min", note: "Customized massage with CBD oil, Himalayan salt hot stones and warm bamboo sticks." },
        { name: "Deep Tissue Massage", price: "$125 · $170", time: "60 min · 90 min", note: "Targets deep layers of muscle and the surrounding tissues." },
        { name: "Customized Massage", price: "$70 · $115 · $160", time: "30 min · 60 min · 90 min", note: "For your specific needs: Swedish, deep tissue, myofascial release and other techniques." },
        { name: "Prenatal Massage", price: "$120", time: "60 min", note: "For mothers-to-be, after the first trimester." },
        { name: "Manual Lymphatic Drainage Massage", price: "$140 · $185", time: "60 min · 90 min", note: "Improves the flow of lymph fluid and helps reduce swelling and inflammation." },
        { name: "Vacuum Therapy Lymphatic Drainage", price: "$135 · $180", time: "60 min · 90 min", note: "Lymphatic drainage performed using gentle suction." }
      ] },
      { service: "massages", title: "Massage enhancements", items: [
        { name: "Scalp & Facial Massage", price: "$60", time: "30 min" },
        { name: "Foot Scrub", price: "$35" },
        { name: "Back Scrub", price: "$35" },
        { name: "Hot Stones", price: "$25" },
        { name: "Himalayan Salt Hot Stones", price: "$35" },
        { name: "Warm Bamboo Sticks", price: "$25" },
        { name: "Milk / Aroma Bath", price: "$40", time: "15 min" },
        { name: "Steam Shower", price: "$40", time: "15 min" },
        { name: "Cupping", price: "$25", time: "With Customized or Deep Tissue" },
        { name: "Magnetic Cupping", price: "$25", time: "With Customized or Deep Tissue" },
        { name: "Aromatherapy Custom Blend", price: "$15", time: "Add-on product" },
        { name: "CBD · Back / Neck", price: "$15 & up", time: "Add-on product" },
        { name: "CBD · Full Body", price: "$35 & up", time: "Add-on product" }
      ] },
      { service: "vichy-shower", items: [
        { name: "Full-Body Vichy Shower Scrub", price: "$60", time: "30 min", note: "Available as an add-on to any massage." }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-five",
    name: "Specialist Five",
    title: "Senior Massage Therapist",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "massages", items: [
        { name: "Customized Massage", price: "$125 · $175", time: "60 min · 90 min" },
        { name: "Deep Tissue Massage", price: "$135 · $185", time: "60 min · 90 min" },
        { name: "Hot Stone Massage", price: "$155", time: "75 min" },
        { name: "Prenatal Massage", price: "$130", time: "60 min" }
      ] },
      { service: "spa-treatments", items: [
        { name: "Ayurvedic Body Treatment", price: "$130", time: "60 min" }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-six",
    name: "Specialist Six",
    title: "Hair Stylist",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "hair-styling", items: [
        { name: "Haircut & Style", price: "$55", time: "45 min" },
        { name: "Shampoo & Blow-Dry", price: "$40", time: "40 min" },
        { name: "Single-Process Colour", price: "from $85", time: "90 min" },
        { name: "Highlights", price: "from $120", time: "2 hr" }
      ] }
    ],
    work: []
  },
  {
    slug: "specialist-seven",
    name: "Specialist Seven",
    title: "Nail Technician",
    sample: true,
    photo: "",
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    instagram: "",
    services: [
      { service: "nail-care", items: [
        { name: "Classic Manicure", price: "$25", time: "30 min" },
        { name: "Gel Manicure", price: "$40", time: "45 min" },
        { name: "Classic Pedicure", price: "$40", time: "45 min" },
        { name: "Spa Pedicure", price: "$55", time: "60 min" }
      ] }
    ],
    work: []
  }
];
