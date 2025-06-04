import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  ExternalLink, 
  Building,
  Calendar,
  Download,
  BookOpen,
  Award,
  Globe,
  Video,
  FileText,
  Search,
  Link
} from 'lucide-react';
import ExternalLinks from '../components/ExternalLinks';

interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  specialization: string[];
  image: string;
  email: string;
  website?: string;
  bio: string;
}

interface Institution {
  id: string;
  name: string;
  type: 'university' | 'research' | 'ngo' | 'government';
  location: string;
  description: string;
  website: string;
  focus: string[];
}

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  duration: string;
  registered: number;
  capacity: number;
  registrationUrl?: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'report' | 'guide' | 'dataset' | 'toolkit';
  format: string;
  size: string;
  downloads: number;
  description: string;
  downloadUrl?: string;
}

const ExpertResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experts' | 'institutions' | 'webinars' | 'downloads' | 'links'>('experts');
  const [searchTerm, setSearchTerm] = useState('');

  // 处理外部链接点击
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 处理邮件链接
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // 处理下载
  const handleDownload = (resourceId: string, title: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource && resource.downloadUrl) {
      window.open(resource.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`抱歉，${title} 的下载链接暂时不可用。`);
    }
  };

  // 处理研讨会报名
  const handleWebinarRegistration = (webinarId: string, title: string) => {
    alert(`报名研讨会: ${title}\n\n实际应用中，这里会跳转到报名页面或打开报名表单。`);
  };

  const experts: Expert[] = [
    {
      id: '1',
      name: '王海洋博士',
      title: '海洋生态学首席研究员',
      organization: '中国科学院海洋研究所',
      specialization: ['海洋生态系统', '塑料污染', '生物多样性'],
      image: 'https://via.placeholder.com/150',
      email: 'wang.haiyang@qdio.ac.cn',
      website: 'http://www.qdio.ac.cn',
      bio: '专注于海洋塑料污染对生态系统影响的研究，发表论文120余篇'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      title: '海洋保护项目主任',
      organization: '世界自然基金会(WWF)',
      specialization: ['海洋保护政策', '可持续渔业', '珊瑚礁修复'],
      image: 'https://via.placeholder.com/150',
      email: 'sarah.johnson@wwf.org',
      website: 'https://www.worldwildlife.org',
      bio: '在海洋保护领域有15年经验，领导多个国际海洋保护项目'
    },
    {
      id: '3',
      name: '李明教授',
      title: '环境化学系主任',
      organization: '清华大学环境学院',
      specialization: ['海洋化学污染', '重金属检测', '污染治理技术'],
      image: 'https://via.placeholder.com/150',
      email: 'li.ming@tsinghua.edu.cn',
      website: 'https://www.tsinghua.edu.cn',
      bio: '环境化学领域权威专家，国家重点研发计划首席科学家'
    },
    {
      id: '4',
      name: 'Prof. Akiko Tanaka',
      title: '海洋生物学教授',
      organization: '东京大学海洋研究所',
      specialization: ['海洋生物保护', '微塑料影响', '生态毒理学'],
      image: 'https://via.placeholder.com/150',
      email: 'tanaka@aori.u-tokyo.ac.jp',
      website: 'https://www.aori.u-tokyo.ac.jp',
      bio: '研究微塑料对海洋生物影响的先驱，获得多项国际环保奖项'
    }
  ];

  const institutions: Institution[] = [
    {
      id: '1',
      name: '国家海洋环境监测中心',
      type: 'government',
      location: '中国·大连',
      description: '负责中国海洋环境监测、评价和保护工作的国家级机构',
      website: 'http://www.nmemc.org.cn',
      focus: ['海洋监测', '污染防治', '生态评估']
    },
    {
      id: '2',
      name: '海洋清理基金会',
      type: 'ngo',
      location: '荷兰·鹿特丹',
      description: '致力于开发先进技术清理海洋塑料垃圾的非营利组织',
      website: 'https://theoceancleanup.com',
      focus: ['技术创新', '塑料清理', '公众教育']
    },
    {
      id: '3',
      name: '斯克里普斯海洋研究所',
      type: 'research',
      location: '美国·加州',
      description: '世界顶尖的海洋科学研究机构之一',
      website: 'https://scripps.ucsd.edu',
      focus: ['气候变化', '海洋生物', '海洋地质']
    },
    {
      id: '4',
      name: '海洋大学国际联盟',
      type: 'university',
      location: '全球',
      description: '汇集全球顶尖海洋大学的学术联盟',
      website: 'https://www.wmu.se',
      focus: ['学术交流', '人才培养', '科研合作']
    },
    {
      id: '5',
      name: '联合国环境规划署',
      type: 'government',
      location: '肯尼亚·内罗毕',
      description: '联合国负责环境事务的专门机构',
      website: 'https://www.unep.org',
      focus: ['全球环境政策', '可持续发展', '环境监测']
    },
    {
      id: '6',
      name: '绿色和平组织',
      type: 'ngo',
      location: '全球',
      description: '国际环保组织，致力于保护地球环境和促进和平',
      website: 'https://www.greenpeace.org',
      focus: ['环境保护', '气候行动', '海洋保护']
    },
    {
      id: '7',
      name: '伍兹霍尔海洋研究所',
      type: 'research',
      location: '美国·马萨诸塞州',
      description: '世界领先的海洋科学研究机构',
      website: 'https://www.whoi.edu',
      focus: ['深海研究', '海洋技术', '气候科学']
    },
    {
      id: '8',
      name: '中国海洋大学',
      type: 'university',
      location: '中国·青岛',
      description: '中国海洋和水产学科特色显著的教育部直属重点综合性大学',
      website: 'http://www.ouc.edu.cn',
      focus: ['海洋科学', '水产养殖', '海洋工程']
    }
  ];

  const webinars: Webinar[] = [
    {
      id: '1',
      title: '2024年全球海洋塑料污染治理峰会',
      date: '2024-12-15',
      time: '09:00 GMT+8',
      speaker: 'UNEP海洋塑料专家组',
      duration: '180分钟',
      registered: 1245,
      capacity: 2000,
      registrationUrl: 'https://www.unep.org/events/conference/global-plastics-treaty-negotiations'
    },
    {
      id: '2',
      title: 'COP29海洋与气候变化专题研讨会',
      date: '2024-11-20',
      time: '14:00 GMT+4',
      speaker: 'IPCC海洋专家委员会',
      duration: '240分钟',
      registered: 2156,
      capacity: 3000,
      registrationUrl: 'https://cop29.az/en/events/ocean-climate-nexus'
    },
    {
      id: '3',
      title: '第三届国际海洋垃圾监测技术大会',
      date: '2024-10-28',
      time: '10:00 GMT+1',
      speaker: 'NOAA海洋垃圾项目组',
      duration: '360分钟',
      registered: 856,
      capacity: 1200,
      registrationUrl: 'https://marinedebris.noaa.gov/conference-2024'
    },
    {
      id: '4',
      title: 'WHO海洋污染与公共健康国际论坛',
      date: '2024-11-05',
      time: '15:00 GMT+1',
      speaker: 'WHO环境健康专家组',
      duration: '150分钟',
      registered: 967,
      capacity: 1500,
      registrationUrl: 'https://www.who.int/news-room/events/detail/2024/11/05/marine-pollution-health-forum'
    },
    {
      id: '5',
      title: '联合国海洋科学十年中期评估会议',
      date: '2024-12-08',
      time: '16:00 GMT+1',
      speaker: 'UNESCO-IOC海洋科学部',
      duration: '120分钟',
      registered: 1534,
      capacity: 2500,
      registrationUrl: 'https://oceandecade.org/events/mid-term-conference/'
    },
    {
      id: '6',
      title: 'IMO船舶污染防治新规研讨会',
      date: '2024-10-15',
      time: '11:00 GMT+0',
      speaker: 'IMO海洋环境保护委员会',
      duration: '180分钟',
      registered: 743,
      capacity: 1000,
      registrationUrl: 'https://www.imo.org/en/MediaCentre/MeetingSummaries/Pages/MEPC-82.aspx'
    },
    {
      id: '7',
      title: '亚太海洋保护区网络年会',
      date: '2024-11-12',
      time: '09:00 GMT+9',
      speaker: '亚太海洋保护区网络',
      duration: '480分钟',
      registered: 456,
      capacity: 800,
      registrationUrl: 'https://www.mpan.asia/annual-conference-2024'
    },
    {
      id: '8',
      title: '欧盟海洋战略框架指令实施进展报告会',
      date: '2024-10-22',
      time: '14:00 GMT+2',
      speaker: '欧盟环境总司',
      duration: '90分钟',
      registered: 623,
      capacity: 1000,
      registrationUrl: 'https://ec.europa.eu/environment/marine/eu-coast-and-marine-policy/marine-strategy-framework-directive/'
    },
    {
      id: '9',
      title: '北极海洋环境保护国际会议',
      date: '2024-11-18',
      time: '12:00 GMT-5',
      speaker: '北极理事会环境工作组',
      duration: '300分钟',
      registered: 387,
      capacity: 600,
      registrationUrl: 'https://arctic-council.org/en/events/arctic-marine-environment-conference'
    },
    {
      id: '10',
      title: '深海采矿环境影响评估研讨会',
      date: '2024-12-03',
      time: '10:00 GMT-5',
      speaker: '国际海底管理局',
      duration: '240分钟',
      registered: 512,
      capacity: 800,
      registrationUrl: 'https://www.isa.org.jm/news/deep-sea-mining-environmental-impact-workshop'
    },
    {
      id: '11',
      title: '地中海海洋保护行动计划更新会议',
      date: '2024-10-30',
      time: '15:00 GMT+2',
      speaker: 'UNEP/MAP地中海行动计划',
      duration: '180分钟',
      registered: 298,
      capacity: 500,
      registrationUrl: 'https://www.unep.org/unepmap/news/mediterranean-action-plan-update-2024'
    },
    {
      id: '12',
      title: '全球珊瑚礁监测网络年度报告发布会',
      date: '2024-11-25',
      time: '08:00 GMT+10',
      speaker: 'GCRMN全球珊瑚礁监测网络',
      duration: '120分钟',
      registered: 789,
      capacity: 1200,
      registrationUrl: 'https://www.gcrmn.net/2024-annual-report-launch'
    },
    {
      id: '13',
      title: '海洋酸化监测与适应策略国际研讨会',
      date: '2024-12-10',
      time: '13:00 GMT-8',
      speaker: 'NOAA海洋酸化项目',
      duration: '150分钟',
      registered: 634,
      capacity: 1000,
      registrationUrl: 'https://oceanacidification.noaa.gov/workshop-2024'
    },
    {
      id: '14',
      title: '小岛屿发展中国家海洋韧性建设会议',
      date: '2024-11-08',
      time: '11:00 GMT-4',
      speaker: 'SIDS DOCK可持续能源项目',
      duration: '360分钟',
      registered: 234,
      capacity: 400,
      registrationUrl: 'https://sidsdock.org/marine-resilience-conference-2024'
    },
    {
      id: '15',
      title: '海洋生物多样性保护新技术展示会',
      date: '2024-12-12',
      time: '16:00 GMT+1',
      speaker: 'CBD海洋生物多样性工作组',
      duration: '180分钟',
      registered: 445,
      capacity: 700,
      registrationUrl: 'https://www.cbd.int/marine/technology-showcase-2024'
    }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'UNEP海洋塑料污染报告2023',
      type: 'report',
      format: 'PDF',
      size: '8.2 MB',
      downloads: 2156,
      description: '联合国环境规划署发布的全球海洋塑料污染现状报告',
      downloadUrl: 'https://www.unep.org/resources/report/turning-tide-how-tackle-plastic-pollution'
    },
    {
      id: '2',
      title: 'NOAA海洋垃圾监测指南',
      type: 'guide',
      format: 'PDF',
      size: '12.4 MB',
      downloads: 1834,
      description: 'NOAA发布的海洋垃圾监测和评估标准指南',
      downloadUrl: 'https://marinedebris.noaa.gov/sites/default/files/publications-files/NOAA_Marine_Debris_Monitoring_Toolkit.pdf'
    },
    {
      id: '3',
      title: 'WHO海洋污染与健康报告',
      type: 'report',
      format: 'PDF',
      size: '6.8 MB',
      downloads: 1567,
      description: '世界卫生组织关于海洋污染对人类健康影响的综合报告',
      downloadUrl: 'https://www.who.int/publications/i/item/9789240045064'
    },
    {
      id: '4',
      title: 'FAO全球渔业状况报告2024',
      type: 'report',
      format: 'PDF',
      size: '15.6 MB',
      downloads: 2341,
      description: '联合国粮农组织发布的全球渔业和水产养殖状况报告',
      downloadUrl: 'https://www.fao.org/3/cc0461en/cc0461en.pdf'
    },
    {
      id: '5',
      title: 'IPCC海洋与冰冻圈特别报告',
      type: 'report',
      format: 'PDF',
      size: '28.3 MB',
      downloads: 3245,
      description: 'IPCC关于气候变化中的海洋和冰冻圈特别报告',
      downloadUrl: 'https://www.ipcc.ch/site/assets/uploads/sites/3/2019/12/SROCC_FullReport_FINAL.pdf'
    },
    {
      id: '6',
      title: 'UNESCO海洋科学十年实施计划',
      type: 'guide',
      format: 'PDF',
      size: '9.7 MB',
      downloads: 1456,
      description: 'UNESCO海洋科学促进可持续发展十年实施计划',
      downloadUrl: 'https://unesdoc.unesco.org/ark:/48223/pf0000375147'
    },
    {
      id: '7',
      title: 'IMO船舶污染防治公约MARPOL',
      type: 'guide',
      format: 'PDF',
      size: '18.2 MB',
      downloads: 2789,
      description: '国际海事组织船舶污染防治国际公约完整文本',
      downloadUrl: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
    },
    {
      id: '8',
      title: 'GESAMP海洋污染评估报告',
      type: 'report',
      format: 'PDF',
      size: '11.4 MB',
      downloads: 1678,
      description: '海洋环境保护科学专家组关于海洋污染状况的评估',
      downloadUrl: 'https://www.gesamp.org/publications/reports-and-studies-no-103'
    },
    {
      id: '9',
      title: 'OECD海洋塑料经济学报告',
      type: 'report',
      format: 'PDF',
      size: '7.9 MB',
      downloads: 1923,
      description: 'OECD关于海洋塑料污染经济影响和解决方案的分析',
      downloadUrl: 'https://www.oecd.org/environment/plastics-in-the-ocean-9789264235014-en.htm'
    },
    {
      id: '10',
      title: 'WWF海洋保护区管理指南',
      type: 'guide',
      format: 'PDF',
      size: '13.7 MB',
      downloads: 1345,
      description: '世界自然基金会海洋保护区建立和管理最佳实践指南',
      downloadUrl: 'https://www.worldwildlife.org/publications/marine-protected-areas-management-guide'
    },
    {
      id: '11',
      title: 'IAEA海洋放射性监测手册',
      type: 'toolkit',
      format: 'PDF',
      size: '22.1 MB',
      downloads: 987,
      description: '国际原子能机构海洋环境放射性监测技术手册',
      downloadUrl: 'https://www.iaea.org/publications/14895/handbook-of-nuclear-chemistry'
    },
    {
      id: '12',
      title: 'UNEP全球海洋垃圾评估',
      type: 'report',
      format: 'PDF',
      size: '16.8 MB',
      downloads: 2567,
      description: '联合国环境规划署全球海洋垃圾状况综合评估报告',
      downloadUrl: 'https://www.unep.org/resources/report/marine-litter-global-challenge'
    },
    {
      id: '13',
      title: 'NOAA珊瑚礁保护行动计划',
      type: 'guide',
      format: 'PDF',
      size: '8.5 MB',
      downloads: 1234,
      description: 'NOAA珊瑚礁生态系统保护和恢复行动计划',
      downloadUrl: 'https://coralreef.noaa.gov/aboutcrcp/strategy/reprioritization/welcome.html'
    },
    {
      id: '14',
      title: 'CBD海洋生物多样性目标',
      type: 'report',
      format: 'PDF',
      size: '5.3 MB',
      downloads: 1789,
      description: '生物多样性公约海洋和沿海生物多样性保护目标',
      downloadUrl: 'https://www.cbd.int/doc/publications/cbd-ts-91-en.pdf'
    },
    {
      id: '15',
      title: 'OSPAR海洋环境质量状况报告',
      type: 'report',
      format: 'PDF',
      size: '19.6 MB',
      downloads: 1456,
      description: 'OSPAR委员会东北大西洋海洋环境质量状况评估',
      downloadUrl: 'https://www.ospar.org/work-areas/cross-cutting-issues/climate-change'
    },
    {
      id: '16',
      title: 'HELCOM波罗的海行动计划',
      type: 'guide',
      format: 'PDF',
      size: '14.2 MB',
      downloads: 876,
      description: 'HELCOM波罗的海环境保护行动计划2021更新版',
      downloadUrl: 'https://helcom.fi/baltic-sea-action-plan/'
    },
    {
      id: '17',
      title: 'UNEP海洋酸化影响评估',
      type: 'report',
      format: 'PDF',
      size: '10.7 MB',
      downloads: 1678,
      description: '联合国环境规划署海洋酸化对生态系统影响评估报告',
      downloadUrl: 'https://www.unep.org/resources/report/ocean-acidification'
    },
    {
      id: '18',
      title: 'IOC海洋观测系统指南',
      type: 'toolkit',
      format: 'PDF',
      size: '25.4 MB',
      downloads: 1123,
      description: 'UNESCO政府间海洋学委员会全球海洋观测系统指南',
      downloadUrl: 'https://www.ioc-unesco.org/our-work/programmes/global-ocean-observing-system'
    },
    {
      id: '19',
      title: 'CITES海洋物种贸易管制指南',
      type: 'guide',
      format: 'PDF',
      size: '7.8 MB',
      downloads: 945,
      description: 'CITES濒危野生动植物种国际贸易公约海洋物种管制指南',
      downloadUrl: 'https://cites.org/eng/resources/pub/index.php'
    },
    {
      id: '20',
      title: 'PAME北极海洋环境保护战略',
      type: 'report',
      format: 'PDF',
      size: '12.9 MB',
      downloads: 734,
      description: '北极理事会海洋环境保护工作组北极海洋保护战略',
      downloadUrl: 'https://www.pame.is/projects/arctic-marine-strategic-plan'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'university': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      case 'ngo': return 'bg-green-100 text-green-800';
      case 'government': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'report': return <FileText className="h-8 w-8" />;
      case 'guide': return <BookOpen className="h-8 w-8" />;
      case 'dataset': return <Globe className="h-8 w-8" />;
      case 'toolkit': return <Award className="h-8 w-8" />;
      default: return <FileText className="h-8 w-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-pink-gradient rounded-full shadow-lg">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            专家资源连接
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            连接全球海洋保护专家和研究机构，获取专业知识和支持
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="ocean-card p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索专家、机构或资源..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('experts')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'experts'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              专家团队
            </button>
            <button
              onClick={() => setActiveTab('institutions')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'institutions'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              研究机构
            </button>
            <button
              onClick={() => setActiveTab('webinars')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'webinars'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              在线研讨
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'downloads'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              资源下载
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'links'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              外部链接
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        {activeTab === 'experts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {experts
              .filter(expert => 
                searchTerm === '' || 
                expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expert.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((expert, index) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="ocean-card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{expert.title}</p>
                      <p className="text-sm text-ocean-600 mb-3">{expert.organization}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {expert.specialization.map((spec) => (
                          <span key={spec} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>
                      
                      <div className="flex space-x-2">
                        <button className="ocean-button text-sm px-3 py-1 flex items-center" onClick={() => handleEmailClick(expert.email)}>
                          <Mail className="h-4 w-4 mr-1" />
                          联系
                        </button>
                        {expert.website && (
                          <button className="ocean-button-secondary text-sm px-3 py-1 flex items-center" onClick={() => handleExternalLink(expert.website!)}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            主页
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        {activeTab === 'institutions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {institutions
              .filter(inst => 
                searchTerm === '' || 
                inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inst.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((institution, index) => (
                <motion.div
                  key={institution.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="ocean-card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Building className="h-8 w-8 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{institution.name}</h3>
                        <p className="text-sm text-gray-600">{institution.location}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(institution.type)}`}>
                      {institution.type === 'university' && '大学'}
                      {institution.type === 'research' && '研究所'}
                      {institution.type === 'ngo' && 'NGO'}
                      {institution.type === 'government' && '政府机构'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{institution.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {institution.focus.map((focus) => (
                      <span key={focus} className="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded">
                        {focus}
                      </span>
                    ))}
                  </div>
                  
                  <button className="ocean-button text-sm px-4 py-2 w-full flex items-center justify-center" onClick={() => handleExternalLink(institution.website)}>
                    <Globe className="h-4 w-4 mr-2" />
                    访问网站
                  </button>
                </motion.div>
              ))}
          </motion.div>
        )}

        {activeTab === 'webinars' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {webinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="ocean-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Video className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{webinar.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">日期</p>
                        <p className="font-semibold text-gray-900">{webinar.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">时间</p>
                        <p className="font-semibold text-gray-900">{webinar.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">主讲人</p>
                        <p className="font-semibold text-gray-900">{webinar.speaker}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">时长</p>
                        <p className="font-semibold text-gray-900">{webinar.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          已报名 {webinar.registered}/{webinar.capacity}
                        </span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-ocean-500 h-2 rounded-full"
                            style={{ width: `${(webinar.registered / webinar.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <button className="ocean-button text-sm px-4 py-2 flex items-center" onClick={() => handleWebinarRegistration(webinar.id, webinar.title)}>
                        <Calendar className="h-4 w-4 mr-1" />
                        立即报名
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'downloads' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="ocean-card p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    resource.type === 'report' ? 'bg-blue-100 text-blue-600' :
                    resource.type === 'guide' ? 'bg-green-100 text-green-600' :
                    resource.type === 'dataset' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{resource.format} • {resource.size}</span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {resource.downloads} 次下载
                      </span>
                    </div>
                    
                    <button className="ocean-button text-sm px-4 py-2 w-full flex items-center justify-center" onClick={() => handleDownload(resource.id, resource.title)}>
                      <Download className="h-4 w-4 mr-2" />
                      下载资源
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'links' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ExternalLinks />
          </motion.div>
        )}

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 ocean-card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">平台影响力</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-ocean-600 mb-2">50+</div>
              <div className="text-gray-600">专家入驻</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-gray-600">合作机构</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">在线研讨会</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
              <div className="text-gray-600">资源下载</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertResources; 