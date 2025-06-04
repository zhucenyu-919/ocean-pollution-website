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

interface OnlineCommunity {
  id: string;
  name: string;
  type: 'forum' | 'chat' | 'social' | 'discord' | 'telegram' | 'reddit';
  platform: string;
  description: string;
  members: number;
  language: string;
  activity: 'high' | 'medium' | 'low';
  joinUrl: string;
  topics: string[];
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
  const [activeTab, setActiveTab] = useState<'experts' | 'institutions' | 'communities' | 'downloads' | 'links'>('experts');
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

  // 处理社区加入
  const handleCommunityJoin = (communityId: string, name: string, joinUrl: string) => {
    window.open(joinUrl, '_blank', 'noopener,noreferrer');
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

  const communities: OnlineCommunity[] = [
    {
      id: '1',
      name: 'Ocean Conservation Reddit',
      type: 'reddit',
      platform: 'Reddit',
      description: '全球最大的海洋保护讨论社区，汇集科学家、环保人士和关心海洋的公众',
      members: 245000,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://www.reddit.com/r/OceanConservation/',
      topics: ['海洋保护', '塑料污染', '气候变化', '海洋生物', '政策讨论']
    },
    {
      id: '2',
      name: 'Marine Pollution Discord',
      type: 'discord',
      platform: 'Discord',
      description: '专注于海洋污染研究和防治的实时聊天社区，支持语音讨论和文件分享',
      members: 12500,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://discord.gg/marinepollution',
      topics: ['污染监测', '研究分享', '技术讨论', '数据分析', '学术交流']
    },
    {
      id: '3',
      name: '海洋环保微信群',
      type: 'chat',
      platform: '微信',
      description: '中文海洋环保爱好者交流群，分享最新资讯和环保行动',
      members: 8900,
      language: '中文',
      activity: 'medium',
      joinUrl: 'https://mp.weixin.qq.com/s/ocean-protection-wechat-group',
      topics: ['环保行动', '科普教育', '政策解读', '志愿活动', '经验分享']
    },
    {
      id: '4',
      name: 'Ocean Science Telegram',
      type: 'telegram',
      platform: 'Telegram',
      description: '海洋科学研究者和学生的交流频道，分享最新研究成果和学术资源',
      members: 18700,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://t.me/oceanscience',
      topics: ['学术论文', '研究方法', '数据共享', '会议信息', '职业发展']
    },
    {
      id: '5',
      name: 'Marine Biology Facebook Group',
      type: 'social',
      platform: 'Facebook',
      description: '海洋生物学爱好者和专业人士的大型社交群组',
      members: 156000,
      language: '英文',
      activity: 'medium',
      joinUrl: 'https://www.facebook.com/groups/marinebiology',
      topics: ['海洋生物', '生态保护', '摄影分享', '教育资源', '职业机会']
    },
    {
      id: '6',
      name: 'Ocean Cleanup Forum',
      type: 'forum',
      platform: '专业论坛',
      description: '专注于海洋清理技术和项目的专业论坛',
      members: 34500,
      language: '多语言',
      activity: 'medium',
      joinUrl: 'https://forum.oceancleanup.org',
      topics: ['清理技术', '项目进展', '志愿参与', '资金筹集', '技术创新']
    },
    {
      id: '7',
      name: 'Plastic Pollution Slack',
      type: 'chat',
      platform: 'Slack',
      description: '塑料污染研究和防治专业人士的工作交流空间',
      members: 5600,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://plasticpollution.slack.com',
      topics: ['政策制定', '企业合作', '技术解决方案', '研究合作', '资金申请']
    },
    {
      id: '8',
      name: '海洋科学QQ群',
      type: 'chat',
      platform: 'QQ',
      description: '中国海洋科学研究生和学者的学术交流群',
      members: 2800,
      language: '中文',
      activity: 'medium',
      joinUrl: 'https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&inviteCode=oceanscience',
      topics: ['学术讨论', '论文分享', '实验技术', '就业信息', '导师推荐']
    },
    {
      id: '9',
      name: 'Climate Ocean WhatsApp',
      type: 'chat',
      platform: 'WhatsApp',
      description: '关注海洋气候变化的国际研究者交流群',
      members: 1200,
      language: '英文',
      activity: 'low',
      joinUrl: 'https://chat.whatsapp.com/climateocean',
      topics: ['气候变化', '海洋酸化', '海平面上升', '极地研究', '模型预测']
    },
    {
      id: '10',
      name: 'Marine Conservation LinkedIn',
      type: 'social',
      platform: 'LinkedIn',
      description: '海洋保护专业人士的职业网络群组',
      members: 89000,
      language: '英文',
      activity: 'medium',
      joinUrl: 'https://www.linkedin.com/groups/marine-conservation',
      topics: ['职业发展', '项目合作', '资金机会', '政策倡导', '行业动态']
    },
    {
      id: '11',
      name: 'Ocean Acidification Research',
      type: 'forum',
      platform: '学术论坛',
      description: '海洋酸化研究的专业学术讨论平台',
      members: 7800,
      language: '英文',
      activity: 'medium',
      joinUrl: 'https://oceanacidification.org/forum',
      topics: ['酸化机制', '生态影响', '监测技术', '缓解策略', '政策建议']
    },
    {
      id: '12',
      name: 'Deep Sea Mining Watch',
      type: 'telegram',
      platform: 'Telegram',
      description: '关注深海采矿环境影响的监督和讨论频道',
      members: 15600,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://t.me/deepseaminingwatch',
      topics: ['环境监督', '政策分析', '科学研究', '公众参与', '法律框架']
    },
    {
      id: '13',
      name: '珊瑚礁保护微博群',
      type: 'social',
      platform: '微博',
      description: '中文珊瑚礁保护爱好者和专家的交流平台',
      members: 23400,
      language: '中文',
      activity: 'medium',
      joinUrl: 'https://weibo.com/groups/coralreef',
      topics: ['珊瑚保护', '潜水观察', '科普教育', '保护行动', '摄影分享']
    },
    {
      id: '14',
      name: 'Microplastics Research Network',
      type: 'discord',
      platform: 'Discord',
      description: '微塑料研究者的专业交流和合作网络',
      members: 4500,
      language: '英文',
      activity: 'high',
      joinUrl: 'https://discord.gg/microplastics',
      topics: ['检测方法', '样本分析', '数据共享', '标准制定', '健康影响']
    },
    {
      id: '15',
      name: 'Sustainable Fisheries Forum',
      type: 'forum',
      platform: '专业论坛',
      description: '可持续渔业和海洋资源管理的专业讨论平台',
      members: 19200,
      language: '多语言',
      activity: 'medium',
      joinUrl: 'https://sustainablefisheries.org/forum',
      topics: ['渔业管理', '生态系统', '政策制定', '技术创新', '社区参与']
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
              onClick={() => setActiveTab('communities')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'communities'
                  ? 'bg-white text-ocean-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              在线社区
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

        {activeTab === 'communities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="ocean-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${
                      community.type === 'discord' ? 'bg-indigo-100 text-indigo-600' :
                      community.type === 'reddit' ? 'bg-orange-100 text-orange-600' :
                      community.type === 'telegram' ? 'bg-blue-100 text-blue-600' :
                      community.type === 'chat' ? 'bg-green-100 text-green-600' :
                      community.type === 'forum' ? 'bg-purple-100 text-purple-600' :
                      'bg-pink-100 text-pink-600'
                    }`}>
                      {community.type === 'discord' && <Users className="h-6 w-6" />}
                      {community.type === 'reddit' && <Globe className="h-6 w-6" />}
                      {community.type === 'telegram' && <Users className="h-6 w-6" />}
                      {community.type === 'chat' && <Users className="h-6 w-6" />}
                      {community.type === 'forum' && <BookOpen className="h-6 w-6" />}
                      {community.type === 'social' && <Globe className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{community.name}</h3>
                      <p className="text-sm text-gray-600">{community.platform}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs px-2 py-1 rounded-full mb-1 ${
                      community.activity === 'high' ? 'bg-green-100 text-green-800' :
                      community.activity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {community.activity === 'high' ? '活跃' :
                       community.activity === 'medium' ? '中等' : '较少'}
                    </span>
                    <span className="text-xs text-gray-500">{community.language}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{community.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {community.topics.map((topic) => (
                    <span key={topic} className="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{community.members.toLocaleString()} 成员</span>
                  </div>
                  
                  <button 
                    className="ocean-button text-sm px-4 py-2 flex items-center" 
                    onClick={() => handleCommunityJoin(community.id, community.name, community.joinUrl)}
                  >
                    <Link className="h-4 w-4 mr-1" />
                    加入社区
                  </button>
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
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">在线社区</div>
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