import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, Menu, X, Home, Brain, BarChart3, Play, Atom, Users, Database } from 'lucide-react';

const navigationItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/deep-thinking', label: '深度思考', icon: Brain },
  { path: '/statistics', label: '统计图鉴', icon: BarChart3 },
  { path: '/data-showcase', label: '数据库', icon: Database },
  { path: '/interactive-learning', label: '交互学习', icon: Play },
  { path: '/animations', label: '模式动画', icon: Atom },
  { path: '/experts', label: '专家资源', icon: Users },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-ocean sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-2 bg-ocean-gradient rounded-lg shadow-lg"
            >
              <Waves className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold gradient-text">OceanGuard</h1>
              <p className="text-xs text-gray-500">海洋污染深度学习平台</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-ocean-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-ocean-50 hover:text-ocean-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-ocean-600 hover:bg-ocean-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-ocean-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-ocean-50 hover:text-ocean-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 