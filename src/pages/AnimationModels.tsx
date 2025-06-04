import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  Play, 
  Settings, 
  Pause,
  RotateCcw,
  Droplet,
  Wind,
  Fish,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react';

interface AnimationModel {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'pollution' | 'ecosystem' | 'cleanup';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface SimulationParam {
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

const AnimationModels: React.FC = () => {
  const [activeModel, setActiveModel] = useState<string>('plastic-spread');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [simulationParams, setSimulationParams] = useState<SimulationParam[]>([
    { name: '洋流速度', value: 2.5, min: 0, max: 10, unit: 'km/h' },
    { name: '风速', value: 15, min: 0, max: 50, unit: 'km/h' },
    { name: '污染物浓度', value: 75, min: 0, max: 100, unit: '%' },
    { name: '扩散半径', value: 50, min: 10, max: 200, unit: 'km' }
  ]);

  const animationModels: AnimationModel[] = [
    {
      id: 'plastic-spread',
      title: '塑料污染扩散模型',
      description: '展示塑料垃圾如何随洋流在海洋中扩散，形成垃圾带的过程',
      duration: '3分钟',
      type: 'pollution',
      difficulty: 'basic'
    },
    {
      id: 'oil-spill',
      title: '石油泄漏扩散动画',
      description: '模拟石油泄漏后在海面的扩散过程和对海洋生物的影响',
      duration: '5分钟',
      type: 'pollution',
      difficulty: 'intermediate'
    },
    {
      id: 'food-chain',
      title: '食物链污染传递',
      description: '演示微塑料如何通过食物链在不同营养级之间传递和累积',
      duration: '4分钟',
      type: 'ecosystem',
      difficulty: 'advanced'
    },
    {
      id: 'coral-bleaching',
      title: '珊瑚白化过程',
      description: '展示海洋酸化和温度升高导致珊瑚白化的动态过程',
      duration: '3分钟',
      type: 'ecosystem',
      difficulty: 'intermediate'
    },
    {
      id: 'cleanup-tech',
      title: '清理技术演示',
      description: '介绍各种海洋清理技术的工作原理和效果',
      duration: '6分钟',
      type: 'cleanup',
      difficulty: 'basic'
    }
  ];

  const handleParamChange = (index: number, newValue: number) => {
    const newParams = [...simulationParams];
    newParams[index].value = newValue;
    setSimulationParams(newParams);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pollution': return 'text-red-600 bg-red-100';
      case 'ecosystem': return 'text-green-600 bg-green-100';
      case 'cleanup': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return { color: 'bg-green-100 text-green-800', text: '基础' };
      case 'intermediate': return { color: 'bg-yellow-100 text-yellow-800', text: '进阶' };
      case 'advanced': return { color: 'bg-red-100 text-red-800', text: '高级' };
      default: return { color: 'bg-gray-100 text-gray-800', text: '未知' };
    }
  };

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
            生动展示海洋污染的扩散过程和生态影响，深入理解污染机制
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="ocean-card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">动画模型列表</h2>
              <div className="space-y-3">
                {animationModels.map((model) => {
                  const badge = getDifficultyBadge(model.difficulty);
                  return (
                    <motion.div
                      key={model.id}
                      whileHover={{ x: 5 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        activeModel === model.id
                          ? 'border-ocean-500 bg-ocean-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveModel(model.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{model.title}</h3>
                        <ChevronRight className={`h-5 w-5 transition-transform ${
                          activeModel === model.id ? 'rotate-90 text-ocean-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-500">{model.duration}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Animation Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="ocean-card p-6">
              {/* Animation Display Area */}
              <div className="h-96 bg-gradient-to-br from-ocean-100 to-blue-200 rounded-lg relative overflow-hidden mb-6">
                {/* Animated Ocean Background */}
                <div className="absolute inset-0">
                  {/* Wave Animation */}
                  <motion.div
                    animate={{
                      x: [-100, 100],
                      y: [-20, 20]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 opacity-30"
                  >
                    <div className="h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 transform skew-y-12" />
                  </motion.div>

                  {/* Pollution Particles */}
                  {activeModel === 'plastic-spread' && (
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-red-500 rounded-full"
                          initial={{
                            x: Math.random() * 400,
                            y: Math.random() * 300
                          }}
                          animate={{
                            x: Math.random() * 400,
                            y: Math.random() * 300
                          }}
                          transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Center Info Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/90 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-center mb-4">
                        {activeModel === 'plastic-spread' && <Droplet className="h-16 w-16 text-red-500" />}
                        {activeModel === 'oil-spill' && <AlertTriangle className="h-16 w-16 text-orange-500" />}
                        {activeModel === 'food-chain' && <Fish className="h-16 w-16 text-blue-500" />}
                        {activeModel === 'coral-bleaching' && <Atom className="h-16 w-16 text-purple-500" />}
                        {activeModel === 'cleanup-tech' && <Settings className="h-16 w-16 text-green-500" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {animationModels.find(m => m.id === activeModel)?.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isPlaying ? '动画播放中...' : '点击播放按钮开始'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animation Info Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {isPlaying ? `播放中: ${currentTime}s` : '准备就绪'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="space-y-4">
                {/* Playback Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="ocean-button px-6 py-3 flex items-center space-x-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-5 w-5" />
                        <span>暂停</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>播放</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentTime(0);
                    }}
                    className="ocean-button-secondary px-6 py-3 flex items-center space-x-2"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>重置</span>
                  </button>
                </div>

                {/* Simulation Parameters */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-gray-600" />
                    模拟参数控制
                  </h3>
                  <div className="space-y-3">
                    {simulationParams.map((param, index) => (
                      <div key={param.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{param.name}</span>
                          <span className="text-sm text-gray-600">
                            {param.value} {param.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          value={param.value}
                          onChange={(e) => handleParamChange(index, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Description */}
                <div className="bg-ocean-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">模型说明</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {animationModels.find(m => m.id === activeModel)?.description}
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <span className={`px-3 py-1 rounded-full ${
                      getTypeColor(animationModels.find(m => m.id === activeModel)?.type || '')
                    }`}>
                      {activeModel.includes('pollution') && '污染模型'}
                      {activeModel.includes('ecosystem') && '生态模型'}
                      {activeModel.includes('cleanup') && '清理模型'}
                    </span>
                    <span className="text-gray-600">
                      时长: {animationModels.find(m => m.id === activeModel)?.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 ocean-card p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">学习要点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Wind className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">环境因素</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      洋流、风向、温度等环境因素显著影响污染物的扩散模式
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Fish className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">生态影响</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      污染物通过食物链传递，对整个海洋生态系统造成深远影响
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimationModels; 