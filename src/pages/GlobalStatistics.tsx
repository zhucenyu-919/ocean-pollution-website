import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Globe, Filter, Download, MapPin, Calendar, AlertTriangle, Info } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  globalMarinePollutionEvents, 
  pollutionTypeColors, 
  severityColors, 
  pollutionTypeLabels, 
  severityLabels,
  MarinePollutionEvent 
} from '../data/globalMarinePollutionEvents';

interface PollutionData {
  id: string;
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}

const GlobalStatistics: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<MarinePollutionEvent | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // 基于真实数据计算污染类型分布
  const calculatePollutionTypeData = (): PollutionData[] => {
    const typeCounts: { [key: string]: number } = {};
    
    globalMarinePollutionEvents.forEach(event => {
      typeCounts[event.type] = (typeCounts[event.type] || 0) + 1;
    });

    const total = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      id: type,
      name: pollutionTypeLabels[type as keyof typeof pollutionTypeLabels] || type,
      value: Math.round((count / total) * 100),
      color: pollutionTypeColors[type as keyof typeof pollutionTypeColors] || '#6B7280'
    }));
  };

  // 基于真实数据计算历史趋势
  const calculateTrendData = () => {
    const yearData: { [year: string]: { [type: string]: number } } = {};
    
    globalMarinePollutionEvents.forEach(event => {
      const year = new Date(event.date).getFullYear().toString();
      if (!yearData[year]) {
        yearData[year] = {};
      }
      yearData[year][event.type] = (yearData[year][event.type] || 0) + 1;
    });

    return Object.entries(yearData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .slice(-10) // 最近10年
      .map(([year, types]) => ({
        year,
        oil_spill: types.oil_spill || 0,
        nuclear: types.nuclear || 0,
        chemical: types.chemical || 0,
        plastic: types.plastic || 0,
        industrial: types.industrial || 0,
        mining: types.mining || 0,
        total: Object.values(types).reduce((sum, count) => sum + count, 0)
      }));
  };

  const pollutionTypeData = calculatePollutionTypeData();
  const trendData = calculateTrendData();

  const getSeverityColor = (severity: string) => {
    return severityColors[severity as keyof typeof severityColors] || '#6B7280';
  };

  const getSeverityRadius = (severity: string) => {
    switch (severity) {
      case 'catastrophic': return 25;
      case 'high': return 18;
      case 'medium': return 12;
      case 'low': return 8;
      default: return 8;
    }
  };

  const getFilteredEvents = () => {
    return globalMarinePollutionEvents.filter(event => {
      if (selectedType !== 'all' && event.type !== selectedType) return false;
      if (selectedRegion !== 'global') {
        // 简单的区域过滤逻辑
        const [lng, lat] = event.coordinates;
        switch (selectedRegion) {
          case 'pacific':
            return lng < -120 || lng > 120;
          case 'atlantic':
            return lng >= -80 && lng <= 20;
          case 'indian':
            return lng >= 20 && lng <= 120 && lat < 30;
          case 'arctic':
            return lat > 60;
          default:
            return true;
        }
      }
      return true;
    });
  };

  const getPaginatedEvents = () => {
    const filteredEvents = getFilteredEvents();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(getFilteredEvents().length / itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 当筛选条件改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectedType]);

  // 修复 Leaflet 图标问题
  useEffect(() => {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

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
            基于真实数据的全球重大海洋污染事件分析，通过交互式地图和数据可视化深入了解污染分布现状
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{globalMarinePollutionEvents.length} 个重大污染事件</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>1984-2024年数据</span>
            </div>
          </div>
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
                <option value="oil_spill">石油泄漏</option>
                <option value="nuclear">核污染</option>
                <option value="chemical">化学污染</option>
                <option value="plastic">塑料污染</option>
                <option value="industrial">工业污染</option>
                <option value="mining">采矿污染</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                显示 {getFilteredEvents().length} 个事件
              </span>
              <button className="ocean-button text-sm px-4 py-2 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>导出数据</span>
              </button>
            </div>
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
            全球重大海洋污染事件分布图
          </h2>
          
          <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              className="h-full w-full"
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {getFilteredEvents().map((event) => (
                <CircleMarker
                  key={event.id}
                  center={[event.coordinates[1], event.coordinates[0]]}
                  radius={getSeverityRadius(event.severity)}
                  fillColor={getSeverityColor(event.severity)}
                  color={getSeverityColor(event.severity)}
                  weight={2}
                  opacity={0.8}
                  fillOpacity={0.6}
                  eventHandlers={{
                    click: () => setSelectedEvent(event)
                  }}
                >
                  <Popup>
                    <div className="p-3 max-w-sm">
                      <h4 className="font-bold text-gray-900 mb-2">{event.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {pollutionTypeLabels[event.type as keyof typeof pollutionTypeLabels]}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded text-white`} 
                                style={{ backgroundColor: getSeverityColor(event.severity) }}>
                            {severityLabels[event.severity as keyof typeof severityLabels]}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <div>📍 {event.location}</div>
                          <div>📅 {new Date(event.date).toLocaleDateString('zh-CN')}</div>
                          <div>📊 影响面积: {event.area}</div>
                          {event.economicLoss && <div>💰 经济损失: {event.economicLoss}</div>}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          
          {/* Map Legend */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: severityColors.catastrophic }}></div>
                <span className="text-sm font-medium">灾难性</span>
              </div>
              <span className="text-xs text-gray-500">
                {globalMarinePollutionEvents.filter(e => e.severity === 'catastrophic').length} 事件
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: severityColors.high }}></div>
                <span className="text-sm font-medium">严重</span>
              </div>
              <span className="text-xs text-gray-500">
                {globalMarinePollutionEvents.filter(e => e.severity === 'high').length} 事件
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: severityColors.medium }}></div>
                <span className="text-sm font-medium">中等</span>
              </div>
              <span className="text-xs text-gray-500">
                {globalMarinePollutionEvents.filter(e => e.severity === 'medium').length} 事件
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: severityColors.low }}></div>
                <span className="text-sm font-medium">轻微</span>
              </div>
              <span className="text-xs text-gray-500">
                {globalMarinePollutionEvents.filter(e => e.severity === 'low').length} 事件
              </span>
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pollutionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pollutionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {pollutionTypeData.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="ocean-card p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">历史事件趋势</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="oil_spill" 
                    stroke={pollutionTypeColors.oil_spill} 
                    name="石油泄漏"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="nuclear" 
                    stroke={pollutionTypeColors.nuclear} 
                    name="核污染"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="chemical" 
                    stroke={pollutionTypeColors.chemical} 
                    name="化学污染"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="plastic" 
                    stroke={pollutionTypeColors.plastic} 
                    name="塑料污染"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>基于 {globalMarinePollutionEvents.length} 个重大污染事件的历史数据分析</p>
            </div>
          </motion.div>
        </div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ocean-card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            关键统计数据
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {globalMarinePollutionEvents.filter(e => e.severity === 'catastrophic').length}
              </div>
              <div className="text-gray-600 text-sm">灾难性污染事件</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {globalMarinePollutionEvents.filter(e => e.type === 'oil_spill').length}
              </div>
              <div className="text-gray-600 text-sm">重大石油泄漏</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {globalMarinePollutionEvents.filter(e => e.status === 'ongoing').length}
              </div>
              <div className="text-gray-600 text-sm">持续影响事件</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {globalMarinePollutionEvents.filter(e => e.casualties && e.casualties > 0).length}
              </div>
              <div className="text-gray-600 text-sm">造成人员伤亡</div>
            </div>
          </div>
        </motion.div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm`}
                        style={{ backgroundColor: getSeverityColor(selectedEvent.severity) }}>
                    {severityLabels[selectedEvent.severity as keyof typeof severityLabels]}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {pollutionTypeLabels[selectedEvent.type as keyof typeof pollutionTypeLabels]}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">基本信息</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>📍 位置: {selectedEvent.location}</div>
                      <div>📅 日期: {new Date(selectedEvent.date).toLocaleDateString('zh-CN')}</div>
                      <div>⏱️ 持续时间: {selectedEvent.duration}</div>
                      <div>📊 影响面积: {selectedEvent.area}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">影响评估</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {selectedEvent.casualties !== undefined && (
                        <div>👥 伤亡人数: {selectedEvent.casualties}</div>
                      )}
                      {selectedEvent.economicLoss && (
                        <div>💰 经济损失: {selectedEvent.economicLoss}</div>
                      )}
                      <div>🔄 状态: {
                        selectedEvent.status === 'ongoing' ? '持续中' :
                        selectedEvent.status === 'resolved' ? '已解决' : '部分解决'
                      }</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">事件描述</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">环境影响</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedEvent.impact}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">数据来源</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.sources.map((source, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Regional Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="ocean-card p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">重大污染事件列表</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">事件名称</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">类型</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">严重程度</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">日期</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">状态</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getPaginatedEvents().map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{event.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs text-white"
                            style={{ backgroundColor: pollutionTypeColors[event.type as keyof typeof pollutionTypeColors] }}>
                        {pollutionTypeLabels[event.type as keyof typeof pollutionTypeLabels]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs text-white`}
                            style={{ backgroundColor: getSeverityColor(event.severity) }}>
                        {severityLabels[event.severity as keyof typeof severityLabels]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(event.date).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.status === 'ongoing' ? 'bg-red-100 text-red-800' :
                        event.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status === 'ongoing' ? '持续中' :
                         event.status === 'resolved' ? '已解决' : '部分解决'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-ocean-600 hover:text-ocean-800 text-xs font-medium"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {getTotalPages() > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-500">
                显示第 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, getFilteredEvents().length)} 个事件，
                共 {getFilteredEvents().length} 个事件
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  上一页
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => {
                    // 显示当前页前后2页
                    if (
                      page === 1 ||
                      page === getTotalPages() ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            page === currentPage
                              ? 'bg-ocean-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 3 ||
                      page === currentPage + 3
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === getTotalPages()}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === getTotalPages()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalStatistics; 