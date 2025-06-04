import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Award, Clock } from 'lucide-react';

const InteractiveLearning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-gradient rounded-full shadow-lg">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            交互式深度学习
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            通过虚拟环境和模拟器，身临其境地体验海洋污染的影响和保护措施
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Interactive Module Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="ocean-card p-6"
          >
            <BookOpen className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">虚拟海洋环境</h3>
            <p className="text-gray-600 mb-4">沉浸式3D海洋环境体验</p>
            <button className="ocean-button text-sm px-4 py-2">开始体验</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLearning; 