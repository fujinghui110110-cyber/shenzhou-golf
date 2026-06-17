(function () {
  const STORAGE_KEY = "shenzhou-golf-site-content-v1";

  function asset(path) {
    return `./assets/${path}`;
  }

  const BROCHURE_CHAPTERS = [
    {
      title: "天赋之境",
      range: "6 个场景",
      text: "北纬 18 度、13 公里全南向海岸线、内外双海与交通半径，共同定义半岛的稀缺底色。",
      image: asset("pdf-pages/page-004.jpg"),
      points: ["18 平方公里整岛规划", "水下能见度约 20 米", "年平均气温约 24.5 度"],
    },
    {
      title: "高尔夫传奇",
      range: "16 个场景",
      text: "3900 亩球场社区、41 洞体验、400 码真草练习场与汤姆·韦斯科夫设计语言，组成神州半岛的核心引擎。",
      image: asset("pdf-pages/page-011.jpg"),
      points: ["36 洞球场与 5 洞练习洞", "沙丘滨海林克斯风格", "长期承接职业与商业赛事"],
    },
    {
      title: "栖居之选",
      range: "24 个场景",
      text: "君悦、喜来登、福朋喜来登与半岛餐饮商业，支撑球场之外的住宿、宴会、餐饮与社交停留。",
      image: asset("pdf-pages/page-033.jpg"),
      points: ["三大国际品牌酒店", "餐饮、酒吧与会议宴会", "半岛特色商业场景"],
    },
    {
      title: "玩海时代",
      range: "3 个场景",
      text: "沙滩俱乐部把高尔夫假期延伸至海上，冲浪、桨板、帆船、营地与团建共同打开亲海体验。",
      image: asset("pdf-pages/page-053.jpg"),
      points: ["北纬 18 度海陆探索营", "玻璃海运动场", "青少年成长营地"],
    },
    {
      title: "高尔夫+",
      range: "16 个场景",
      text: "品牌赛事、会员赛事、酒店联动与晚宴社交，让神州半岛成为兼具竞技、度假与圈层交流的目的地。",
      image: asset("pdf-pages/page-057.jpg"),
      points: ["燕之屋高尔夫嘉年华", "保时捷与梅赛德斯赛事", "清华校友与会员赛事"],
    },
  ];

  const BROCHURE_PAGE_TITLES = [
    "中海神州高尔夫度假村",
    "项目介绍目录",
    "天赋之境章节",
    "无可复制的黄金区位",
    "天赋稀贵的自然资源",
    "一座半岛一座度假村",
    "纵横通达链接世界",
    "因为远所以野",
    "区位交通方式",
    "高尔夫传奇章节",
    "独占半岛最佳 C 位资源",
    "传奇设计师汤姆韦斯科夫",
    "球场概况",
    "风格运营与会所设施",
    "球场实景一",
    "球场实景二",
    "球场实景三",
    "球场实景四",
    "球场实景五",
    "球场实景六",
    "球场实景七",
    "球场实景八",
    "球场实景九",
    "球场实景十",
    "2013-2026 年度奖项",
    "为赛事而生",
    "三大酒店章节",
    "神州半岛君悦酒店",
    "君悦酒店房型概览",
    "嘉宾轩与宴会场地",
    "君悦餐饮",
    "君悦康乐设施",
    "神州半岛喜来登度假酒店",
    "喜来登房型概览",
    "喜来登餐饮及酒吧",
    "采悦轩一席海南菜",
    "喜来登宴会及会议场地",
    "神州半岛福朋喜来登酒店",
    "福朋房型概览",
    "福朋餐饮及酒吧",
    "科罗娜日落吧一",
    "科罗娜日落吧二",
    "CASA 卡萨科罗娜餐厅一",
    "CASA 卡萨科罗娜餐厅二",
    "SEALINE 海岸线酒吧一",
    "SEALINE 海岸线酒吧二",
    "The Wet Floor 湿地板 Gym 一",
    "The Wet Floor 湿地板 Gym 二",
    "SHAKA SURF 沙卡冲浪店",
    "MOJO 沫酒精酿吧一",
    "MOJO 沫酒精酿吧二",
    "神州半岛沙滩俱乐部章节",
    "北纬 18 度海陆探索营",
    "水上狂欢项目",
    "青少年夏冬令营与团建",
    "高尔夫+章节",
    "燕之屋高尔夫嘉年华",
    "一场赛事两项纪录",
    "山海之间荣耀之夜",
    "欢迎晚宴烟花与颁奖",
    "郎酒庄园会员杯总决赛",
    "规模空前三赛齐开",
    "保时捷高尔夫巡回赛中国总决赛",
    "一场赛事三重含金量",
    "君悦之夜为巅峰加冕",
    "保时捷欢迎晚宴",
    "梅赛德斯杯中国总决赛",
    "百年传承决战神州",
    "名人赋能",
    "酒店联动明星之夜",
    "红运郎杯清华校友年度封场杯",
    "以球会友与校同辉",
    "感谢观看",
  ];

  const OMITTED_BROCHURE_PAGES = new Set([1, 2, 3, 10, 27, 52, 56, 73]);

  function brochureChapter(pageNumber) {
    if (pageNumber <= 9) return "天赋之境";
    if (pageNumber <= 26) return "高尔夫传奇";
    if (pageNumber <= 51) return "栖居之选";
    if (pageNumber <= 55) return "玩海时代";
    return "高尔夫+";
  }

  function brochurePages() {
    let displayIndex = 0;
    return BROCHURE_PAGE_TITLES.flatMap((title, index) => {
      const pageNumber = index + 1;
      if (OMITTED_BROCHURE_PAGES.has(pageNumber)) return [];
      displayIndex += 1;
      return {
        number: String(displayIndex).padStart(2, "0"),
        sourcePage: String(pageNumber).padStart(2, "0"),
        chapter: brochureChapter(pageNumber),
        title,
        image: asset(`pdf-pages/page-${String(pageNumber).padStart(3, "0")}.jpg`),
      };
    });
  }

  const DEFAULT_CONTENT = {
    brand: {
      clubName: "中海神州高尔夫度假村",
      englishName: "Golf Resort at Shenzhou Peninsula",
      location: "海南万宁神州半岛",
      phone: "+86 898 3622 0000",
      email: "reserve@cohl.com",
      bookingLabel: "预约咨询",
      pageTitle: "中海神州高尔夫度假村 | 万宁滨海高尔夫目的地",
      pageDescription: "位于海南万宁神州半岛的滨海高尔夫度假目的地，拥有 3900 亩球场社区、41 洞球场体验、400 码真草练习场与半岛度假配套。",
    },
    theme: {
      preset: "海岸奢华",
      accentColor: "#c8a45d",
      deepColor: "#061413",
      primaryColor: "#315f4c",
      paperColor: "#e8ece4",
      cardColor: "#f7f4ea",
      highlightColor: "#8f6a3d",
      fontStyle: "modern-cn",
      headlineScale: 100,
      bodyScale: 100,
      navScale: 100,
      sectionSpacing: 100,
      cornerRadius: 10,
      imageContrast: 106,
      imageWarmth: 98,
      motionLevel: 76,
    },
    nav: [
      { label: "球场", target: "courses" },
      { label: "影像", target: "films" },
      { label: "图志", target: "brochure" },
      { label: "商户", target: "merchants" },
      { label: "赛事", target: "events" },
      { label: "度假", target: "amenities" },
      { label: "预约", target: "booking" },
    ],
    hero: {
      eyebrow: "SHENZHOU PENINSULA",
      title: "北纬 18 度的海岸球场",
      subtitle: "3900 亩滨海林克斯、41 洞球场体验与半岛度假配套，在万宁神州半岛完整展开。",
      primaryCta: "预约体验",
      secondaryCta: "观看影像",
      image: asset("pdf-images/shenzhou-coast-aerial.jpg"),
      videoCover: asset("media/film-coast-poster.jpg"),
      videoTitle: "北纬 18 度的风",
      videoSubtitle: "海岸、沙丘、果岭与南海浪线同框。",
      videoUrl: asset("media/film-coast.mp4"),
    },
    ui: {
      statsAriaLabel: "球会关键数据",
      experiencesAriaLabel: "体验入口",
      mainNavAriaLabel: "主导航",
      skipLabel: "跳到正文",
      adminLabel: "内容后台",
      menuLabel: "菜单",
      videoAriaPrefix: "播放视频",
      videoPlayLabel: "播放",
      phoneSeparator: "：",
      storySeparator: " / ",
      courseLabels: {
        holes: "球洞",
        par: "标准杆",
        yardage: "长度",
      },
    },
    sections: {
      intro: {
        title: "不是单一球场，而是一座海岸度假目的地。",
        text: "三面环海，一面接陆。13 公里全南向海岸线、原始沙丘、老爷海湿地和酒店群，让一场球自然延伸成完整假期。",
      },
      films: {
        title: "三段影像，进入神州半岛",
        text: "从晨露、海岸到沙坑击球，以三段影像进入球场的自然肌理、海岸尺度与运动瞬间。",
      },
      courses: {
        title: "3900 亩，一座球场的四种可能",
        text: "36 洞加 5 洞练习洞，可组合为东场、西场、北场及锦标赛球场，并配备 400 码双向对打真草练习场。",
      },
      amenities: {
        title: "球会、酒店、海湾，串联一个半岛假期",
        text: "逾万平方米双层海景会所、国际品牌酒店群、沙滩俱乐部与会奖场景，承接度假、商务与赛事行程。",
      },
      brochure: {
        title: "半岛图志",
        text: "以五个篇章呈现神州半岛的区位、球场、酒店、海湾生活与高尔夫+活动场景。",
      },
      merchants: {
        title: "特色商户",
        text: "从日落酒吧到海岸餐厅，半岛商业为空间停留与社交体验增加层次。",
      },
      events: {
        title: "为专业赛事而生",
        text: "从职业资格赛、青少年赛事到高端品牌邀请赛，神州半岛长期承接兼具竞技、度假与社交属性的高球活动。",
        cta: "咨询赛事",
      },
      stories: {
        title: "荣光共鉴",
        text: "奖项、品牌合作与会员故事共同构成球会声誉，也是未来内容运营的长期资产。",
      },
    },
    today: {
      title: "半岛资料",
      dateLabel: "18 平方公里整岛规划",
      notices: ["13 公里全南向海岸线", "年日照约 290 天，年平均气温约 24.5 度", "三亚、海口、博鳌机场构成一小时至两小时度假圈"],
    },
    stats: [
      { value: "3900亩", label: "高尔夫度假社区面积" },
      { value: "41洞", label: "36 洞球场与 5 洞练习洞" },
      { value: "400码", label: "双向对打真草练习场" },
      { value: "13公里", label: "全南向海岸线" },
    ],
    experiences: [
      {
        kicker: "Latitude 18",
        title: "半岛最佳 C 位资源",
        text: "球会坐落神州半岛核心滨海地带，三面环海，将海岸、山体、沙丘与果岭收进同一视野。",
        image: asset("pdf-images/shenzhou-coast-aerial.jpg"),
      },
      {
        kicker: "Tom Weiskopf",
        title: "传奇设计师手笔",
        text: "由汤姆·韦斯科夫设计，以沙丘滨海林克斯风格融合原始地貌，兼具挑战性与观赏性。",
        image: asset("pdf-images/shenzhou-mountain-hole.jpg"),
      },
      {
        kicker: "Golf Plus",
        title: "高尔夫与度假共生",
        text: "会所、酒店、沙滩俱乐部和会奖资源共同服务高端度假、商务社交与品牌活动。",
        image: asset("pdf-images/shenzhou-peninsula-resort.jpg"),
      },
    ],
    films: [
      {
        title: "晨露开篇",
        subtitle: "从草叶和第一道光开始，建立球场的自然质感。",
        src: asset("media/film-dew.mp4"),
        poster: asset("media/film-dew-poster.jpg"),
      },
      {
        title: "北纬 18 度的风",
        subtitle: "海浪、山体和果岭同框，是神州半岛最直接的记忆点。",
        src: asset("media/film-coast.mp4"),
        poster: asset("media/film-coast-poster.jpg"),
      },
      {
        title: "沙坑与击球瞬间",
        subtitle: "让球场难度、动作美感和服务场景进入同一段宣传叙事。",
        src: asset("media/film-bunker.mp4"),
        poster: asset("media/film-bunker-poster.jpg"),
      },
    ],
    courses: [
      {
        name: "东场",
        type: "山海沙石",
        holes: "18 洞",
        par: "72 杆",
        yardage: "可按赛事设置",
        note: "山体、海岸、沙地和岩石构成多层策略，适合高水平球员与品牌赛事。",
        image: asset("pdf-images/shenzhou-mountain-hole.jpg"),
      },
      {
        name: "西场",
        type: "海景沙丘",
        holes: "18 洞",
        par: "72 杆",
        yardage: "可按开球台调整",
        note: "沿海岸线展开，风向、落点与沙丘地貌决定每一次攻守选择。",
        image: asset("pdf-images/shenzhou-fairway-sun.jpg"),
      },
      {
        name: "练习区",
        type: "5 洞练习区",
        holes: "5 洞",
        par: "教学组合",
        yardage: "400 码练习场",
        note: "真草练习场、推杆果岭、切杆沙坑与练习洞组合，支持训练、青少年课程和热身。",
        image: asset("media/film-bunker-poster.jpg"),
      },
    ],
    amenities: [
      { title: "双层海景会所", text: "逾万平方米会所承接接待、更衣、专卖、餐厅、会议室与观景动线。", image: asset("pdf-images/shenzhou-peninsula-resort.jpg") },
      { title: "三大酒店群", text: "君悦、喜来登、福朋喜来登构成住宿、宴会、餐饮与商务接待基础。", image: asset("pdf-images/shenzhou-peninsula-resort.jpg") },
      { title: "沙滩俱乐部", text: "冲浪、桨板、皮划艇、帆船和亲子营地，把球场假期延伸到海上。", image: asset("media/film-coast-poster.jpg") },
      { title: "会奖与晚宴", text: "草坪欢迎晚宴、宴会厅颁奖和品牌日活动可与球赛行程完整衔接。", image: asset("media/film-sunset-poster.jpg") },
    ],
    brochure: {
      eyebrow: "SHENZHOU ATLAS",
      title: "山海之间的球会生活",
      subtitle: "五个篇章展开半岛的自然资源、球场传奇、酒店群、沙滩俱乐部与高尔夫+活动，让一次到访拥有清晰的停留理由。",
      heroImage: asset("pdf-pages/page-011.jpg"),
      heroPages: [asset("pdf-pages/page-004.jpg"), asset("pdf-pages/page-057.jpg")],
      highlight: "从 13 公里海岸线到 41 洞球场体验，从酒店群到品牌赛事，神州半岛不是单点目的地，而是可连续停留、接待与运营的山海球会生活。",
      chapters: BROCHURE_CHAPTERS,
      pages: brochurePages(),
    },
    merchants: [
      { name: "科罗娜日落吧", image: asset("pdf-pages/page-041.jpg") },
      { name: "CASA 卡萨科罗娜餐厅", image: asset("pdf-pages/page-043.jpg") },
      { name: "SEALINE 海岸线酒吧", image: asset("pdf-pages/page-045.jpg") },
      { name: "The Wet Floor 湿地板 Gym", image: asset("pdf-pages/page-047.jpg") },
      { name: "SHAKA SURF 沙卡冲浪店", image: asset("pdf-pages/page-049.jpg") },
      { name: "MOJO 沫酒精酿吧", image: asset("pdf-pages/page-050.jpg") },
    ],
    events: [
      {
        date: "2025",
        title: "燕之屋高尔夫嘉年华",
        description: "300 余位嘉宾汇聚神州半岛，形成球会成立以来规模最大的赛事接待之一。",
        image: asset("media/film-sunset-poster.jpg"),
      },
      {
        date: "连续 5 年",
        title: "保时捷高尔夫巡回赛中国总决赛",
        description: "高端竞技、酒店接待和品牌晚宴共同构成冠军球场与顶级品牌的合作样本。",
        image: asset("pdf-images/shenzhou-peninsula-resort.jpg"),
      },
      {
        date: "2025",
        title: "梅赛德斯杯中国总决赛",
        description: "120 位精英球手及嘉宾齐聚，竞赛、住宿、晚宴与社交形成完整闭环。",
        image: asset("pdf-images/shenzhou-fairway-sun.jpg"),
      },
    ],
    stories: [
      {
        category: "奖项",
        date: "2013-2026",
        title: "持续入选中国与亚洲高尔夫榜单",
        excerpt: "中国金牌高尔夫度假村、亚洲十佳高尔夫度假村、亚洲百佳球场等荣誉，构成球会长期声誉资产。",
        image: asset("pdf-images/shenzhou-mountain-hole.jpg"),
      },
      {
        category: "赛事",
        date: "长期承接",
        title: "职业、青少年与商业赛事共同发生",
        excerpt: "职业资格赛、青少年赛事、汽车和名酒品牌赛事，为球会带来稳定的高端活动场景。",
        image: asset("media/film-bunker-poster.jpg"),
      },
      {
        category: "半岛生活",
        date: "Golf Plus",
        title: "把一场球变成两天一晚",
        excerpt: "酒店、海湾、餐饮、沙滩俱乐部和高尔夫共同支撑停留型目的地产品。",
        image: asset("pdf-images/shenzhou-coast-aerial.jpg"),
      },
    ],
    booking: {
      title: "让下一场球从半岛开始",
      subtitle: "预约开球、企业赛事、会奖行程或酒店联动，可由球会服务团队协助确认。",
      phoneLabel: "球会电话",
      note: "请以球会官方确认的价格、时段和礼仪规则为准。",
      image: asset("pdf-images/shenzhou-coast-aerial.jpg"),
    },
    footer: {
      address: "海南省万宁市神州半岛旅游度假区",
      copyright: "© 2026 中海神州高尔夫球会。保留所有权利。",
    },
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function deepMerge(base, override) {
    if (Array.isArray(base) || Array.isArray(override) || !base || typeof base !== "object" || !override || typeof override !== "object") {
      return override === undefined ? deepClone(base) : override;
    }
    const merged = deepClone(base);
    Object.entries(override).forEach(([key, value]) => {
      merged[key] = key in merged ? deepMerge(merged[key], value) : value;
    });
    return merged;
  }

  function ensureNavItems(content) {
    const requiredItems = [
      { label: "图志", target: "brochure" },
      { label: "商户", target: "merchants" },
    ];
    const navItems = Array.isArray(content.nav) ? content.nav : [];
    requiredItems.forEach((item) => {
      const existing = navItems.find((navItem) => navItem && navItem.target === item.target);
      if (existing) existing.label = item.label;
      else navItems.splice(Math.max(navItems.length - 1, 0), 0, item);
    });
    content.nav = navItems;
    return content;
  }

  function ensurePublicCopy(content) {
    if (content.brochure?.title && /PDF|网页|完整项目介绍/.test(content.brochure.title)) content.brochure.title = DEFAULT_CONTENT.brochure.title;
    if (content.brochure?.title === "山海之间，一座球会的完整度假叙事") content.brochure.title = DEFAULT_CONTENT.brochure.title;
    if (content.brochure?.title === "山海之间，球会生活完整展开") content.brochure.title = DEFAULT_CONTENT.brochure.title;
    if (content.brochure?.subtitle && /PDF|可替换|可维护|宣传资料/.test(content.brochure.subtitle)) content.brochure.subtitle = DEFAULT_CONTENT.brochure.subtitle;
    if (content.sections?.brochure?.title && /完整项目介绍|PDF/.test(content.sections.brochure.title)) content.sections.brochure.title = DEFAULT_CONTENT.sections.brochure.title;
    if (content.sections?.brochure?.text && /PDF|网页|可替换|可维护/.test(content.sections.brochure.text)) content.sections.brochure.text = DEFAULT_CONTENT.sections.brochure.text;
    return content;
  }

  function ensureCuratedBrochure(content) {
    const pages = content.brochure?.pages;
    const defaultPages = DEFAULT_CONTENT.brochure.pages;
    const hasDeckUtilityPages = Array.isArray(pages) && pages.some((page) => /目录|章节|感谢观看/.test(page.title || ""));
    if (!Array.isArray(pages) || pages.length !== defaultPages.length || hasDeckUtilityPages) content.brochure.pages = deepClone(defaultPages);
    if (!Array.isArray(content.brochure?.chapters) || content.brochure.chapters.some((chapter) => /^P/.test(chapter.range || ""))) {
      content.brochure.chapters = deepClone(DEFAULT_CONTENT.brochure.chapters);
    }
    return content;
  }

  function getContent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return ensureCuratedBrochure(ensurePublicCopy(ensureNavItems(deepClone(DEFAULT_CONTENT))));
      return ensureCuratedBrochure(ensurePublicCopy(ensureNavItems(deepMerge(DEFAULT_CONTENT, JSON.parse(stored)))));
    } catch (error) {
      console.warn("Failed to parse content, falling back to defaults", error);
      return ensureCuratedBrochure(ensurePublicCopy(ensureNavItems(deepClone(DEFAULT_CONTENT))));
    }
  }

  function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  function resetContent() {
    localStorage.removeItem(STORAGE_KEY);
    return ensureCuratedBrochure(ensurePublicCopy(ensureNavItems(deepClone(DEFAULT_CONTENT))));
  }

  window.ShenzhouCMS = {
    STORAGE_KEY,
    DEFAULT_CONTENT,
    getContent,
    saveContent,
    resetContent,
    deepClone,
    deepMerge,
  };
})();
