import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Globe, Filter, Download, MapPin } from 'lucide-react';

const GlobalStatistics: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [selectedType, setSelectedType] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-gradient rounded-full shadow-lg">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            全球海洋污染统计图鉴
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            通过交互式地图和数据可视化，深入了解全球海洋污染的分布现状和发展趋势
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ocean-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="global">全球</option>
                <option value="pacific">太平洋</option>
                <option value="atlantic">大西洋</option>
                <option value="indian">印度洋</option>
                <option value="arctic">北极洋</option>
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="all">所有污染类型</option>
                <option value="plastic">塑料污染</option>
                <option value="chemical">化学污染</option>
                <option value="oil">石油污染</option>
                <option value="noise">噪声污染</option>
              </select>
            </div>
            
            <button className="ocean-button text-sm px-4 py-2 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>导出数据</span>
            </button>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="ocean-card p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-ocean-600" />
            交互式污染分布地图
          </h2>
          
          {/* Map Placeholder */}
          <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 animate-pulse"></div>
            <div className="relative z-10 text-center">
              <MapPin className="h-16 w-16 text-ocean-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">交互式地图组件</h3>
              <p className="text-gray-600">
                这里将集成 Leaflet 地图，显示全球海洋污染事件分布
              </p>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">严重污染</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">中度污染</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">轻度污染</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">保护区域</span>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pollution Types Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="ocean-card p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">污染类型分布</h3>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-ocean-600 mx-auto mb-2" />
                <p className="text-gray-600">饼图/柱状图组件</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">塑料污染</span>
                <span className="text-sm font-semibold text-gray-900">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">化学污染</span>
                <span className="text-sm font-semibold text-gray-900">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">石油污染</span>
                <span className="text-sm font-semibold text-gray-900">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">其他</span>
                <span className="text-sm font-semibold text-gray-900">12%</span>
              </div>
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="ocean-card p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">历史趋势分析</h3>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-ocean-600 mx-auto mb-2" />
                <p className="text-gray-600">时间序列图表组件</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-600">2020-2024年变化趋势</span>
              <span className="text-red-600 font-semibold">↑ 15.3%</span>
            </div>
          </motion.div>
        </div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ocean-card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            关键统计数据
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">8.3亿吨</div>
              <div className="text-gray-600 text-sm">海洋塑料垃圾总量</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,200万吨</div>
              <div className="text-gray-600 text-sm">年塑料污染增量</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-gray-600 text-sm">来自亚洲地区</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">600+</div>
              <div className="text-gray-600 text-sm">受影响物种数量</div>
            </div>
          </div>
        </motion.div>

        {/* Regional Data */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 ocean-card p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">区域污染数据对比</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">海域</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">污染指数</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">主要污染源</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">变化趋势</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">太平洋</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">严重</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">塑料垃圾、化学污染</td>
                  <td className="px-4 py-3 text-red-600">↑ 12.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">大西洋</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">中度</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">石油泄漏、工业排放</td>
                  <td className="px-4 py-3 text-orange-600">↑ 8.2%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">印度洋</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">中度</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">农业径流、塑料污染</td>
                  <td className="px-4 py-3 text-yellow-600">↑ 6.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">北极洋</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">轻度</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">微塑料、气候变化</td>
                  <td className="px-4 py-3 text-green-600">↓ 2.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalStatistics; 