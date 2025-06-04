import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Play, Settings } from 'lucide-react';

const AnimationModels: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-gradient rounded-full shadow-lg">
              <Atom className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            海洋污染模式动画
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            生动展示海洋污染的扩散过程和生态影响
          </p>
        </motion.div>

        <div className="ocean-card p-6">
          <div className="h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">动画播放器</h3>
              <p className="text-gray-600">污染扩散动态演示</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationModels; 