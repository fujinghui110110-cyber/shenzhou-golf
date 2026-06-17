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

  function renderFilms() {
    return (content.films || [])
      .map(
        (film, index) => `
          <article class="film-card ${index === 0 ? "featured" : ""}">
            <video controls preload="metadata" playsinline poster="${escapeHtml(film.poster)}" src="${escapeHtml(film.src)}"></video>
            <div class="film-copy">
              <span>${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
              <h3>${escapeHtml(film.title)}</h3>
              <p>${escapeHtml(film.subtitle)}</p>
            </div>
          </article>`
      )
      .join("");
  }

  function renderBrochureChapters() {
    return (content.brochure?.chapters || [])
      .map(
        (chapter, index) => {
          const chapterPages = (content.brochure?.pages || []).filter((pageItem) => pageItem.chapter === chapter.title);
          const featureImage = chapter.image || chapterPages[0]?.image || content.brochure.heroImage;
          const spotlightPages = chapterPages.slice(0, 3);
          return `
            <article class="brochure-chapter-panel" data-motion>
              <div class="chapter-copy">
                <span>${escapeHtml(chapter.range)}</span>
                <h3>${escapeHtml(chapter.title)}</h3>
                <p>${escapeHtml(chapter.text)}</p>
                <ul>
                  ${(chapter.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </div>
              <div class="chapter-stage">
                <img class="chapter-main-image" src="${escapeHtml(featureImage)}" alt="${escapeHtml(chapter.title)}" loading="lazy" />
                <div class="chapter-stack" aria-hidden="true">
                  ${spotlightPages
                    .map(
                      (pageItem, stackIndex) => `
                        <img src="${escapeHtml(pageItem.image)}" alt="" loading="lazy" style="--stack-index:${stackIndex}" />`
                    )
                    .join("")}
                </div>
                <strong>${escapeHtml(String(index + 1).padStart(2, "0"))}</strong>
              </div>
              <div class="brochure-rail" aria-label="${escapeHtml(chapter.title)}图志">
                ${chapterPages.map((pageItem) => renderBrochurePage(pageItem)).join("")}
              </div>
            </article>`;
        }
      )
      .join("");
  }

  function renderBrochurePage(pageItem) {
    return `
      <figure class="brochure-page" data-chapter="${escapeHtml(pageItem.chapter)}">
        <img src="${escapeHtml(pageItem.image)}" alt="${escapeHtml(pageItem.title)}" loading="lazy" />
        <figcaption>
          <span>${escapeHtml(pageItem.number)}</span>
          <strong>${escapeHtml(pageItem.title)}</strong>
        </figcaption>
      </figure>`;
  }

  function renderMerchants() {
    return (content.merchants || [])
      .map(
        (merchant) => `
          <article class="merchant-card">
            <img src="${escapeHtml(merchant.image)}" alt="${escapeHtml(merchant.name)}" loading="lazy" />
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
    document.querySelector("[data-admin-label]").textContent = content.ui.adminLabel;
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
        <div class="video-feature" ${imageStyle(content.hero.videoCover)}>
          <a href="#films" aria-label="${escapeHtml(content.ui.videoAriaPrefix)}${escapeHtml(content.ui.phoneSeparator)}${escapeHtml(content.hero.videoTitle)}">
            <span>${escapeHtml(content.ui.videoPlayLabel)}</span>
            <strong>${escapeHtml(content.hero.videoTitle)}</strong>
            <small>${escapeHtml(content.hero.videoSubtitle)}</small>
          </a>
        </div>
      </section>

      <section id="films" class="film-section">
        <div class="film-heading">
          <h2>${escapeHtml(content.sections.films.title)}</h2>
          <p>${escapeHtml(content.sections.films.text)}</p>
        </div>
        <div class="film-grid">
          ${renderFilms()}
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
            <img class="atlas-main" src="${escapeHtml(content.brochure.heroImage)}" alt="${escapeHtml(content.brochure.title)}" loading="lazy" />
            ${(content.brochure.heroPages || [])
              .map((image, index) => `<img class="atlas-float atlas-float-${index + 1}" src="${escapeHtml(image)}" alt="" loading="lazy" />`)
              .join("")}
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
  initMotion();

  function initMotion() {
    const motionItems = document.querySelectorAll("[data-motion], .brochure-page, .merchant-card, .film-card");
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
})();
