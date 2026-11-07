/* ==========================================================================
   NEHA Threading — main.js
   Page behaviour carried over from the Elite Dental Lab site:
   hero background video (with the same phone / data-saver / reduced-motion
   rules), accessible menu tabs, and contact-form validation.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Menu tabs ---------------- */

  document.querySelectorAll("[data-tabs]").forEach(group => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));

    function activate(selected, moveFocus) {
      tabs.forEach((tab, i) => {
        const on = tab === selected;
        tab.classList.toggle("active", on);
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (moveFocus) selected.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, false));
      tab.addEventListener("keydown", event => {
        let next = null;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== null) {
          event.preventDefault();
          activate(tabs[next], true);
        }
      });
    });

    // Deep links such as services.html#lashes open the matching tab
    const fromHash = tabs.find(tab => "#" + tab.dataset.tab === location.hash);
    activate(fromHash || tabs.find(tab => tab.classList.contains("active")) || tabs[0], false);
  });

  /* ---------------- Hero video ----------------
     Phones keep the poster and download nothing: the clip is decorative.
     Same when the visitor asks to save data or to reduce motion. */

  const video = document.getElementById("hero-video");
  const pauseBtn = document.getElementById("hero-pause");

  if (video) {
    const phoneQuery = window.matchMedia("(max-width: 760px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;

    function updateHeroVideo() {
      const savesData = connection && connection.saveData;
      const canPlay = !phoneQuery.matches && !savesData && !motionQuery.matches;

      if (!canPlay) {
        video.pause();
        if (video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        if (pauseBtn) pauseBtn.hidden = true;
        return;
      }
      if (!video.hasAttribute("src")) video.src = video.dataset.src;
      video.setAttribute("autoplay", "");
      if (pauseBtn) pauseBtn.hidden = false;
      video.play().catch(() => {});
    }

    updateHeroVideo();
    phoneQuery.addEventListener("change", updateHeroVideo);
    motionQuery.addEventListener("change", updateHeroVideo);
    connection?.addEventListener?.("change", updateHeroVideo);
  }

  if (video && pauseBtn) {
    function syncPauseBtn() {
      const playing = !video.paused;
      pauseBtn.classList.toggle("is-paused", !playing);
      pauseBtn.setAttribute("aria-pressed", String(!playing));
      pauseBtn.setAttribute("aria-label", playing ? "Pause background video" : "Play background video");
    }
    video.addEventListener("play", syncPauseBtn);
    video.addEventListener("pause", syncPauseBtn);
    syncPauseBtn();
    pauseBtn.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
  }

  /* ---------------- Contact form ----------------
     Validation is the Elite site's. Delivery is not wired up in the
     prototype; the Elite Cloudflare Worker (Turnstile + Resend) can be
     ported once the salon's inbox is known. */

  function isValidName(value) {
    const normalized = value.trim().replace(/\s+/g, " ");
    const letters = normalized.match(/\p{L}/gu) || [];
    return normalized.length >= 2 && normalized.length <= 120 && letters.length >= 2 &&
      /^[\p{L}\p{M}][\p{L}\p{M}\s.'’,\-]*$/u.test(normalized);
  }

  function isValidEmail(value) {
    const normalized = value.trim();
    if (!normalized || normalized.length > 254) return false;
    const parts = normalized.split("@");
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") ||
        local.includes("..") || !/^[A-Za-z0-9.!#$%&'*+/=?^_{|}~-]+$/.test(local)) return false;
    const labels = domain.split(".");
    return labels.length >= 2 && labels.every(label =>
      label.length >= 1 && label.length <= 63 &&
      /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label));
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const fields = {
      name: [form.elements.name, document.getElementById("contact-name-error"),
        v => !v ? "Please enter your name." : !isValidName(v) ? "Please use letters for your name." : ""],
      email: [form.elements.email, document.getElementById("contact-email-error"),
        v => !v ? "Please enter your email." : !isValidEmail(v) ? "Please check your email address." : ""]
    };
    const notice = document.getElementById("contact-notice");

    function validate(focusInvalid) {
      let firstInvalid = null;
      Object.values(fields).forEach(([input, errorEl, rule]) => {
        const message = rule(input.value.trim());
        input.setAttribute("aria-invalid", String(Boolean(message)));
        errorEl.textContent = message;
        errorEl.hidden = !message;
        if (message && !firstInvalid) firstInvalid = input;
      });
      if (focusInvalid && firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }

    Object.values(fields).forEach(([input]) => {
      input.addEventListener("blur", () => validate(false));
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") validate(false);
      });
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      notice.hidden = true;
      if (!validate(true) || !form.reportValidity()) return;
      notice.hidden = false;
      notice.focus();
    });
  }
});
