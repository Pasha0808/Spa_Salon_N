/* ==========================================================================
   NEHA Threading — site.js
   Shared chrome for every page (same approach as the Elite Dental Lab site):
   announcement bar, header with dropdown menus, footer, and everything that
   is filled in from js/config.js (service lists, contact details, map,
   product strip). Also scroll reveal and the ?review placeholder overlay.

   Pages provide mount points:
     <div id="neha-header"></div>  (before <main>)
     <div id="neha-footer"></div>  (after <main>)
   Add class "header-over-hero" to <body> when the page opens on a dark hero
   so the header starts transparent. Add data-no-cta to <body> to leave out
   the Book / Our Specialists / Spa parties band above the footer.
   ========================================================================== */

(function () {
  const C = window.NEHA_CONFIG || {};
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);

  const services = C.services || [];
  const locations = C.locations || [];
  const main = locations[0] || {};
  const socials = (C.socials || []).filter(item => item.url);
  const external = ' target="_blank" rel="noopener"';
  const page = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);
  const pros = window.NEHA_SPECIALISTS || [];
  const prosLabel = C.specialistsLabel || "Our Specialists";
  const serviceBySlug = slug => services.find(s => s.slug === slug);

  const hoursList = hours => (hours || [])
    .map(([days, time]) => `<li><span>${esc(days)}</span><span>${esc(time)}</span></li>`).join("");
  const directionsHref = loc => "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(loc.mapQuery || `${loc.addressLine1}, ${loc.addressLine2}`);
  const socialLinks = socials
    .map(item => `<a href="${esc(item.url)}"${external}>${esc(item.label)}</a>`).join("");
  const serviceLinks = services
    .map(s => `<a href="${esc(s.slug)}.html">${esc(s.name)}</a>`).join("");

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
      <span class="wordmark"><span class="wm-name">NEHA</span><span class="wm-sub">THREADING</span></span>
    </a>`;
  }

  const announcement = C.announcement
    ? `<div class="announce"><p>${esc(C.announcement)} · <a href="booking.html">Book today</a></p></div>`
    : "";

  /* A menu item with a submenu. The label is a normal link. On wide screens
     the submenu opens on hover or keyboard focus; in the mobile menu it
     opens with the small arrow button. */
  function navGroup(href, label, id, items, wide) {
    return `
        <div class="nav-item has-sub">
          <a href="${href}">${label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${id}" aria-label="Show ${label} menu"></button>
          <div class="sub-menu${wide ? " sub-menu-wide" : ""}" id="${id}">${items}</div>
        </div>`;
  }

  const headerHTML = `
  <a class="skip-link" href="#main">Skip to main content</a>
  ${announcement}
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      ${logo()}
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        ${navGroup("services.html", "Services", "sub-services", serviceLinks, true)}
        <a href="specialists.html">${esc(prosLabel)}</a>
        ${navGroup("about.html", "About Us", "sub-about",
          `<a href="about.html#founder">The Founder</a><a href="careers.html">Careers</a>`)}
        <a href="index.html#gallery">Gallery</a>
        <a href="contact.html">Contact Us</a>
        <a class="nav-book" href="booking.html">Book Now</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-book" href="booking.html">Book Now</a>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const ctaTrio = document.body.hasAttribute("data-no-cta") ? "" : `
  <section class="cta-trio" aria-label="Book, specialists and parties">
    <div class="container cta-trio-grid">
      <div class="cta-item">
        <h2>Book a visit</h2>
        <p>Tell us what you'd like and when. We'll confirm by email or phone.</p>
        <a class="btn btn-lime" href="booking.html">Book Now</a>
      </div>
      <div class="cta-item">
        <h2>${esc(prosLabel)}</h2>
        <p>See each specialist's prices and work, and book with your favourite.</p>
        <a class="btn btn-outline-light" href="specialists.html">Meet the Team</a>
      </div>
      <div class="cta-item">
        <h2>Spa parties</h2>
        <p>Bring your friends and make a day of it.</p>
        <a class="btn btn-outline-light" href="spa-parties.html">Plan a Party</a>
      </div>
    </div>
  </section>`;

  const footerHTML = `
  ${ctaTrio}
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo("logo-light")}
        <p>${esc(C.tagline)}. Precise threading and a full-service day spa in Pikesville, Maryland.</p>
        <div class="socials">${socialLinks}</div>
      </div>
      <div class="footer-col">
        <h3>Services</h3>
        <div class="footer-services">${serviceLinks}</div>
      </div>
      <div class="footer-col">
        <h3>Explore</h3>
        <a href="about.html">About Us</a>
        <a href="specialists.html">${esc(prosLabel)}</a>
        <a href="careers.html">Careers</a>
        <a href="booking.html">Book a Visit</a>
        <a href="contact.html">Contact Us</a>
      </div>
      <div class="footer-col">
        <h3>Visit</h3>
        <span>${esc(main.addressLine1)}<br>${esc(main.addressLine2)}</span>
        <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a>
        <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>
        <ul class="hours-list">${hoursList(main.hours)}</ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(C.name)}. All rights reserved.</span>
      <span>It's all about feeling beautiful.</span>
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

  // Service icons: the row on the home page, and cards on the Services page
  each("[data-service-tiles]", wrap => {
    const detailed = wrap.dataset.serviceTiles === "detailed";
    wrap.innerHTML = services.map(s => detailed ? `
      <a class="service-card" href="${esc(s.slug)}.html">
        ${icon(s.slug)}
        <span class="need-name">${esc(s.name)}</span>
        <span class="card-blurb">${esc(s.blurb)}</span>
        <span class="text-link">Details</span>
      </a>` : `
      <a class="need" href="${esc(s.slug)}.html">
        ${icon(s.slug)}
        <span class="need-name">${esc(s.name)}</span>
        <small>${esc(s.tag || "")}</small>
      </a>`).join("");
  });

  // "Other services" list on each service page
  each("[data-other-services]", wrap => {
    wrap.innerHTML = services.filter(s => s.slug + ".html" !== page)
      .map(s => `<a href="${esc(s.slug)}.html">${esc(s.name)}</a>`).join("");
  });

  // Booking form: one checkbox per service, each with a link to its page
  each("[data-service-options]", wrap => {
    const wanted = params.get("service");
    wrap.innerHTML = services.map(s => `
      <div class="service-option">
        <label><input type="checkbox" name="services" value="${esc(s.name)}"${s.slug === wanted ? " checked" : ""}> <span>${esc(s.name)}</span></label>
        <a href="${esc(s.slug)}.html"${external} aria-label="About ${esc(s.name)} (opens in a new tab)">About this service ↗</a>
      </div>`).join("");
  });

  // Booking form: the specialist dropdown. booking.html?pro=<slug> picks one.
  each("[data-pro-select]", select => {
    const wanted = params.get("pro");
    select.innerHTML = `<option value="No preference">No preference</option>` + pros.map(p =>
      `<option value="${esc(p.name)}"${p.slug === wanted ? " selected" : ""}>${esc(p.name)} · ${esc(p.title)}</option>`).join("");
  });

  /* ---------------- Specialists ---------------- */

  // "Book with Priya". Sample profiles keep their whole placeholder name.
  const firstName = p => p.shortName || (p.sample ? p.name : p.name.split(" ")[0]);
  const proHref = (p, service) => `specialist.html?p=${encodeURIComponent(p.slug)}${service ? "&service=" + encodeURIComponent(service) : ""}`;
  const bookHref = (p, service) => `booking.html?pro=${encodeURIComponent(p.slug)}${service ? "&service=" + encodeURIComponent(service) : ""}`;
  const proPhoto = (p, cls) => p.photo
    ? `<img class="${cls}" src="${esc(p.photo)}" alt="${esc(p.name)}, ${esc(p.title)}" loading="lazy">`
    : `<div class="ph-photo ${cls}" data-label="Photo coming soon" role="img" aria-label="Photo of ${esc(p.name)} (coming soon)"></div>`;
  const sampleNote = p => p.sample ? `<p class="sample-note">Sample profile</p>` : "";
  const offers = (p, slug) => p.services.filter(entry => entry.service === slug);
  // Lowest price a specialist lists for a service, e.g. "$14"
  function fromPrice(p, slug) {
    const amounts = offers(p, slug).flatMap(entry => entry.items)
      .flatMap(item => (String(item.price).match(/\$\d+(?:\.\d+)?/g) || []).map(v => parseFloat(v.slice(1))));
    return amounts.length ? "$" + Math.min(...amounts) : "";
  }
  const priceList = items => `<ul class="menu-list">${items.map(item => `
        <li class="menu-item">
          <div class="menu-line"><h3>${esc(item.name)}</h3><span class="menu-dots" aria-hidden="true"></span><span class="menu-price">${esc(item.price)}</span></div>
          ${item.note ? `<p>${esc(item.note)}</p>` : ""}
          ${item.time ? `<p><span class="dur">${esc(item.time)}</span></p>` : ""}
        </li>`).join("")}</ul>`;

  // Service pages: the specialists who offer this service
  each("[data-service-pros]", wrap => {
    const slug = wrap.dataset.servicePros;
    const list = pros.filter(p => offers(p, slug).length);
    if (!list.length) {
      wrap.outerHTML = `<div class="notice-soon"><p><strong>Tell us what you have in mind.</strong></p>
        <p><a href="booking.html?service=${esc(slug)}">Send a request</a> or call <a href="${esc(main.phoneHref)}">${esc(main.phone)}</a> and we'll match you with the right specialist.</p></div>`;
      return;
    }
    wrap.innerHTML = list.map(p => `
      <article class="pro-row">
        <a class="pro-row-photo" href="${proHref(p, slug)}" tabindex="-1" aria-hidden="true">${proPhoto(p, "pro-thumb")}</a>
        <div class="pro-row-body">
          <h3><a href="${proHref(p, slug)}">${esc(p.name)}</a></h3>
          <p class="pro-title">${esc(p.title)}</p>
          ${fromPrice(p, slug) ? `<p class="pro-from"><small>from</small> ${fromPrice(p, slug)}</p>` : ""}
          ${sampleNote(p)}
        </div>
        <div class="pro-row-actions">
          <a class="btn btn-ink" href="${proHref(p, slug)}">Prices &amp; Work</a>
          <a class="text-link" href="${bookHref(p, slug)}">Book with ${esc(firstName(p))}</a>
        </div>
      </article>`).join("");
  });

  // Our Specialists page
  each("[data-pro-list]", wrap => {
    wrap.innerHTML = pros.map(p => {
      const names = [...new Set(p.services.map(entry => serviceBySlug(entry.service)?.name).filter(Boolean))];
      return `
      <article class="pro-card">
        <a href="${proHref(p)}" tabindex="-1" aria-hidden="true">${proPhoto(p, "pro-portrait")}</a>
        <h2><a href="${proHref(p)}">${esc(p.name)}</a></h2>
        <p class="pro-title">${esc(p.title)}</p>
        ${sampleNote(p)}
        <p class="pro-bio">${esc(p.bio)}</p>
        <p class="pro-tags">${names.map(esc).join(" · ")}</p>
        <div class="pro-actions">
          <a class="btn btn-outline" href="${proHref(p)}">Prices &amp; Work</a>
          <a class="btn btn-ink" href="${bookHref(p)}">Book with ${esc(firstName(p))}</a>
        </div>
      </article>`;
    }).join("");
  });

  // A specialist's own page: specialist.html?p=<slug>[&service=<slug>]
  each("[data-pro-page]", wrap => {
    const p = pros.find(item => item.slug === params.get("p"));
    if (!p) {
      wrap.innerHTML = `<section class="section"><div class="container container-narrow prose">
        <h2>We couldn't find that specialist</h2>
        <p>They may have moved on, or the link may be out of date.</p>
        <a class="btn btn-ink" href="specialists.html">See ${esc(prosLabel)}</a></div></section>`;
      return;
    }
    const wanted = params.get("service");
    // The service the visitor came from is listed first
    const entries = [...p.services].sort((a, b) => (b.service === wanted) - (a.service === wanted));
    document.title = `${p.name}, ${p.title} — ${C.name}`;
    each("[data-pro-name]", el => { el.textContent = p.name; });
    each("[data-pro-title]", el => { el.textContent = p.title; });
    const work = p.work && p.work.length
      ? p.work.map(w => `<img class="work-photo" src="${esc(w.img)}" alt="${esc(w.label || `Work by ${p.name}`)}" loading="lazy">`).join("")
      : ["", " tone-sage", " tone-deep", " tone-lime", "", " tone-sage"].map(tone =>
          `<div class="ph-photo work-photo${tone}" data-label="Work photo"></div>`).join("");
    wrap.innerHTML = `
    <section class="section" id="prices" aria-labelledby="prices-title">
      <div class="container service-layout">
        <div class="prose">
          <h2 id="prices-title">Services &amp; prices</h2>
          ${p.sample ? `<p class="sample-note">Sample profile: the name, prices and photos are placeholders</p>` : ""}
          ${entries.map(entry => {
            const service = serviceBySlug(entry.service);
            return `
          <div class="price-group">
            <h3 class="price-group-title">${entry.title ? esc(entry.title) : `<a href="${esc(entry.service)}.html">${esc(service ? service.name : entry.service)}</a>`}</h3>
            ${priceList(entry.items)}
          </div>`;
          }).join("")}
        </div>
        <aside class="aside-card pro-aside" aria-label="About ${esc(p.name)}">
          ${proPhoto(p, "pro-portrait")}
          <h2>${esc(p.name)}</h2>
          <p class="pro-title">${esc(p.title)}</p>
          <p>${esc(p.bio)}</p>
          ${p.instagram ? `<p><a href="${esc(p.instagram)}"${external}>Instagram</a></p>` : ""}
          <a class="btn btn-ink" href="${bookHref(p, wanted)}">Book with ${esc(firstName(p))}</a>
          <a class="btn btn-outline" href="#work">See ${esc(firstName(p))}'s Work</a>
        </aside>
      </div>
    </section>
    <section class="section section-mist" id="work" aria-labelledby="work-title">
      <div class="container">
        <div class="section-head"><h2 id="work-title">${esc(firstName(p))}'s work</h2></div>
        <div class="work-grid"${p.work && p.work.length ? "" : ' data-placeholder="Work photos"'}>${work}</div>
        <div class="center-cta"><a class="btn btn-ink" href="${bookHref(p, wanted)}">Book with ${esc(firstName(p))}</a></div>
      </div>
    </section>`;
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
      button.setAttribute("aria-label", paused ? "Play product slideshow" : "Pause product slideshow");
    });
  });

  /* ---------------- Header: transparent over hero, solid after ---------------- */

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const overHero = document.body.classList.contains("header-over-hero");

  function syncHeader() {
    header.classList.toggle("is-solid", !overHero || window.scrollY > 40 || mainNav.classList.contains("open"));
  }
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  /* ---------------- Mobile menu ---------------- */

  function setMobileMenu(open) {
    mainNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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
