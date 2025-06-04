import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  BookOpen, 
  Target, 
  ChevronRight, 
  Clock,
  Users,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Video
} from 'lucide-react';
import { deepThinkingModulesContent } from '../data/deepThinkingModules';

interface ThinkingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  completed: boolean;
}

interface ModuleContent {
  objectives: string[];
  chapters: Chapter[];
  caseStudies: CaseStudy[];
  quiz: QuizQuestion[];
}

interface Chapter {
  title: string;
  content: string;
  videoUrl?: string;
  readingTime: string;
}

interface CaseStudy {
  title: string;
  location: string;
  summary: string;
  impact: string;
  solution: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DeepThinking: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeModuleContent, setActiveModuleContent] = useState<ThinkingModule | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'objectives' | 'chapters' | 'cases' | 'quiz'>('objectives');

  const modules: ThinkingModule[] = [
    {
      id: 'plastic-pollution',
      title: '塑料污染的全球影响',
      description: '探索塑料污染的形成机制、传播路径以及对海洋生态系统的深远影响',
      duration: '45分钟',
      difficulty: 'beginner',
      topics: ['微塑料', '食物链影响', '海洋生物', '人类健康'],
      completed: true
    },
    {
      id: 'chemical-contamination',
      title: '化学污染物的生态毒理',
      description: '深入分析重金属、农药、工业化学品对海洋生物的毒性机制',
      duration: '60分钟',
      difficulty: 'intermediate',
      topics: ['生物累积', '毒性机制', '环境化学', '风险评估'],
      completed: false
    },
    {
      id: 'oil-spill-dynamics',
      title: '石油泄漏的环境动力学',
      description: '研究石油泄漏的扩散模式、风化过程和生态修复策略',
      duration: '50分钟',
      difficulty: 'advanced',
      topics: ['扩散模型', '生物修复', '环境修复', '应急响应'],
      completed: false
    },
    {
      id: 'noise-pollution',
      title: '海洋噪声污染与生物行为',
      description: '分析人为噪声对海洋哺乳动物导航、交流和生存的影响',
      duration: '40分钟',
      difficulty: 'intermediate',
      topics: ['声学生态', '动物行为', '导航系统', '种群影响'],
      completed: false
    },
    {
      id: 'climate-acidification',
      title: '海洋酸化与气候变化',
      description: '探讨CO2排放导致的海洋酸化及其对珊瑚礁和钙化生物的影响',
      duration: '55分钟',
      difficulty: 'advanced',
      topics: ['碳循环', '珊瑚白化', '钙化过程', '生态系统服务'],
      completed: false
    },
    {
      id: 'eutrophication',
      title: '富营养化的生态机制',
      description: '研究营养物质过载导致的水华现象和海洋死区形成机制',
      duration: '45分钟',
      difficulty: 'intermediate',
      topics: ['营养循环', '藻华爆发', '氧气耗竭', '生态平衡'],
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const handleStartLearning = (module: ThinkingModule) => {
    const moduleContent = deepThinkingModulesContent[module.id];
    if (moduleContent) {
      setActiveModuleContent(module);
      setCurrentQuizIndex(0);
      setQuizAnswers([]);
      setShowQuizResults(false);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    const moduleContent = activeModuleContent ? deepThinkingModulesContent[activeModuleContent.id] : null;
    if (currentQuizIndex < (moduleContent?.quiz.length || 0) - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const calculateQuizScore = () => {
    const moduleContent = activeModuleContent ? deepThinkingModulesContent[activeModuleContent.id] : null;
    if (!moduleContent?.quiz) return 0;
    let correct = 0;
    moduleContent.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / moduleContent.quiz.length) * 100);
  };

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
            <div className="p-4 bg-purple-gradient rounded-full shadow-lg">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            海洋污染深度思考
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            通过科学的思维方式，深入探索海洋污染的复杂机制，理解环境问题的根本原因和解决方案
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="ocean-card p-6 text-center"
          >
            <BookOpen className="h-8 w-8 text-ocean-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-gray-600">深度模块</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="ocean-card p-6 text-center"
          >
            <Clock className="h-8 w-8 text-ocean-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">4.5小时</div>
            <div className="text-gray-600">总学习时长</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="ocean-card p-6 text-center"
          >
            <Users className="h-8 w-8 text-ocean-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">1,234</div>
            <div className="text-gray-600">学习者</div>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="ocean-card p-6 cursor-pointer group"
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    module.completed ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {module.completed ? (
                      <Target className="h-6 w-6 text-green-600" />
                    ) : (
                      <Lightbulb className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {getDifficultyText(module.difficulty)}
                    </span>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: selectedModule === module.id ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-ocean-600" />
                </motion.div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
                {module.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {module.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {module.duration}
                </span>
                {module.completed && (
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    已完成
                  </span>
                )}
              </div>

              {/* Expanded Content */}
              {selectedModule === module.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 pt-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">主要话题：</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-ocean-50 text-ocean-700 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleStartLearning(module)}
                      className="ocean-button text-sm px-4 py-2"
                    >
                      {module.completed ? '重新学习' : '开始学习'}
                    </button>
                    <button className="ocean-button-secondary text-sm px-4 py-2">
                      预览内容
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 ocean-card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            推荐学习路径
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">基础理解阶段</h3>
                <p className="text-gray-600 text-sm">先学习塑料污染的全球影响，建立基础认知</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">机制深入阶段</h3>
                <p className="text-gray-600 text-sm">学习化学污染和噪声污染的具体机制</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">综合应用阶段</h3>
                <p className="text-gray-600 text-sm">掌握复杂的生态系统动力学和解决方案</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Learning Content Modal */}
      {activeModuleContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModuleContent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{activeModuleContent.title}</h2>
              <button
                onClick={() => setActiveModuleContent(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-88px)]">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 px-6">
                <nav className="flex space-x-8">
                  <button 
                    onClick={() => setActiveTab('objectives')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      activeTab === 'objectives' 
                        ? 'border-ocean-600 text-ocean-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    学习目标
                  </button>
                  <button 
                    onClick={() => setActiveTab('chapters')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      activeTab === 'chapters' 
                        ? 'border-ocean-600 text-ocean-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    章节内容
                  </button>
                  <button 
                    onClick={() => setActiveTab('cases')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      activeTab === 'cases' 
                        ? 'border-ocean-600 text-ocean-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    案例分析
                  </button>
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      activeTab === 'quiz' 
                        ? 'border-ocean-600 text-ocean-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    小测验
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Learning Objectives Tab */}
                {activeTab === 'objectives' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="h-6 w-6 mr-2 text-ocean-600" />
                      学习目标
                    </h3>
                    <div className="space-y-3">
                      {deepThinkingModulesContent[activeModuleContent.id]?.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chapters Tab */}
                {activeTab === 'chapters' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="h-6 w-6 mr-2 text-ocean-600" />
                      章节内容
                    </h3>
                    <div className="space-y-6">
                      {deepThinkingModulesContent[activeModuleContent.id]?.chapters.map((chapter, index) => (
                        <div key={index} className="ocean-card p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">{chapter.title}</h4>
                            <span className="text-sm text-gray-500 flex items-center bg-gray-100 px-2 py-1 rounded">
                              <Clock className="h-4 w-4 mr-1" />
                              {chapter.readingTime}
                            </span>
                          </div>
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{chapter.content}</p>
                          </div>
                          {chapter.videoUrl && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <button className="text-ocean-600 text-sm flex items-center hover:text-ocean-700 transition-colors">
                                <Video className="h-4 w-4 mr-1" />
                                观看相关视频
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Studies Tab */}
                {activeTab === 'cases' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-ocean-600" />
                      案例分析
                    </h3>
                    <div className="space-y-6">
                      {deepThinkingModulesContent[activeModuleContent.id]?.caseStudies.map((caseStudy, index) => (
                        <div key={index} className="ocean-card p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h4>
                            <span className="text-sm text-ocean-600 bg-ocean-50 px-2 py-1 rounded">
                              {caseStudy.location}
                            </span>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">事件概述</h5>
                              <p className="text-gray-700 leading-relaxed">{caseStudy.summary}</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">环境影响</h5>
                              <p className="text-gray-700 leading-relaxed">{caseStudy.impact}</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">解决方案</h5>
                              <p className="text-gray-700 leading-relaxed">{caseStudy.solution}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quiz Tab */}
                {activeTab === 'quiz' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-6 w-6 mr-2 text-ocean-600" />
                      小测验
                    </h3>
                    
                    {!showQuizResults ? (
                      <div className="space-y-6">
                        {deepThinkingModulesContent[activeModuleContent.id]?.quiz.map((question, index) => (
                          <div key={index} className="ocean-card p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              题目 {index + 1}: {question.question}
                            </h4>
                            <div className="space-y-3">
                              {question.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  onClick={() => handleQuizAnswer(optionIndex)}
                                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                    quizAnswers[index] === optionIndex
                                      ? 'border-ocean-600 bg-ocean-50 text-ocean-700'
                                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optionIndex)}. {option}
                                </button>
                              ))}
                            </div>
                            {quizAnswers[index] !== undefined && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>解释：</strong>{question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {quizAnswers.length === deepThinkingModulesContent[activeModuleContent.id]?.quiz.length && (
                          <div className="text-center">
                            <button
                              onClick={() => setShowQuizResults(true)}
                              className="ocean-button px-8 py-3"
                            >
                              查看测验结果
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="ocean-card p-8 text-center">
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">测验完成！</h4>
                        <div className="text-6xl font-bold text-ocean-600 mb-4">
                          {calculateQuizScore()}%
                        </div>
                        <p className="text-gray-600 mb-6 text-lg">
                          你答对了 {deepThinkingModulesContent[activeModuleContent.id]?.quiz.length || 0} 道题中的{' '}
                          {deepThinkingModulesContent[activeModuleContent.id]?.quiz.filter((q, i) => quizAnswers[i] === q.correctAnswer).length} 道
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => {
                              setCurrentQuizIndex(0);
                              setQuizAnswers([]);
                              setShowQuizResults(false);
                            }}
                            className="ocean-button-secondary px-6 py-2"
                          >
                            重新测验
                          </button>
                          <button
                            onClick={() => setActiveTab('objectives')}
                            className="ocean-button px-6 py-2"
                          >
                            返回学习
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DeepThinking; 