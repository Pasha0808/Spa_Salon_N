/* ==========================================================================
   Neha Salon & Spa — site.js
   Shared chrome for every page (same approach as the Elite Dental Lab site):
   announcement bar, header with dropdown menus, footer, and everything that
   is filled in from js/config.js (service lists, contact details, map,
   product strip). Also scroll reveal and the ?review placeholder overlay.

   Pages provide mount points:
     <div id="neha-header"></div>  (before <main>)
     <div id="neha-footer"></div>  (after <main>)
   Add class "header-over-hero" to <body> when the page opens on a dark hero
   so the header starts transparent. Add data-no-cta to <body> to leave out
   the gift card band above the footer.
   ========================================================================== */

(function () {
  const C = window.NEHA_CONFIG || {};
  const I = window.NEHA_I18N || { language: "en", t: value => String(value), field: (item, name) => item?.[name], apply: () => {} };
  const t = I.t;
  const itemText = I.field;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);

  const services = C.services || [];
  const featuredServices = C.homeServiceHighlights || [];
  const locations = C.locations || [];
  const main = locations[0] || {};
  const socials = (C.socials || []).filter(item => item.url);
  const external = ' target="_blank" rel="noopener"';
  const page = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);
  const pros = window.NEHA_SPECIALISTS || [];
  const tagline = I.language === "es" ? (C.taglineEs || C.tagline) : C.tagline;
  const prosLabel = I.language === "es" ? (C.specialistsLabelEs || t(C.specialistsLabel || "Our Specialists")) : (C.specialistsLabel || "Our Specialists");
  const serviceBySlug = slug => services.find(s => s.slug === slug);
  const serviceText = (service, name) => itemText(service, name) || "";
  const proText = (pro, name) => itemText(pro, name) || "";

  const hoursList = hours => (hours || [])
    .map(([days, time]) => `<li><span>${esc(t(days))}</span><span>${esc(t(time))}</span></li>`).join("");
  const directionsHref = loc => "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(loc.mapQuery || `${loc.addressLine1}, ${loc.addressLine2}`);
  const socialLinks = socials
    .map(item => `<a href="${esc(item.url)}"${external}>${esc(item.label)}</a>`).join("");
  const serviceLinks = services
    .map(s => `<a href="${esc(s.slug)}.html">${esc(serviceText(s, "name"))}</a>`).join("");

  /* Line icons for the services, drawn on a 48 × 48 grid. The key is the
     service's slug in js/config.js. A service without an icon gets the leaf. */
  const ICONS = {
    "threading": '<path d="M6 20c5-5 12-6 16-3"/><path d="M42 20c-5-5-12-6-16-3"/><path d="M8 30c4-4 10-4 13 0-3 4-9 4-13 0Z"/><path d="M40 30c-4-4-10-4-13 0 3 4 9 4 13 0Z"/>',
    "hair-styling": '<circle cx="14" cy="35" r="5"/><circle cx="34" cy="35" r="5"/><path d="M17 31 35 7"/><path d="M31 31 13 7"/>',
    "facials": '<path d="M24 6c-9 0-14 7-14 16 0 10 7 20 14 20s14-10 14-20c0-9-5-16-14-16Z"/><path d="M18 21h4M26 21h4"/><path d="M20 32c2.5 2 5.5 2 8 0"/>',
    "massages": '<ellipse cx="24" cy="38" rx="16" ry="5"/><ellipse cx="24" cy="27" rx="12" ry="4.5"/><ellipse cx="24" cy="17.5" rx="8" ry="3.5"/><path d="M30 9c2-3 5-4 8-3-1 3-4 5-8 3Z"/>',
    "nail-care": '<path d="M19 22h10l3 6v12a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V28l3-6Z"/><path d="M20 22V7h8v15"/><path d="M16 31h16"/>',
    "vichy-shower": '<path d="M10 16h28"/><path d="M14 16a10 10 0 0 1 20 0"/><path d="M24 6V3"/><path d="M16 22v4M24 22v4M32 22v4M20 30v4M28 30v4M16 38v4M24 38v4M32 38v4"/>',
    "spa-treatments": '<path d="M24 10c5 6 5 17 0 25-5-8-5-19 0-25Z"/><path d="M24 35c-8 0-14-5-16-14 7 0 12 3 16 14Z"/><path d="M24 35c8 0 14-5 16-14-7 0-12 3-16 14Z"/><path d="M12 41h24"/>',
    "spa-parties": '<path d="M24 14c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z"/><path d="M38 6v8M34 10h8"/><path d="M10 32v8M6 36h8"/><path d="M12 8v4M10 10h4"/>',
    "waxing": '<path d="M24 6c6 9 12 16 12 23a12 12 0 0 1-24 0c0-7 6-14 12-23Z"/><path d="M18 30a6 6 0 0 0 6 6"/>',
    "other-services": '<circle cx="24" cy="24" r="4"/><path d="M24 20c-3-6 0-12 0-12s3 6 0 12M28 24c6-3 12 0 12 0s-6 3-12 0M24 28c3 6 0 12 0 12s-3-6 0-12M20 24c-6 3-12 0-12 0s6-3 12 0"/><path d="M27 21c4-4 9-4 9-4s0 5-4 9M21 27c-4 4-9 4-9 4s0-5 4-9"/>',
    "microblading": '<path d="M5 30c9-12 26-14 38-5"/><path d="M11 27l-3-6M18 22l-2-7M25 20v-7M32 20l2-7M39 23l3-5"/><path d="M12 38h24"/>',
    "slimming-treatments": '<path d="M15 5c0 9 6 11 6 19s-6 10-6 19"/><path d="M33 5c0 9-6 11-6 19s6 10 6 19"/><path d="M11 24h26"/><path d="M14 22v4M18 22v4M30 22v4M34 22v4"/>'
  };
  const LEAF = '<path d="M10 40C10 22 22 10 40 8c0 18-10 30-30 32Z"/><path d="M10 40 30 18"/>';
  const icon = slug => `<span class="need-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[slug] || LEAF}</svg></span>`;

  /* The leaf mark is inlined so its overflow colour can follow the header
     (forest on light backgrounds, white on dark ones). Each copy gets its
     own ids because the header and footer both carry one. */
  let markCount = 0;
  function markSVG() {
    const n = ++markCount;
    return `
    <svg class="mark" viewBox="0 0 100 110" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="neha-sq-${n}"><rect x="5" y="12" width="83" height="84"/></clipPath>
        <g id="neha-leaves-${n}">
          <path d="M36 23 C30 34 14 50 12 64 C11 80 22 92 36 94 C42 95 46 93 47 88 C48 76 46 62 41 50 C39 42 37 32 36 23 Z"/>
          <path d="M42 52 C51 60 59 70 59 82 C59 96 45 104 25 106 C38 101 48 96 50 86 C52 74 49 62 42 52 Z"/>
          <path d="M66 6 C78 16 82 30 78 40 C75 48 68 50 62 48 C65 38 62 26 66 6 Z"/>
          <path d="M62 22 C54 30 52 42 58 50 C62 54 68 56 75 56 C66 52 60 46 60 38 C60 32 61 27 62 22 Z"/>
        </g>
      </defs>
      <rect x="5" y="12" width="83" height="84" fill="#AECD54"/>
      <use href="#neha-leaves-${n}" class="mark-overflow"/>
      <use href="#neha-leaves-${n}" fill="#FFFFFF" clip-path="url(#neha-sq-${n})"/>
      <circle cx="47" cy="12.5" r="9" fill="#E6883C"/>
    </svg>`;
  }

  function logo(extraClass) {
    return `
    <a class="logo ${extraClass || ""}" href="index.html" aria-label="${esc(C.name)} — home">
      ${markSVG()}
      <span class="wordmark"><span class="wm-name">NEHA</span><span class="wm-sub">SALON &amp; SPA</span></span>
    </a>`;
  }

  const announcementText = I.language === "es" ? (C.announcementEs || t(C.announcement)) : C.announcement;
  const announcement = announcementText
    ? `<div class="announce"><p>${esc(announcementText)} · <a href="booking.html">${esc(t("Book today"))}</a></p></div>`
    : "";

  /* A menu item with a submenu. The label is a normal link. On wide screens
     the submenu opens on hover or keyboard focus; in the mobile menu it
     opens with the small arrow button. */
  function navGroup(href, label, id, items, wide) {
    return `
        <div class="nav-item has-sub">
          <a href="${href}">${label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${id}" aria-label="${esc(I.language === "es" ? `Mostrar menú de ${label}` : `Show ${label} menu`)}"></button>
          <div class="sub-menu${wide ? " sub-menu-wide" : ""}" id="${id}">${items}</div>
        </div>`;
  }

  // The EN / ES switch: only when languageSwitch is on in js/config.js
  const languageMenuHTML = !I.switchEnabled ? "" : `<div class="language-menu">
          <button class="lang-switch" id="language-toggle" type="button" aria-label="${esc(t("Change language"))}" aria-haspopup="menu" aria-expanded="false" aria-controls="language-options">
            <span aria-hidden="true">${I.language.toUpperCase()}</span>
          </button>
          <div class="language-options" id="language-options" role="menu" aria-label="${esc(t("Language"))}" hidden>
            <button type="button" role="menuitemradio" data-language="en" aria-checked="${I.language === "en"}" lang="en">EN<span class="sr-only"> English</span></button>
            <button type="button" role="menuitemradio" data-language="es" aria-checked="${I.language === "es"}" lang="es">ES<span class="sr-only"> Español</span></button>
          </div>
        </div>`;

  const headerHTML = `
  <a class="skip-link" href="#main">${esc(t("Skip to main content"))}</a>
  ${announcement}
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      ${logo()}
      <nav class="main-nav" id="main-nav" aria-label="${esc(I.language === "es" ? "Navegación principal" : "Main navigation")}">
        <a href="index.html">${esc(t("Home"))}</a>
        ${navGroup("services.html", t("Services"), "sub-services", serviceLinks, true)}
        <a href="specialists.html">${esc(prosLabel)}</a>
        ${navGroup("about.html", t("About Us"), "sub-about",
          `<a href="about.html#founder">${esc(t("The Founder"))}</a><a href="careers.html">${esc(t("Careers"))}</a>`)}
        <a href="contact.html">${esc(t("Contact Us"))}</a>
        <a class="nav-book" href="booking.html">${esc(t("Book Now"))}</a>
      </nav>
      <div class="header-actions">
        ${languageMenuHTML}
        <a class="btn btn-book" href="booking.html">${esc(t("Book Now"))}</a>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="${esc(t("Open menu"))}" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  /* The band above the footer: "Give the Gift of Self Care" (owner's layout
     example, 2026-11-11). It replaced the Book / Our Specialists / Spa
     parties band. Left out on pages with data-no-cta on <body>. */
  const giftBand = document.body.hasAttribute("data-no-cta") ? "" : `
  <section class="gift-band" aria-labelledby="gift-title">
    <div class="container container-wide">
      <div class="gift-banner">
        <div class="gift-banner-title">
          <p class="eyebrow">A thoughtful way to care</p>
          <h2 id="gift-title">Give the Gift<br>of <em>Self Care</em></h2>
        </div>
        <div class="gift-card-preview" aria-hidden="true">
          ${markSVG()}
          <span>Neha Salon &amp; Spa</span>
          <small>Gift Certificate</small>
        </div>
        <div class="gift-banner-copy">
          <p>Neha Salon &amp; Spa gift certificates are a lovely way to show someone you care. Choose a design, then send or print it today.</p>
          <a class="btn btn-outline-light" data-gift-shop href="gift-certificates.html">Buy Gift Card</a>
        </div>
      </div>
    </div>
  </section>`;

  const footerHTML = `
  ${giftBand}
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo("logo-light")}
        <p>${esc(tagline)}. ${esc(t("Precise threading and a full-service day spa in Pikesville, Maryland."))}</p>
        <div class="socials">${socialLinks}</div>
      </div>
      <div class="footer-col">
        <h3>${esc(t("Services"))}</h3>
        <div class="footer-services">${serviceLinks}</div>
      </div>
      <div class="footer-col">
        <h3>${esc(t("Explore"))}</h3>
        <a href="about.html">${esc(t("About Us"))}</a>
        <a href="specialists.html">${esc(prosLabel)}</a>
        <a href="careers.html">${esc(t("Careers"))}</a>
        <a href="gift-certificates.html">${esc(t("Gift Cards"))}</a>
        <a href="booking.html">${esc(t("Book a Visit"))}</a>
        <a href="contact.html">${esc(t("Contact Us"))}</a>
      </div>
      <div class="footer-col">
        <h3>${esc(t("Visit"))}</h3>
        <span>${esc(main.addressLine1)}<br>${esc(main.addressLine2)}</span>
        <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a>
        <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>
        <ul class="hours-list">${hoursList(main.hours)}</ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(C.name)}. ${esc(t("All rights reserved."))}</span>
      <span class="footer-bottom-meta"><a href="services.html#cancellation-policy">${esc(t("Cancellation Policy"))}</a><span aria-hidden="true">·</span><span>${esc(t("It's all about feeling beautiful."))}</span></span>
    </div>
  </footer>`;

  /* ---------------- Render chrome ---------------- */

  document.getElementById("neha-header")?.insertAdjacentHTML("afterend", headerHTML);
  document.getElementById("neha-header")?.remove();
  document.getElementById("neha-footer")?.insertAdjacentHTML("afterend", footerHTML);
  document.getElementById("neha-footer")?.remove();

  /* ---------------- Fill page content from config ---------------- */

  const each = (selector, fn) => document.querySelectorAll(selector).forEach(fn);

  each("[data-phone]", a => { a.href = main.phoneHref; a.textContent = main.phone; });
  each("[data-email]", a => { a.href = "mailto:" + C.email; a.textContent = C.email; });
  each("[data-address]", el => { el.innerHTML = `${esc(main.addressLine1)}<br>${esc(main.addressLine2)}`; });
  each("[data-hours]", el => { el.innerHTML = hoursList(main.hours); });
  each("[data-spa-hours]", el => { el.innerHTML = hoursList(main.spaHours); });
  each("[data-directions]", a => { a.href = directionsHref(main); a.target = "_blank"; a.rel = "noopener"; });
  each("[data-gift-shop]", a => { a.href = C.giftCardUrl; a.target = "_blank"; a.rel = "noopener"; });
  each("[data-socials]", el => { el.innerHTML = socialLinks; });
  each("[data-social]", a => {
    const item = socials.find(s => s.label.toLowerCase() === a.dataset.social);
    if (item) a.href = item.url; else a.hidden = true;
  });
  each("[data-map]", el => {
    if (!main.mapQuery) return;
    const frame = document.createElement("iframe");
    frame.className = "map-frame";
    frame.loading = "lazy";
    frame.title = `Map showing ${C.name}`;
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.src = "https://www.google.com/maps?output=embed&q=" + encodeURIComponent(main.mapQuery);
    el.replaceWith(frame);
  });

  // One shared source of truth for the policy shown on Services and Booking.
  each("[data-cancellation-policy]", wrap => {
    const policy = C.cancellationPolicy;
    if (!policy) {
      wrap.hidden = true;
      return;
    }
    wrap.innerHTML = `
      <p class="eyebrow">${esc(policy.eyebrow)}</p>
      <h2 id="cancellation-policy-title">${esc(policy.title)}</h2>
      <p class="policy-lede">${esc(policy.intro)}</p>
      <div class="policy-grid">
        ${(policy.items || []).map(item => `<section class="policy-item"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></section>`).join("")}
      </div>
      <p class="policy-contact">${esc(policy.contact)} <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a></p>`;
  });

  // Service icons: the row on the home page, and cards on the Services page
  each("[data-service-tiles]", wrap => {
    const detailed = wrap.dataset.serviceTiles === "detailed";
    const featured = wrap.dataset.serviceTiles === "featured";
    if (featured) {
      wrap.innerHTML = featuredServices.map(s => `
      <a class="home-service-card" href="${esc(s.href)}">
        <img src="${esc(s.img)}" alt="${esc(serviceText(s, "alt"))}" width="900" height="780" loading="lazy" decoding="async">
        <span class="home-service-card-body">
          <strong>${esc(serviceText(s, "name"))}</strong>
          <small>${esc(serviceText(s, "blurb"))}</small>
          <span class="text-link">${esc(t("Learn more"))} <span aria-hidden="true">→</span></span>
        </span>
      </a>`).join("");
      return;
    }
    wrap.innerHTML = services.map(s => detailed ? `
      <a class="service-card" href="${esc(s.slug)}.html">
        ${icon(s.slug)}
        <span class="need-name">${esc(serviceText(s, "name"))}</span>
        <span class="card-blurb">${esc(serviceText(s, "blurb"))}</span>
        <span class="text-link">${esc(t("Details"))}</span>
      </a>` : `
      <a class="need" href="${esc(s.slug)}.html">
        ${icon(s.slug)}
        <span class="need-name">${esc(serviceText(s, "name"))}</span>
        <small>${esc(serviceText(s, "tag"))}</small>
      </a>`).join("");
  });

  // "Other services" list on each service page
  each("[data-other-services]", wrap => {
    wrap.innerHTML = services.filter(s => s.slug + ".html" !== page)
      .map(s => `<a href="${esc(s.slug)}.html">${esc(serviceText(s, "name"))}</a>`).join("");
  });

  // Booking form: one checkbox per service, each with a link to its page
  each("[data-service-options]", wrap => {
    const wanted = params.get("service");
    wrap.innerHTML = services.map(s => `
      <div class="service-option">
        <label><input type="checkbox" name="services" value="${esc(serviceText(s, "name"))}"${s.slug === wanted ? " checked" : ""}> <span>${esc(serviceText(s, "name"))}</span></label>
        <a href="${esc(s.slug)}.html"${external} aria-label="${esc(I.language === "es" ? `Acerca de ${serviceText(s, "name")} (se abre en una pestaña nueva)` : `About ${s.name} (opens in a new tab)`)}">${esc(t("About this service ↗"))}</a>
      </div>`).join("");
  });

  // Booking form: the specialist dropdown. booking.html?pro=<slug> picks one.
  each("[data-pro-select]", select => {
    const wanted = params.get("pro");
    select.innerHTML = `<option value="${esc(t("No preference"))}">${esc(t("No preference"))}</option>` + pros.filter(p => p.services.length).map(p =>
      `<option value="${esc(proText(p, "name"))}"${p.slug === wanted ? " selected" : ""}>${esc(proText(p, "name"))} · ${esc(proText(p, "title"))}</option>`).join("");
  });

  /* ---------------- Specialists ---------------- */

  const firstName = p => p.shortName || proText(p, "name").split(" ")[0];
  const proHref = (p, service) => `specialist.html?p=${encodeURIComponent(p.slug)}${service ? "&service=" + encodeURIComponent(service) : ""}`;
  const bookHref = (p, service) => `booking.html?pro=${encodeURIComponent(p.slug)}${service ? "&service=" + encodeURIComponent(service) : ""}`;
  const proPhoto = (p, cls) => p.photo
    ? `<img class="${cls}" src="${esc(p.photo)}" alt="${esc(proText(p, "name"))}, ${esc(proText(p, "title"))}" loading="lazy">`
    : `<div class="ph-photo ${cls}" data-label="${esc(I.language === "es" ? "Foto próximamente" : "Photo coming soon")}" role="img" aria-label="${esc(I.language === "es" ? `Foto de ${proText(p, "name")} (próximamente)` : `Photo of ${p.name} (coming soon)`)}"></div>`;
  const statusNote = p => p.incomplete ? `<p class="sample-note">${esc(t("Details pending"))}</p>` : "";
  const offers = (p, slug) => p.services.filter(entry => entry.service === slug);
  const priceList = (items, pending) => pending || !items.length
    ? `<div class="notice-soon"><p>${esc(t("Individual pricing is being confirmed."))}</p></div>`
    : `<ul class="menu-list">${items.map(item => `
        <li class="menu-item">
          <div class="menu-line"><h3>${esc(itemText(item, "name"))}</h3><span class="menu-dots" aria-hidden="true"></span><span class="menu-price">${esc(item.price)}</span></div>
          ${item.note ? `<p>${esc(itemText(item, "note"))}</p>` : ""}
          ${item.time ? `<p><span class="dur">${esc(t(item.time))}</span></p>` : ""}
        </li>`).join("")}</ul>`;

  // Service pages: the specialists who offer this service. No prices are
  // shown here on purpose (dev request): people should choose a specialist
  // for their work, not because they are the cheapest. Prices are on each
  // specialist's own page.
  each("[data-service-pros]", wrap => {
    const slug = wrap.dataset.servicePros;
    const list = pros.filter(p => offers(p, slug).length);
    if (!list.length) {
      wrap.outerHTML = `<div class="notice-soon"><p><strong>${esc(t("Tell us what you have in mind."))}</strong></p>
        <p>${I.language === "es" ? `<a href="booking.html?service=${esc(slug)}">Envía una solicitud</a> o llama al <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a> y te ayudaremos a encontrar la especialista adecuada.` : `<a href="booking.html?service=${esc(slug)}">Send a request</a> or call <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a> and we'll match you with the right specialist.`}</p></div>`;
      return;
    }
    wrap.innerHTML = list.map(p => `
      <article class="pro-row">
        <a class="pro-row-photo" href="${proHref(p, slug)}" tabindex="-1" aria-hidden="true">${proPhoto(p, "pro-thumb")}</a>
        <div class="pro-row-body">
          <h3><a href="${proHref(p, slug)}">${esc(proText(p, "name"))}</a></h3>
          <p class="pro-title">${esc(proText(p, "title"))}</p>
          ${statusNote(p)}
        </div>
        <div class="pro-row-actions">
          <a class="btn btn-ink" href="${proHref(p, slug)}">${esc(t("Prices & Work"))}</a>
          <a class="text-link" href="${bookHref(p, slug)}">${esc(I.language === "es" ? `Reservar con ${firstName(p)}` : `Book with ${firstName(p)}`)}</a>
        </div>
      </article>`).join("");
  });

  // Our Specialists page
  each("[data-pro-list]", wrap => {
    wrap.innerHTML = pros.map(p => {
      const hasServices = p.services.length > 0;
      return `
      <article class="pro-card">
        <a href="${proHref(p)}" tabindex="-1" aria-hidden="true">${proPhoto(p, "pro-portrait")}</a>
        <h2><a href="${proHref(p)}">${esc(proText(p, "name"))}</a></h2>
        <p class="pro-title">${esc(proText(p, "title"))}</p>
        ${statusNote(p)}
        <p class="pro-bio">${esc(proText(p, "bio"))}</p>
        ${hasServices ? `<p class="pro-tags">${p.services.map(entry => serviceBySlug(entry.service)).filter((service, index, list) => service && list.indexOf(service) === index).map(service => esc(serviceText(service, "name"))).join(" · ")}</p>` : ""}
        <div class="pro-actions">
          ${hasServices ? `<a class="btn btn-outline" href="${proHref(p)}">${esc(t("Prices & Work"))}</a>
          <a class="btn btn-ink" href="${bookHref(p)}">${esc(I.language === "es" ? `Reservar con ${firstName(p)}` : `Book with ${firstName(p)}`)}</a>` : `<a class="btn btn-outline" href="contact.html">${esc(t("Contact Us"))}</a>`}
        </div>
      </article>`;
    }).join("");
  });

  // A specialist's own page: specialist.html?p=<slug>[&service=<slug>]
  each("[data-pro-page]", wrap => {
    const p = pros.find(item => item.slug === params.get("p"));
    if (!p) {
      wrap.innerHTML = `<section class="section"><div class="container container-narrow prose">
        <h2>${esc(t("We couldn't find that specialist"))}</h2>
        <p>${esc(t("They may have moved on, or the link may be out of date."))}</p>
        <a class="btn btn-ink" href="specialists.html">${esc(I.language === "es" ? `Ver ${prosLabel.toLowerCase()}` : `See ${prosLabel}`)}</a></div></section>`;
      return;
    }
    const wanted = params.get("service");
    const hasServices = p.services.length > 0;
    // The service the visitor came from is listed first
    const entries = [...p.services].sort((a, b) => (b.service === wanted) - (a.service === wanted));
    document.title = `${proText(p, "name")}, ${proText(p, "title")} — ${C.name}`;
    each("[data-pro-name]", el => { el.textContent = proText(p, "name"); });
    each("[data-pro-title]", el => { el.textContent = proText(p, "title"); });
    const work = p.work && p.work.length
      ? p.work.map(w => `<img class="work-photo" src="${esc(w.img)}" alt="${esc(w.label || (I.language === "es" ? `Trabajo de ${proText(p, "name")}` : `Work by ${p.name}`))}" loading="lazy">`).join("")
      : ["", " tone-sage", " tone-deep", " tone-lime", "", " tone-sage"].map(tone =>
          `<div class="ph-photo work-photo${tone}" data-label="${esc(t("Work photo"))}"></div>`).join("");
    wrap.innerHTML = `
    <section class="section" id="prices" aria-labelledby="prices-title">
      <div class="container service-layout">
        <div class="prose">
          <h2 id="prices-title">${esc(t("Services & prices"))}</h2>
          ${statusNote(p)}
          ${hasServices ? entries.map(entry => {
            const service = serviceBySlug(entry.service);
            return `
          <div class="price-group">
            <h3 class="price-group-title">${entry.title ? esc(itemText(entry, "title")) : `<a href="${esc(entry.service)}.html">${esc(service ? serviceText(service, "name") : entry.service)}</a>`}</h3>
            ${priceList(entry.items, entry.pending)}
          </div>`;
          }).join("") : `<div class="notice-soon"><p>${esc(t("Services and pricing are being confirmed."))}</p></div>`}
        </div>
        <aside class="aside-card pro-aside" aria-label="${esc(I.language === "es" ? `Acerca de ${proText(p, "name")}` : `About ${p.name}`)}">
          ${proPhoto(p, "pro-portrait")}
          <h2>${esc(proText(p, "name"))}</h2>
          <p class="pro-title">${esc(proText(p, "title"))}</p>
          <p>${esc(proText(p, "bio"))}</p>
          ${p.instagram ? `<p><a href="${esc(p.instagram)}"${external}>${esc(t("Instagram"))}</a></p>` : ""}
          ${hasServices ? `<a class="btn btn-ink" href="${bookHref(p, wanted)}">${esc(I.language === "es" ? `Reservar con ${firstName(p)}` : `Book with ${firstName(p)}`)}</a>
          <a class="btn btn-outline" href="#work">${esc(I.language === "es" ? `Ver el trabajo de ${firstName(p)}` : `See ${firstName(p)}'s Work`)}</a>` : `<a class="btn btn-outline" href="contact.html">${esc(t("Contact Us"))}</a>`}
        </aside>
      </div>
    </section>
    ${hasServices ? `<section class="section section-mist" id="work" aria-labelledby="work-title">
      <div class="container">
        <div class="section-head"><h2 id="work-title">${esc(I.language === "es" ? `Trabajo de ${firstName(p)}` : `${firstName(p)}'s work`)}</h2></div>
        <div class="work-grid"${p.work && p.work.length ? "" : ' data-placeholder="Work photos"'}>${work}</div>
        <div class="center-cta"><a class="btn btn-ink" href="${bookHref(p, wanted)}">${esc(I.language === "es" ? `Reservar con ${firstName(p)}` : `Book with ${firstName(p)}`)}</a></div>
      </div>
    </section>` : ""}`;
  });

  // Product strip: the list is repeated so the strip is always wider than
  // the screen, then doubled so it can loop without a gap.
  each("[data-products]", track => {
    const products = C.products || [];
    if (!products.length) return;
    let list = products;
    while (list.length < 8) list = list.concat(products);
    const item = (p, hidden) => p.img
      ? `<li${hidden ? ' aria-hidden="true"' : ""} class="product"><img src="${esc(p.img)}" alt="${esc(p.name)}: ${esc(p.kind)}" loading="lazy"></li>`
      : `<li${hidden ? ' aria-hidden="true"' : ""} class="product product-ph"><span>${esc(p.name)}</span><small>${esc(p.kind)}</small></li>`;
    const items = list.map((p, index) => item(p, index >= products.length)).join("");
    track.innerHTML = items + list.map(p => item(p, true)).join("");
    const strip = track.closest(".product-strip");
    const button = strip?.querySelector(".strip-pause");
    button?.addEventListener("click", () => {
      const paused = strip.classList.toggle("is-paused");
      button.classList.toggle("is-paused", paused);
      button.setAttribute("aria-pressed", String(paused));
      button.setAttribute("aria-label", t(paused ? "Play product slideshow" : "Pause product slideshow"));
    });
  });

  /* ---------------- Header: transparent over hero, solid after ---------------- */

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const overHero = document.body.classList.contains("header-over-hero");
  if (I.switchEnabled) {
    const languageMenu = document.querySelector(".language-menu");
    const languageToggle = document.getElementById("language-toggle");
    const languageOptions = document.getElementById("language-options");

    function setLanguageMenu(open) {
      languageOptions.hidden = !open;
      languageToggle.setAttribute("aria-expanded", String(open));
    }

    languageToggle.addEventListener("click", event => {
      event.stopPropagation();
      setLanguageMenu(languageOptions.hidden);
    });

    document.querySelectorAll("[data-language]").forEach(button => {
      button.addEventListener("click", () => I.setLanguage?.(button.dataset.language));
    });
    document.addEventListener("click", event => {
      if (!languageOptions.hidden && !languageMenu.contains(event.target)) setLanguageMenu(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !languageOptions.hidden) {
        setLanguageMenu(false);
        languageToggle.focus();
      }
    });
  }

  function syncHeader() {
    header.classList.toggle("is-solid", !overHero || window.scrollY > 40 || mainNav.classList.contains("open"));
  }
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  /* ---------------- Mobile menu ---------------- */

  function setMobileMenu(open) {
    mainNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", t(open ? "Close menu" : "Open menu"));
    syncHeader();
  }
  navToggle.addEventListener("click", e => {
    e.stopPropagation();
    setMobileMenu(!mainNav.classList.contains("open"));
  });
  mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMobileMenu(false)));
  document.addEventListener("click", e => {
    if (mainNav.classList.contains("open") && !mainNav.contains(e.target)) setMobileMenu(false);
  });

  /* ---------------- Submenus ---------------- */

  function closeSubmenus(except) {
    mainNav.querySelectorAll(".has-sub.open").forEach(item => {
      if (item === except) return;
      item.classList.remove("open");
      item.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
    });
  }
  mainNav.querySelectorAll(".sub-toggle").forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      const item = button.parentElement;
      const open = !item.classList.contains("open");
      closeSubmenus(item);
      item.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const toggled = mainNav.querySelector(".has-sub.open");
    if (toggled) {
      closeSubmenus();
      toggled.querySelector(".sub-toggle").focus();
    } else if (mainNav.classList.contains("open")) {
      setMobileMenu(false);
      navToggle.focus();
    } else if (mainNav.contains(document.activeElement)) {
      document.activeElement.blur(); // closes a submenu opened by keyboard focus
    }
  });

  /* ---------------- Current page highlight ---------------- */

  const aboutPages = ["about.html", "careers.html"];
  const proPages = ["specialists.html", "specialist.html"];
  const isService = page === "services.html" || services.some(s => s.slug + ".html" === page);
  mainNav.querySelectorAll(":scope > a, .has-sub > a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === page || (href === "services.html" && isService) ||
        (href === "about.html" && aboutPages.includes(page)) ||
        (href === "specialists.html" && proPages.includes(page))) a.classList.add("current");
  });
  mainNav.querySelectorAll(".sub-menu a").forEach(a => {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });

  /* Translate static page copy after all data-driven content is in place. */
  I.apply(document);

  /* ---------------- Gentle scroll reveal ---------------- */

  const revealEls = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    // Content stays visible if this script never runs; hiding starts here.
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------------- ?review — outline every placeholder ---------------- */

  if (new URLSearchParams(location.search).has("review")) {
    document.documentElement.classList.add("show-placeholders");
  }
})();
