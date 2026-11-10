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
   the Book / Gift certificates / Spa parties band above the footer.
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

  const hoursList = hours => (hours || [])
    .map(([days, time]) => `<li><span>${esc(days)}</span><span>${esc(time)}</span></li>`).join("");
  const directionsHref = loc => "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(loc.mapQuery || `${loc.addressLine1}, ${loc.addressLine2}`);
  const socialLinks = socials
    .map(item => `<a href="${esc(item.url)}"${external}>${esc(item.label)}</a>`).join("");
  const serviceLinks = services
    .map(s => `<a href="${esc(s.slug)}.html">${esc(s.name)}</a>`).join("");

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
        ${navGroup("about.html", "About Us", "sub-about",
          `<a href="about.html#founder">The Founder</a><a href="team.html">Our Team</a><a href="careers.html">Careers</a>`)}
        <a href="index.html#gallery">Gallery</a>
        <a href="gift-certificates.html">Gift Certificates</a>
        <a href="contact.html">Contact Us</a>
        <a class="nav-book" href="booking.html">Book Now</a>
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="${esc(main.phoneHref)}">${esc(main.phone)}</a>
        <a class="btn btn-book" href="booking.html">Book Now</a>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const ctaTrio = document.body.hasAttribute("data-no-cta") ? "" : `
  <section class="cta-trio" aria-label="Book, gift certificates and parties">
    <div class="container cta-trio-grid">
      <div class="cta-item">
        <h2>Book a visit</h2>
        <p>Tell us what you'd like and when. We'll confirm by email or phone.</p>
        <a class="btn btn-lime" href="booking.html">Book Now</a>
      </div>
      <div class="cta-item">
        <h2>Gift certificates</h2>
        <p>Treat someone you love to a little calm.</p>
        <a class="btn btn-outline-light" href="gift-certificates.html">Gift Certificates</a>
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
        <a href="team.html">Our Team</a>
        <a href="careers.html">Careers</a>
        <a href="gift-certificates.html">Gift Certificates</a>
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

  // Service tiles (home page and Services page)
  each("[data-service-tiles]", wrap => {
    const detailed = wrap.dataset.serviceTiles === "detailed";
    wrap.innerHTML = services.map((s, i) => `
      <a class="service-tile${detailed ? " service-tile-detailed" : ""}" href="${esc(s.slug)}.html">
        <span class="tile-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="tile-name">${esc(s.name)}</span>
        ${detailed ? `<span class="tile-blurb">${esc(s.blurb)}</span>` : ""}
        <span class="tile-arrow" aria-hidden="true">→</span>
      </a>`).join("");
  });

  // "Other services" list on each service page
  each("[data-other-services]", wrap => {
    wrap.innerHTML = services.filter(s => s.slug + ".html" !== page)
      .map(s => `<a href="${esc(s.slug)}.html">${esc(s.name)}</a>`).join("");
  });

  // Booking form: one checkbox per service, each with a link to its page
  each("[data-service-options]", wrap => {
    const wanted = new URLSearchParams(location.search).get("service");
    wrap.innerHTML = services.map(s => `
      <div class="service-option">
        <label><input type="checkbox" name="services" value="${esc(s.name)}"${s.slug === wanted ? " checked" : ""}> <span>${esc(s.name)}</span></label>
        <a href="${esc(s.slug)}.html"${external} aria-label="About ${esc(s.name)} (opens in a new tab)">About this service ↗</a>
      </div>`).join("");
  });

  // Product strip: the list is repeated so the strip is always wider than
  // the screen, then doubled so it can loop without a gap.
  each("[data-products]", track => {
    const products = C.products || [];
    if (!products.length) return;
    let list = products;
    while (list.length < 8) list = list.concat(products);
    const items = list.map(p => p.img
      ? `<li class="product"><img src="${esc(p.img)}" alt="${esc(p.name)}: ${esc(p.kind)}" loading="lazy"></li>`
      : `<li class="product product-ph"><span>${esc(p.name)}</span><small>${esc(p.kind)}</small></li>`).join("");
    track.innerHTML = items + items.replace(/<li class="product/g, '<li aria-hidden="true" class="product');
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

  const aboutPages = ["about.html", "team.html", "careers.html"];
  const isService = page === "services.html" || services.some(s => s.slug + ".html" === page);
  mainNav.querySelectorAll(":scope > a, .has-sub > a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === page || (href === "services.html" && isService) ||
        (href === "about.html" && aboutPages.includes(page))) a.classList.add("current");
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
