import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Globe, Filter, Download, MapPin } from 'lucide-react';
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

interface PollutionData {
  id: string;
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}

interface PollutionEvent {
  id: string;
  lat: number;
  lng: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  date: string;
}

const GlobalStatistics: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [selectedType, setSelectedType] = useState<string>('all');

  // 污染类型数据
  const pollutionTypeData: PollutionData[] = [
    { id: 'plastic', name: '塑料污染', value: 42, color: '#3B82F6' },
    { id: 'chemical', name: '化学污染', value: 28, color: '#10B981' },
    { id: 'oil', name: '石油污染', value: 18, color: '#F59E0B' },
    { id: 'noise', name: '噪声污染', value: 8, color: '#8B5CF6' },
    { id: 'other', name: '其他', value: 4, color: '#6B7280' }
  ];

  // 历史趋势数据
  const trendData = [
    { year: '2020', plastic: 35, chemical: 25, oil: 20, total: 80 },
    { year: '2021', plastic: 38, chemical: 26, oil: 18, total: 82 },
    { year: '2022', plastic: 40, chemical: 27, oil: 19, total: 86 },
    { year: '2023', plastic: 41, chemical: 28, oil: 18, total: 87 },
    { year: '2024', plastic: 42, chemical: 28, oil: 18, total: 88 }
  ];

  // 全球污染事件数据
  const pollutionEvents: PollutionEvent[] = [
    {
      id: '1',
      lat: 20.5,
      lng: -157.5,
      type: 'plastic',
      severity: 'critical',
      location: '太平洋垃圾带',
      description: '世界最大的海洋塑料聚集区',
      date: '2024-01'
    },
    {
      id: '2',
      lat: 35.7,
      lng: 139.7,
      type: 'chemical',
      severity: 'high',
      location: '东京湾',
      description: '工业化学污染严重',
      date: '2024-02'
    },
    {
      id: '3',
      lat: 51.5,
      lng: 0.1,
      type: 'oil',
      severity: 'medium',
      location: '英吉利海峡',
      description: '船舶石油泄漏事件',
      date: '2024-01'
    },
    {
      id: '4',
      lat: -33.9,
      lng: 18.4,
      type: 'plastic',
      severity: 'high',
      location: '开普敦',
      description: '海岸塑料垃圾堆积',
      date: '2024-03'
    },
    {
      id: '5',
      lat: 1.3,
      lng: 103.8,
      type: 'noise',
      severity: 'medium',
      location: '新加坡海峡',
      description: '航运噪声污染',
      date: '2024-02'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#F59E0B';
      case 'medium': return '#10B981';
      case 'low': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getSeverityRadius = (severity: string) => {
    switch (severity) {
      case 'critical': return 20;
      case 'high': return 15;
      case 'medium': return 10;
      case 'low': return 5;
      default: return 5;
    }
  };

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
              
              {pollutionEvents
                .filter(event => selectedType === 'all' || event.type === selectedType)
                .map((event) => (
                  <CircleMarker
                    key={event.id}
                    center={[event.lat, event.lng]}
                    radius={getSeverityRadius(event.severity)}
                    fillColor={getSeverityColor(event.severity)}
                    color={getSeverityColor(event.severity)}
                    weight={2}
                    opacity={0.8}
                    fillOpacity={0.6}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-bold text-gray-900">{event.location}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {event.type === 'plastic' && '塑料污染'}
                            {event.type === 'chemical' && '化学污染'}
                            {event.type === 'oil' && '石油污染'}
                            {event.type === 'noise' && '噪声污染'}
                          </span>
                          <span className="text-xs text-gray-500">{event.date}</span>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
            </MapContainer>
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">历史趋势分析</h3>
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
                    dataKey="plastic" 
                    stroke="#3B82F6" 
                    name="塑料污染"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="chemical" 
                    stroke="#10B981" 
                    name="化学污染"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="oil" 
                    stroke="#F59E0B" 
                    name="石油污染"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-600">2020-2024年变化趋势</span>
              <span className="text-red-600 font-semibold">↑ 10%</span>
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