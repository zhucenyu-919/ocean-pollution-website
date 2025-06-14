interface ModuleContent {
  objectives: string[];
  chapters: Chapter[];
  caseStudies: CaseStudy[];
  quiz: QuizQuestion[];
}

interface Chapter {
  title: string;
  content: string;
  videoUrl?: string;
  readingTime: string;
}

interface CaseStudy {
  title: string;
  location: string;
  summary: string;
  impact: string;
  solution: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const deepThinkingModulesContent: Record<string, ModuleContent> = {
  'plastic-pollution': {
    objectives: [
      '理解塑料污染的形成机制和传播路径',
      '掌握微塑料对海洋生态系统的影响',
      '了解塑料污染对人类健康的潜在威胁',
      '学习减少塑料污染的实用策略'
    ],
    chapters: [
      {
        title: '第一章：塑料污染的起源',
        content: '每年约有800万吨塑料垃圾进入海洋，相当于每分钟倾倒一卡车的塑料。这些塑料来自陆地活动、海上运输、渔业等多个源头。塑料的持久性使其在海洋中可存在数百年，逐渐分解成微塑料，对海洋生态系统造成长期影响。研究表明，80%的海洋塑料污染来自陆地，主要通过河流、雨水冲刷和风力传输到海洋中。',
        readingTime: '15分钟'
      },
      {
        title: '第二章：微塑料的形成与扩散',
        content: '大型塑料垃圾在紫外线、海浪和微生物作用下逐渐分解成微塑料（直径小于5毫米）。这些微塑料通过洋流在全球海洋中扩散，从北极到南极，从海面到深海，无处不在。微塑料的密度和形状影响其在海洋中的分布，较轻的微塑料漂浮在表层，较重的沉入深海。',
        readingTime: '12分钟'
      },
      {
        title: '第三章：生态系统影响',
        content: '海洋生物误食塑料垃圾，导致消化系统堵塞、营养不良甚至死亡。微塑料进入食物链，通过生物富集作用在顶级捕食者体内累积，最终影响人类健康。研究发现，超过90%的海鸟胃中含有塑料碎片，海龟误食塑料袋的概率高达52%。',
        readingTime: '18分钟'
      }
    ],
    caseStudies: [
      {
        title: '太平洋垃圾带',
        location: '北太平洋',
        summary: '太平洋垃圾带是世界上最大的海洋塑料聚集区，面积相当于三个法国，重量超过8万吨。',
        impact: '影响超过600种海洋生物，每年导致10万只海洋哺乳动物和100万只海鸟死亡。',
        solution: 'The Ocean Cleanup项目正在开发创新技术清理海洋塑料，预计10年内清理50%的垃圾。'
      },
      {
        title: '亨德森岛塑料危机',
        location: '南太平洋',
        summary: '这个无人居住的岛屿每平方米有671件塑料垃圾，总计3800万件，是世界上塑料污染密度最高的地方。',
        impact: '严重威胁当地特有物种的生存，破坏原始生态系统，影响海鸟繁殖。',
        solution: '国际合作清理行动和源头减塑措施，建立海洋保护区。'
      }
    ],
    quiz: [
      {
        question: '每年进入海洋的塑料垃圾约有多少？',
        options: ['100万吨', '300万吨', '800万吨', '1500万吨'],
        correctAnswer: 2,
        explanation: '根据联合国环境规划署的数据，每年约有800万吨塑料垃圾进入海洋，相当于每分钟倾倒一卡车的塑料。'
      },
      {
        question: '微塑料的定义是什么？',
        options: [
          '直径小于1毫米的塑料颗粒',
          '直径小于5毫米的塑料颗粒',
          '直径小于10毫米的塑料颗粒',
          '肉眼看不见的塑料颗粒'
        ],
        correctAnswer: 1,
        explanation: '微塑料是指直径小于5毫米的塑料颗粒，包括初级微塑料（直接生产）和次级微塑料（大型塑料分解产生）。'
      },
      {
        question: '以下哪项不是减少塑料污染的有效措施？',
        options: [
          '使用可重复使用的购物袋',
          '将塑料垃圾倾倒入河流',
          '支持循环经济',
          '选择无包装或少包装产品'
        ],
        correctAnswer: 1,
        explanation: '将垃圾倾倒入河流会加剧污染，正确的做法是妥善分类回收和减少使用。'
      }
    ]
  },

  'chemical-contamination': {
    objectives: [
      '了解海洋化学污染物的主要来源和类型',
      '掌握重金属和有机污染物的毒性机制',
      '理解生物累积和生物放大效应',
      '学习化学污染的监测和治理方法'
    ],
    chapters: [
      {
        title: '第一章：化学污染物概述',
        content: '海洋化学污染物包括重金属（汞、铅、镉、铬）、持久性有机污染物（POPs）、农药残留、石油烃类和新兴污染物（药物、个人护理用品）。这些物质具有毒性强、持久性高、生物累积性强的特点，对海洋生态系统造成严重威胁。全球每年向海洋排放的化学污染物超过1000万吨。',
        readingTime: '20分钟'
      },
      {
        title: '第二章：重金属污染',
        content: '重金属污染主要来自工业排放、采矿活动、电子废物和大气沉降。汞是最危险的重金属之一，能够在食物链中生物放大，在顶级捕食者体内浓度可达环境浓度的数万倍。铅影响神经系统发育，镉损害肾脏功能，铬具有致癌性。',
        readingTime: '18分钟'
      },
      {
        title: '第三章：有机污染物',
        content: '持久性有机污染物（POPs）如多氯联苯（PCBs）、二噁英、有机氯农药等，具有极强的环境持久性和生物累积性。这些物质能够干扰内分泌系统，影响生殖和发育，具有致癌、致畸、致突变的"三致"效应。即使在极地地区也能检测到这些污染物。',
        readingTime: '22分钟'
      },
      {
        title: '第四章：毒性机制与健康影响',
        content: '化学污染物通过多种途径影响海洋生物：细胞膜损伤、酶活性抑制、DNA损伤、内分泌干扰、免疫系统抑制等。不同污染物的毒性机制各异，但都会对生物体造成不可逆的损害。慢性暴露可导致癌症、生殖障碍、发育异常等严重后果。',
        readingTime: '25分钟'
      }
    ],
    caseStudies: [
      {
        title: '水俣病事件',
        location: '日本水俣湾',
        summary: '1950-1960年代，智索化工厂排放含甲基汞的废水污染了水俣湾，通过食物链富集，导致严重的汞中毒事件。',
        impact: '造成数千人中毒，出现神经系统损伤、运动障碍、智力缺陷等症状，死亡人数超过1700人。',
        solution: '停止汞排放，清理污染底泥，建立严格的重金属排放标准，对受害者进行医疗救助和赔偿。'
      },
      {
        title: '北海PCBs污染',
        location: '北海海域',
        summary: '20世纪工业活动导致北海海域PCBs污染严重，通过食物链累积，影响海豹等海洋哺乳动物的健康。',
        impact: '海豹繁殖率下降50%，免疫系统受损，易感染病毒性疾病，种群数量急剧下降。',
        solution: '《斯德哥尔摩公约》全面禁用POPs，开展海洋生物监测和保护，实施生态修复项目。'
      }
    ],
    quiz: [
      {
        question: '以下哪种重金属在食物链中的生物放大系数最高？',
        options: ['铅', '汞', '镉', '铜'],
        correctAnswer: 1,
        explanation: '汞（特别是甲基汞）具有最强的生物放大效应，在食物链顶端的浓度可达环境浓度的数万倍。'
      },
      {
        question: '持久性有机污染物（POPs）的主要特征不包括：',
        options: ['环境持久性', '生物累积性', '易降解性', '长距离传输'],
        correctAnswer: 2,
        explanation: 'POPs的特征是难以降解，而不是易降解。它们在环境中可存在数十年甚至上百年。'
      },
      {
        question: '化学污染物对海洋生物的主要毒性机制是：',
        options: ['物理阻塞', '生化干扰', '温度影响', '光照阻挡'],
        correctAnswer: 1,
        explanation: '化学污染物主要通过生化干扰机制影响生物，如酶抑制、内分泌干扰、DNA损伤等。'
      }
    ]
  },

  'oil-spill-dynamics': {
    objectives: [
      '理解石油泄漏的物理化学过程',
      '掌握石油在海洋环境中的风化机制',
      '学习石油泄漏的环境影响评估',
      '了解石油泄漏应急响应和修复技术'
    ],
    chapters: [
      {
        title: '第一章：石油泄漏概述',
        content: '石油泄漏是最严重的海洋污染事故之一。全球每年发生数千起石油泄漏事故，泄漏量从几吨到数万吨不等。泄漏的石油在海面形成油膜，随洋流和风力扩散，对海洋生态系统造成急性和慢性影响。石油的组成复杂，包含数千种化合物，从轻质的挥发性组分到重质的沥青质。',
        readingTime: '16分钟'
      },
      {
        title: '第二章：石油风化过程',
        content: '石油泄漏后经历蒸发、溶解、乳化、光氧化、生物降解等风化过程。蒸发是最快的过程，轻质组分在24小时内可蒸发20-40%。乳化形成"巧克力慕斯"状物质，体积增加3-4倍。光氧化产生有毒化合物，生物降解是最终的清除机制。风化速率受温度、波浪、微生物等因素影响。',
        readingTime: '20分钟'
      },
      {
        title: '第三章：生态影响机制',
        content: '石油污染通过物理包覆、化学毒性、栖息地破坏等方式影响海洋生物。鸟类羽毛失去保温和防水能力，导致体温失调和溺水。鱼类鳃部受损，影响呼吸和渗透调节。底栖生物栖息地被破坏，繁殖场所受到污染。石油中的多环芳烃具有致癌性，对生物造成长期健康影响。',
        readingTime: '18分钟'
      },
      {
        title: '第四章：清理与修复技术',
        content: '石油泄漏清理包括机械回收、化学分散、原位燃烧、生物修复等方法。机械回收是首选方法，但效率有限。化学分散剂加速石油分散，但可能增加毒性。原位燃烧快速清除大量石油，但产生空气污染。生物修复利用微生物降解石油，是环境友好的长期解决方案。',
        readingTime: '22分钟'
      }
    ],
    caseStudies: [
      {
        title: '埃克森·瓦尔迪兹号事故',
        location: '阿拉斯加威廉王子湾',
        summary: '1989年3月24日，油轮在暗礁上搁浅，泄漏4.2万吨原油，污染2000公里海岸线，是美国历史上最严重的石油泄漏事故之一。',
        impact: '25万只海鸟、2800只海獭、300只海豹死亡，鲑鱼和鲱鱼渔业损失巨大，生态恢复至今仍在进行。',
        solution: '大规模清理行动耗资21亿美元，建立双壳油轮标准，加强航行安全管理，设立石油泄漏责任基金。'
      },
      {
        title: '深水地平线事故',
        location: '墨西哥湾',
        summary: '2010年4月20日，BP公司钻井平台爆炸沉没，连续87天泄漏78万吨原油，是美国历史上最严重的海洋石油泄漏。',
        impact: '污染1773公里海岸线，海洋生物大量死亡，渔业和旅游业受重创，经济损失超过600亿美元。',
        solution: '使用分散剂、围油栏、撇油器等多种技术，开展长期生态监测和修复，BP公司赔偿超过650亿美元。'
      }
    ],
    quiz: [
      {
        question: '石油泄漏后最先发生的风化过程是：',
        options: ['生物降解', '蒸发', '乳化', '沉降'],
        correctAnswer: 1,
        explanation: '蒸发是石油泄漏后最先发生的过程，轻质组分在数小时内开始快速蒸发。'
      },
      {
        question: '以下哪种清理方法对环境影响最小？',
        options: ['化学分散剂', '机械回收', '生物修复', '原位燃烧'],
        correctAnswer: 2,
        explanation: '生物修复利用自然微生物降解石油，对环境影响最小，但清理速度较慢。'
      },
      {
        question: '石油污染对海鸟的主要危害是：',
        options: ['中毒死亡', '羽毛失去保温能力', '视力受损', '听力下降'],
        correctAnswer: 1,
        explanation: '石油污染使海鸟羽毛失去保温和防水能力，导致体温失调、溺水和死亡。'
      }
    ]
  },

  'noise-pollution': {
    objectives: [
      '了解海洋噪声污染的来源和特征',
      '理解声音在海洋中的传播规律',
      '掌握噪声对海洋生物的影响机制',
      '学习噪声污染的监测和控制方法'
    ],
    chapters: [
      {
        title: '第一章：海洋声学环境',
        content: '海洋是一个复杂的声学环境。自然声音包括风浪声（10-1000Hz）、地震声（1-100Hz）、生物声（10Hz-200kHz）等。人为噪声主要来自商船（10-1000Hz）、海上工程、军事声纳（100Hz-10kHz）、地震勘探等。过去50年，海洋环境噪声水平增加了10-15分贝。',
        readingTime: '14分钟'
      },
      {
        title: '第二章：声音传播机制',
        content: '声音在海水中的传播速度约为1500米/秒，受温度、盐度、压力影响。低频声音传播距离远，可达数千公里。声音在海洋中的衰减主要由几何扩散和介质吸收造成。深海声道（SOFAR）可使声音传播更远距离。海底地形和海水分层影响声音传播路径。',
        readingTime: '16分钟'
      },
      {
        title: '第三章：生物声学影响',
        content: '海洋哺乳动物依赖声音进行导航、觅食、交流和繁殖。鲸类使用低频声音进行长距离通讯，海豚使用高频声音进行回声定位。人为噪声干扰这些重要行为，导致搁浅、听力损伤、压力反应、栖息地放弃、繁殖成功率下降等问题。噪声还影响鱼类的听觉和行为。',
        readingTime: '20分钟'
      },
      {
        title: '第四章：噪声管理与控制',
        content: '噪声污染管理包括源头控制、传播路径优化、敏感区域保护等策略。技术措施包括船舶降噪设计、螺旋桨优化、施工时间限制、声学监测等。国际海事组织制定了船舶噪声控制指南。建立海洋哺乳动物保护区，限制高噪声活动。',
        readingTime: '18分钟'
      }
    ],
    caseStudies: [
      {
        title: '鲸类大规模搁浅事件',
        location: '全球多个海域',
        summary: '军事声纳演习期间，多次发生鲸类大规模搁浅事件，科学研究证实与高强度中频声纳有关。',
        impact: '数百头鲸类死亡，包括珍稀的喙鲸，种群数量下降，海洋生态平衡受到影响。',
        solution: '限制声纳使用强度和时间，建立海洋哺乳动物保护区，开发低影响声纳技术。'
      },
      {
        title: '北大西洋露脊鲸通讯干扰',
        location: '北大西洋航道',
        summary: '繁忙的船舶交通产生的低频噪声严重干扰北大西洋露脊鲸的低频通讯，影响其觅食和繁殖行为。',
        impact: '种群数量持续下降，目前仅存约340头，被列为极度濒危物种。',
        solution: '实施船舶减速措施，改变航线避开鲸类栖息地，开发静音船舶技术。'
      }
    ],
    quiz: [
      {
        question: '海洋中声音传播速度约为：',
        options: ['340米/秒', '1500米/秒', '3000米/秒', '5000米/秒'],
        correctAnswer: 1,
        explanation: '声音在海水中的传播速度约为1500米/秒，比在空气中（340米/秒）快约4倍。'
      },
      {
        question: '以下哪种频率的声音在海洋中传播距离最远？',
        options: ['高频', '中频', '低频', '超声波'],
        correctAnswer: 2,
        explanation: '低频声音在海洋中衰减最小，传播距离最远，鲸类的低频叫声可传播数千公里。'
      },
      {
        question: '海洋噪声污染对鲸类的主要影响是：',
        options: ['视力下降', '通讯干扰', '游泳能力减弱', '食欲不振'],
        correctAnswer: 1,
        explanation: '噪声主要干扰鲸类的声学通讯，影响其导航、觅食、社交和繁殖行为。'
      }
    ]
  },

  'climate-acidification': {
    objectives: [
      '理解海洋酸化的化学机制',
      '掌握CO2与海洋碳循环的关系',
      '了解酸化对海洋生物的影响',
      '学习气候变化的海洋响应'
    ],
    chapters: [
      {
        title: '第一章：海洋碳循环',
        content: '海洋是地球最大的碳库，储存了约38000亿吨碳，是大气碳库的50倍。海洋通过物理泵（溶解和混合）和生物泵（光合作用和沉降）吸收大气CO2。工业革命以来，海洋已吸收约1600亿吨碳，相当于人为CO2排放的30%。这一过程减缓了全球变暖，但导致海洋酸化。',
        readingTime: '18分钟'
      },
      {
        title: '第二章：酸化化学过程',
        content: 'CO2溶解在海水中形成碳酸（H2CO3），进一步电离产生碳酸氢根离子（HCO3-）和氢离子（H+），氢离子的增加降低海水pH值。同时，氢离子与碳酸根离子（CO32-）结合，降低碳酸钙饱和度。自工业革命以来，海洋pH值已下降0.1个单位，相当于酸度增加30%。',
        readingTime: '16分钟'
      },
      {
        title: '第三章：钙化生物影响',
        content: '海洋酸化降低碳酸钙饱和度，影响珊瑚、贝类、海胆、翼足类等钙化生物的骨骼和外壳形成。钙化速率下降，骨骼变薄变脆。严重酸化时，现有的碳酸钙结构可能溶解。不同钙化生物的敏感性不同，文石比方解石更易受影响。',
        readingTime: '20分钟'
      },
      {
        title: '第四章：生态系统响应',
        content: '海洋酸化影响海洋食物链基础，改变浮游植物群落结构，影响鱼类的嗅觉、听觉和行为。珊瑚礁生态系统面临白化和结构崩塌的威胁。酸化与海洋变暖、缺氧等因素协同作用，加剧生态系统压力。预计到2100年，海洋pH值将再下降0.3-0.4个单位。',
        readingTime: '22分钟'
      }
    ],
    caseStudies: [
      {
        title: '大堡礁珊瑚白化危机',
        location: '澳大利亚大堡礁',
        summary: '气候变化导致海水温度升高和酸化，大堡礁发生史上最严重的珊瑚白化事件，2016-2017年连续两年大规模白化。',
        impact: '50%的珊瑚死亡，生物多样性急剧下降，渔业和旅游业损失超过60亿澳元。',
        solution: '减少碳排放，建立海洋保护区，开展珊瑚修复和移植项目，提高珊瑚抗逆性。'
      },
      {
        title: '北极海域酸化加速',
        location: '北极海域',
        summary: '北极海域由于冰川融化和冷水吸收更多CO2，酸化速度是全球平均水平的2倍，威胁当地海洋生态系统。',
        impact: '翼足类等钙化浮游生物外壳溶解，影响北极食物链基础和渔业资源。',
        solution: '国际合作减排，《巴黎协定》限制升温，加强北极海洋监测和保护。'
      }
    ],
    quiz: [
      {
        question: '自工业革命以来，海洋pH值下降了约：',
        options: ['0.05', '0.1', '0.2', '0.3'],
        correctAnswer: 1,
        explanation: '海洋pH值已下降约0.1个单位，相当于酸度增加了30%，这是过去3亿年来最快的酸化速度。'
      },
      {
        question: '海洋酸化主要影响哪类生物？',
        options: ['软体动物', '钙化生物', '哺乳动物', '藻类'],
        correctAnswer: 1,
        explanation: '海洋酸化主要影响珊瑚、贝类、海胆等钙化生物的骨骼和外壳形成。'
      },
      {
        question: '海洋吸收了人为CO2排放的约：',
        options: ['10%', '20%', '30%', '40%'],
        correctAnswer: 2,
        explanation: '海洋已吸收约30%的人为CO2排放，是重要的碳汇，但导致了海洋酸化问题。'
      }
    ]
  },

  'eutrophication': {
    objectives: [
      '理解富营养化的形成机制',
      '掌握营养物质循环过程',
      '了解富营养化的生态影响',
      '学习富营养化的防治策略'
    ],
    chapters: [
      {
        title: '第一章：营养物质来源',
        content: '海洋富营养化主要由氮、磷等营养物质过量输入引起。来源包括农业径流（化肥、畜禽粪便）、城市污水、工业排放、大气沉降（化石燃料燃烧）等。人类活动使全球氮循环增加了一倍，磷循环增加了3倍。中国长江每年向海洋输送氮素96万吨，磷素3万吨。',
        readingTime: '16分钟'
      },
      {
        title: '第二章：藻华爆发机制',
        content: '营养物质过量导致浮游植物大量繁殖，形成藻华。某些藻类（如甲藻、蓝藻）产生神经毒素、肝毒素等，形成有害藻华（HAB）。藻华死亡后细菌分解消耗大量氧气，形成缺氧或无氧区。温度升高、水体分层加剧藻华爆发。',
        readingTime: '18分钟'
      },
      {
        title: '第三章：生态系统影响',
        content: '富营养化改变海洋生态系统结构和功能。缺氧导致鱼类和底栖生物大量死亡，形成"死区"。生物多样性下降，优势种替代，食物链简化。渔业资源枯竭，水产养殖受损。有毒藻华威胁人类健康，造成经济损失。',
        readingTime: '20分钟'
      },
      {
        title: '第四章：防治与管理',
        content: '富营养化防治需要从源头控制营养物质输入。措施包括：农业面源污染控制（精准施肥、缓释肥料）、污水处理升级（脱氮除磷）、工业清洁生产、生态修复（人工湿地、海草床恢复）等。需要流域综合管理和国际合作。',
        readingTime: '19分钟'
      }
    ],
    caseStudies: [
      {
        title: '墨西哥湾死区',
        location: '墨西哥湾北部',
        summary: '密西西比河流域农业活动产生的氮磷营养物质进入墨西哥湾，形成世界第二大海洋死区，面积达2万平方公里。',
        impact: '渔业损失每年数十亿美元，虾类产量下降，生态系统服务功能丧失。',
        solution: '减少农业化肥使用，建设人工湿地拦截营养物质，实施流域综合管理。'
      },
      {
        title: '波罗的海富营养化',
        location: '波罗的海',
        summary: '周边9个国家的农业和工业发展导致波罗的海严重富营养化，成为世界上最大的缺氧海域之一。',
        impact: '鳕鱼等重要鱼类资源枯竭，海洋生物多样性下降60%，生态系统功能严重退化。',
        solution: 'HELCOM公约协调各国减排，实施波罗的海行动计划，投资1000亿欧元治理。'
      }
    ],
    quiz: [
      {
        question: '海洋富营养化的主要限制因子是：',
        options: ['碳', '氮和磷', '硅', '铁'],
        correctAnswer: 1,
        explanation: '氮和磷是海洋初级生产力的主要限制因子，过量输入导致富营养化和藻华爆发。'
      },
      {
        question: '有害藻华的主要危害是：',
        options: ['消耗氧气', '产生毒素', '阻挡阳光', '以上都是'],
        correctAnswer: 3,
        explanation: '有害藻华会产生神经毒素等有害物质、消耗水中氧气、阻挡阳光，对海洋生态系统造成多重危害。'
      },
      {
        question: '防治富营养化最有效的措施是：',
        options: ['增加捕捞', '源头控制', '人工增氧', '投放化学药剂'],
        correctAnswer: 1,
        explanation: '源头控制营养物质输入是防治富营养化最根本和有效的措施，需要控制农业、工业和生活污染源。'
      }
    ]
  }
}; 