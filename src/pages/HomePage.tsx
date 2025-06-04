import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Brain, 
  BarChart3, 
  Play, 
  Atom, 
  Users,
  ArrowRight,
  Globe,
  Shield,
  Microscope,
  TrendingUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      title: '污染深度思考',
      description: '深入分析海洋污染的成因、影响机制和解决方案',
      icon: Brain,
      path: '/deep-thinking',
      color: 'from-purple-500 to-indigo-600',
      stats: '8个主题模块'
    },
    {
      title: '全球统计图鉴',
      description: '交互式世界地图展示全球海洋污染数据和趋势',
      icon: BarChart3,
      path: '/statistics',
      color: 'from-blue-500 to-cyan-600',
      stats: '覆盖200+国家'
    },
    {
      title: '交互式学习',
      description: '通过虚拟环境和模拟器深度体验学习',
      icon: Play,
      path: '/interactive-learning',
      color: 'from-green-500 to-emerald-600',
      stats: '15个互动体验'
    },
    {
      title: '污染模式动画',
      description: '生动展示污染扩散过程和生态影响',
      icon: Atom,
      path: '/animations',
      color: 'from-orange-500 to-red-600',
      stats: '12种动画模型'
    },
    {
      title: '专家资源',
      description: '连接全球海洋保护专家和研究机构',
      icon: Users,
      path: '/experts',
      color: 'from-pink-500 to-rose-600',
      stats: '100+位专家'
    }
  ];

  const stats = [
    { label: '全球海洋污染事件', value: '10,000+', icon: Globe },
    { label: '研究数据点', value: '50万+', icon: TrendingUp },
    { label: '保护项目', value: '500+', icon: Shield },
    { label: '科学研究', value: '1,200+', icon: Microscope }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-ocean-gradient py-20 lg:py-32 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="wave-background h-full w-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="p-4 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  <Waves className="h-16 w-16 text-white" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                守护蓝色星球
                <br />
                <span className="text-cyan-200">从了解开始</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
                通过交互式学习体验，深度了解海洋污染问题，探索科学解决方案，共同保护我们的海洋生态环境
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
                <Link
                  to="/interactive-learning"
                  className="ocean-button text-lg px-8 py-4 bg-white text-ocean-600 hover:bg-cyan-50"
                >
                  开始探索
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/statistics"
                  className="ocean-button-secondary text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
                >
                  查看数据
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-ocean-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-ocean-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                全方位学习体验
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                通过多样化的学习模块，深入了解海洋污染问题的各个层面
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={feature.path} className="block">
                  <div className="ocean-card p-8 h-full">
                    <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-ocean-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-ocean-600 bg-ocean-50 px-3 py-1 rounded-full">
                        {feature.stats}
                      </span>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-ocean-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-ocean text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              加入海洋保护行动
            </h2>
            <p className="text-xl text-cyan-100 leading-relaxed">
              每一个人的参与都很重要。让我们携手保护海洋生态，为地球的可持续发展贡献力量。
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/deep-thinking"
                className="ocean-button bg-cyan-500 hover:bg-cyan-400 text-lg px-8 py-4"
              >
                开始学习
              </Link>
              <Link
                to="/experts"
                className="ocean-button-secondary border-cyan-400 text-cyan-100 hover:bg-cyan-900/30 text-lg px-8 py-4"
              >
                联系专家
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 