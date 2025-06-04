import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  BookOpen, 
  Award, 
  Clock, 
  Gamepad2,
  Beaker,
  Waves,
  Target,
  Users,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  type: 'game' | 'simulation' | 'quiz' | 'vr';
  progress: number;
  locked: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

const InteractiveLearning: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const learningModules: LearningModule[] = [
    {
      id: 'ocean-explorer',
      title: '虚拟海洋探索',
      description: '潜入3D虚拟海洋环境，亲眼见证污染对海洋生态的影响',
      icon: <Waves className="h-8 w-8" />,
      difficulty: 'easy',
      duration: '20分钟',
      type: 'vr',
      progress: 100,
      locked: false
    },
    {
      id: 'cleanup-mission',
      title: '海洋清理任务',
      description: '操控清理船只，学习不同污染物的清理方法和技术',
      icon: <Gamepad2 className="h-8 w-8" />,
      difficulty: 'medium',
      duration: '30分钟',
      type: 'game',
      progress: 75,
      locked: false
    },
    {
      id: 'pollution-lab',
      title: '污染实验室',
      description: '通过虚拟实验了解污染物在海水中的扩散和降解过程',
      icon: <Beaker className="h-8 w-8" />,
      difficulty: 'hard',
      duration: '45分钟',
      type: 'simulation',
      progress: 50,
      locked: false
    },
    {
      id: 'ecosystem-quiz',
      title: '生态系统测验',
      description: '测试你对海洋生态系统和污染影响的理解程度',
      icon: <Target className="h-8 w-8" />,
      difficulty: 'medium',
      duration: '15分钟',
      type: 'quiz',
      progress: 30,
      locked: false
    },
    {
      id: 'coral-restoration',
      title: '珊瑚礁修复',
      description: '学习珊瑚礁生态系统，体验珊瑚修复的过程和挑战',
      icon: <Zap className="h-8 w-8" />,
      difficulty: 'hard',
      duration: '40分钟',
      type: 'simulation',
      progress: 0,
      locked: true
    },
    {
      id: 'marine-rescue',
      title: '海洋生物救援',
      description: '救助受污染影响的海洋生物，学习急救和康复知识',
      icon: <Users className="h-8 w-8" />,
      difficulty: 'easy',
      duration: '25分钟',
      type: 'game',
      progress: 0,
      locked: true
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-dive',
      title: '初次潜水',
      description: '完成第一次虚拟海洋探索',
      icon: <Award className="h-6 w-6" />,
      unlocked: true,
      date: '2024-03-15'
    },
    {
      id: 'cleanup-hero',
      title: '清洁英雄',
      description: '在清理任务中收集100件垃圾',
      icon: <CheckCircle className="h-6 w-6" />,
      unlocked: true,
      date: '2024-03-16'
    },
    {
      id: 'knowledge-master',
      title: '知识大师',
      description: '在生态测验中获得满分',
      icon: <BookOpen className="h-6 w-6" />,
      unlocked: false
    },
    {
      id: 'lab-expert',
      title: '实验专家',
      description: '完成所有污染实验',
      icon: <Beaker className="h-6 w-6" />,
      unlocked: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
      default: return '未知';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'game': return '🎮';
      case 'simulation': return '🔬';
      case 'quiz': return '📝';
      case 'vr': return '🥽';
      default: return '📚';
    }
  };

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

        {/* User Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ocean-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">学习进度</h3>
              <p className="text-sm text-gray-600 mt-1">继续努力，解锁更多学习内容！</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-ocean-600">{score}</div>
              <div className="text-sm text-gray-600">总积分</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-ocean-500 to-ocean-600 h-3 rounded-full transition-all duration-500"
              style={{ width: '45%' }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">总体完成度: 45%</p>
        </motion.div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`ocean-card p-6 cursor-pointer transition-all ${
                module.locked ? 'opacity-60' : 'hover:shadow-xl'
              }`}
              onClick={() => !module.locked && setSelectedModule(module.id)}
            >
              {/* Module Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  module.locked ? 'bg-gray-100' : 
                  module.type === 'game' ? 'bg-purple-100' :
                  module.type === 'simulation' ? 'bg-blue-100' :
                  module.type === 'quiz' ? 'bg-orange-100' :
                  'bg-green-100'
                }`}>
                  <div className={
                    module.locked ? 'text-gray-400' :
                    module.type === 'game' ? 'text-purple-600' :
                    module.type === 'simulation' ? 'text-blue-600' :
                    module.type === 'quiz' ? 'text-orange-600' :
                    'text-green-600'
                  }>
                    {module.icon}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(module.type)}</span>
                  {module.locked && (
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Module Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {module.description}
              </p>

              {/* Module Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {module.duration}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getDifficultyColor(module.difficulty)
                }`}>
                  {getDifficultyText(module.difficulty)}
                </span>
              </div>

              {/* Progress Bar */}
              {!module.locked && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">进度</span>
                    <span className="text-xs font-medium text-gray-900">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
                  module.locked 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : module.progress === 100
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : module.progress > 0
                    ? 'bg-ocean-500 text-white hover:bg-ocean-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={module.locked}
              >
                {module.locked ? '未解锁' : 
                 module.progress === 100 ? '重新体验' :
                 module.progress > 0 ? '继续学习' : '开始学习'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="ocean-card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            学习成就
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className={`inline-flex p-3 rounded-full mb-3 ${
                  achievement.unlocked ? 'bg-yellow-200' : 'bg-gray-200'
                }`}>
                  <div className={achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}>
                    {achievement.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-gray-500 mt-2">
                    {achievement.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Featured Module Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 ocean-card p-6 bg-gradient-to-r from-ocean-50 to-green-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                今日推荐：虚拟海洋探索
              </h3>
              <p className="text-gray-600">
                潜入太平洋深处，体验海洋污染的真实影响。使用VR模式获得最佳体验！
              </p>
            </div>
            <button className="ocean-button px-6 py-3">
              立即体验
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveLearning; 