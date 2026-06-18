(function () {
  const STORAGE_KEY = "shenzhou-golf-site-content-v2";

  function asset(path) {
    return `./assets/${path}`;
  }

  const IMG = {
    peninsulaHero: asset("ppt/01天赋之境-神州半岛/01天赋之境-神州半岛-无可复制的黄金区位-01-55356b4fb3ed.webp"),
    peninsulaWide: asset("ppt/01天赋之境-神州半岛/01天赋之境-神州半岛-纵横通达-链接世界-01-356d7b1d1eea.webp"),
    peninsulaMap: asset("ppt/01天赋之境-神州半岛/01天赋之境-神州半岛-纵横通达-链接世界-03-c9fb4a68d686.webp"),
    peninsulaAerial: asset("ppt/01天赋之境-神州半岛/01天赋之境-神州半岛-无可复制的黄金区位-03-b28bde1b5a19.webp"),
    clubHero: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-01顶级滨海高尔夫度假范本-01-98bfe93f8b54.webp"),
    designer: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-02传奇设计师-02-eb4655417945.webp"),
    courseOne: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-033900亩-一座球场的四种可能-01-7e5a963cae09.webp"),
    courseTwo: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-033900亩-一座球场的四种可能-02-c3310039994e.webp"),
    courseThree: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-033900亩-一座球场的四种可能-03-d2d9c22b41cc.webp"),
    mountain: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-04山海沙石风之间-洞见天地-01-510ab13584e7.webp"),
    sea: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-04山海沙石风之间-洞见天地-02-9ca7bae4778f.webp"),
    sand: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-04山海沙石风之间-洞见天地-13-c18f14527426.webp"),
    rock: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-04山海沙石风之间-洞见天地-08-434ca299e5d3.webp"),
    eventGolf: asset("ppt/02核心引擎-高尔夫传奇/02核心引擎-高尔夫传奇-06为专业赛事而生-02-3501949a529d.webp"),
    hyatt: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-01神州半岛君悦酒店-08-c67edbc822c9.webp"),
    hyattRoom: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-01神州半岛君悦酒店-01-0c32d20d9df9.webp"),
    hyattDining: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-01神州半岛君悦酒店-02-7526849c8bf4.webp"),
    sheraton: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-02神州半岛喜来登度假酒店-08-48362bb5d3c4.webp"),
    sheratonRoom: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-02神州半岛喜来登度假酒店-01-3b0d85546b1d.webp"),
    fourPoints: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-03神州半岛福朋喜来登酒店-01-c6f43d350c1c.webp"),
    fourPointsRoom: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-03神州半岛福朋喜来登酒店-02-c47d5dd17899.webp"),
    merchantCorona: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-01-bf3c11d0a974.webp"),
    merchantCasa: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-03-72df59fa6b8e.webp"),
    merchantSealine: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-08-60e69062e182.webp"),
    merchantWet: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-06-2308a7907d3c.webp"),
    merchantShaka: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-02-d57a12bd6727.webp"),
    merchantMojo: asset("ppt/03栖居之选-三大酒店/03栖居之选-三大酒店-04一岛万象-自在欢聚场-07-d87148116773.webp"),
    plusYan: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-01-6276c21025bd.webp"),
    plusDinner: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-02-453124f147dd.webp"),
    plusFirework: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-03-e776576a01ce.webp"),
    plusPorsche: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-12-68cfff5a6191.webp"),
    plusMercedes: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-14-8b1ee2bfcafc.webp"),
    plusLang: asset("ppt/04高尔夫-高球无界/04高尔夫-高球无界-01荣光共鉴-合作案例精彩回顾-16-55efccea7fcc.webp"),
  };

  const DEFAULT_CONTENT = {
    modelVersion: 2,
    brand: {
      clubName: "中海神州高尔夫球会",
      englishName: "Golf Resort at Shenzhou Peninsula",
      location: "海南万宁神州半岛",
      phone: "+86 898 3622 0000",
      email: "reserve@cohl.com",
      bookingLabel: "预约咨询",
      pageTitle: "中海神州高尔夫球会 | 万宁滨海高尔夫目的地",
      pageDescription: "中海神州高尔夫球会位于海南万宁神州半岛，呈现滨海球场、国际酒店、特色商业、品牌赛事与高尔夫度假体验。",
    },
    theme: {
      preset: "黑金海岸",
      accentColor: "#c8a45d",
      deepColor: "#061413",
      primaryColor: "#315f4c",
      paperColor: "#f4f0e4",
      cardColor: "#fffaf0",
      highlightColor: "#8f6a3d",
      fontStyle: "modern-cn",
      headlineScale: 100,
      bodyScale: 100,
      navScale: 100,
      sectionSpacing: 100,
      cornerRadius: 14,
      imageContrast: 106,
      imageWarmth: 100,
      motionLevel: 78,
    },
    nav: [
      { label: "首页", target: "top" },
      { label: "神州半岛", target: "peninsula" },
      { label: "神州高尔夫球会", target: "club" },
      { label: "酒店配套", target: "hotels" },
      { label: "高尔夫 plus", target: "golf-plus" },
      { label: "联系方式", target: "contact" },
    ],
    hero: {
      eyebrow: "SHENZHOU PENINSULA",
      title: "一座南海岸的高尔夫度假目的地",
      subtitle: "三面环海，一面接陆。球场、酒店、海湾生活与品牌赛事在神州半岛自然合拢。",
      primaryCta: "探索目录",
      secondaryCta: "预约咨询",
      image: IMG.peninsulaHero,
      videoPoster: asset("media/film-main-poster.jpg"),
      videoKey: "main",
      videoTitle: "神州半岛影像",
      videoSubtitle: "海风、果岭与击球瞬间，构成半岛最直接的记忆。",
    },
    metrics: [
      { value: "18km²", label: "整岛规划度假区域" },
      { value: "13km", label: "全南向海岸线" },
      { value: "41洞", label: "36 洞球场与 5 洞练习洞" },
      { value: "400码", label: "双向对打真草练习场" },
    ],
    chapters: [
      {
        id: "peninsula",
        eyebrow: "PENINSULA",
        label: "神州半岛",
        title: "天赋之境，先天稀缺的半岛底色",
        intro: "北纬 18 度、内外双海、四湾六岭与交通半径，决定了神州半岛不是普通度假区，而是可以承载长假、会奖和球会生活的目的地。",
        image: IMG.peninsulaWide,
        cards: [
          {
            id: "golden-location",
            kicker: "黄金区位",
            title: "不可复制的半岛资源",
            excerpt: "18 平方公里整岛规划，13 公里全南向海岸线，南海与老爷海共同塑造半岛景观。",
            image: IMG.peninsulaHero,
            facts: ["年日照约 290 天", "年平均气温约 24.5 度", "海水能见度可达约 20 米"],
            body: [
              { title: "内外双海", text: "三面环海，一面接陆，外海南海与内海老爷海形成双重海域视野，也为度假停留提供更丰富的景观层次。" },
              { title: "四湾六岭", text: "乐涛湾、金沙湾、圆石湾、沁宁湾环抱半岛，六座起伏山岭构成山、海、湾、林交织的立体空间。" },
              { title: "生态秘境", text: "周边覆盖自然植被、红树林湿地与原生海岛资源，空气清爽，具备热带花园式度假基底。" },
            ],
            gallery: [IMG.peninsulaHero, IMG.peninsulaAerial, IMG.peninsulaWide],
          },
          {
            id: "access",
            kicker: "交通半径",
            title: "海陆空立体抵达",
            excerpt: "神州半岛与海口、三亚、博鳌机场及高铁站形成可组织的度假交通网络。",
            image: IMG.peninsulaMap,
            facts: ["博鳌机场约 70 分钟车程", "三亚机场约 120 分钟车程", "神州站约 15 分钟车程"],
            body: [
              { title: "恰到好处的距离", text: "从环岛高速驶入半岛，城市喧嚣被海风、红树林和度假区尺度逐步过滤，抵达本身成为度假叙事的一部分。" },
              { title: "一小时至两小时度假圈", text: "机场、高铁、自驾共同覆盖岛内主要客源路径，便于个人度假、企业会奖与赛事接待统一组织。" },
            ],
            gallery: [IMG.peninsulaMap, IMG.peninsulaWide],
          },
        ],
      },
      {
        id: "club",
        eyebrow: "GOLF CLUB",
        label: "神州高尔夫球会",
        title: "以高尔夫为核心的半岛引擎",
        intro: "从汤姆·韦斯科夫设计语言到山海沙石风的球场质感，从锦标赛组合到长期赛事承接，球会构成神州半岛的核心吸引力。",
        image: IMG.clubHero,
        cards: [
          {
            id: "course-model",
            kicker: "球场格局",
            title: "一座球场的四种可能",
            excerpt: "36 洞球场与 5 洞练习洞，可组合为西场、东场、北场及锦标赛球场。",
            image: IMG.courseOne,
            facts: ["约 3900 亩高尔夫度假社区", "36 洞 + 5 洞练习洞", "逾万平方米双层海景会所"],
            body: [
              { title: "灵活组合", text: "球场可根据日常运营、会员接待和大型赛事需求，在多个场地组合之间切换。" },
              { title: "练习体系", text: "400 码双向对打真草练习场、推杆果岭、切杆沙坑与练习洞，为热身、训练和青少年课程提供完整空间。" },
            ],
            gallery: [IMG.courseOne, IMG.courseTwo, IMG.courseThree, IMG.clubHero],
          },
          {
            id: "designer",
            kicker: "设计师",
            title: "汤姆·韦斯科夫的球场语言",
            excerpt: "设计尊重原始地貌，以沙丘滨海林克斯风格平衡挑战性、观赏性和度假气质。",
            image: IMG.designer,
            facts: ["1996 年获评年度最佳高尔夫球场设计师", "全球多地代表作品", "注重传统理念与细节"],
            body: [
              { title: "经典缔造传奇", text: "汤姆·韦斯科夫以优雅挥杆和球场设计闻名，其作品强调策略、视觉张力和自然地形的合理利用。" },
              { title: "山海之间的落点选择", text: "神州半岛的设计不是单纯制造难度，而是让海风、沙丘、山体、巨石和果岭共同参与每一次决策。" },
            ],
            gallery: [IMG.designer, IMG.mountain, IMG.sea],
          },
          {
            id: "landscape",
            kicker: "山海沙石风",
            title: "五种自然元素构成球场记忆",
            excerpt: "山体、海岸、沙丘、巨石与海风，让每个球洞都拥有不同的策略和画面。",
            image: IMG.sea,
            facts: ["山景映翠", "面朝南海", "原始沙丘", "嶙峋巨石", "四季海风"],
            body: [
              { title: "山与海", text: "远眺层峦叠翠，近看南海浪线，球道在山海之间形成开阔且有层次的击球体验。" },
              { title: "沙与石", text: "原始沙丘形成经典林克斯防线，天然巨石既是景观，也是落点选择中的策略障碍。" },
              { title: "风", text: "常年海风让同一球洞在不同季节和时段呈现不同打法，保持球场的新鲜感与挑战性。" },
            ],
            gallery: [IMG.mountain, IMG.sea, IMG.sand, IMG.rock],
          },
          {
            id: "honor-events",
            kicker: "荣誉与赛事",
            title: "为专业赛事而生",
            excerpt: "球会长期承接职业、青少年、商业品牌与会员赛事，形成高端活动接待能力。",
            image: IMG.eventGolf,
            facts: ["中国与亚洲高尔夫榜单长期入选", "职业与青少年赛事承接", "汽车、名酒、企业家赛事合作"],
            body: [
              { title: "荣誉脉络", text: "自 2013 年以来，球会持续进入中国与亚洲高尔夫榜单，奖项不作为堆砌数字呈现，而作为声誉资产进入品牌叙事。" },
              { title: "赛事能力", text: "球场、会所、酒店、晚宴和交通组织共同支撑赛事闭环，适合高规格品牌活动和企业会奖。" },
            ],
            gallery: [IMG.eventGolf, IMG.plusPorsche, IMG.plusMercedes],
          },
        ],
      },
      {
        id: "hotels",
        eyebrow: "RESORT STAY",
        label: "酒店配套",
        title: "三大酒店与半岛商业，承接球场之外的停留",
        intro: "君悦、喜来登、福朋喜来登构成住宿、宴会、餐饮和家庭度假基础；特色商业以图片与名称呈现，便于后续持续更新。",
        image: IMG.hyatt,
        cards: [
          {
            id: "hyatt",
            kicker: "Grand Hyatt",
            title: "神州半岛君悦酒店",
            excerpt: "热带花园中的海滨度假生活，融合海景客房、餐饮、宴会和康乐设施。",
            image: IMG.hyatt,
            facts: ["海景客房与家庭套房", "室内外宴会及会议场地", "五家餐厅和酒吧"],
            body: [
              { title: "海岛度假底色", text: "酒店以轻松愉悦的海滨度假生活为灵感，在热带花园中俯瞰海景，适合家庭度假、商务社交和高尔夫行程。" },
              { title: "宴会与餐饮", text: "无柱宴会厅、商务社交场所、户外草坪和多元餐饮，为会奖与赛事晚宴提供配套空间。" },
            ],
            gallery: [IMG.hyatt, IMG.hyattRoom, IMG.hyattDining],
          },
          {
            id: "sheraton",
            kicker: "Sheraton",
            title: "神州半岛喜来登度假酒店",
            excerpt: "坐落乐涛湾，拥有沙滩、戏水、宴会、餐饮与亲子度假场景。",
            image: IMG.sheraton,
            facts: ["乐涛湾海岸线", "超大户外戏水区域", "宴会厅及户外场地"],
            body: [
              { title: "海天相接的度假节奏", text: "酒店掩映于热带花园和椰风海韵之间，适合亲子、团队和赛事住宿。" },
              { title: "餐饮与会议", text: "中餐厅、日落餐厅、大堂吧、海景餐厅和会议场地，共同支撑一站式接待。" },
            ],
            gallery: [IMG.sheraton, IMG.sheratonRoom, IMG.plusDinner],
          },
          {
            id: "four-points",
            kicker: "Four Points",
            title: "神州半岛福朋喜来登酒店",
            excerpt: "依山傍海，靠近海滨活动，适合轻松、便捷的半岛停留。",
            image: IMG.fourPoints,
            facts: ["乐涛湾区位", "园景与海景房型", "餐厅与酒吧配套"],
            body: [
              { title: "近海停留", text: "酒店位于神州半岛度假区，海滨活动近在咫尺，适合度假客人与活动团队灵活入住。" },
              { title: "轻松餐饮", text: "浪吧与全日餐厅提供日常停留中的餐饮补给，与球场行程形成互补。" },
            ],
            gallery: [IMG.fourPoints, IMG.fourPointsRoom],
          },
        ],
        merchants: [
          { name: "科罗娜日落吧", image: IMG.merchantCorona },
          { name: "CASA 卡萨科罗娜餐厅", image: IMG.merchantCasa },
          { name: "SEALINE 海岸线酒吧", image: IMG.merchantSealine },
          { name: "The Wet Floor 湿地板 Gym", image: IMG.merchantWet },
          { name: "SHAKA SURF 沙卡冲浪店", image: IMG.merchantShaka },
          { name: "MOJO 沫酒精酿吧", image: IMG.merchantMojo },
        ],
      },
      {
        id: "golf-plus",
        eyebrow: "GOLF PLUS",
        label: "高尔夫 plus",
        title: "让一场球延展为品牌、社交与度假体验",
        intro: "高尔夫 plus 以活动目录的方式呈现。用户先看主题和图片，感兴趣再打开图文详情。",
        image: IMG.plusDinner,
        cards: [
          {
            id: "yan-palace",
            kicker: "品牌嘉年华",
            title: "燕之屋高尔夫嘉年华",
            excerpt: "300 余位嘉宾汇聚神州半岛，竞技、交流、欢迎晚宴与颁奖共同展开。",
            image: IMG.plusYan,
            facts: ["高端商务休闲社交平台", "户外欢迎晚宴", "颁奖晚宴与庆生仪式"],
            body: [
              { title: "规模与氛围", text: "活动以球会友，结合球赛、晚宴、烟花与颁奖，形成兼具竞技与社交的半岛生活方式样本。" },
              { title: "山海之间荣耀之夜", text: "喜来登户外草坪、宴会厅和海岸夜景共同构成品牌活动的记忆点。" },
            ],
            gallery: [IMG.plusYan, IMG.plusDinner, IMG.plusFirework],
          },
          {
            id: "porsche",
            kicker: "顶级品牌赛事",
            title: "保时捷高尔夫巡回赛中国总决赛",
            excerpt: "连续多年合作，赛事、住宿、欢迎晚宴和品牌体验形成稳定样本。",
            image: IMG.plusPorsche,
            facts: ["总决赛竞技", "品牌晚宴", "酒店联动"],
            body: [
              { title: "冠军球场与顶级品牌", text: "赛事以高尔夫竞技为核心，叠加酒店住宿、社交晚宴与品牌体验，强化高端客群的完整接待。" },
              { title: "场景联动", text: "球场、君悦酒店和半岛夜间活动共同构成从白天到夜晚的品牌动线。" },
            ],
            gallery: [IMG.plusPorsche, IMG.plusDinner],
          },
          {
            id: "mercedes",
            kicker: "全国总决赛",
            title: "梅赛德斯杯中国总决赛",
            excerpt: "全球顶级业余高球赛事的中国篇章，以竞技、嘉宾接待和晚宴形成完整闭环。",
            image: IMG.plusMercedes,
            facts: ["120 位精英齐聚", "竞赛与嘉宾双轨制", "冠军晋级世界总决赛"],
            body: [
              { title: "百年传承，决战神州", text: "赛事将顶级业余高尔夫传统引入神州半岛，以球场品质和接待能力承载全国总决赛规格。" },
            ],
            gallery: [IMG.plusMercedes, IMG.eventGolf],
          },
          {
            id: "langjiu",
            kicker: "会员杯总决赛",
            title: "郎酒庄园会员杯总决赛",
            excerpt: "全国精英会员齐聚，多个赛事同步开球，覆盖不同圈层与竞技需求。",
            image: IMG.plusLang,
            facts: ["全国会员赛事", "多赛制联动", "团队荣誉与社交交流"],
            body: [
              { title: "三赛齐开", text: "总决赛竞技赛、会员邀请赛与队长交流赛同步组织，让高尔夫赛事兼具竞技、合作与圈层交流。" },
            ],
            gallery: [IMG.plusLang, IMG.plusYan],
          },
        ],
      },
    ],
    contact: {
      id: "contact",
      eyebrow: "CONTACT",
      title: "让下一场球从神州半岛开始",
      text: "预约开球、企业赛事、会奖行程、酒店联动或品牌活动合作，可由球会服务团队协助确认。",
      image: IMG.peninsulaHero,
      items: [
        { label: "球会电话", value: "+86 898 3622 0000", href: "tel:+8689836220000" },
        { label: "预约邮箱", value: "reserve@cohl.com", href: "mailto:reserve@cohl.com" },
        { label: "地址", value: "海南省万宁市神州半岛旅游度假区", href: "" },
        { label: "社交媒体", value: "待官方账号确认后接入", href: "" },
      ],
      note: "价格、开球时间、赛事档期与酒店政策，请以球会官方确认为准。",
    },
    ui: {
      skipLabel: "跳到正文",
      menuLabel: "菜单",
      mainNavAriaLabel: "主导航",
      openDetailLabel: "查看详情",
      closeLabel: "关闭",
      galleryLabel: "影像",
      factsLabel: "要点",
      videoUnavailable: "影像精选",
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

  function ensureCurrentModel(content) {
    if (content?.modelVersion !== 2 || !Array.isArray(content.chapters)) return deepClone(DEFAULT_CONTENT);
    return content;
  }

  function getContent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return deepClone(DEFAULT_CONTENT);
      return ensureCurrentModel(deepMerge(DEFAULT_CONTENT, JSON.parse(stored)));
    } catch (error) {
      console.warn("Failed to parse content, falling back to defaults", error);
      return deepClone(DEFAULT_CONTENT);
    }
  }

  function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  function resetContent() {
    localStorage.removeItem(STORAGE_KEY);
    return deepClone(DEFAULT_CONTENT);
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
