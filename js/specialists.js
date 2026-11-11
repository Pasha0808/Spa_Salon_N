/* ==========================================================================
   NEHA Threading — specialists.js
   The salon's specialists, each with their own services and prices.
   This one list feeds:
     - the Our Specialists page (specialists.html)
     - each specialist's own page (specialist.html?p=<slug>)
     - the "Choose your specialist" list on every service page
     - the specialist dropdown on the booking form

   ---------------------------------------------------------------------
   EVERY PROFILE HERE IS A SAMPLE. The 24 placeholders ("Specialist One"
   … "Specialist Twenty-Four") are generated at the bottom of this file so
   that each service page shows five specialists. Their prices are made up.
   One exception: Specialist Four carries the salon's real massage menu
   from nehathreading.com/massages, until each therapist's own prices are
   known.
   ---------------------------------------------------------------------

   ADDING THE REAL TEAM
   Put real people in REAL_SPECIALISTS below, one block each, like this:

     {
       slug: "priya-shah",             // page address; lowercase and hyphens
       name: "Priya Shah",
       title: "Senior Threading Artist",
       photo: "assets/img/team/priya-shah.jpg",   // about 800 × 1000 px; "" = placeholder tile
       bio: "Two or three sentences about her.",
       instagram: "https://www.instagram.com/…",  // optional
       services: [
         { service: "threading", items: [          // `service` is a slug from js/config.js
           { name: "Eyebrows", price: "$18", time: "10 min" },
           { name: "Full Face", price: "$50", time: "30 min", note: "Brows, lip, chin, cheeks and forehead." }
         ] },
         { service: "waxing", items: [ … ] }
       ],
       work: [                                     // photos of their work; [] = placeholder tiles
         { img: "assets/img/team/work/priya-1.jpg", label: "Brow shaping" }
       ]
     }

   Other optional fields: `shortName` (used in "Book with …"; defaults to
   the first name) and, inside a services entry, `title` (a heading other
   than the service name). When the real team is in, delete everything from
   "SAMPLE PROFILES" down to the last line, and end the file with:
     window.NEHA_SPECIALISTS = REAL_SPECIALISTS;
   ========================================================================== */

const REAL_SPECIALISTS = [
  // Real profiles go here.
];

/* ============================== SAMPLE PROFILES ==============================
   Everything below builds the placeholder team. */

// The salon's real massage menu (nehathreading.com/massages). Given to
// Specialist Four only.
const REAL_MASSAGE_MENU = [
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
  ] }
];

// Made-up starting prices for each service: [name, price(s), time, note].
// Each sample specialist adds a small amount, so that prices differ from
// person to person the way they will for the real team.
const SAMPLE_MENUS = {
  "threading": [
    ["Eyebrows", 14, "10 min"], ["Upper Lip", 8, "5 min"], ["Chin", 10, "5 min"],
    ["Full Face", 45, "30 min", "Brows, lip, chin, cheeks and forehead."]
  ],
  "hair-styling": [
    ["Haircut & Style", 50, "45 min"], ["Shampoo & Blow-Dry", 38, "40 min"],
    ["Single-Process Colour", 85, "90 min"], ["Highlights", 120, "2 hr"]
  ],
  "facials": [
    ["Express Facial", 45, "30 min"], ["Signature Facial", 70, "50 min"], ["Ayurvedic Facial", 90, "60 min"]
  ],
  "massages": [
    ["Customized Massage", [115, 160], "60 min · 90 min"], ["Deep Tissue Massage", [125, 170], "60 min · 90 min"],
    ["Hot Stone Massage", 145, "75 min"], ["Prenatal Massage", 120, "60 min"]
  ],
  "nail-care": [
    ["Classic Manicure", 25, "30 min"], ["Gel Manicure", 40, "45 min"],
    ["Classic Pedicure", 40, "45 min"], ["Spa Pedicure", 55, "60 min"]
  ],
  "vichy-shower": [
    ["Full-Body Vichy Shower Scrub", 60, "30 min", "Available as an add-on to any massage."]
  ],
  "spa-treatments": [
    ["Ayurvedic Body Treatment", 120, "60 min"], ["Body Scrub", 80, "45 min"]
  ],
  "waxing": [
    ["Underarms", 15, "10 min"], ["Half Legs", 35, "25 min"], ["Full Legs", 55, "40 min"]
  ],
  "other-services": [
    ["Henna Tattoo", 20, "15+ min"], ["Makeup Application", 65, "45 min"]
  ],
  "microblading": [
    ["Microblading", 350, "2 hr", "Includes consultation and brow mapping."], ["Touch-Up", 120, "1 hr"]
  ],
  "slimming-treatments": [
    ["Contouring Body Wrap", 90, "60 min"]
  ]
};

