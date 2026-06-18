(function () {
  let content = window.ShenzhouCMS.getContent();
  content.theme = content.theme || window.ShenzhouCMS.deepClone(window.ShenzhouCMS.DEFAULT_CONTENT.theme);
  const editor = document.querySelector("[data-editor]");
  const status = document.querySelector("[data-admin-status]");
  const designPresets = {
    "海岸奢华": {
      accentColor: "#c59f63",
      deepColor: "#07191f",
      primaryColor: "#0e5647",
      paperColor: "#f5f7ef",
      cardColor: "#fffdf4",
      highlightColor: "#ba6246",
      fontStyle: "modern-cn",
      headlineScale: 100,
      bodyScale: 100,
      navScale: 100,
      sectionSpacing: 100,
      cornerRadius: 18,
      imageContrast: 100,
      imageWarmth: 100,
      motionLevel: 70,
    },
    "黑金会所": {
      accentColor: "#d4b26a",
      deepColor: "#050807",
      primaryColor: "#173c34",
      paperColor: "#eef1e8",
      cardColor: "#fffaf0",
      highlightColor: "#7c5130",
      fontStyle: "sharp-cn",
      headlineScale: 106,
      bodyScale: 100,
      navScale: 96,
      sectionSpacing: 108,
      cornerRadius: 12,
      imageContrast: 112,
      imageWarmth: 106,
      motionLevel: 62,
    },
    "清爽度假": {
      accentColor: "#e0b45c",
      deepColor: "#0b2c36",
      primaryColor: "#17736e",
      paperColor: "#eef7f4",
      cardColor: "#ffffff",
      highlightColor: "#2c8aa0",
      fontStyle: "soft-cn",
      headlineScale: 96,
      bodyScale: 104,
      navScale: 102,
      sectionSpacing: 96,
      cornerRadius: 24,
      imageContrast: 96,
      imageWarmth: 94,
      motionLevel: 78,
    },
  };

  function setStatus(message) {
    status.textContent = message;
  }

  function getAtPath(target, path) {
    return path.reduce((node, key) => node[key], target);
  }

  function setAtPath(target, path, value) {
    const last = path[path.length - 1];
    const parent = getAtPath(target, path.slice(0, -1));
    parent[last] = value;
  }

  function labelFor(key) {
    const map = {
      brand: "品牌信息",
      nav: "导航",
      label: "显示文字",
      target: "目标版块 ID",
      hero: "首页首屏",
      films: "视频版块",
      poster: "视频封面",
      src: "视频文件地址",
      today: "今日球会",
      stats: "关键数据",
      experiences: "体验入口",
      courses: "球场组合",
      amenities: "服务设施",
      brochure: "半岛图志",
      chapters: "图志章节",
      pages: "图志页面",
      number: "页码",
      sourcePage: "素材原页码",
      chapter: "所属章节",
      nativeType: "原生呈现类型",
      range: "页码范围",
      points: "章节要点",
      highlight: "图志导语",
      awardsTitle: "奖项标题",
      awardsSubtitle: "奖项说明",
      awards: "年度奖项",
      year: "年份",
      items: "奖项条目",
      heroImage: "图志主视觉",
      heroPages: "图志叠放页",
      eyebrow: "英文小标题",
      merchants: "特色商户",
      name: "商户名字",
      events: "活动赛事",
      stories: "内容故事",
      booking: "预约模块",
      footer: "页脚",
      ui: "界面标签",
      sections: "版块文案",
      intro: "导语版块",
      courseLabels: "球场规格标签",
      statsAriaLabel: "关键数据辅助标签",
      experiencesAriaLabel: "体验入口辅助标签",
      videoAriaPrefix: "视频辅助前缀",
      videoPlayLabel: "播放按钮文字",
      phoneSeparator: "电话分隔符",
      storySeparator: "故事分隔符",
      cta: "按钮文字",
      image: "图片",
      videoCover: "视频封面",
      videoUrl: "视频链接",
      title: "标题",
      subtitle: "副标题",
      text: "正文",
      description: "说明",
      excerpt: "摘要",
      note: "备注",
      phone: "电话",
      email: "邮箱",
      location: "位置",
      pageTitle: "浏览器标题",
      pageDescription: "页面描述",
      modelVersion: "内容模型版本",
      chapters: "目录内容",
      label: "目录名称",
      cards: "简介卡片",
      kicker: "分类小标题",
      facts: "详情要点",
      body: "详情正文",
      gallery: "详情图册",
      items: "联系条目",
      href: "链接地址",
      openDetailLabel: "详情按钮文字",
      closeLabel: "关闭按钮文字",
      galleryLabel: "图册辅助标签",
      factsLabel: "要点辅助标签",
      videoUnavailable: "视频未接入提示",
      mainNavAriaLabel: "主导航辅助标签",
      skipLabel: "跳转正文文字",
      adminLabel: "后台入口文字",
      menuLabel: "移动菜单文字",
    };
    return map[key] || key;
  }

  function isMediaKey(key) {
    return /image|cover|poster|videoCover/i.test(String(key));
  }

  function saveAndRender(message) {
    window.ShenzhouCMS.saveContent(content);
    renderEditor();
    setStatus(message || `已保存 ${new Date().toLocaleTimeString("zh-CN")}`);
  }

  function saveOnly(message) {
    window.ShenzhouCMS.saveContent(content);
    setStatus(message || `已保存 ${new Date().toLocaleTimeString("zh-CN")}`);
  }

  function fieldId(path) {
    return `field-${path.join("-").replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, "-")}`;
  }

  function renderValue(key, value, path) {
    if (Array.isArray(value)) return renderArray(key, value, path);
    if (value && typeof value === "object") return renderObject(key, value, path);
    return renderPrimitive(key, value, path);
  }

  function renderObject(key, value, path) {
    const defaultOpen = path.length <= 2;
    const rows = Object.entries(value)
      .map(([childKey, childValue]) => renderValue(childKey, childValue, path.concat(childKey)))
      .join("");
    return `
      <details class="editor-group" ${defaultOpen ? "open" : ""}>
        <summary>${labelFor(key)}</summary>
        <div class="editor-children">${rows}</div>
      </details>`;
  }

  function renderArray(key, value, path) {
    const rows = value
      .map((item, index) => {
        const childPath = path.concat(index);
        return `
          <div class="array-item">
            <div class="array-item-head">
              <strong>${labelFor(key)} ${index + 1}</strong>
              <button type="button" data-remove="${childPath.join(".")}">删除</button>
            </div>
            ${renderValue(`${key}_${index + 1}`, item, childPath)}
          </div>`;
      })
      .join("");
    return `
      <details class="editor-group" open>
        <summary>${labelFor(key)} <span>${value.length} 项</span></summary>
        <div class="editor-children">${rows}</div>
        <button class="add-button" type="button" data-add="${path.join(".")}">新增一项</button>
      </details>`;
  }

  function renderPrimitive(key, value, path) {
    const id = fieldId(path);
    const stringValue = value == null ? "" : String(value);
    if (isMediaKey(key)) {
      return `
        <div class="editor-field media-field">
          <span>${labelFor(key)}</span>
          ${stringValue ? `<div class="media-preview" style="background-image:url('${escapeHtml(stringValue)}')"></div>` : `<div class="media-preview empty">暂无图片</div>`}
          <label class="upload-inline">上传图片<input type="file" accept="image/*" data-upload="${path.join(".")}" /></label>
          <details class="media-url-box">
            <summary>高级：图片地址</summary>
            <textarea id="${id}" data-path="${path.join(".")}">${escapeHtml(stringValue)}</textarea>
          </details>
        </div>`;
    }
    const input = stringValue.length > 78 || /text|subtitle|description|excerpt|note|copyright/i.test(key)
      ? `<textarea id="${id}" data-path="${path.join(".")}">${escapeHtml(stringValue)}</textarea>`
      : `<input id="${id}" data-path="${path.join(".")}" value="${escapeHtml(stringValue)}" />`;
    return `
      <label class="editor-field" for="${id}">
        <span>${labelFor(key)}</span>
        ${input}
      </label>`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parsePath(pathString) {
    return pathString.split(".").map((part) => (/^\d+$/.test(part) ? Number(part) : part));
  }

  function blankLike(value) {
    if (Array.isArray(value)) return [];
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankLike(child)]));
    }
    return "";
  }

  function bindEvents() {
    editor.querySelectorAll("[data-theme-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.themePreset;
        content.theme = { ...content.theme, ...designPresets[name], preset: name };
        saveAndRender(`已切换为「${name}」`);
      });
    });

    editor.querySelectorAll("[data-theme-field]").forEach((field) => {
      const updateTheme = (event) => {
        const key = event.target.dataset.themeField;
        const numberFields = new Set(["headlineScale", "bodyScale", "navScale", "sectionSpacing", "cornerRadius", "imageContrast", "imageWarmth", "motionLevel"]);
        content.theme[key] = numberFields.has(key) ? Number(event.target.value) : event.target.value;
        content.theme.preset = "自定义";
        const valueNode = editor.querySelector(`[data-theme-value="${key}"]`);
        if (valueNode) valueNode.textContent = formatThemeValue(key, content.theme[key]);
        editor.querySelectorAll(`[data-theme-field="${key}"]`).forEach((peer) => {
          if (peer !== event.target && peer.value !== event.target.value) peer.value = event.target.value;
        });
        saveOnly(`视觉设置已保存 ${new Date().toLocaleTimeString("zh-CN")}`);
      };
      field.addEventListener("input", updateTheme);
      field.addEventListener("change", updateTheme);
    });

    editor.querySelectorAll("[data-quick-path]").forEach((field) => {
      field.addEventListener("input", (event) => {
        setAtPath(content, parsePath(event.target.dataset.quickPath), event.target.value);
        saveOnly(`常用内容已保存 ${new Date().toLocaleTimeString("zh-CN")}`);
      });
    });

    editor.querySelectorAll("[data-quick-upload]").forEach((input) => {
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          setAtPath(content, parsePath(input.dataset.quickUpload), reader.result);
          saveAndRender("图片已上传并同步到前台");
        };
        reader.readAsDataURL(file);
      });
    });

    editor.querySelectorAll("[data-path]").forEach((field) => {
      field.addEventListener("input", (event) => {
        setAtPath(content, parsePath(event.target.dataset.path), event.target.value);
        window.ShenzhouCMS.saveContent(content);
        setStatus(`已保存 ${new Date().toLocaleTimeString("zh-CN")}`);
      });
    });

    editor.querySelectorAll("[data-add]").forEach((button) => {
      button.addEventListener("click", () => {
        const path = parsePath(button.dataset.add);
        const arr = getAtPath(content, path);
        const template = arr[0] ? blankLike(arr[0]) : "";
        arr.push(template);
        saveAndRender("已新增一项");
      });
    });

    editor.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        const path = parsePath(button.dataset.remove);
        const index = path[path.length - 1];
        const arr = getAtPath(content, path.slice(0, -1));
        arr.splice(index, 1);
        saveAndRender("已删除一项");
      });
    });

    editor.querySelectorAll("[data-upload]").forEach((input) => {
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          setAtPath(content, parsePath(input.dataset.upload), reader.result);
          saveAndRender("图片已上传并保存到浏览器");
        };
        reader.readAsDataURL(file);
      });
    });
  }

  function renderEditor() {
    const entries = Object.entries(content).filter(([key]) => key !== "theme");
    editor.innerHTML = `
      ${renderDesignStudio()}
      ${renderQuickEditor()}
      <details class="advanced-editor">
        <summary>
          <span>高级：完整内容库</span>
          <small>需要批量维护球场、活动、故事等模块时再展开</small>
        </summary>
        ${entries.map(([key, value]) => renderValue(key, value, [key])).join("")}
      </details>`;
    bindEvents();
  }

  function formatThemeValue(key, value) {
    if (key === "cornerRadius") return `${value}px`;
    if (["headlineScale", "bodyScale", "navScale", "sectionSpacing", "imageContrast", "imageWarmth", "motionLevel"].includes(key)) return `${value}%`;
    return value;
  }

  function renderDesignStudio() {
    const theme = content.theme || {};
    const presetButtons = Object.keys(designPresets)
      .map((name) => `<button type="button" class="${theme.preset === name ? "active" : ""}" data-theme-preset="${name}">${name}</button>`)
      .join("");
    return `
      <section class="design-studio" aria-label="视觉控制台">
        <div class="design-studio-head">
          <div>
            <p class="micro-label">DESIGN CONTROL</p>
            <h2>视觉控制台</h2>
            <p>给设计同事使用：不需要写代码，用预设、色盘和滑杆调整高级感。</p>
          </div>
          <div class="preset-buttons">${presetButtons}</div>
        </div>
        <div class="design-controls">
          ${renderColorControl("accentColor", "主强调色", "按钮、标签、重点数据")}
          ${renderColorControl("deepColor", "深色底", "首屏、页脚、赛事区背景")}
          ${renderColorControl("primaryColor", "品牌绿", "数据、链接、辅助重点")}
          ${renderColorControl("paperColor", "页面底色", "整站浅色背景")}
          ${renderColorControl("cardColor", "卡片底色", "内容卡片和后台表单")}
          ${renderColorControl("highlightColor", "辅助色", "活动、图形和特殊提示")}
          ${renderSelectControl("fontStyle", "字体气质", "选择中文显示风格", [
            ["modern-cn", "现代高级"],
            ["sharp-cn", "锐利会所"],
            ["soft-cn", "清爽度假"],
            ["system-cn", "稳重通用"],
          ])}
          ${renderRangeControl("headlineScale", "标题字号", "控制首页大标题和章节标题", 82, 118)}
          ${renderRangeControl("bodyScale", "正文字号", "控制段落、说明文字", 88, 115)}
          ${renderRangeControl("navScale", "导航字号", "控制顶部菜单和按钮文字", 86, 112)}
          ${renderRangeControl("sectionSpacing", "版块间距", "控制页面疏密和呼吸感", 78, 125)}
          ${renderRangeControl("cornerRadius", "圆角大小", "控制卡片、图片和按钮圆角", 4, 30)}
          ${renderRangeControl("imageContrast", "图片对比", "让图片更沉稳或更通透", 86, 122)}
          ${renderRangeControl("imageWarmth", "图片暖度", "偏冷海岸或偏暖夕阳", 88, 116)}
          ${renderRangeControl("motionLevel", "动效强度", "后续扩展动画节奏，当前保存字段", 0, 100)}
        </div>
      </section>`;
  }

  function renderQuickEditor() {
    return `
      <section class="quick-editor" aria-label="常用内容编辑">
        <div class="quick-editor-head">
          <div>
            <p class="micro-label">DAILY EDITS</p>
            <h2>常用内容</h2>
            <p>日常最常改的内容放在这里：品牌名、首屏文案、目录标题、联系方式、主图和视频封面。</p>
          </div>
          <a class="preview-link" href="./index.html" target="_blank" rel="noreferrer">打开前台预览</a>
        </div>
        <div class="quick-grid">
          ${renderQuickText("brand.clubName", "球会中文名", "显示在导航和页脚")}
          ${renderQuickText("brand.englishName", "英文名", "用于页脚和国际化表达")}
          ${renderQuickText("brand.phone", "预约电话", "会出现在预约模块")}
          ${renderQuickText("brand.email", "预约邮箱", "会出现在预约模块")}
          ${renderQuickText("hero.title", "首页大标题", "建议 12-22 个中文字，避免换行过多", true)}
          ${renderQuickText("hero.subtitle", "首页说明", "建议控制在 1-2 句话", true)}
          ${renderQuickText("hero.primaryCta", "主按钮文字", "建议 2-5 个字")}
          ${renderQuickText("hero.secondaryCta", "副按钮文字", "建议 2-5 个字")}
          ${renderQuickText("hero.videoTitle", "视频标题", "首页视频封面的标题")}
          ${renderQuickText("hero.videoSubtitle", "视频说明", "首页视频封面的简短说明", true)}
          ${renderQuickText("chapters.0.title", "神州半岛标题", "神州半岛目录的大标题", true)}
          ${renderQuickText("chapters.0.intro", "神州半岛说明", "神州半岛目录说明", true)}
          ${renderQuickText("chapters.1.title", "球会标题", "神州高尔夫球会目录的大标题", true)}
          ${renderQuickText("chapters.1.intro", "球会说明", "神州高尔夫球会目录说明", true)}
          ${renderQuickText("chapters.2.title", "酒店配套标题", "酒店配套目录的大标题", true)}
          ${renderQuickText("chapters.2.intro", "酒店配套说明", "酒店与商业目录说明", true)}
          ${renderQuickText("chapters.3.title", "高尔夫 plus 标题", "高尔夫 plus 目录的大标题", true)}
          ${renderQuickText("chapters.3.intro", "高尔夫 plus 说明", "活动目录说明", true)}
          ${renderQuickText("contact.title", "联系方式标题", "联系方式版块标题", true)}
          ${renderQuickText("contact.text", "联系方式说明", "联系方式版块说明", true)}
          ${renderQuickMedia("hero.image", "首页主视觉", "建议使用横版 16:9 或 3:2 授权图片")}
          ${renderQuickMedia("hero.videoPoster", "视频封面", "建议使用无字幕遮挡的横版封面")}
          ${renderQuickMedia("chapters.0.image", "神州半岛主图", "神州半岛目录主图")}
          ${renderQuickMedia("chapters.1.image", "球会主图", "球会目录主图")}
          ${renderQuickMedia("chapters.2.image", "酒店配套主图", "酒店配套目录主图")}
          ${renderQuickMedia("chapters.3.image", "高尔夫 plus 主图", "高尔夫 plus 目录主图")}
        </div>
      </section>`;
  }

  function renderQuickText(pathString, title, help, longText) {
    const path = parsePath(pathString);
    const value = getAtPath(content, path);
    const field = longText
      ? `<textarea data-quick-path="${pathString}">${escapeHtml(value)}</textarea>`
      : `<input data-quick-path="${pathString}" value="${escapeHtml(value)}" />`;
    return `
      <label class="quick-field">
        <span>${title}</span>
        <small>${help}</small>
        ${field}
      </label>`;
  }

  function renderQuickMedia(pathString, title, help) {
    const path = parsePath(pathString);
    const value = getAtPath(content, path);
    return `
      <div class="quick-field quick-media">
        <span>${title}</span>
        <small>${help}</small>
        <div class="media-preview" style="background-image:url('${escapeHtml(value)}')"></div>
        <label class="upload-inline">上传图片<input type="file" accept="image/*" data-quick-upload="${pathString}" /></label>
      </div>`;
  }

  function renderColorControl(key, title, help) {
    const value = content.theme[key];
    return `
      <label class="theme-control color-control">
        <span>${title}</span>
        <small>${help}</small>
        <div>
          <input type="color" data-theme-field="${key}" value="${escapeHtml(value)}" />
          <input type="text" data-theme-field="${key}" value="${escapeHtml(value)}" />
        </div>
      </label>`;
  }

  function renderRangeControl(key, title, help, min, max) {
    const value = content.theme[key];
    return `
      <label class="theme-control range-control">
        <span>${title} <strong data-theme-value="${key}">${formatThemeValue(key, value)}</strong></span>
        <small>${help}</small>
        <input type="range" min="${min}" max="${max}" value="${escapeHtml(value)}" data-theme-field="${key}" />
      </label>`;
  }

  function renderSelectControl(key, title, help, options) {
    const value = content.theme[key];
    return `
      <label class="theme-control">
        <span>${title}</span>
        <small>${help}</small>
        <select data-theme-field="${key}">
          ${options.map(([optionValue, label]) => `<option value="${optionValue}" ${value === optionValue ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </label>`;
  }

  document.querySelector("[data-reset]").addEventListener("click", () => {
    content = window.ShenzhouCMS.resetContent();
    saveAndRender("已恢复默认内容");
  });

  document.querySelector("[data-export]").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `shenzhou-golf-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("JSON 已导出");
  });

  document.querySelector("[data-import]").addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        content = JSON.parse(reader.result);
        saveAndRender("JSON 已导入并保存");
      } catch (error) {
        setStatus(`导入失败：${error.message}`);
      }
    };
    reader.readAsText(file);
  });

  renderEditor();
})();
