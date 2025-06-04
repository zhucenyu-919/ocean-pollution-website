export interface MarinePollutionEvent {
  id: number;
  name: string;
  nameEn: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  date: string;
  type: 'oil_spill' | 'nuclear' | 'chemical' | 'plastic' | 'industrial' | 'mining';
  severity: 'low' | 'medium' | 'high' | 'catastrophic';
  description: string;
  descriptionEn: string;
  impact: string;
  impactEn: string;
  area: string; // 影响面积
  casualties?: number;
  economicLoss?: string;
  duration: string;
  status: 'ongoing' | 'resolved' | 'partially_resolved';
  sources: string[];
}

export const globalMarinePollutionEvents: MarinePollutionEvent[] = [
  {
    id: 1,
    name: "福岛核事故海洋污染",
    nameEn: "Fukushima Nuclear Disaster Marine Pollution",
    location: "日本福岛",
    coordinates: [141.03250, 37.42139],
    date: "2011-03-11",
    type: "nuclear",
    severity: "catastrophic",
    description: "福岛第一核电站事故导致大量放射性物质泄漏到太平洋，包括铯-137、锶-90和氚等放射性核素。",
    descriptionEn: "The Fukushima Daiichi nuclear disaster released massive amounts of radioactive materials into the Pacific Ocean, including cesium-137, strontium-90, and tritium.",
    impact: "超过100万吨处理水将在30年内排放到太平洋，影响海洋生态系统和渔业",
    impactEn: "Over 1 million tons of treated water to be released into Pacific over 30 years, affecting marine ecosystems and fisheries",
    area: "太平洋西北部大面积海域",
    casualties: 1,
    economicLoss: "超过2000亿美元",
    duration: "2011年至今（持续中）",
    status: "ongoing",
    sources: ["IAEA", "TEPCO", "日本环境省"]
  },
  {
    id: 2,
    name: "深水地平线石油泄漏",
    nameEn: "Deepwater Horizon Oil Spill",
    location: "美国墨西哥湾",
    coordinates: [-88.365, 28.738],
    date: "2010-04-20",
    type: "oil_spill",
    severity: "catastrophic",
    description: "深水地平线钻井平台爆炸导致墨西哥湾历史上最严重的石油泄漏事故，持续87天。",
    descriptionEn: "The Deepwater Horizon drilling rig explosion caused the largest oil spill in Gulf of Mexico history, lasting 87 days.",
    impact: "约490万桶原油泄漏，污染1,773公里海岸线，造成大量海洋生物死亡",
    impactEn: "Approximately 4.9 million barrels of oil spilled, contaminating 1,773 km of coastline and causing massive marine life deaths",
    area: "180,000平方公里",
    casualties: 11,
    economicLoss: "超过650亿美元",
    duration: "87天",
    status: "resolved",
    sources: ["美国海岸警卫队", "EPA", "NOAA"]
  },
  {
    id: 3,
    name: "埃克森·瓦尔迪兹号石油泄漏",
    nameEn: "Exxon Valdez Oil Spill",
    location: "美国阿拉斯加威廉王子湾",
    coordinates: [-146.8583, 60.8389],
    date: "1989-03-24",
    type: "oil_spill",
    severity: "high",
    description: "埃克森·瓦尔迪兹号油轮在阿拉斯加海域触礁，造成美国历史上最严重的环境灾难之一。",
    descriptionEn: "The Exxon Valdez oil tanker ran aground in Alaska waters, causing one of the worst environmental disasters in US history.",
    impact: "约26万桶原油泄漏，污染2,100公里海岸线，25万只海鸟死亡",
    impactEn: "About 260,000 barrels of oil spilled, contaminating 2,100 km of coastline, killing 250,000 seabirds",
    area: "28,000平方公里",
    casualties: 0,
    economicLoss: "超过70亿美元",
    duration: "数月清理",
    status: "resolved",
    sources: ["阿拉斯加环保部", "NOAA", "埃克森美孚"]
  },
  {
    id: 4,
    name: "太平洋垃圾带",
    nameEn: "Great Pacific Garbage Patch",
    location: "北太平洋环流",
    coordinates: [-140.0, 35.0],
    date: "1950-01-01",
    type: "plastic",
    severity: "catastrophic",
    description: "世界上最大的海洋塑料垃圾聚集区，面积相当于三个法国的大小。",
    descriptionEn: "The world's largest collection of marine plastic debris, with an area equivalent to three times the size of France.",
    impact: "至少8万吨塑料垃圾，影响海洋食物链，威胁海洋生物生存",
    impactEn: "At least 80,000 tons of plastic waste, affecting marine food chains and threatening marine life",
    area: "160万平方公里",
    casualties: 0,
    economicLoss: "数十亿美元生态损失",
    duration: "持续累积中",
    status: "ongoing",
    sources: ["海洋清理基金会", "NOAA", "联合国环境规划署"]
  },
  {
    id: 5,
    name: "威望号石油泄漏",
    nameEn: "Prestige Oil Spill",
    location: "西班牙加利西亚海岸",
    coordinates: [-9.1833, 42.6],
    date: "2002-11-13",
    type: "oil_spill",
    severity: "high",
    description: "威望号油轮在西班牙海岸沉没，造成欧洲历史上最严重的环境灾难之一。",
    descriptionEn: "The Prestige oil tanker sank off the Spanish coast, causing one of Europe's worst environmental disasters.",
    impact: "6.3万吨重油泄漏，污染2,900公里海岸线，严重影响渔业和旅游业",
    impactEn: "63,000 tons of heavy fuel oil spilled, contaminating 2,900 km of coastline, severely affecting fisheries and tourism",
    area: "230,000平方公里",
    casualties: 0,
    economicLoss: "超过120亿欧元",
    duration: "数年清理",
    status: "resolved",
    sources: ["西班牙环境部", "欧盟", "国际海事组织"]
  },
  {
    id: 6,
    name: "切尔诺贝利核事故海洋影响",
    nameEn: "Chernobyl Nuclear Accident Marine Impact",
    location: "黑海和波罗的海",
    coordinates: [30.0975, 51.3890],
    date: "1986-04-26",
    type: "nuclear",
    severity: "high",
    description: "切尔诺贝利核事故的放射性物质通过河流系统进入黑海和波罗的海。",
    descriptionEn: "Radioactive materials from the Chernobyl nuclear accident entered the Black Sea and Baltic Sea through river systems.",
    impact: "放射性铯和锶污染海洋环境，影响鱼类和海洋生物",
    impactEn: "Radioactive cesium and strontium contaminated marine environments, affecting fish and marine life",
    area: "黑海和波罗的海部分区域",
    casualties: 0,
    economicLoss: "数十亿美元",
    duration: "长期影响",
    status: "partially_resolved",
    sources: ["IAEA", "乌克兰环境部", "俄罗斯科学院"]
  },
  {
    id: 7,
    name: "博帕尔化学泄漏海洋影响",
    nameEn: "Bhopal Chemical Leak Marine Impact",
    location: "印度阿拉伯海",
    coordinates: [72.8777, 19.0760],
    date: "1984-12-03",
    type: "chemical",
    severity: "medium",
    description: "博帕尔化学工厂泄漏的有毒化学物质通过河流系统最终流入阿拉伯海。",
    descriptionEn: "Toxic chemicals from the Bhopal chemical plant leak eventually reached the Arabian Sea through river systems.",
    impact: "化学污染物影响沿海海洋生态系统",
    impactEn: "Chemical pollutants affected coastal marine ecosystems",
    area: "印度西海岸部分区域",
    casualties: 0,
    economicLoss: "数亿美元",
    duration: "长期影响",
    status: "partially_resolved",
    sources: ["印度环境部", "联合国环境规划署"]
  },
  {
    id: 8,
    name: "阿拉斯加科迪亚克岛石油泄漏",
    nameEn: "Selendang Ayu Oil Spill",
    location: "美国阿拉斯加科迪亚克岛",
    coordinates: [-153.2167, 57.7903],
    date: "2004-12-08",
    type: "oil_spill",
    severity: "medium",
    description: "塞伦当阿尤号货轮在阿拉斯加海域搁浅，造成石油泄漏。",
    descriptionEn: "The Selendang Ayu freighter ran aground in Alaska waters, causing an oil spill.",
    impact: "约1,400吨燃油泄漏，影响当地海洋生态系统",
    impactEn: "About 1,400 tons of fuel oil spilled, affecting local marine ecosystems",
    area: "科迪亚克岛周边海域",
    casualties: 6,
    economicLoss: "数千万美元",
    duration: "数月清理",
    status: "resolved",
    sources: ["美国海岸警卫队", "阿拉斯加环保部"]
  },
  {
    id: 9,
    name: "地中海塑料污染",
    nameEn: "Mediterranean Plastic Pollution",
    location: "地中海",
    coordinates: [15.0, 35.0],
    date: "1970-01-01",
    type: "plastic",
    severity: "high",
    description: "地中海是世界上塑料污染最严重的海域之一，每年有超过50万吨塑料垃圾进入。",
    descriptionEn: "The Mediterranean Sea is one of the most plastic-polluted seas in the world, with over 500,000 tons of plastic waste entering annually.",
    impact: "严重威胁海洋生物多样性，影响渔业和旅游业",
    impactEn: "Severely threatens marine biodiversity, affecting fisheries and tourism",
    area: "整个地中海",
    casualties: 0,
    economicLoss: "数十亿欧元",
    duration: "持续累积中",
    status: "ongoing",
    sources: ["联合国环境规划署", "欧盟", "地中海行动计划"]
  },
  {
    id: 10,
    name: "印度尼西亚蒙塔拉石油泄漏",
    nameEn: "Montara Oil Spill",
    location: "澳大利亚帝汶海",
    coordinates: [124.7, -10.9],
    date: "2009-08-21",
    type: "oil_spill",
    severity: "medium",
    description: "蒙塔拉海上钻井平台发生井喷，造成持续74天的石油泄漏。",
    descriptionEn: "The Montara offshore drilling platform experienced a blowout, causing a 74-day oil spill.",
    impact: "约4,000吨原油泄漏，影响帝汶海海洋环境",
    impactEn: "About 4,000 tons of crude oil spilled, affecting the Timor Sea marine environment",
    area: "90,000平方公里",
    casualties: 0,
    economicLoss: "数亿美元",
    duration: "74天",
    status: "resolved",
    sources: ["澳大利亚海事安全局", "印度尼西亚环境部"]
  },
  {
    id: 11,
    name: "中国渤海溢油事故",
    nameEn: "Bohai Bay Oil Spill",
    location: "中国渤海",
    coordinates: [119.8, 38.5],
    date: "2011-06-04",
    type: "oil_spill",
    severity: "medium",
    description: "康菲石油公司在渤海的钻井平台发生溢油事故，造成海洋环境污染。",
    descriptionEn: "ConocoPhillips drilling platform in Bohai Bay experienced an oil spill, causing marine environmental pollution.",
    impact: "约3,200平方公里海域受到污染，影响渔业和海洋生态",
    impactEn: "About 3,200 square kilometers of sea area contaminated, affecting fisheries and marine ecology",
    area: "3,200平方公里",
    casualties: 0,
    economicLoss: "数十亿人民币",
    duration: "数月清理",
    status: "resolved",
    sources: ["中国海洋局", "环保部", "康菲石油"]
  },
  {
    id: 12,
    name: "巴西石油平台P-36沉没",
    nameEn: "P-36 Oil Platform Sinking",
    location: "巴西坎波斯盆地",
    coordinates: [-39.8, -22.0],
    date: "2001-03-20",
    type: "oil_spill",
    severity: "medium",
    description: "巴西国家石油公司的P-36石油平台发生爆炸并沉没，造成石油泄漏。",
    descriptionEn: "Petrobras P-36 oil platform exploded and sank, causing an oil spill.",
    impact: "约1,200吨原油泄漏，11人死亡",
    impactEn: "About 1,200 tons of crude oil spilled, 11 people died",
    area: "坎波斯盆地海域",
    casualties: 11,
    economicLoss: "超过5亿美元",
    duration: "数周清理",
    status: "resolved",
    sources: ["巴西国家石油公司", "巴西环境部"]
  }
];

export const pollutionTypeColors = {
  oil_spill: '#8B4513',
  nuclear: '#FF4500',
  chemical: '#9932CC',
  plastic: '#FF69B4',
  industrial: '#696969',
  mining: '#A0522D'
};

export const severityColors = {
  low: '#90EE90',
  medium: '#FFD700',
  high: '#FF6347',
  catastrophic: '#DC143C'
};

export const pollutionTypeLabels = {
  oil_spill: '石油泄漏',
  nuclear: '核污染',
  chemical: '化学污染',
  plastic: '塑料污染',
  industrial: '工业污染',
  mining: '采矿污染'
};

export const severityLabels = {
  low: '轻微',
  medium: '中等',
  high: '严重',
  catastrophic: '灾难性'
}; 