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
    // 模拟下载功能
    alert(`正在下载: ${title}\n\n实际应用中，这里会触发真实的文件下载。`);
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
      title: '微塑料污染：从源头到解决方案',
      date: '2024-04-15',
      time: '14:00 GMT+8',
      speaker: '王海洋博士',
      duration: '90分钟',
      registered: 245,
      capacity: 500,
      registrationUrl: 'https://zoom.us/webinar/register'
    },
    {
      id: '2',
      title: '海洋保护区的建立与管理',
      date: '2024-04-22',
      time: '10:00 GMT+8',
      speaker: 'Dr. Sarah Johnson',
      duration: '60分钟',
      registered: 180,
      capacity: 300,
      registrationUrl: 'https://teams.microsoft.com/registration'
    },
    {
      id: '3',
      title: '创新技术在海洋污染治理中的应用',
      date: '2024-05-06',
      time: '15:00 GMT+8',
      speaker: '李明教授',
      duration: '120分钟',
      registered: 320,
      capacity: 400,
      registrationUrl: 'https://webex.com/webinar/register'
    },
    {
      id: '4',
      title: '珊瑚礁生态系统保护与修复',
      date: '2024-05-20',
      time: '16:00 GMT+8',
      speaker: 'Prof. Akiko Tanaka',
      duration: '75分钟',
      registered: 156,
      capacity: 250,
      registrationUrl: 'https://gotomeeting.com/register'
    }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: '2024全球海洋污染状况报告',
      type: 'report',
      format: 'PDF',
      size: '12.5 MB',
      downloads: 1842,
      description: '详细分析全球海洋污染现状、趋势和应对措施',
      downloadUrl: 'https://www.unep.org/resources/report/marine-pollution-report-2024'
    },
    {
      id: '2',
      title: '海洋保护行动指南',
      type: 'guide',
      format: 'PDF',
      size: '5.8 MB',
      downloads: 956,
      description: '为个人和组织提供实用的海洋保护行动建议',
      downloadUrl: 'https://www.worldwildlife.org/publications/ocean-conservation-guide'
    },
    {
      id: '3',
      title: '全球海洋塑料污染数据集',
      type: 'dataset',
      format: 'CSV',
      size: '25.3 MB',
      downloads: 634,
      description: '包含全球海洋塑料污染监测数据的综合数据集',
      downloadUrl: 'https://data.unep.org/datasets/marine-plastic-pollution'
    },
    {
      id: '4',
      title: '海洋污染监测工具包',
      type: 'toolkit',
      format: 'ZIP',
      size: '45.2 MB',
      downloads: 423,
      description: '包含海洋污染监测所需的工具、方法和标准操作程序',
      downloadUrl: 'https://www.noaa.gov/education/resource-collections/ocean-monitoring-toolkit'
    },
    {
      id: '5',
      title: '海洋生物多样性保护策略',
      type: 'report',
      format: 'PDF',
      size: '8.7 MB',
      downloads: 789,
      description: '分析海洋生物多样性现状及保护策略建议',
      downloadUrl: 'https://www.cbd.int/doc/publications/marine-biodiversity-report.pdf'
    },
    {
      id: '6',
      title: '可持续渔业管理手册',
      type: 'guide',
      format: 'PDF',
      size: '15.4 MB',
      downloads: 567,
      description: '可持续渔业管理的最佳实践和案例研究',
      downloadUrl: 'https://www.fao.org/publications/sustainable-fisheries-handbook'
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