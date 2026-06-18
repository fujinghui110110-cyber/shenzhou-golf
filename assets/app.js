(function () {
  const content = window.ShenzhouCMS.getContent();
  const page = document.querySelector("[data-page]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function imageStyle(url, strength = "medium") {
    const shade = strength === "strong" ? ".54" : ".28";
    return `style="background-image: linear-gradient(180deg, rgba(4,16,15,.04), rgba(4,16,15,${shade})), url('${escapeHtml(url)}')"`;
  }

  function applyTheme() {
    const theme = content.theme || {};
    const root = document.documentElement;
    root.style.setProperty("--gold", theme.accentColor || "#c8a45d");
    root.style.setProperty("--ink", theme.deepColor || "#061413");
    root.style.setProperty("--green", theme.primaryColor || "#315f4c");
    root.style.setProperty("--paper", theme.paperColor || "#f4f0e4");
    root.style.setProperty("--paper-strong", theme.cardColor || "#fffaf0");
    root.style.setProperty("--coral", theme.highlightColor || "#8f6a3d");
    root.style.setProperty("--radius", `${theme.cornerRadius || 14}px`);
    root.style.setProperty("--headline-scale", (theme.headlineScale || 100) / 100);
    root.style.setProperty("--body-scale", (theme.bodyScale || 100) / 100);
    root.style.setProperty("--nav-scale", (theme.navScale || 100) / 100);
    root.style.setProperty("--section-space", (theme.sectionSpacing || 100) / 100);
    root.style.setProperty("--image-contrast", `${theme.imageContrast || 100}%`);
    root.style.setProperty("--image-warmth", `${theme.imageWarmth || 100}%`);
    root.style.setProperty("--motion-speed", `${Math.max(0.18, 1.1 - (theme.motionLevel || 78) / 100)}s`);
    root.dataset.fontStyle = theme.fontStyle || "modern-cn";
  }

  function videoSrc(key) {
    return window.ShenzhouVideoConfig?.[key] || "";
  }

  function renderNav() {
    document.title = content.brand.pageTitle || content.brand.clubName;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", content.brand.pageDescription || "");
    document.querySelector("[data-skip-label]").textContent = content.ui.skipLabel;
    document.querySelector("[data-menu-label]").textContent = content.ui.menuLabel;
    document.querySelector("[data-brand-name]").textContent = content.brand.clubName;
    document.querySelector("[data-brand-location]").textContent = content.brand.location;
    document.querySelector("[data-booking-label]").textContent = content.brand.bookingLabel;
    nav.setAttribute("aria-label", content.ui.mainNavAriaLabel);
    nav.innerHTML = (content.nav || [])
      .map((item) => `<a href="#${escapeHtml(item.target)}">${escapeHtml(item.label)}</a>`)
      .join("");
  }

  function renderMetricStrip() {
    return `
      <div class="directory-metrics" aria-label="球会概览">
        ${(content.metrics || []).map((item) => `<span><strong>${escapeHtml(item.value)}</strong>${escapeHtml(item.label)}</span>`).join("")}
      </div>`;
  }

  function renderHero() {
    const src = videoSrc(content.hero.videoKey);
    return `
      <section id="top" class="directory-hero">
        <div class="directory-hero-bg" ${imageStyle(content.hero.image, "strong")}></div>
        <div class="directory-hero-scrim"></div>
        <div class="directory-hero-copy" data-motion>
          <p class="micro-label">${escapeHtml(content.hero.eyebrow)}</p>
          <h1>${escapeHtml(content.hero.title)}</h1>
          <p>${escapeHtml(content.hero.subtitle)}</p>
          <div class="cta-row">
            <a class="solid-link large" href="#peninsula">${escapeHtml(content.hero.primaryCta)}</a>
            <a class="ghost-link large" href="#contact">${escapeHtml(content.hero.secondaryCta)}</a>
          </div>
        </div>
        <button class="hero-film-card" type="button" data-video-open="${escapeHtml(content.hero.videoKey)}" ${src ? "" : "data-video-disabled='true'"} data-motion>
          <span class="hero-film-poster" ${imageStyle(content.hero.videoPoster || content.hero.image)}></span>
          <span class="hero-film-copy">
            <small>${src ? "点击播放" : content.ui.videoUnavailable}</small>
            <strong>${escapeHtml(content.hero.videoTitle)}</strong>
            <em>${escapeHtml(content.hero.videoSubtitle)}</em>
          </span>
        </button>
        ${renderMetricStrip()}
      </section>`;
  }

  function renderCard(chapter, card, index) {
    return `
      <article class="directory-card ${index === 0 ? "is-featured" : ""}" data-motion>
        <button type="button" data-detail-open="${escapeHtml(chapter.id)}:${escapeHtml(card.id)}" aria-label="${escapeHtml(content.ui.openDetailLabel)}：${escapeHtml(card.title)}">
          <span class="directory-card-image" ${imageStyle(card.image)}></span>
          <span class="directory-card-copy">
            <small>${escapeHtml(card.kicker || chapter.label)}</small>
            <strong>${escapeHtml(card.title)}</strong>
            <em>${escapeHtml(card.excerpt)}</em>
            <span class="text-link">${escapeHtml(content.ui.openDetailLabel)}</span>
          </span>
        </button>
      </article>`;
  }

  function renderMerchants(chapter) {
    if (!chapter.merchants?.length) return "";
    return `
      <div class="merchant-wall">
        <div class="merchant-wall-head">
          <p class="micro-label">ISLAND SHOPS</p>
          <h3>特色商业</h3>
        </div>
        <div class="merchant-wall-grid">
          ${chapter.merchants
            .map(
              (item) => `
                <button class="merchant-tile" type="button" data-lightbox-src="${escapeHtml(item.image)}" data-lightbox-title="${escapeHtml(item.name)}">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" />
                  <span>${escapeHtml(item.name)}</span>
                </button>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderChapter(chapter, index) {
    return `
      <section id="${escapeHtml(chapter.id)}" class="directory-section ${index % 2 ? "is-alternate" : ""}">
        <div class="directory-section-head" data-motion>
          <div>
            <p class="micro-label">${escapeHtml(chapter.eyebrow)}</p>
            <h2>${escapeHtml(chapter.title)}</h2>
          </div>
          <p>${escapeHtml(chapter.intro)}</p>
        </div>
        <div class="directory-layout">
          <div class="directory-feature" ${imageStyle(chapter.image, "strong")} data-motion>
            <span>${escapeHtml(chapter.label)}</span>
          </div>
          <div class="directory-card-grid">
            ${(chapter.cards || []).map((card, cardIndex) => renderCard(chapter, card, cardIndex)).join("")}
          </div>
        </div>
        ${renderMerchants(chapter)}
      </section>`;
  }

  function renderContact() {
    const contact = content.contact || {};
    return `
      <section id="contact" class="contact-section">
        <div class="contact-image" ${imageStyle(contact.image, "strong")} data-motion></div>
        <div class="contact-card" data-motion>
          <p class="micro-label">${escapeHtml(contact.eyebrow)}</p>
          <h2>${escapeHtml(contact.title)}</h2>
          <p>${escapeHtml(contact.text)}</p>
          <div class="contact-list">
            ${(contact.items || [])
              .map((item) => {
                const body = `<span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong>`;
                return item.href ? `<a href="${escapeHtml(item.href)}">${body}</a>` : `<div>${body}</div>`;
              })
              .join("")}
          </div>
          <small>${escapeHtml(contact.note)}</small>
        </div>
      </section>`;
  }

  function renderShell() {
    page.innerHTML = `
      ${renderHero()}
      ${(content.chapters || []).map(renderChapter).join("")}
      ${renderContact()}
      <footer class="site-footer">
        <div>
          <strong>${escapeHtml(content.brand.clubName)}</strong>
          <span>${escapeHtml(content.brand.englishName)}</span>
        </div>
        <address>${escapeHtml(content.footer.address)}</address>
        <p>${escapeHtml(content.footer.copyright)}</p>
      </footer>
      <div class="detail-modal" data-detail-modal hidden aria-hidden="true" role="dialog" aria-modal="true">
        <button class="modal-close" type="button" data-detail-close aria-label="${escapeHtml(content.ui.closeLabel)}">×</button>
        <div class="detail-panel" data-detail-panel></div>
      </div>
      <div class="lightbox" data-lightbox hidden aria-hidden="true" role="dialog" aria-modal="true">
        <button class="lightbox-close" type="button" data-lightbox-close aria-label="${escapeHtml(content.ui.closeLabel)}">×</button>
        <figure class="lightbox-frame">
          <img data-lightbox-image alt="" />
          <figcaption data-lightbox-caption></figcaption>
        </figure>
      </div>
      <div class="video-modal" data-video-modal hidden aria-hidden="true" role="dialog" aria-modal="true">
        <button class="modal-close" type="button" data-video-close aria-label="${escapeHtml(content.ui.closeLabel)}">×</button>
        <div class="video-panel" data-video-panel></div>
      </div>`;
  }

  function findDetail(detailKey) {
    const [chapterId, cardId] = detailKey.split(":");
    const chapter = (content.chapters || []).find((item) => item.id === chapterId);
    const card = chapter?.cards?.find((item) => item.id === cardId);
    return chapter && card ? { chapter, card } : null;
  }

  function renderDetailPanel(chapter, card) {
    return `
      <article class="detail-story">
        <div class="detail-visual">
          <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)}" />
        </div>
        <div class="detail-copy">
          <p class="micro-label">${escapeHtml(chapter.label)} / ${escapeHtml(card.kicker)}</p>
          <h2>${escapeHtml(card.title)}</h2>
          <p>${escapeHtml(card.excerpt)}</p>
          ${
            card.facts?.length
              ? `<div class="fact-cluster" aria-label="${escapeHtml(content.ui.factsLabel)}">${card.facts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join("")}</div>`
              : ""
          }
          <div class="detail-body">
            ${(card.body || []).map((block) => `<section><h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.text)}</p></section>`).join("")}
          </div>
          ${
            card.gallery?.length
              ? `<div class="detail-gallery" aria-label="${escapeHtml(content.ui.galleryLabel)}">
                  ${card.gallery
                    .map(
                      (image, index) => `
                        <button type="button" data-lightbox-src="${escapeHtml(image)}" data-lightbox-title="${escapeHtml(card.title)} ${index + 1}">
                          <img src="${escapeHtml(image)}" alt="${escapeHtml(card.title)} ${index + 1}" />
                        </button>`
                    )
                    .join("")}
                </div>`
              : ""
          }
        </div>
      </article>`;
  }

  function initDetailModal() {
    const modal = document.querySelector("[data-detail-modal]");
    const panel = document.querySelector("[data-detail-panel]");
    const closeButton = document.querySelector("[data-detail-close]");
    let lastTrigger = null;

    function open(trigger) {
      const detail = findDetail(trigger.dataset.detailOpen);
      if (!detail) return;
      lastTrigger = trigger;
      panel.innerHTML = renderDetailPanel(detail.chapter, detail.card);
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      closeButton.focus();
      bindLightboxTriggers(panel);
    }

    function close() {
      modal.setAttribute("aria-hidden", "true");
      modal.hidden = true;
      panel.innerHTML = "";
      document.body.classList.remove("modal-open");
      lastTrigger?.focus({ preventScroll: true });
    }

    document.querySelectorAll("[data-detail-open]").forEach((trigger) => trigger.addEventListener("click", () => open(trigger)));
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", (event) => {
      if (!modal.hidden && event.key === "Escape") close();
    });
  }

  function bindLightboxTriggers(scope = document) {
    scope.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
      if (trigger.dataset.lightboxBound) return;
      trigger.dataset.lightboxBound = "true";
      trigger.addEventListener("click", () => openLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxTitle || ""));
    });
  }

  function openLightbox(src, title) {
    const lightbox = document.querySelector("[data-lightbox]");
    const image = lightbox.querySelector("[data-lightbox-image]");
    const caption = lightbox.querySelector("[data-lightbox-caption]");
    image.src = src;
    image.alt = title;
    caption.textContent = title;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    lightbox.querySelector("[data-lightbox-close]").focus();
  }

  function initLightbox() {
    const lightbox = document.querySelector("[data-lightbox]");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    function close() {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      lightbox.classList.remove("is-open");
      lightbox.querySelector("[data-lightbox-image]").src = "";
      document.body.classList.remove("lightbox-open");
    }
    closeButton.addEventListener("click", close);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
      if (!lightbox.hidden && event.key === "Escape") close();
    });
    bindLightboxTriggers();
  }

  function initVideoModal() {
    const modal = document.querySelector("[data-video-modal]");
    const panel = document.querySelector("[data-video-panel]");
    const closeButton = document.querySelector("[data-video-close]");
    function close() {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      panel.innerHTML = "";
      document.body.classList.remove("modal-open");
    }
    document.querySelectorAll("[data-video-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.videoOpen;
        const src = videoSrc(key);
        if (!src) return;
        panel.innerHTML = `<video controls autoplay playsinline src="${escapeHtml(src)}" poster="${escapeHtml(content.hero.videoPoster)}"></video>`;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeButton.focus();
      });
    });
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", (event) => {
      if (!modal.hidden && event.key === "Escape") close();
    });
  }

  function initMotion() {
    const items = document.querySelectorAll("[data-motion], .directory-card, .merchant-tile");
    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => observer.observe(item));
  }

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    header.classList.toggle("nav-open", !expanded);
  });

  nav.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-open");
  });

  applyTheme();
  renderNav();
  renderShell();
  initDetailModal();
  initLightbox();
  initVideoModal();
  initMotion();
})();
