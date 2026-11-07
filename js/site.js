/* ==========================================================================
   NEHA Threading — site.js
   Shared chrome for every page (same approach as the Elite Dental Lab site):
   announcement bar, header with mobile menu, footer, booking links,
   scroll reveal, and the ?review placeholder overlay.

   Pages provide mount points:
     <div id="neha-header"></div>  (before <main>)
     <div id="neha-footer"></div>  (after <main>)
   Add class "header-over-hero" to <body> when the page opens on a full-bleed
   hero so the header starts transparent.
   ========================================================================== */

(function () {
  const C = window.NEHA_CONFIG || {};
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);

  const bookHref = C.bookingUrl || "index.html#visit";
  const bookAttrs = C.bookingUrl ? ' target="_blank" rel="noopener"' : "";
  const giftHref = C.giftCardUrl || "index.html#visit";

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
    ? `<div class="announce" data-placeholder="Offer"><p>${esc(C.announcement)} · <a href="${esc(bookHref)}"${bookAttrs}>Book today</a></p></div>`
    : "";

  const headerHTML = `
  <a class="skip-link" href="#main">Skip to main content</a>
  ${announcement}
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      ${logo()}
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <a href="index.html#services">Services</a>
        <a href="services.html">Menu &amp; Prices</a>
        <a href="index.html#about">Our Story</a>
        <a href="index.html#gallery">Gallery</a>
        <a href="index.html#visit">Visit</a>
        <a class="nav-book" href="${esc(bookHref)}"${bookAttrs}>Book Now</a>
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="${esc(C.phoneHref)}" data-placeholder="Phone">${esc(C.phone)}</a>
        <a class="btn btn-book" href="${esc(bookHref)}"${bookAttrs}>Book Now</a>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const hoursRows = (C.hours || [])
    .map(([days, time]) => `<li><span>${esc(days)}</span><span>${esc(time)}</span></li>`).join("");

  const footerHTML = `
  <section class="cta-trio" aria-label="Book, gift cards and offers">
    <div class="container cta-trio-grid">
      <div class="cta-item">
        <h2>Book a visit</h2>
        <p>Choose your service and time online in under a minute.</p>
        <a class="btn btn-lime" href="${esc(bookHref)}"${bookAttrs}>Book Now</a>
      </div>
      <div class="cta-item">
        <h2>Gift cards</h2>
        <p>Polished brows and a calm hour — the easiest gift to give.</p>
        <a class="btn btn-outline-light" href="${esc(giftHref)}">Buy a Gift Card</a>
      </div>
      <div class="cta-item">
        <h2>Walk-ins welcome</h2>
        <p>Short on time? Stop by — most threading services take 15 minutes.</p>
        <a class="btn btn-outline-light" href="index.html#visit">Hours &amp; Directions</a>
      </div>
    </div>
  </section>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo("logo-light")}
        <p>${esc(C.tagline)}. Gentle, precise threading and skin care with 100% cotton thread and no harsh chemicals.</p>
        <div class="socials">
          <a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a>
          <a href="${esc(C.facebook)}" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Explore</h3>
        <a href="index.html#services">Services</a>
        <a href="services.html">Menu &amp; Prices</a>
        <a href="index.html#about">Our Story</a>
        <a href="index.html#gallery">Gallery</a>
        <a href="index.html#faq">FAQ</a>
      </div>
      <div class="footer-col">
        <h3>Visit</h3>
        <span data-placeholder="Address">${esc(C.addressLine1)}<br>${esc(C.addressLine2)}</span>
        <a href="${esc(C.phoneHref)}">${esc(C.phone)}</a>
        <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>
      </div>
      <div class="footer-col">
        <h3>Hours</h3>
        <ul class="hours-list" data-placeholder="Hours">${hoursRows}</ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(C.name)}. All rights reserved.</span>
      <span>Natural beauty, shaped by hand.</span>
    </div>
  </footer>`;

  /* ---------------- Render ---------------- */

  document.getElementById("neha-header")?.insertAdjacentHTML("afterend", headerHTML);
  document.getElementById("neha-header")?.remove();
  document.getElementById("neha-footer")?.insertAdjacentHTML("afterend", footerHTML);
  document.getElementById("neha-footer")?.remove();

  // Book / gift / contact details elsewhere on the page
  document.querySelectorAll("[data-book]").forEach(a => {
    a.href = bookHref;
    if (C.bookingUrl) { a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-gift]").forEach(a => { a.href = giftHref; });
  document.querySelectorAll("[data-phone]").forEach(a => { a.href = C.phoneHref; a.textContent = C.phone; });
  document.querySelectorAll("[data-email]").forEach(a => { a.href = "mailto:" + C.email; a.textContent = C.email; });
  document.querySelectorAll("[data-address]").forEach(el => {
    el.innerHTML = `${esc(C.addressLine1)}<br>${esc(C.addressLine2)}`;
  });
  document.querySelectorAll("[data-hours]").forEach(el => { el.innerHTML = hoursRows; });
  if (C.mapQuery) {
    document.querySelectorAll("[data-map]").forEach(el => {
      const frame = document.createElement("iframe");
      frame.className = "map-frame";
      frame.loading = "lazy";
      frame.title = `Map showing ${C.name}`;
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.src = "https://www.google.com/maps?output=embed&q=" + encodeURIComponent(C.mapQuery);
      el.replaceWith(frame);
    });
  }

  /* ---------------- Header: transparent over hero, solid after ---------------- */

  const header = document.getElementById("site-header");
  const overHero = document.body.classList.contains("header-over-hero");
  function syncHeader() {
    header.classList.toggle("is-solid", !overHero || window.scrollY > 40 ||
      document.getElementById("main-nav").classList.contains("open"));
  }
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  /* ---------------- Mobile nav (from the Elite site) ---------------- */

  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  function setMobileMenu(open) {
    mainNav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
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
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mainNav.classList.contains("open")) {
      setMobileMenu(false);
      navToggle.focus();
    }
  });

  /* ---------------- Current page highlight ---------------- */

  const page = location.pathname.split("/").pop() || "index.html";
  mainNav.querySelectorAll("a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("current");
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
