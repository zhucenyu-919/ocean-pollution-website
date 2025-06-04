import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, Mail, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-ocean text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="p-2 bg-ocean-gradient rounded-lg shadow-lg"
              >
                <Waves className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">OceanGuard</h3>
                <p className="text-sm text-ocean-200">海洋污染深度学习平台</p>
              </div>
            </div>
            <p className="text-ocean-200 text-sm leading-relaxed">
              通过交互式学习体验，深度了解海洋污染问题，探索解决方案，共同保护我们的蓝色星球。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/deep-thinking" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  污染深度思考
                </Link>
              </li>
              <li>
                <Link 
                  to="/statistics" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  全球统计图鉴
                </Link>
              </li>
              <li>
                <Link 
                  to="/interactive-learning" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  交互式学习
                </Link>
              </li>
              <li>
                <Link 
                  to="/animations" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  污染模式动画
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">学习资源</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/experts" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  专家资源
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  研究报告
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  数据下载
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-ocean-200 hover:text-white transition-colors duration-200"
                >
                  API 文档
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">联系我们</h4>
            <div className="space-y-3">
              <a 
                href="mailto:contact@oceanguard.com" 
                className="flex items-center space-x-2 text-ocean-200 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>contact@oceanguard.com</span>
              </a>
              
              <div className="flex space-x-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 bg-ocean-700 hover:bg-ocean-600 rounded-lg transition-colors duration-200"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 bg-ocean-700 hover:bg-ocean-600 rounded-lg transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 bg-ocean-700 hover:bg-ocean-600 rounded-lg transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ocean-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-ocean-200 text-sm">
              <span>© {currentYear} OceanGuard. 保护海洋，从我做起</span>
              <Heart className="h-4 w-4 text-coral-400" />
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-ocean-200 hover:text-white transition-colors duration-200">
                隐私政策
              </a>
              <a href="#" className="text-ocean-200 hover:text-white transition-colors duration-200">
                使用条款
              </a>
              <a href="#" className="text-ocean-200 hover:text-white transition-colors duration-200">
                网站地图
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 