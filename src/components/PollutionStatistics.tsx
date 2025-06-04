import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle, Calendar, MapPin, DollarSign } from 'lucide-react';
import { 
  globalMarinePollutionEvents, 
  pollutionTypeColors, 
  severityColors, 
  pollutionTypeLabels, 
  severityLabels,
  MarinePollutionEvent 
} from '../data/globalMarinePollutionEvents';

interface StatisticCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, subtitle, icon, color, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="ocean-card p-6 text-center"
  >
    <div className={`inline-flex p-3 rounded-full mb-4`} style={{ backgroundColor: `${color}20` }}>
      <div style={{ color }}>{icon}</div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>
    <div className="text-xs text-gray-500">{subtitle}</div>
    {trend && (
      <div className={`text-xs mt-2 font-medium ${trend.startsWith('↑') ? 'text-red-600' : 'text-green-600'}`}>
        {trend}
      </div>
    )}
  </motion.div>
);

const PollutionStatistics: React.FC = () => {
  // 计算各种统计数据
  const totalEvents = globalMarinePollutionEvents.length;
  const catastrophicEvents = globalMarinePollutionEvents.filter(e => e.severity === 'catastrophic').length;
  const ongoingEvents = globalMarinePollutionEvents.filter(e => e.status === 'ongoing').length;
  const oilSpillEvents = globalMarinePollutionEvents.filter(e => e.type === 'oil_spill').length;
  const nuclearEvents = globalMarinePollutionEvents.filter(e => e.type === 'nuclear').length;
  const eventsWithCasualties = globalMarinePollutionEvents.filter(e => e.casualties && e.casualties > 0).length;
  
  // 计算总伤亡人数
  const totalCasualties = globalMarinePollutionEvents.reduce((sum, event) => {
    return sum + (event.casualties || 0);
  }, 0);

  // 按年代分组统计
  const eventsByDecade = globalMarinePollutionEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    const decade = Math.floor(year / 10) * 10;
    const decadeKey = `${decade}s`;
    acc[decadeKey] = (acc[decadeKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 按污染类型统计
  const eventsByType = globalMarinePollutionEvents.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 按严重程度统计
  const eventsBySeverity = globalMarinePollutionEvents.reduce((acc, event) => {
    acc[event.severity] = (acc[event.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 最新事件
  const latestEvent = globalMarinePollutionEvents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // 最严重事件（按经济损失）
  const mostCostlyEvent = globalMarinePollutionEvents
    .filter(e => e.economicLoss)
    .sort((a, b) => {
      const aLoss = a.economicLoss?.includes('万') ? 1 : a.economicLoss?.includes('亿') ? 100 : 1000;
      const bLoss = b.economicLoss?.includes('万') ? 1 : b.economicLoss?.includes('亿') ? 100 : 1000;
      return bLoss - aLoss;
    })[0];

  return (
    <div className="space-y-8">
      {/* 主要统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticCard
          title="重大污染事件总数"
          value={totalEvents}
          subtitle="1984-2024年记录"
          icon={<BarChart3 className="h-6 w-6" />}
          color="#3B82F6"
        />
        
        <StatisticCard
          title="灾难性事件"
          value={catastrophicEvents}
          subtitle="最高严重级别"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="#DC2626"
          trend="↑ 严重关注"
        />
        
        <StatisticCard
          title="持续影响事件"
          value={ongoingEvents}
          subtitle="仍在产生影响"
          icon={<TrendingUp className="h-6 w-6" />}
          color="#F59E0B"
          trend="↑ 需要关注"
        />
        
        <StatisticCard
          title="人员伤亡事件"
          value={eventsWithCasualties}
          subtitle={`共${totalCasualties}人伤亡`}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="#7C3AED"
        />
      </div>

      {/* 污染类型分布 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="ocean-card p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">污染类型分布</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(eventsByType).map(([type, count]) => (
            <div key={type} className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: pollutionTypeColors[type as keyof typeof pollutionTypeColors] }}
              >
                {count}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {pollutionTypeLabels[type as keyof typeof pollutionTypeLabels]}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((count / totalEvents) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 严重程度分布 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="ocean-card p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">严重程度分布</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(eventsBySeverity).map(([severity, count]) => (
            <div key={severity} className="text-center">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: severityColors[severity as keyof typeof severityColors] }}
              >
                {count}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {severityLabels[severity as keyof typeof severityLabels]}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((count / totalEvents) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 时间分布 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="ocean-card p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">历史时期分布</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(eventsByDecade)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([decade, count]) => (
            <div key={decade} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">{count}</div>
              <div className="text-sm font-medium text-gray-700">{decade}</div>
              <div className="text-xs text-gray-500">
                {Math.round((count / totalEvents) * 100)}% 事件
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 重点事件信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最新事件 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="ocean-card p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            最新记录事件
          </h3>
          {latestEvent && (
            <div className="space-y-3">
              <div className="font-semibold text-gray-900">{latestEvent.name}</div>
              <div className="flex items-center space-x-4">
                <span 
                  className="px-2 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: pollutionTypeColors[latestEvent.type as keyof typeof pollutionTypeColors] }}
                >
                  {pollutionTypeLabels[latestEvent.type as keyof typeof pollutionTypeLabels]}
                </span>
                <span 
                  className="px-2 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: severityColors[latestEvent.severity as keyof typeof severityColors] }}
                >
                  {severityLabels[latestEvent.severity as keyof typeof severityLabels]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {latestEvent.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(latestEvent.date).toLocaleDateString('zh-CN')}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {latestEvent.description}
              </p>
            </div>
          )}
        </motion.div>

        {/* 经济损失最大事件 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="ocean-card p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-red-600" />
            经济损失最大事件
          </h3>
          {mostCostlyEvent && (
            <div className="space-y-3">
              <div className="font-semibold text-gray-900">{mostCostlyEvent.name}</div>
              <div className="flex items-center space-x-4">
                <span 
                  className="px-2 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: pollutionTypeColors[mostCostlyEvent.type as keyof typeof pollutionTypeColors] }}
                >
                  {pollutionTypeLabels[mostCostlyEvent.type as keyof typeof pollutionTypeLabels]}
                </span>
                <span 
                  className="px-2 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: severityColors[mostCostlyEvent.severity as keyof typeof severityColors] }}
                >
                  {severityLabels[mostCostlyEvent.severity as keyof typeof severityLabels]}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {mostCostlyEvent.location}
                </div>
                <div className="flex items-center mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(mostCostlyEvent.date).toLocaleDateString('zh-CN')}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  经济损失: {mostCostlyEvent.economicLoss}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {mostCostlyEvent.description}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 数据来源说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="ocean-card p-6 bg-gradient-to-r from-blue-50 to-green-50"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">数据来源与说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">权威数据源</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 国际原子能机构 (IAEA)</li>
              <li>• 美国国家海洋和大气管理局 (NOAA)</li>
              <li>• 美国环境保护署 (EPA)</li>
              <li>• 联合国环境规划署 (UNEP)</li>
              <li>• 各国环境部门官方报告</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">数据说明</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 涵盖1984-2024年重大海洋污染事件</li>
              <li>• 包含石油泄漏、核污染、化学污染等类型</li>
              <li>• 按严重程度分为四个等级</li>
              <li>• 数据持续更新，确保准确性</li>
              <li>• 所有经济损失数据来自官方评估</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PollutionStatistics; 