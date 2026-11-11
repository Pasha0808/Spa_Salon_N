/* ==========================================================================
   Neha Salon & Spa — specialists.js
   The real specialist roster and each person's own prices. This one list
   feeds the Our Specialists page, specialist profile template, service-page
   specialist lists, and the booking form.

   Source: the owner-supplied Salon.zip received 2026-11-11. Missing roles,
   prices, bios and work photos stay explicitly pending; they are never
   invented. Prices appear only on a specialist's own profile.
   ========================================================================== */

const item = (name, price, time = "", note = "", nameEs = "", noteEs = "") => ({
  name, price, time, note, nameEs, noteEs
});

const group = (service, items, title = "", titleEs = "", pending = false) => ({
  service, items, title, titleEs, pending
});

const REAL_SPECIALISTS = [
  {
    slug: "alinah",
    name: "Alinah",
    title: "Hair Stylist · Makeup Artist · Henna Artist",
    titleEs: "Estilista · Maquilladora · Artista de henna",
    photo: "assets/img/team/alinah.webp",
    bio: "Alinah offers hair styling and colour, smoothing services, makeup, temporary lashes and henna tattoos.",
    bioEs: "Alinah ofrece peinados y color, alisados, maquillaje, pestañas temporales y tatuajes de henna.",
    services: [
      group("hair-styling", [
        item("Women's Shampoo, Blow Dry and Style", "$55 & up", "", "", "Lavado, secado y peinado para mujer"),
        item("Add Cut", "$45", "", "", "Añadir corte"),
        item("Women's Shampoo and Cut", "$45 & up", "", "", "Lavado y corte para mujer"),
        item("Bang Trim", "$10", "", "", "Recorte de flequillo"),
        item("Trim (Half-Inch Hair)", "$25", "", "", "Recorte de media pulgada"),
        item("Children Under 12", "$35 & up", "", "", "Niños menores de 12 años"),
        item("Red Carpet Blowout", "$65 & up", "", "", "Secado Red Carpet"),
        item("Conditioner Treatment", "$25 & up", "", "", "Tratamiento acondicionador"),
        item("Clarifying Treatment", "$25", "", "", "Tratamiento clarificante"),
        item("CBD Leaf & Flower Treatment", "$35", "", "", "Tratamiento CBD de hojas y flores"),
        item("Formal Hair Up-Do (Washed Hair)", "$85 & up", "", "", "Recogido formal con cabello lavado"),
        item("Add Wash / Blow-Dry", "$45", "", "", "Añadir lavado y secado")
      ], "Hair styling", "Peinados"),
      group("hair-styling", [
        item("Single-Process Color", "$65 & up", "", "", "Color de un solo proceso"),
        item("Additional Color Bowl", "$25 each", "", "", "Tazón de color adicional"),
        item("Partial Highlights", "$120 & up", "", "", "Mechas parciales"),
        item("Full Highlights", "$150 & up", "", "", "Mechas completas"),
        item("Ombre Hair Color", "$140 & up · $185 & up", "Single process · Double process", "", "Color ombré"),
        item("Corrective Color", "$100 & up", "Per hour", "", "Corrección de color")
      ], "Hair coloring", "Coloración"),
      group("hair-styling", [
        item("Lasio One-Day Keratin Treatment", "$275–$350", "", "", "Tratamiento de queratina Lasio de un día"),
        item("Brazilian Blowout", "$350 & up", "", "", "Alisado brasileño")
      ], "Straightening services", "Servicios de alisado"),
      group("other-services", [
        item("Temporary Eyelashes", "$40 & up", "Up to 2 weeks", "Creates the appearance of mascara.", "Pestañas temporales", "Dan la apariencia de llevar máscara de pestañas."),
        item("Bridal Makeup", "$175 & up", "", "Strip lash included.", "Maquillaje de novia", "Incluye pestaña de tira."),
        item("Dupatta Setting", "$25", "", "", "Colocación de dupatta"),
        item("Applying Press-On", "$25", "", "", "Aplicación de press-on"),
        item("Special Occasion Makeup", "$85 & up", "", "Lashes not included.", "Maquillaje para ocasión especial", "No incluye pestañas."),
        item("Strip Lashes", "$25", "", "", "Pestañas de tira"),
        item("Individual Lashes", "$35", "", "", "Pestañas individuales")
      ], "Makeup & lashes", "Maquillaje y pestañas"),
      group("other-services", [
        item("Henna Tattoos", "$18 & up", "", "", "Tatuajes de henna")
      ], "Henna tattoos", "Tatuajes de henna")
    ],
    work: []
  },
  {
    slug: "charles",
    name: "Charles",
    title: "Hair Stylist",
    titleEs: "Estilista",
    photo: "assets/img/team/charles.webp",
    bio: "Charles offers cuts, colour, highlights, relaxers, smoothing services and special-effects hairstyling.",
    bioEs: "Charles ofrece cortes, color, mechas, alisados, tratamientos de suavizado y peinados de efectos especiales.",
    services: [
      group("hair-styling", [
        item("Balayage", "$165 & up", "", "", "Balayage"),
        item("Brazilian Blowout", "$350", "", "", "Alisado brasileño"),
        item("Virgin Relaxer", "$160", "", "", "Alisado inicial"),
        item("Special-Effects Hairstyles", "$85", "", "", "Peinados de efectos especiales"),
        item("Shampoo & Blow-Dry", "$65", "", "", "Lavado y secado"),
        item("Highlights", "$145 & up", "", "", "Mechas"),
        item("Haircut", "$45", "", "", "Corte de cabello"),
        item("Natural Blowout", "$75", "", "", "Secado natural"),
        item("Keratin-Complex Blowout", "$75", "", "", "Secado Keratin Complex"),
        item("Single-Process Color", "$130", "", "", "Color de un solo proceso"),
        item("Lasio One-Day Keratin", "$250", "", "", "Queratina Lasio de un día"),
        item("Relaxer Touch-Up", "$130", "", "", "Retoque de alisado"),
        item("Deep Conditioning Treatment", "$30", "", "", "Tratamiento acondicionador profundo"),
        item("Corrective Color", "$175 & up", "", "", "Corrección de color")
      ])
    ],
    work: []
  },
  {
    slug: "destiny",
    name: "Destiny",
    title: "Profile details coming soon",
    titleEs: "Detalles del perfil próximamente",
    photo: "assets/img/team/destiny.webp",
    bio: "Role, services and pricing are being confirmed with the salon.",
    bioEs: "El salón está confirmando su función, servicios y precios.",
    incomplete: true,
    services: [],
    work: []
  },
  {
    slug: "kyra",
    name: "Kyra",
    title: "Hair Stylist",
    titleEs: "Estilista",
    photo: "",
    bio: "Kyra offers colour, natural hair services, precision cuts, extensions and braiding.",
    bioEs: "Kyra ofrece color, servicios para cabello natural, cortes de precisión, extensiones y trenzas.",
    services: [
      group("hair-styling", [
        item("Root Touch-Up", "$75", "", "", "Retoque de raíces"),
        item("Single-Process Color", "$95", "", "", "Color de un solo proceso"),
        item("Semi-Permanent Color", "$65", "", "", "Color semipermanente"),
        item("Partial Highlights", "$110", "", "", "Mechas parciales"),
        item("Full Highlights", "$150", "", "", "Mechas completas"),
        item("Balayage", "$175", "", "", "Balayage"),
        item("Color Correction", "$150", "", "", "Corrección de color"),
        item("Toner / Gloss", "$45", "", "", "Tóner / brillo"),
        item("Gray Coverage", "$75", "", "", "Cobertura de canas"),
        item("Additional Color", "$20+", "", "", "Color adicional")
      ], "Hair color services", "Servicios de color"),
      group("hair-styling", [
        item("Shampoo & Blow-Dry", "$55", "", "", "Lavado y secado"),
        item("Silk Press", "$85", "", "", "Silk press"),
        item("Silk Press & Trim", "$110", "", "", "Silk press y recorte"),
        item("Silk Press & Deep Conditioning", "$120", "", "", "Silk press y acondicionamiento profundo"),
        item("Two-Strand Twist Set", "$85", "", "", "Twist de dos mechones"),
        item("Braid-Out / Twist-Out", "$75", "", "", "Braid-out / twist-out"),
        item("Flexi Rod Set", "$85", "", "", "Set con flexi rods"),
        item("Wash, Treatment & Style", "$100", "", "", "Lavado, tratamiento y peinado"),
        item("Scalp Treatment", "$35", "", "", "Tratamiento del cuero cabelludo"),
        item("Deep Conditioning Treatment", "$25", "", "", "Acondicionamiento profundo"),
        item("Protein Treatment", "$35", "", "", "Tratamiento de proteínas"),
        item("Trim Add-On", "$25", "", "", "Añadir recorte")
      ], "Natural hair services", "Servicios para cabello natural"),
      group("hair-styling", [
        item("Hair Trim", "$25", "", "", "Recorte"),
        item("Women's Haircut", "$55", "", "", "Corte para mujer"),
        item("Precision Haircut", "$75", "", "", "Corte de precisión"),
        item("Haircut & Style", "$85", "", "", "Corte y peinado"),
        item("Pixie Cut", "$65", "", "", "Corte pixie"),
        item("Bob Cut", "$75", "", "", "Corte bob"),
        item("Clipper Cut", "$35", "", "", "Corte con máquina"),
        item("Bang Trim", "$15", "", "", "Recorte de flequillo"),
        item("Children's Haircut", "$30", "", "", "Corte infantil")
      ], "Haircuts", "Cortes"),
      group("hair-styling", [
        item("Traditional Sew-In", "$200", "", "", "Sew-in tradicional"),
        item("Partial Sew-In", "$150", "", "", "Sew-in parcial"),
        item("Quick Weave", "$125", "", "", "Quick weave"),
        item("Quick Weave with Closure", "$150", "", "", "Quick weave con closure"),
        item("Half-Up, Half-Down", "$150", "", "", "Semirecogido"),
        item("Ponytail Extension", "$85", "", "", "Extensión de cola de caballo"),
        item("Wig Installation", "$125", "", "", "Instalación de peluca"),
        item("Closure Installation", "$175", "", "", "Instalación de closure"),
        item("Tape-In Installation", "$200", "", "", "Instalación tape-in"),
        item("Clip-In Installation", "$75", "", "", "Instalación clip-in"),
        item("Sew-In Maintenance", "$85", "", "", "Mantenimiento de sew-in"),
        item("Weave Removal", "$40", "", "", "Retiro de extensiones"),
        item("Extension Take-Down & Shampoo", "$65", "", "", "Retiro de extensiones y lavado"),
        item("Braid-Down for Wig Installation", "$40", "", "", "Trenzado base para peluca")
      ], "Hair extensions", "Extensiones"),
      group("hair-styling", [
        item("Two Feed-In Braids", "$45", "", "", "Dos trenzas feed-in"),
        item("4–6 Stitch Braids", "$65", "", "", "4–6 trenzas stitch"),
        item("8–10 Stitch Braids", "$85", "", "", "8–10 trenzas stitch"),
        item("Straight-Back Cornrows", "$65", "", "", "Cornrows rectas"),
        item("Small Knotless Braids", "$250", "", "", "Trenzas knotless pequeñas"),
        item("Medium Knotless Braids", "$200", "", "", "Trenzas knotless medianas"),
        item("Large Knotless Braids", "$150", "", "", "Trenzas knotless grandes"),
        item("Boho Knotless Braids", "$250", "", "", "Trenzas boho knotless"),
        item("Box Braids", "$175", "", "", "Box braids"),
        item("Tribal / Fulani Braids", "$175", "", "", "Trenzas tribales / Fulani"),
        item("Passion Twists", "$175", "", "", "Passion twists"),
        item("Crochet Braids", "$125", "", "", "Trenzas crochet"),
        item("Braided Ponytail", "$85", "", "", "Cola trenzada"),
        item("Men's Cornrows", "$50", "", "", "Cornrows para hombre"),
        item("Children's Braids", "$65", "", "", "Trenzas infantiles"),
        item("Two-Strand Twists with Added Hair", "$150", "", "", "Twists de dos mechones con cabello añadido")
      ], "Braiding services", "Servicios de trenzado")
    ],
    work: []
  },
  {
    slug: "mariquita",
    name: "Mariquita",
    title: "Nail Technician",
    titleEs: "Técnica de uñas",
    photo: "assets/img/team/mariquita.webp",
    bio: "Mariquita offers classic, hot-oil, organic and spa manicures and pedicures, plus acrylic services and nail add-ons.",
    bioEs: "Mariquita ofrece manicuras y pedicuras clásicas, con aceite caliente, orgánicas y de spa, además de acrílico y complementos.",
    services: [
      group("nail-care", [
        item("Classic Manicure", "$25", "", "Trimming, shaping, filing, warm hand soak, cuticle care and massage.", "Manicura clásica", "Recorte, forma, limado, remojo tibio, cuidado de cutículas y masaje."),
        item("Hot Oil Manicure", "$28", "", "Jojoba and castor oil hydration for dry, brittle nails and cuticles.", "Manicura con aceite caliente", "Hidratación con jojoba y ricino para uñas y cutículas secas."),
        item("Organic Manicure", "$35", "", "Essential-oil soak with vegan polish or a high-shine buff.", "Manicura orgánica", "Remojo con aceites esenciales y esmalte vegano o pulido de alto brillo."),
        item("Spa Manicure", "$45", "", "Aromatic soak, sugar scrub and warm paraffin dip.", "Manicura spa", "Remojo aromático, exfoliante de azúcar y parafina tibia."),
        item("Polish Change", "$15 & up", "", "Polish removal and new color only.", "Cambio de esmalte", "Retiro y aplicación de nuevo color solamente.")
      ], "Manicures", "Manicuras"),
      group("nail-care", [
        item("Classic Pedicure", "$45", "", "Warm foot bath, nail shaping, cuticle care and light exfoliation.", "Pedicura clásica", "Baño tibio, forma de uñas, cuidado de cutículas y exfoliación ligera."),
        item("Organic Pedicure", "$55", "", "Essential-oil bath, sugar scrub and vegan polish or high-shine buff.", "Pedicura orgánica", "Baño con aceites esenciales, exfoliante y esmalte vegano o pulido."),
        item("Spa Pedicure", "$65", "", "Sugar scrub, hydrating clay mask, hot towels and paraffin dip.", "Pedicura spa", "Exfoliante, mascarilla de arcilla, toallas calientes y parafina."),
        item("Polish Change", "$20 & up", "", "Polish removal, hot-towel wipe and new color only.", "Cambio de esmalte", "Retiro, toalla caliente y nuevo color solamente.")
      ], "Pedicures", "Pedicuras"),
      group("nail-care", [
        item("Acrylic Fill-In", "$45 & up", "2–3 week maintenance", "", "Relleno acrílico"),
        item("Acrylic Overlay", "$50 & up", "", "Protective acrylic layer over the natural nail.", "Recubrimiento acrílico", "Capa protectora de acrílico sobre la uña natural."),
        item("Acrylic Full Set", "$60 & up", "", "Tips with acrylic, filed and shaped.", "Set completo de acrílico", "Tips con acrílico, limados y moldeados.")
      ], "Acrylic nails", "Uñas acrílicas"),
      group("nail-care", [
        item("Cut Down", "$5", "", "", "Acortar"),
        item("Nail Repair", "$5 & up", "", "", "Reparación de uña"),
        item("Shape Change", "$10", "", "", "Cambio de forma"),
        item("Nail Design", "$10 & up each", "", "", "Diseño de uña"),
        item("French Design", "$15", "", "", "Diseño francés"),
        item("Gel Soak-Off / Removal", "$15", "", "", "Retiro de gel"),
        item("Gel Polish", "$15", "", "", "Esmalte de gel"),
        item("Structured Gel (Soft Gel)", "$10", "", "", "Gel estructurado"),
        item("Hard Gel", "$20", "", "", "Gel duro"),
        item("Acrylic Soak-Off", "$25 & up", "", "", "Retiro de acrílico")
      ], "Add-ons", "Complementos")
    ],
    work: []
  },
  {
    slug: "olga",
    name: "Olga",
    title: "Massage Therapist",
    titleEs: "Masajista",
    photo: "assets/img/team/olga.webp",
    bio: "Olga offers relaxation, therapeutic, Ayurvedic and body-contouring massage, energy work and body wraps.",
    bioEs: "Olga ofrece masajes relajantes, terapéuticos, ayurvédicos y de contorno corporal, trabajo energético y envolturas.",
    services: [
      group("massages", [
        item("Elemental Relaxation Massage", "$105", "60 min", "Light and soothing Swedish massage for stress relief and well-being.", "Masaje relajante elemental", "Masaje sueco ligero y calmante para aliviar el estrés."),
        item("Aromatherapy", "$115 · $150", "60 min · 90 min", "Relaxation massage with essential-oil blends.", "Aromaterapia", "Masaje relajante con mezclas de aceites esenciales."),
        item("Hot Stone Massage", "$145", "75 min", "Warm stones glide over the body for deeper relaxation and tension relief.", "Masaje con piedras calientes", "Piedras calientes para una relajación más profunda."),
        item("Combination Massage", "$135 · $165", "60 min · 90 min", "Light Swedish massage, hot stones and aromatherapy.", "Masaje combinado", "Masaje sueco ligero, piedras calientes y aromaterapia."),
        item("Himalayan Salt Massage Treatment", "$165", "75 min", "Himalayan salt hot stones soothe stress and tension.", "Masaje con sal del Himalaya", "Piedras calientes de sal del Himalaya para aliviar el estrés y la tensión.")
      ], "Relaxation massages", "Masajes relajantes"),
      group("massages", [
        item("Muscle Melt", "$170 · $210", "60 min · 90 min", "Customized massage with CBD oil, Himalayan salt stones and/or warm bamboo.", "Muscle Melt", "Masaje personalizado con CBD, piedras de sal y/o bambú tibio."),
        item("Deep Tissue Massage", "$125 · $170", "60 min · 90 min", "Targets deep layers of muscle and surrounding tissue.", "Masaje de tejido profundo", "Trabaja las capas profundas del músculo."),
        item("Extra-Strength CBD", "$45", "Add-on", "", "CBD de alta potencia"),
        item("Customized Massage", "$70 · $115 · $160", "30 min · 60 min · 90 min", "May include Swedish, deep tissue, trigger point and myofascial techniques.", "Masaje personalizado", "Puede incluir técnicas suecas, de tejido profundo y miofasciales."),
        item("Prenatal Massage", "$120", "60 min", "For mothers-to-be after the first trimester.", "Masaje prenatal", "Para futuras madres después del primer trimestre."),
        item("Manual Lymphatic Drainage", "$140 · $185", "60 min · 90 min", "Encourages lymph flow and helps reduce swelling.", "Drenaje linfático manual", "Favorece el flujo linfático y ayuda a reducir la hinchazón."),
        item("Vacuum Therapy Lymphatic Drainage", "$140 · $185", "60 min · 90 min", "Lymphatic drainage performed with suction.", "Drenaje linfático con vacío", "Drenaje linfático realizado con succión."),
        item("Buccal Massage", "$95", "30 min", "Advanced intraoral facial technique for the deep muscles of the face and jaw.", "Masaje bucal", "Técnica facial intraoral para los músculos profundos del rostro y la mandíbula."),
        item("Neck, Scalp, Facial & Buccal Massage", "$175", "70 min", "Works across muscle layers to release tension, encourage drainage and sculpt the face.", "Masaje de cuello, cuero cabelludo, facial y bucal", "Libera tensión, favorece el drenaje y esculpe el rostro.")
      ], "Therapeutic massages", "Masajes terapéuticos"),
      group("massages", [
        item("Ayurvedic Massage", "$120", "60 min", "Traditional Indian techniques and herb-infused oils.", "Masaje ayurvédico", "Técnicas tradicionales de la India y aceites con hierbas."),
        item("Herbal Detox Ball", "$45", "Add-on", "", "Bola herbal detox"),
        item("Reiki", "$90", "60 min", "Energy work that promotes balance and healing.", "Reiki", "Trabajo energético que promueve equilibrio y bienestar.")
      ], "Energy work", "Trabajo energético"),
      group("slimming-treatments", [
        item("Manual Contouring Massage", "$150", "60 min", "Lipossage, anticellulite, vacuum therapy and lymphatic-drainage techniques. Eighteen sessions are recommended for best results.", "Masaje manual de contorno", "Técnicas de lipossage, anticelulitis, vacío y drenaje linfático."),
        item("Cavitation Treatment 4 in 1", "$170", "60 min", "Radio frequency, cavitation, vacuum therapy and laser lipo.", "Cavitación 4 en 1", "Radiofrecuencia, cavitación, vacío y láser lipo."),
        item("Cavitation Treatment 5 in 1", "$185", "80 min", "Radio frequency, cavitation, vacuum therapy, laser lipo and EMS.", "Cavitación 5 en 1", "Radiofrecuencia, cavitación, vacío, láser lipo y EMS.")
      ], "Body contouring massages", "Masajes de contorno corporal"),
      group("massages", [
        item("Aromatherapy", "$15", "", "", "Aromaterapia"),
        item("Arnica Sore-Muscle Relief", "$20", "", "", "Árnica para músculos adoloridos"),
        item("CBD Back / Neck", "$15 & up", "", "", "CBD espalda / cuello"),
        item("CBD Full Body", "$35 & up", "", "", "CBD cuerpo completo"),
        item("Scalp & Facial Massage", "$60", "30 min", "", "Masaje de cuero cabelludo y facial"),
        item("MicroCupping Facial Drainage & Lift", "$80", "30 min", "", "Drenaje y lifting facial con microventosas"),
        item("Deep MediCupping Drainage", "$25", "", "", "Drenaje MediCupping profundo"),
        item("Cupping", "$25", "", "", "Ventosas"),
        item("Magnetic Cupping", "$25", "", "", "Ventosas magnéticas"),
        item("Herbal Detox Ball", "$45", "", "", "Bola herbal detox"),
        item("Hot Stones", "$25", "", "", "Piedras calientes"),
        item("Himalayan Salt Hot Stones", "$35", "", "", "Piedras de sal del Himalaya"),
        item("Warm Bamboo Sticks", "$25", "", "", "Bambú tibio"),
        item("Full-Body Dry Exfoliation", "$50", "", "", "Exfoliación seca de cuerpo completo"),
        item("Foot Scrub", "$35", "", "", "Exfoliante de pies"),
        item("Back Scrub", "$35", "", "", "Exfoliante de espalda"),
        item("Milk / Aroma Bath", "$40", "", "", "Baño de leche / aroma"),
        item("Steam Room", "$40", "", "", "Baño de vapor")
      ], "Massage enhancements", "Complementos de masaje"),
      group("spa-treatments", [
        item("Body Luxe Hydrating Wrap", "$185", "", "Micro-Buff polish and hydrating body wrap.", "Envoltura hidratante Body Luxe", "Pulido Micro-Buff y envoltura corporal hidratante."),
        item("Detox Body Wrap", "$185", "", "Micro-Buff polish and detox seaweed body wrap.", "Envoltura corporal detox", "Pulido Micro-Buff y envoltura de algas detox.")
      ], "Body wraps", "Envolturas corporales")
    ],
    work: []
  },
  {
    slug: "pinal",
    name: "Pinal",
    title: "Salon Technician",
    titleEs: "Técnica de salón",
    photo: "assets/img/team/pinal.webp",
    bio: "Pinal offers threading and waxing. Her individual prices are being confirmed.",
    bioEs: "Pinal ofrece depilación con hilo y con cera. Se están confirmando sus precios individuales.",
    services: [
      group("threading", [], "", "", true),
      group("waxing", [], "", "", true)
    ],
    work: []
  },
  {
    slug: "rosemary",
    name: "Rosemary",
    title: "Profile details coming soon",
    titleEs: "Detalles del perfil próximamente",
    photo: "assets/img/team/rosemary.webp",
    bio: "Role, services and pricing are being confirmed with the salon.",
    bioEs: "El salón está confirmando su función, servicios y precios.",
    incomplete: true,
    services: [],
    work: []
  },
  {
    slug: "sandy",
    name: "Sandy",
    title: "Esthetician · Salon Technician · Microblading Technician",
    titleEs: "Esteticista · Técnica de salón · Técnica de microblading",
    photo: "assets/img/team/sandy.webp",
    bio: "Sandy offers facials, facial add-ons, threading, waxing, microblading and microshading.",
    bioEs: "Sandy ofrece faciales, complementos faciales, hilo, cera, microblading y microshading.",
    services: [
      group("facials", [
        item("Gentleman's Choice Facial", "$85", "45 min", "Deep cleanse, exfoliation and a relaxing massage.", "Facial Gentleman's Choice", "Limpieza profunda, exfoliación y masaje relajante."),
        item("Those Teenage Years Facial", "$85", "45 min", "Customized products and guidance for clear, balanced teen skin.", "Facial para adolescentes", "Productos personalizados y orientación para una piel equilibrada."),
        item("On the Go Facial", "$50", "30 min", "Cleanse, exfoliate and hydrate for a fresh glow.", "Facial On the Go", "Limpieza, exfoliación e hidratación para un brillo fresco."),
        item("24 Carat Gold Facial", "$125", "60 min", "Gold-infused treatment to nourish and revitalize.", "Facial de oro de 24 quilates", "Tratamiento con oro para nutrir y revitalizar."),
        item("Elemental Zen Facial", "$90", "50 min", "Organic herbal facial tailored to your skin.", "Facial Elemental Zen", "Facial herbal orgánico adaptado a tu piel."),
        item("Ayurvedic Facial", "$110", "60 min", "Purifying and rejuvenating ritual for a natural glow.", "Facial ayurvédico", "Ritual purificante y rejuvenecedor."),
        item("Anti-Aging Treatment", "$155", "60 min", "Targets fine lines, dryness and loss of elasticity.", "Tratamiento antiedad", "Trata líneas finas, sequedad y pérdida de elasticidad."),
        item("Blackhead & Whitehead Treatment", "$85", "30 min", "Focused pore-clearing treatment.", "Tratamiento de puntos negros y blancos", "Tratamiento focalizado para limpiar los poros."),
        item("Acne, Acne Scars & Open Pores", "$125", "60 min", "Corrective care for breakouts, marks and uneven texture.", "Acné, cicatrices y poros abiertos", "Cuidado correctivo para brotes, marcas y textura irregular."),
        item("Deep Sea Detoxifying Facial", "$90", "50 min", "Cooling seaweed gel detoxifies, hydrates and refreshes.", "Facial detox de aguas profundas", "Gel de algas refrescante para desintoxicar e hidratar."),
        item("Back Facial", "$150", "60 min", "For men, women and teens; exfoliates and clears back blemishes.", "Facial de espalda", "Para hombres, mujeres y adolescentes; exfolia y limpia imperfecciones."),
        item("Dermaplaning Facial", "$155", "60 min", "Removes dead skin and peach fuzz for a smoother finish.", "Facial dermaplaning", "Retira células muertas y vello fino para una piel más lisa."),
        item("Skin De-Tan Treatment", "$85", "30 min", "Helps reduce tanning and revive sun-damaged skin.", "Tratamiento para reducir el bronceado", "Ayuda a reducir el bronceado y revitalizar la piel."),
        item("Hyperpigmentation Treatment Facial", "$135", "60 min", "Targets dark spots and uneven tone.", "Facial para hiperpigmentación", "Trata manchas oscuras y tono desigual."),
        item("Under-Eye Dark Circles Treatment", "$85", "30 min", "Helps reduce dark circles, puffiness and under-eye bags.", "Tratamiento para ojeras", "Ayuda a reducir ojeras, hinchazón y bolsas."),
        item("HydraFacial", "$249 · $299", "75 min · 90 min", "Hydra dermabrasion to cleanse, extract and deeply hydrate.", "HydraFacial", "Hidradermoabrasión para limpiar, extraer e hidratar profundamente.")
      ]),
      group("facials", [
        item("Dermaplaning", "$75", "", "", "Dermaplaning"),
        item("Chemical Peel", "$35", "", "", "Peeling químico"),
        item("LED Therapy", "$50", "", "", "Terapia LED"),
        item("Tightening Mask", "$25", "", "", "Mascarilla reafirmante"),
        item("Glow Mask", "$25", "", "", "Mascarilla iluminadora"),
        item("Hydrating Mask", "$25", "", "", "Mascarilla hidratante")
      ], "Facial add-ons", "Complementos faciales"),
      group("microblading", [
        item("Microshading", "$450", "", "Soft, powder-like shaded brows for fullness and definition.", "Microshading", "Cejas sombreadas con acabado suave y empolvado."),
        item("Microshading Touch-Up", "$350", "", "", "Retoque de microshading"),
        item("Combination Brows: Microblading + Microshading", "$450", "", "Hair-like strokes with soft shading.", "Cejas combinadas: microblading + microshading", "Trazos similares al cabello con sombreado suave."),
        item("Combination Brows Touch-Up", "$350", "", "", "Retoque de cejas combinadas")
      ]),
      group("threading", [], "", "", true),
      group("waxing", [], "", "", true)
    ],
    work: []
  },
  {
    slug: "sara",
    name: "Sara",
    title: "Salon Technician",
    titleEs: "Técnica de salón",
    photo: "assets/img/team/sara.webp",
    bio: "Sara offers threading and waxing. Her individual prices are being confirmed.",
    bioEs: "Sara ofrece depilación con hilo y con cera. Se están confirmando sus precios individuales.",
    services: [
      group("threading", [], "", "", true),
      group("waxing", [], "", "", true)
    ],
    work: []
  },
  {
    slug: "sushma",
    name: "Sushma",
    title: "Salon Technician · Vichy Shower Technician",
    titleEs: "Técnica de salón · Técnica de ducha Vichy",
    photo: "assets/img/team/sushma.webp",
    bio: "Sushma offers threading, waxing, Vichy hydrotherapy and lash services.",
    bioEs: "Sushma ofrece depilación con hilo y cera, hidroterapia Vichy y servicios de pestañas.",
    services: [
      group("threading", [
        item("Eyebrows", "$15", "", "", "Cejas"),
        item("Upper Lip", "$8", "", "", "Labio superior"),
        item("Chin", "$10 & up", "", "", "Mentón"),
        item("Eyebrow, Lip & Chin", "$32", "", "", "Cejas, labio y mentón"),
        item("Sideburns", "$15 & up", "", "", "Patillas"),
        item("Neck", "$10 & up", "", "", "Cuello"),
        item("Full Face", "$45", "", "", "Rostro completo")
      ]),
      group("waxing", [], "", "", true),
      group("vichy-shower", [
        item("Vichy Shower Hydrotherapy Treatment", "$110 · $140", "60 min · 80 min", "Full-body exfoliation with a custom organic scrub and a seaweed, clay or mud mask rinsed by eight warm shower heads.", "Tratamiento de hidroterapia con ducha Vichy", "Exfoliación corporal con exfoliante orgánico y mascarilla de algas, arcilla o barro, enjuagada por ocho duchas tibias.")
      ]),
      group("other-services", [
        item("Classic Eyelash Extension Set", "$125", "", "", "Set clásico de extensiones de pestañas"),
        item("Classic Eyelash Fill-In", "$85", "", "", "Relleno clásico de pestañas"),
        item("Volume Eyelash Extension Set", "$160", "", "", "Set de volumen de extensiones"),
        item("Volume Eyelash Fill-In", "$110", "", "", "Relleno de volumen"),
        item("Cluster Lashes", "$40", "", "", "Pestañas en racimo"),
        item("Strip Lashes", "$30", "", "", "Pestañas de tira"),
        item("Eyelash Lift", "$45", "", "", "Lifting de pestañas"),
        item("Eyelash Lift & Tint", "$75", "", "", "Lifting y tinte de pestañas"),
        item("Eyelash Tint", "$45", "", "", "Tinte de pestañas")
      ], "Eyelashes", "Pestañas")
    ],
    work: []
  }
];

window.NEHA_SPECIALISTS = REAL_SPECIALISTS;
