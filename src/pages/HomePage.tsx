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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <Link to={feature.path} className="block h-full">
                  <div className="ocean-card p-8 h-full relative overflow-hidden">
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    {/* Icon with Enhanced Animation */}
                    <div className="relative z-10">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-ocean-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {feature.description}
                      </p>
                      
                      {/* Enhanced Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-ocean-600 bg-ocean-50 px-3 py-1.5 rounded-full">
                            {feature.stats}
                          </span>
                        </div>
                        <div className="flex items-center text-ocean-600 group-hover:text-ocean-700">
                          <span className="text-sm font-medium mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            探索
                          </span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">快速开始</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                选择最适合你的学习路径，立即开始海洋保护知识的探索之旅
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="ocean-card p-6 text-center group cursor-pointer"
              >
                <Link to="/interactive-learning" className="block">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">新手入门</h4>
                  <p className="text-gray-600 text-sm">从交互式学习开始，轻松掌握基础知识</p>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="ocean-card p-6 text-center group cursor-pointer"
              >
                <Link to="/deep-thinking" className="block">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">深度学习</h4>
                  <p className="text-gray-600 text-sm">系统性学习海洋污染的科学原理</p>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="ocean-card p-6 text-center group cursor-pointer"
              >
                <Link to="/statistics" className="block">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">数据分析</h4>
                  <p className="text-gray-600 text-sm">查看全球海洋污染的最新数据</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
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