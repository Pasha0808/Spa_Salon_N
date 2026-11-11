/* ==========================================================================
   NEHA Threading — main.js
   Page behaviour: hero background video (rules carried over from the Elite
   Dental Lab site) and the request forms (booking, contact, careers).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const C = window.NEHA_CONFIG || {};
  const t = window.NEHA_I18N?.t || (value => String(value));

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
      pauseBtn.setAttribute("aria-label", t(playing ? "Pause background video" : "Play background video"));
    }
    video.addEventListener("play", syncPauseBtn);
    video.addEventListener("pause", syncPauseBtn);
    syncPauseBtn();
    pauseBtn.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
  }

  /* ---------------- Request forms ----------------
     Any <form data-request-form="Subject"> is handled here: booking,
     contact and careers. The salon wants each request as an email.

     - With formEndpoint set in js/config.js, the request is POSTed there
       as JSON and the server sends the email.
     - Without it, the visitor's own email app opens with the request
       already written and addressed to the salon; they press Send.

     Field rules: name and email are always checked (validation from the
     Elite site). A form with data-require-services needs at least one
     service ticked. Each field's label text is used in the email. */

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

  document.querySelectorAll("form[data-request-form]").forEach(form => {
    const subjectBase = form.dataset.requestForm;
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const notice = form.querySelector(".form-notice");
    const failure = form.querySelector(".form-failure");
    const servicesError = form.querySelector(".services-error");
    const submitButton = form.querySelector('button[type="submit"]');
    const errorFor = input => form.querySelector(`#${input.getAttribute("aria-describedby")}`);

    const rules = [
      [nameInput, v => !v ? t("Please enter your name.") : !isValidName(v) ? t("Please use letters for your name.") : ""],
      [emailInput, v => !v ? t("Please enter your email.") : !isValidEmail(v) ? t("Please check your email address.") : ""]
    ];

    const chosenServices = () =>
      Array.from(form.querySelectorAll('input[name="services"]:checked')).map(box => box.value);

    function validate(focusInvalid) {
      let firstInvalid = null;
      rules.forEach(([input, rule]) => {
        const message = rule(input.value.trim());
        const errorEl = errorFor(input);
        input.setAttribute("aria-invalid", String(Boolean(message)));
        errorEl.textContent = message;
        errorEl.hidden = !message;
        if (message && !firstInvalid) firstInvalid = input;
      });
      if (servicesError) {
        const missing = form.hasAttribute("data-require-services") && chosenServices().length === 0;
        servicesError.hidden = !missing;
        if (missing && !firstInvalid) firstInvalid = form.querySelector('input[name="services"]');
      }
      if (focusInvalid && firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }

    rules.forEach(([input]) => {
      input.addEventListener("blur", () => validate(false));
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") validate(false);
      });
    });
    form.addEventListener("change", event => {
      if (event.target.name === "services" && servicesError && !servicesError.hidden) validate(false);
    });

    // Collect "Label: value" pairs in the order the fields appear
    function collect() {
      const fields = [];
      const services = chosenServices();
      form.querySelectorAll("input, select, textarea").forEach(field => {
        if (!field.name || field.name === "services" || field.type === "hidden") return;
        const value = field.value.trim();
        if (!value) return;
        const label = field.dataset.label || field.closest("label")?.firstChild?.textContent?.trim() || field.name;
        fields.push([label, value]);
      });
      if (services.length) fields.splice(Math.min(fields.length, 3), 0, [t("Services"), services.join(", ")]);
      return fields;
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();
      notice.hidden = true;
      if (failure) failure.hidden = true;
      if (!validate(true) || !form.reportValidity()) return;

      const fields = collect();
      const subject = `${subjectBase} — ${nameInput.value.trim()}`;

      if (C.formEndpoint) {
        submitButton.disabled = true;
        try {
          const response = await fetch(C.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, fields: Object.fromEntries(fields) })
          });
          if (!response.ok) throw new Error("delivery");
          form.reset();
          notice.textContent = t("Thank you! Your request is on its way. We'll be in touch soon.");
          notice.hidden = false;
          notice.focus();
        } catch {
          if (failure) { failure.hidden = false; failure.focus(); }
        } finally {
          submitButton.disabled = false;
        }
        return;
      }

      const body = fields.map(([label, value]) => `${label}: ${value}`).join("\n") +
        `\n\n${t("Sent from the website.")}`;
      window.location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      notice.hidden = false;
      notice.focus();
    });
  });
});
