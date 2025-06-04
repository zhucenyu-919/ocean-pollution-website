import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Filter, MapPin, Calendar, AlertTriangle, ExternalLink } from 'lucide-react';
import { 
  globalMarinePollutionEvents, 
  pollutionTypeColors, 
  severityColors, 
  pollutionTypeLabels, 
  severityLabels,
  MarinePollutionEvent 
} from '../data/globalMarinePollutionEvents';

const PollutionDataShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // 过滤事件
  const filteredEvents = globalMarinePollutionEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  // 统计数据
  const totalEvents = globalMarinePollutionEvents.length;
  const catastrophicEvents = globalMarinePollutionEvents.filter(e => e.severity === 'catastrophic').length;
  const ongoingEvents = globalMarinePollutionEvents.filter(e => e.status === 'ongoing').length;
  const totalCasualties = globalMarinePollutionEvents.reduce((sum, event) => sum + (event.casualties || 0), 0);

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
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            全球海洋污染事件数据库
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            基于权威数据源的全球重大海洋污染事件完整记录，涵盖1984-2024年间的重要污染事件
          </p>
        </motion.div>

        {/* 统计概览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="ocean-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalEvents}</div>
            <div className="text-sm text-gray-600">总事件数</div>
          </div>
          <div className="ocean-card p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{catastrophicEvents}</div>
            <div className="text-sm text-gray-600">灾难性事件</div>
          </div>
          <div className="ocean-card p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{ongoingEvents}</div>
            <div className="text-sm text-gray-600">持续影响</div>
          </div>
          <div className="ocean-card p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalCasualties}</div>
            <div className="text-sm text-gray-600">总伤亡人数</div>
          </div>
        </motion.div>

        {/* 搜索和过滤 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ocean-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索事件名称、位置或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>

            {/* 污染类型过滤 */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            >
              <option value="all">所有类型</option>
              <option value="oil_spill">石油泄漏</option>
              <option value="nuclear">核污染</option>
              <option value="chemical">化学污染</option>
              <option value="plastic">塑料污染</option>
              <option value="industrial">工业污染</option>
              <option value="mining">采矿污染</option>
            </select>

            {/* 严重程度过滤 */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            >
              <option value="all">所有严重程度</option>
              <option value="catastrophic">灾难性</option>
              <option value="high">严重</option>
              <option value="medium">中等</option>
              <option value="low">轻微</option>
            </select>

            {/* 状态过滤 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            >
              <option value="all">所有状态</option>
              <option value="ongoing">持续中</option>
              <option value="resolved">已解决</option>
              <option value="partially_resolved">部分解决</option>
            </select>

            {/* 结果计数 */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">
                {filteredEvents.length} / {totalEvents} 事件
              </span>
            </div>
          </div>
        </motion.div>

        {/* 事件列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="ocean-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 基本信息 */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{event.nameEn}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs text-white font-medium"
                        style={{ backgroundColor: pollutionTypeColors[event.type as keyof typeof pollutionTypeColors] }}
                      >
                        {pollutionTypeLabels[event.type as keyof typeof pollutionTypeLabels]}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs text-white font-medium"
                        style={{ backgroundColor: severityColors[event.severity as keyof typeof severityColors] }}
                      >
                        {severityLabels[event.severity as keyof typeof severityLabels]}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('zh-CN')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span>持续时间: {event.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-gray-600">
                        <span className="font-medium">影响面积:</span> {event.area}
                      </div>
                      {event.casualties !== undefined && (
                        <div className="text-gray-600">
                          <span className="font-medium">伤亡人数:</span> {event.casualties}
                        </div>
                      )}
                      {event.economicLoss && (
                        <div className="text-gray-600">
                          <span className="font-medium">经济损失:</span> {event.economicLoss}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">环境影响</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.impact}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">当前状态</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'ongoing' ? 'bg-red-100 text-red-800' :
                      event.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status === 'ongoing' ? '持续影响中' :
                       event.status === 'resolved' ? '已完全解决' : '部分解决'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">数据来源</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.sources.map((source, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">坐标位置</h4>
                    <div className="text-xs text-gray-500 font-mono">
                      {event.coordinates[1].toFixed(4)}°N, {event.coordinates[0].toFixed(4)}°E
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 无结果提示 */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的事件</h3>
            <p className="text-gray-600">请尝试调整搜索条件或过滤器</p>
          </motion.div>
        )}

        {/* 数据说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 ocean-card p-6 bg-gradient-to-r from-blue-50 to-green-50"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            数据集说明
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">数据特点</h4>
              <ul className="space-y-1">
                <li>• 涵盖全球重大海洋污染事件</li>
                <li>• 时间跨度：1984年至2024年</li>
                <li>• 包含详细的地理坐标信息</li>
                <li>• 多维度分类和严重程度评估</li>
                <li>• 经济损失和人员伤亡统计</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">数据来源</h4>
              <ul className="space-y-1">
                <li>• 国际原子能机构 (IAEA)</li>
                <li>• 美国国家海洋和大气管理局 (NOAA)</li>
                <li>• 美国环境保护署 (EPA)</li>
                <li>• 各国政府环境部门</li>
                <li>• 国际海事组织 (IMO)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PollutionDataShowcase; 