import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, ExternalLink } from 'lucide-react';

const ExpertResources: React.FC = () => {
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
            连接全球海洋保护专家和研究机构，获取专业支持
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="ocean-card p-6"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">专家姓名</h3>
            <p className="text-gray-600 mb-4">海洋生物学专家</p>
            <div className="flex space-x-2">
              <button className="ocean-button text-sm px-3 py-1 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                联系
              </button>
              <button className="ocean-button-secondary text-sm px-3 py-1 flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                详情
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpertResources; 