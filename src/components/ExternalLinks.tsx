import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, BookOpen, Users, Database, Video, FileText, Award } from 'lucide-react';

interface ExternalResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'organization' | 'research' | 'education' | 'data' | 'news' | 'tools';
  language: 'zh' | 'en' | 'multi';
  featured?: boolean;
}

const ExternalLinks: React.FC = () => {
  const handleLinkClick = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resources: ExternalResource[] = [
    // 国际组织
    {
      id: '1',
      name: '联合国环境规划署 (UNEP)',
      description: '联合国环境事务的权威机构，提供全球环境政策和海洋保护指导',
      url: 'https://www.unep.org',
      category: 'organization',
      language: 'multi',
      featured: true
    },
    {
      id: '2',
      name: '世界自然基金会 (WWF)',
      description: '全球最大的自然保护组织，致力于海洋生物多样性保护',
      url: 'https://www.worldwildlife.org',
      category: 'organization',
      language: 'multi',
      featured: true
    },
    {
      id: '3',
      name: '海洋清理基金会 (The Ocean Cleanup)',
      description: '开发创新技术清理海洋塑料垃圾的荷兰非营利组织',
      url: 'https://theoceancleanup.com',
      category: 'organization',
      language: 'en',
      featured: true
    },
    {
      id: '4',
      name: '绿色和平组织',
      description: '国际环保组织，积极开展海洋保护和反污染行动',
      url: 'https://www.greenpeace.org',
      category: 'organization',
      language: 'multi'
    },
    {
      id: '5',
      name: '国际海事组织 (IMO)',
      description: '联合国专门机构，负责制定国际海运安全和防污染标准',
      url: 'https://www.imo.org',
      category: 'organization',
      language: 'en'
    },

    // 研究机构
    {
      id: '6',
      name: '斯克里普斯海洋研究所',
      description: '世界顶尖的海洋科学研究机构，加州大学圣地亚哥分校',
      url: 'https://scripps.ucsd.edu',
      category: 'research',
      language: 'en',
      featured: true
    },
    {
      id: '7',
      name: '伍兹霍尔海洋研究所',
      description: '美国领先的海洋科学研究机构，深海探索先驱',
      url: 'https://www.whoi.edu',
      category: 'research',
      language: 'en'
    },
    {
      id: '8',
      name: '中国科学院海洋研究所',
      description: '中国海洋科学研究的国家队，海洋生态和环境研究权威',
      url: 'http://www.qdio.ac.cn',
      category: 'research',
      language: 'zh'
    },
    {
      id: '9',
      name: '国家海洋环境监测中心',
      description: '中国海洋环境监测、评价和保护的国家级技术支撑机构',
      url: 'http://www.nmemc.org.cn',
      category: 'research',
      language: 'zh'
    },

    // 教育资源
    {
      id: '10',
      name: 'Ocean Portal (史密森尼)',
      description: '史密森尼国家自然历史博物馆的海洋教育门户',
      url: 'https://ocean.si.edu',
      category: 'education',
      language: 'en',
      featured: true
    },
    {
      id: '11',
      name: 'NOAA 海洋教育资源',
      description: '美国国家海洋和大气管理局的教育资源中心',
      url: 'https://www.noaa.gov/education',
      category: 'education',
      language: 'en'
    },
    {
      id: '12',
      name: 'Ocean Conservancy',
      description: '海洋保护组织，提供丰富的海洋保护教育资源',
      url: 'https://oceanconservancy.org',
      category: 'education',
      language: 'en'
    },
    {
      id: '13',
      name: '中国海洋大学',
      description: '中国海洋和水产学科特色显著的重点大学',
      url: 'http://www.ouc.edu.cn',
      category: 'education',
      language: 'zh'
    },

    // 数据和工具
    {
      id: '14',
      name: 'Global Ocean Observing System',
      description: '全球海洋观测系统，提供海洋环境数据',
      url: 'https://www.goosocean.org',
      category: 'data',
      language: 'en'
    },
    {
      id: '15',
      name: 'Marine Pollution Bulletin',
      description: '海洋污染研究的权威学术期刊',
      url: 'https://www.journals.elsevier.com/marine-pollution-bulletin',
      category: 'data',
      language: 'en'
    },
    {
      id: '16',
      name: 'Ocean Health Index',
      description: '海洋健康指数，评估全球海洋健康状况',
      url: 'http://www.oceanhealthindex.org',
      category: 'data',
      language: 'en'
    },

    // 新闻和媒体
    {
      id: '17',
      name: 'Ocean News & Technology',
      description: '海洋科技新闻和行业动态',
      url: 'https://www.oceannews.com',
      category: 'news',
      language: 'en'
    },
    {
      id: '18',
      name: 'Mongabay 海洋频道',
      description: '专注环境新闻的独立媒体，海洋保护报道',
      url: 'https://news.mongabay.com/list/oceans',
      category: 'news',
      language: 'en'
    },

    // 工具和应用
    {
      id: '19',
      name: 'Marine Traffic',
      description: '全球船舶实时追踪系统',
      url: 'https://www.marinetraffic.com',
      category: 'tools',
      language: 'multi'
    },
    {
      id: '20',
      name: 'Global Fishing Watch',
      description: '全球渔业活动监测平台',
      url: 'https://globalfishingwatch.org',
      category: 'tools',
      language: 'en'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'organization': return <Users className="h-5 w-5" />;
      case 'research': return <BookOpen className="h-5 w-5" />;
      case 'education': return <Award className="h-5 w-5" />;
      case 'data': return <Database className="h-5 w-5" />;
      case 'news': return <FileText className="h-5 w-5" />;
      case 'tools': return <Globe className="h-5 w-5" />;
      default: return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'organization': return '国际组织';
      case 'research': return '研究机构';
      case 'education': return '教育资源';
      case 'data': return '数据平台';
      case 'news': return '新闻媒体';
      case 'tools': return '工具应用';
      default: return '其他';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'organization': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      case 'education': return 'bg-green-100 text-green-800';
      case 'data': return 'bg-orange-100 text-orange-800';
      case 'news': return 'bg-red-100 text-red-800';
      case 'tools': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'zh': return '🇨🇳';
      case 'en': return '🇺🇸';
      case 'multi': return '🌍';
      default: return '🌐';
    }
  };

  const featuredResources = resources.filter(r => r.featured);
  const categorizedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, ExternalResource[]>);

  return (
    <div className="space-y-8">
      {/* Featured Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Award className="h-6 w-6 mr-2 text-yellow-500" />
          推荐资源
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="ocean-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleLinkClick(resource.url, resource.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${getCategoryColor(resource.category)}`}>
                    {getCategoryIcon(resource.category)}
                  </div>
                  <span className="text-lg">{getLanguageFlag(resource.language)}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{resource.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
                {getCategoryName(resource.category)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categorized Resources */}
      {Object.entries(categorizedResources).map(([category, categoryResources]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            {getCategoryIcon(category)}
            <span className="ml-2">{getCategoryName(category)}</span>
            <span className="ml-2 text-sm text-gray-500">({categoryResources.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="ocean-card p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleLinkClick(resource.url, resource.name)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                      <span className="text-sm">{getLanguageFlag(resource.language)}</span>
                      {resource.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          推荐
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Quick Access Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="ocean-card p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">快速访问</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleLinkClick('https://www.unep.org/explore-topics/oceans-seas', 'UNEP 海洋专题')}
            className="ocean-button text-sm py-2 px-3 flex items-center justify-center"
          >
            <Globe className="h-4 w-4 mr-1" />
            UNEP 海洋
          </button>
          <button
            onClick={() => handleLinkClick('https://www.worldwildlife.org/initiatives/oceans', 'WWF 海洋倡议')}
            className="ocean-button text-sm py-2 px-3 flex items-center justify-center"
          >
            <Users className="h-4 w-4 mr-1" />
            WWF 海洋
          </button>
          <button
            onClick={() => handleLinkClick('https://theoceancleanup.com/updates/', '海洋清理动态')}
            className="ocean-button text-sm py-2 px-3 flex items-center justify-center"
          >
            <Video className="h-4 w-4 mr-1" />
            清理动态
          </button>
          <button
            onClick={() => handleLinkClick('https://www.noaa.gov/education/resource-collections/ocean-coasts', 'NOAA 海洋教育')}
            className="ocean-button text-sm py-2 px-3 flex items-center justify-center"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            NOAA 教育
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExternalLinks; 