// The placeholder team: [role, services offered, price step 0–2].
// Arranged so that every service except Spa Parties has five specialists.
const SAMPLE_TEAM = [
  ["Senior Threading Artist", ["threading", "microblading", "other-services"], 2],
  ["Threading Artist", ["threading", "waxing"], 0],
  ["Esthetician", ["facials", "spa-treatments", "waxing", "slimming-treatments"], 1],
  ["Massage Therapist", ["massages", "vichy-shower"], 0],
  ["Senior Massage Therapist", ["massages", "vichy-shower", "spa-treatments"], 2],
  ["Hair Stylist", ["hair-styling"], 1],
  ["Nail Technician", ["nail-care"], 0],
  ["Threading Artist", ["threading", "waxing", "other-services"], 1],
  ["Brow Specialist", ["threading", "microblading", "other-services"], 1],
  ["Threading Artist", ["threading", "microblading", "waxing"], 0],
  ["Senior Esthetician", ["facials", "microblading", "spa-treatments", "slimming-treatments"], 2],
  ["Esthetician", ["facials", "waxing", "microblading", "slimming-treatments"], 0],
  ["Esthetician & Makeup Artist", ["facials", "other-services", "slimming-treatments"], 1],
  ["Massage Therapist", ["massages", "vichy-shower", "slimming-treatments"], 1],
  ["Massage Therapist", ["massages", "vichy-shower", "spa-treatments"], 0],
  ["Spa Therapist", ["massages", "vichy-shower", "spa-treatments", "facials"], 1],
  ["Hair Stylist & Makeup Artist", ["hair-styling", "other-services"], 0],
  ["Senior Hair Stylist", ["hair-styling"], 2],
  ["Hair Stylist", ["hair-styling"], 0],
  ["Colour Specialist", ["hair-styling"], 1],
  ["Senior Nail Technician", ["nail-care"], 2],
  ["Nail Technician", ["nail-care"], 1],
  ["Nail Technician", ["nail-care"], 0],
  ["Nail Artist", ["nail-care"], 1]
];

const NUMBER_WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  "Twenty", "Twenty-One", "Twenty-Two", "Twenty-Three", "Twenty-Four"];

const NUMBER_WORDS_ES = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez",
  "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve",
  "Veinte", "Veintiuno", "Veintidós", "Veintitrés", "Veinticuatro"];

const TITLES_ES = {
  "Senior Threading Artist": "Especialista sénior en depilación con hilo",
  "Threading Artist": "Especialista en depilación con hilo",
  "Esthetician": "Esteticista",
  "Massage Therapist": "Masajista",
  "Senior Massage Therapist": "Masajista sénior",
  "Hair Stylist": "Estilista",
  "Nail Technician": "Técnica de uñas",
  "Brow Specialist": "Especialista en cejas",
  "Senior Esthetician": "Esteticista sénior",
  "Esthetician & Makeup Artist": "Esteticista y maquilladora",
  "Spa Therapist": "Terapeuta de spa",
  "Hair Stylist & Makeup Artist": "Estilista y maquilladora",
  "Senior Hair Stylist": "Estilista sénior",
  "Colour Specialist": "Especialista en color",
  "Senior Nail Technician": "Técnica sénior de uñas",
  "Nail Artist": "Artista de uñas"
};

function samplePrice(base, step) {
  const one = amount => "$" + (amount + step * (amount >= 100 ? 10 : 2));
  return Array.isArray(base) ? base.map(one).join(" · ") : one(base);
}

const SAMPLE_SPECIALISTS = SAMPLE_TEAM.map(([title, offered, step], index) => {
  const word = NUMBER_WORDS[index];
  const usesRealMassageMenu = word === "Four";
  return {
    slug: "specialist-" + word.toLowerCase(),
    name: "Specialist " + word,
    nameEs: "Especialista " + NUMBER_WORDS_ES[index],
    title,
    titleEs: TITLES_ES[title] || title,
    sample: true,   // shows a "Sample profile" note on the site
    photo: `assets/img/specialists/specialist-${String(index + 1).padStart(2, "0")}.webp`,
    bio: "A short introduction goes here: years of experience, specialities, and what clients love about their work.",
    bioEs: "Aquí irá una breve presentación: años de experiencia, especialidades y lo que más valoran sus clientes.",
    instagram: "",
    services: offered.flatMap(service => service === "massages" && usesRealMassageMenu
      ? REAL_MASSAGE_MENU
      : [{ service, items: SAMPLE_MENUS[service].map(([name, base, time, note]) => ({ name, price: samplePrice(base, step), time, note })) }]),
    work: []
  };
});

window.NEHA_SPECIALISTS = REAL_SPECIALISTS.concat(SAMPLE_SPECIALISTS);
