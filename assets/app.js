(function () {
  const content = window.ShenzhouCMS.getContent();
  const page = document.querySelector("[data-page]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");

  function applyTheme() {
    const theme = content.theme || {};
    const root = document.documentElement;
    const variables = {
      "--gold": theme.accentColor,
      "--ink": theme.deepColor,
      "--green": theme.primaryColor,
      "--paper": theme.paperColor,
      "--paper-strong": theme.cardColor,
      "--coral": theme.highlightColor,
      "--radius": `${theme.cornerRadius || 18}px`,
      "--headline-scale": (theme.headlineScale || 100) / 100,
      "--body-scale": (theme.bodyScale || 100) / 100,
      "--nav-scale": (theme.navScale || 100) / 100,
      "--section-space": (theme.sectionSpacing || 100) / 100,
      "--image-contrast": `${theme.imageContrast || 100}%`,
      "--image-warmth": `${theme.imageWarmth || 100}%`,
      "--motion-speed": `${Math.max(0.2, 1.2 - (theme.motionLevel || 70) / 100)}s`,
    };
    Object.entries(variables).forEach(([key, value]) => root.style.setProperty(key, value));
    root.dataset.fontStyle = theme.fontStyle || "modern-cn";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function imageStyle(url) {
    return `style="background-image: linear-gradient(180deg, rgba(3,16,20,.08), rgba(3,16,20,.32)), url('${escapeHtml(url)}')"`;
  }

  function resolveFilmSrc(film) {
    const configured = window.ShenzhouVideoConfig?.[film.videoKey];
    return configured || film.src || "";
  }

  function renderFilms() {
    const labels = ["晨露短片", "海岸短片", "挥杆短片"];
    return (content.films || [])
      .map((film, index) => {
        const filmSrc = resolveFilmSrc(film);
        return `
          <article class="film-card ${index === 0 ? "featured" : ""}">
            <div class="film-media">
              ${
                filmSrc
                  ? `<video preload="metadata" muted playsinline poster="${escapeHtml(film.poster)}" src="${escapeHtml(filmSrc)}"></video>`
                  : `<img src="${escapeHtml(film.poster)}" alt="${escapeHtml(film.title)}" loading="lazy" />`
              }
            </div>
            <div class="film-copy">
              <div class="film-copy-header">
                <span>${escapeHtml(labels[index] || "球会影像")}</span>
                ${
                  filmSrc
                    ? `<button class="film-play-toggle" type="button" aria-label="播放${escapeHtml(film.title)}">播放完整影片</button>`
                    : `<span class="film-pending">高清影片待接入</span>`
                }
              </div>
              <h3>${escapeHtml(film.title)}</h3>
              <p>${escapeHtml(film.subtitle)}</p>
            </div>
          </article>`;
      })
      .join("");
  }

  function renderBrochureChapters() {
    return (content.brochure?.chapters || [])
      .map(
        (chapter, index) => {
          const chapterPages = (content.brochure?.pages || []).filter((pageItem) => pageItem.chapter === chapter.title);
          const nativePages = chapterPages.filter(isNativeBrochurePage);
          const imagePages = chapterPages.filter((pageItem) => !isNativeBrochurePage(pageItem));
          const featureImage = chapter.image || chapterPages[0]?.image || content.brochure.heroImage;
          return `
            <article class="brochure-chapter-panel" data-motion>
              <div class="chapter-copy">
                <h3>${escapeHtml(chapter.title)}</h3>
                <p>${escapeHtml(chapter.text)}</p>
                <ul>
                  ${(chapter.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </div>
              <div class="chapter-stage">
                <img class="chapter-main-image" src="${escapeHtml(featureImage)}" alt="${escapeHtml(chapter.title)}" loading="lazy" />
              </div>
              ${nativePages.length ? `<div class="chapter-native-content">${nativePages.map((pageItem) => renderNativeBrochurePage(pageItem)).join("")}</div>` : ""}
              <div class="brochure-rail" aria-label="${escapeHtml(chapter.title)}图志">
                ${imagePages.map((pageItem) => renderBrochurePage(pageItem)).join("")}
              </div>
            </article>`;
        }
      )
      .join("");
  }

  function isNativeBrochurePage(pageItem) {
    return pageItem.nativeType === "awards" || /年度奖项/.test(pageItem.title || "");
  }

  function renderBrochurePage(pageItem) {
    return `
      <figure class="brochure-page" data-chapter="${escapeHtml(pageItem.chapter)}">
        <button class="image-zoom-button brochure-image-button" type="button" data-lightbox-src="${escapeHtml(pageItem.image)}" data-lightbox-title="${escapeHtml(pageItem.title)}" aria-label="放大查看${escapeHtml(pageItem.title)}">
          <img src="${escapeHtml(pageItem.image)}" alt="${escapeHtml(pageItem.title)}" loading="lazy" />
        </button>
        <figcaption>
          <strong>${escapeHtml(pageItem.title)}</strong>
        </figcaption>
      </figure>`;
  }

  function renderNativeBrochurePage(pageItem) {
    if (isNativeBrochurePage(pageItem)) return renderAwardTimeline(pageItem);
    return "";
  }

  function renderAwardTimeline(pageItem) {
    const awards = content.brochure?.awards || [];
    return `
      <article class="native-story-panel awards-panel" data-chapter="${escapeHtml(pageItem.chapter)}">
        <div class="awards-panel-head">
          <span>${escapeHtml(pageItem.chapter)}</span>
          <h4>${escapeHtml(content.brochure?.awardsTitle || pageItem.title)}</h4>
          <p>${escapeHtml(content.brochure?.awardsSubtitle || "年度荣誉以网页时间线呈现，便于阅读和维护。")}</p>
        </div>
        <div class="award-timeline" aria-label="${escapeHtml(pageItem.title)}">
          ${awards
            .map(
              (award) => `
                <section class="award-year">
                  <strong>${escapeHtml(award.year)}</strong>
                  <ul>
                    ${(award.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </section>`
            )
            .join("")}
        </div>
      </article>`;
  }

  function renderMerchants() {
    return (content.merchants || [])
      .map(
        (merchant) => `
          <article class="merchant-card">
            <button class="image-zoom-button merchant-image-button" type="button" data-lightbox-src="${escapeHtml(merchant.image)}" data-lightbox-title="${escapeHtml(merchant.name)}" aria-label="放大查看${escapeHtml(merchant.name)}">
              <img src="${escapeHtml(merchant.image)}" alt="${escapeHtml(merchant.name)}" loading="lazy" />
            </button>
            <h3>${escapeHtml(merchant.name)}</h3>
          </article>`
      )
      .join("");
  }

  function renderNav() {
    document.title = content.brand.pageTitle || content.brand.clubName;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", content.brand.pageDescription || "");
    document.querySelector("[data-skip-label]").textContent = content.ui.skipLabel;
    document.querySelector("[data-menu-label]").textContent = content.ui.menuLabel;
    nav.setAttribute("aria-label", content.ui.mainNavAriaLabel);
    document.querySelector("[data-brand-name]").textContent = content.brand.clubName;
    document.querySelector("[data-brand-location]").textContent = content.brand.location;
    document.querySelector("[data-booking-label]").textContent = content.brand.bookingLabel;
    nav.innerHTML = content.nav
      .map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const target = typeof item === "string" ? slug(item) : item.target;
        return `<a href="#${escapeHtml(target || slug(label))}">${escapeHtml(label)}</a>`;
      })
      .join("");
  }

  function slug(label) {
    const match = window.ShenzhouCMS.DEFAULT_CONTENT.nav.find((item) => item.label === label);
    return match ? match.target : "main";
  }

  function cardList(items, className) {
    return items
      .map(
        (item) => `
          <article class="${className}">
            <div class="card-image" ${imageStyle(item.image)}></div>
            <div class="card-copy">
              ${item.kicker ? `<p class="micro-label">${escapeHtml(item.kicker)}</p>` : ""}
              <h3>${escapeHtml(item.title || item.name)}</h3>
              <p>${escapeHtml(item.text || item.description || item.excerpt || item.note)}</p>
            </div>
          </article>`
      )
      .join("");
  }

  function renderPage() {
    page.innerHTML = `
      <section id="top" class="hero-section">
        <div class="hero-media" ${imageStyle(content.hero.image)} aria-label="${escapeHtml(content.hero.title)}"></div>
        <div class="hero-cinema-lines" aria-hidden="true"></div>
        <div class="hero-scrim"></div>
        <div class="hero-content">
          <p class="micro-label">${escapeHtml(content.hero.eyebrow)}</p>
          <h1>${escapeHtml(content.hero.title)}</h1>
          <p>${escapeHtml(content.hero.subtitle)}</p>
          <div class="cta-row">
            <a class="solid-link large" href="#booking">${escapeHtml(content.hero.primaryCta)}</a>
            <a class="ghost-link large" href="#films">${escapeHtml(content.hero.secondaryCta)}</a>
          </div>
        </div>
        <div class="hero-scroll-cue" aria-hidden="true"><span></span></div>
        <aside class="today-panel" aria-label="${escapeHtml(content.today.title)}">
          <h2>${escapeHtml(content.today.title)}</h2>
          <p>${escapeHtml(content.today.dateLabel)}</p>
          <ul>${content.today.notices.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </aside>
      </section>

      <section class="stats-strip" aria-label="${escapeHtml(content.ui.statsAriaLabel)}">
        ${content.stats.map((stat) => `<div><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`).join("")}
      </section>

      <section class="intro-section">
        <div class="intro-copy">
          <h2>${escapeHtml(content.sections.intro.title)}</h2>
          <p>${escapeHtml(content.sections.intro.text)}</p>
        </div>
        <div class="destination-feature" ${imageStyle(content.hero.videoCover)} aria-label="${escapeHtml(content.hero.videoTitle)}">
          <div class="destination-feature-copy">
            <span>海岸尺度</span>
            <strong>${escapeHtml(content.hero.videoTitle)}</strong>
            <small>${escapeHtml(content.hero.videoSubtitle)}</small>
          </div>
        </div>
      </section>

      <section id="films" class="film-section">
        <div class="film-heading">
          <h2>${escapeHtml(content.sections.films.title)}</h2>
          <p>${escapeHtml(content.sections.films.text)}</p>
        </div>
        <div class="film-frame" data-motion>
          <div class="film-frame-edge" aria-hidden="true"></div>
          <div class="film-grid">
            ${renderFilms()}
          </div>
        </div>
      </section>

      <section class="experience-grid" aria-label="${escapeHtml(content.ui.experiencesAriaLabel)}">
        ${cardList(content.experiences, "experience-card")}
      </section>

      <section id="courses" class="courses-section">
        <div class="section-heading">
          <h2>${escapeHtml(content.sections.courses.title)}</h2>
          <p>${escapeHtml(content.sections.courses.text)}</p>
        </div>
        <div class="course-grid">
          ${content.courses
            .map(
              (course) => `
                <article class="course-card">
                  <div class="course-visual" ${imageStyle(course.image)}></div>
                  <div class="course-detail">
                    <span>${escapeHtml(course.type)}</span>
                    <h3>${escapeHtml(course.name)}</h3>
                    <dl>
                      <div><dt>${escapeHtml(content.ui.courseLabels.holes)}</dt><dd>${escapeHtml(course.holes)}</dd></div>
                      <div><dt>${escapeHtml(content.ui.courseLabels.par)}</dt><dd>${escapeHtml(course.par)}</dd></div>
                      <div><dt>${escapeHtml(content.ui.courseLabels.yardage)}</dt><dd>${escapeHtml(course.yardage)}</dd></div>
                    </dl>
                    <p>${escapeHtml(course.note)}</p>
                  </div>
                </article>`
            )
            .join("")}
        </div>
      </section>

      <section id="amenities" class="amenity-section">
        <div class="section-heading compact">
          <h2>${escapeHtml(content.sections.amenities.title)}</h2>
          <p>${escapeHtml(content.sections.amenities.text)}</p>
        </div>
        <div class="amenity-grid">
          ${content.amenities
            .map(
              (item, index) => `
                <article class="amenity-card ${index === 0 ? "wide" : ""}">
                  <div class="amenity-image" ${imageStyle(item.image)}></div>
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.text)}</p>
                  </div>
                </article>`
            )
            .join("")}
        </div>
      </section>

      <section id="merchants" class="merchant-section">
        <div class="section-heading">
          <h2>${escapeHtml(content.sections.merchants.title)}</h2>
          <p>${escapeHtml(content.sections.merchants.text)}</p>
        </div>
        <div class="merchant-grid">
          ${renderMerchants()}
        </div>
      </section>

      <section id="brochure" class="brochure-section">
        <div class="brochure-atlas" data-motion>
          <div class="atlas-copy">
            <p class="micro-label">${escapeHtml(content.brochure.eyebrow || "SHENZHOU ATLAS")}</p>
            <h2>${escapeHtml(content.brochure.title)}</h2>
            <p>${escapeHtml(content.brochure.subtitle)}</p>
            <div class="atlas-stats">
              ${content.stats.map((stat) => `<span><strong>${escapeHtml(stat.value)}</strong>${escapeHtml(stat.label)}</span>`).join("")}
            </div>
          </div>
          <div class="atlas-stage">
            <img class="atlas-main" src="${escapeHtml(content.brochure.heroImage)}" alt="${escapeHtml(content.brochure.title)}" loading="lazy" data-lightbox-src="${escapeHtml(content.brochure.heroImage)}" data-lightbox-title="${escapeHtml(content.brochure.title)}" tabindex="0" role="button" />
            ${(content.brochure.heroPages || [])
              .map((image, index) => `<img class="atlas-float atlas-float-${index + 1}" src="${escapeHtml(image)}" alt="" loading="lazy" data-lightbox-src="${escapeHtml(image)}" data-lightbox-title="${escapeHtml(content.brochure.title)}" tabindex="0" role="button" />`)
              .join("")}
          </div>
          <div class="atlas-note">
            <p>${escapeHtml(content.brochure.highlight)}</p>
          </div>
        </div>
        <div class="brochure-chapters">
          ${renderBrochureChapters()}
        </div>
      </section>

      <section id="events" class="events-section">
        <div class="events-copy">
          <h2>${escapeHtml(content.sections.events.title)}</h2>
          <p>${escapeHtml(content.sections.events.text)}</p>
          <a class="solid-link" href="#booking">${escapeHtml(content.sections.events.cta)}</a>
        </div>
        <div class="event-list">
          ${content.events
            .map(
              (event) => `
                <article class="event-row">
                  <div class="event-thumb" ${imageStyle(event.image)}></div>
                  <div>
                    <time>${escapeHtml(event.date)}</time>
                    <h3>${escapeHtml(event.title)}</h3>
                    <p>${escapeHtml(event.description)}</p>
                  </div>
                </article>`
            )
            .join("")}
        </div>
      </section>

      <section id="stories" class="stories-section">
        <div class="section-heading">
          <h2>${escapeHtml(content.sections.stories.title)}</h2>
          <p>${escapeHtml(content.sections.stories.text)}</p>
        </div>
        <div class="story-grid">
          ${content.stories
            .map(
              (story) => `
                <article class="story-card">
                  <div class="story-image" ${imageStyle(story.image)}></div>
                  <div class="story-meta">${escapeHtml(story.category)}${escapeHtml(content.ui.storySeparator)}${escapeHtml(story.date)}</div>
                  <h3>${escapeHtml(story.title)}</h3>
                  <p>${escapeHtml(story.excerpt)}</p>
                </article>`
            )
            .join("")}
        </div>
      </section>

      <section id="booking" class="booking-section">
        <div class="booking-image" ${imageStyle(content.booking.image)}></div>
        <div class="booking-card">
          <h2>${escapeHtml(content.booking.title)}</h2>
          <p>${escapeHtml(content.booking.subtitle)}</p>
          <div class="booking-lines">
            <a href="tel:${escapeHtml(content.brand.phone)}">${escapeHtml(content.booking.phoneLabel)}${escapeHtml(content.ui.phoneSeparator)}${escapeHtml(content.brand.phone)}</a>
            <a href="mailto:${escapeHtml(content.brand.email)}">${escapeHtml(content.brand.email)}</a>
          </div>
          <small>${escapeHtml(content.booking.note)}</small>
        </div>
      </section>

      <footer class="site-footer">
        <div>
          <strong>${escapeHtml(content.brand.clubName)}</strong>
          <span>${escapeHtml(content.brand.englishName)}</span>
        </div>
        <address>${escapeHtml(content.footer.address)}</address>
        <p>${escapeHtml(content.footer.copyright)}</p>
      </footer>
      <div class="lightbox" data-lightbox hidden aria-hidden="true">
        <button class="lightbox-close" type="button" data-lightbox-close aria-label="关闭大图">×</button>
        <button class="lightbox-nav lightbox-prev" type="button" data-lightbox-prev aria-label="上一张">‹</button>
        <figure class="lightbox-frame">
          <img data-lightbox-image src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" />
          <figcaption data-lightbox-caption></figcaption>
        </figure>
        <button class="lightbox-nav lightbox-next" type="button" data-lightbox-next aria-label="下一张">›</button>
      </div>
    `;
  }

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    header.classList.toggle("nav-open", !expanded);
  });

  applyTheme();
  renderNav();
  renderPage();
  initLightbox();
  initFilmPreview();
  initRailDrag();
  initHeroMotion();
  initMotion();

  function initMotion() {
    const motionItems = document.querySelectorAll("[data-motion], .native-story-panel, .brochure-page, .merchant-card");
    if (!motionItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    motionItems.forEach((item) => observer.observe(item));
  }

  function initLightbox() {
    const lightbox = document.querySelector("[data-lightbox]");
    if (!lightbox) return;
    const image = lightbox.querySelector("[data-lightbox-image]");
    const caption = lightbox.querySelector("[data-lightbox-caption]");
    const items = Array.from(document.querySelectorAll("[data-lightbox-src]"));
    let currentIndex = -1;
    let lastTrigger = null;

    function show(index) {
      if (!items.length) return;
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      lastTrigger = item;
      image.src = item.dataset.lightboxSrc;
      image.alt = item.dataset.lightboxTitle || "";
      caption.textContent = item.dataset.lightboxTitle || "";
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      lightbox.querySelector("[data-lightbox-close]").focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus({ preventScroll: true });
      lightbox.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        lightbox.hidden = true;
        image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      }, 180);
    }

    items.forEach((item, index) => {
      item.addEventListener("click", () => show(index));
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        show(index);
      });
    });
    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", close);
    lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(currentIndex - 1));
    lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => show(currentIndex + 1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") show(currentIndex - 1);
      if (event.key === "ArrowRight") show(currentIndex + 1);
    });
  }

  function initFilmPreview() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".film-card").forEach((card) => {
      const video = card.querySelector("video");
      const button = card.querySelector(".film-play-toggle");
      if (!video) return;
      video.muted = true;
      card.addEventListener("pointerenter", () => {
        if (card.classList.contains("is-playing")) return;
        card.classList.add("is-previewing");
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
      });
      card.addEventListener("pointerleave", () => {
        if (card.classList.contains("is-playing")) return;
        card.classList.remove("is-previewing");
        video.pause();
      });
      button?.addEventListener("click", () => {
        const isPlaying = card.classList.toggle("is-playing");
        card.classList.toggle("is-previewing", isPlaying);
        video.muted = !isPlaying;
        button.textContent = isPlaying ? "暂停影片" : "播放完整影片";
        button.setAttribute("aria-label", `${isPlaying ? "暂停" : "播放"}${card.querySelector("h3")?.textContent || ""}`);
        if (isPlaying) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
        } else {
          video.pause();
        }
      });
      video.addEventListener("ended", () => {
        card.classList.remove("is-playing", "is-previewing");
        video.muted = true;
        if (button) {
          button.textContent = "播放完整影片";
          button.setAttribute("aria-label", `播放${card.querySelector("h3")?.textContent || ""}`);
        }
      });
    });
  }

  function initRailDrag() {
    document.querySelectorAll(".brochure-rail").forEach((rail) => {
      let dragging = false;
      let startX = 0;
      let startScroll = 0;
      rail.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button, a, video")) return;
        dragging = true;
        startX = event.clientX;
        startScroll = rail.scrollLeft;
        rail.classList.add("is-dragging");
        rail.setPointerCapture(event.pointerId);
      });
      rail.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        rail.scrollLeft = startScroll - (event.clientX - startX);
      });
      rail.addEventListener("pointerup", () => {
        dragging = false;
        rail.classList.remove("is-dragging");
      });
      rail.addEventListener("pointercancel", () => {
        dragging = false;
        rail.classList.remove("is-dragging");
      });
    });
  }

  function initHeroMotion() {
    const hero = document.querySelector(".hero-section");
    const media = document.querySelector(".hero-media");
    if (!hero || !media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      media.style.setProperty("--hero-pan-x", `${x}px`);
      media.style.setProperty("--hero-pan-y", `${y}px`);
    });
  }
})();
