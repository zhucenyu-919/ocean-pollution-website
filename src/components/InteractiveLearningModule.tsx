import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Trophy,
  Target,
  Lightbulb,
  AlertTriangle,
  Info
} from 'lucide-react';

interface LearningContent {
  id: string;
  type: 'scenario' | 'quiz' | 'simulation' | 'game';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  points: number;
  scientificFact?: string;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  content: LearningContent[];
  totalPoints: number;
}

interface InteractiveLearningModuleProps {
  moduleId: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const InteractiveLearningModule: React.FC<InteractiveLearningModuleProps> = ({
  moduleId,
  onComplete,
  onClose
}) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [gameState, setGameState] = useState<any>({});

  const moduleData: Record<string, ModuleData> = {
    'ocean-explorer': {
      id: 'ocean-explorer',
      title: '虚拟海洋探索',
      description: '深入海洋不同深度，观察污染对生态系统的影响',
      learningObjectives: [
        '了解海洋分层结构和生态特征',
        '观察不同深度的污染类型和影响',
        '学习海洋生物的适应性和脆弱性',
        '掌握海洋保护的重要性'
      ],
      content: [
        {
          id: 'intro',
          type: 'scenario',
          title: '开始探索',
          content: '欢迎来到虚拟海洋探索！你将潜入不同深度的海洋，观察污染对海洋生态的影响。首先，我们从表层海水开始探索。',
          points: 10,
          scientificFact: '海洋表层（0-200米）是阳光能够穿透的区域，被称为真光层，这里生活着大部分海洋生物。'
        },
        {
          id: 'surface_pollution',
          type: 'quiz',
          title: '表层污染观察',
          content: '在海洋表层，你观察到大量漂浮的塑料垃圾。根据科学研究，这些塑料垃圾主要来源于哪里？',
          options: [
            '海上船只直接倾倒',
            '陆地垃圾通过河流输送',
            '海底火山喷发',
            '海洋生物产生'
          ],
          correctAnswer: 1,
          explanation: '研究表明，约80%的海洋塑料污染来自陆地，主要通过河流、雨水冲刷和风力传输到海洋中。',
          points: 20,
          scientificFact: '每年约有800万吨塑料垃圾进入海洋，相当于每分钟倾倒一卡车的塑料。'
        },
        {
          id: 'microplastic_impact',
          type: 'simulation',
          title: '微塑料影响模拟',
          content: '现在我们模拟微塑料对浮游生物的影响。调整微塑料浓度，观察对浮游生物摄食和繁殖的影响。',
          points: 30,
          scientificFact: '微塑料（直径<5mm）会被浮游生物误食，导致假饱腹感，影响正常摄食和营养吸收。'
        },
        {
          id: 'deep_ocean',
          type: 'scenario',
          title: '深海探索',
          content: '继续下潜到深海区域（1000米以下），这里是地球上最大的生态系统，但也受到污染威胁。',
          points: 15,
          scientificFact: '深海覆盖地球表面的95%，但我们对深海的了解还不到5%。'
        },
        {
          id: 'deep_pollution',
          type: 'quiz',
          title: '深海污染类型',
          content: '在深海区域，最主要的污染类型是什么？',
          options: [
            '塑料微粒沉降',
            '重金属污染',
            '化学污染物',
            '以上都是'
          ],
          correctAnswer: 3,
          explanation: '深海受到多种污染威胁：塑料微粒会沉降到海底，重金属通过洋流传输，化学污染物通过生物富集作用影响深海生物。',
          points: 25,
          scientificFact: '研究发现，即使在马里亚纳海沟最深处，也检测到了塑料微粒和有毒化学物质。'
        },
        {
          id: 'conservation_action',
          type: 'game',
          title: '保护行动',
          content: '作为海洋保护者，你需要制定保护策略。选择最有效的保护措施组合。',
          options: [
            '只关注表层清理',
            '源头减塑 + 海洋清理 + 生态修复',
            '只进行科学研究',
            '禁止所有海洋活动'
          ],
          correctAnswer: 1,
          explanation: '有效的海洋保护需要综合策略：从源头减少污染物产生，清理现有污染，修复受损生态系统。',
          points: 35,
          scientificFact: '综合保护策略比单一措施效果提高300%以上。'
        }
      ],
      totalPoints: 135
    },
    'cleanup-mission': {
      id: 'cleanup-mission',
      title: '海洋清理任务',
      description: '操控不同类型的清理设备，学习海洋清理技术和策略',
      learningObjectives: [
        '了解不同类型的海洋清理技术',
        '学习清理设备的工作原理',
        '掌握清理策略的制定方法',
        '理解清理工作的挑战和限制'
      ],
      content: [
        {
          id: 'mission_briefing',
          type: 'scenario',
          title: '任务简报',
          content: '你被任命为海洋清理任务指挥官。面前有一片被污染的海域，包含塑料垃圾、油污和化学污染物。你需要选择合适的清理设备和策略。',
          points: 10,
          scientificFact: 'The Ocean Cleanup项目使用被动收集系统，利用洋流自然力量收集塑料垃圾。'
        },
        {
          id: 'equipment_selection',
          type: 'quiz',
          title: '设备选择',
          content: '对于大面积的塑料垃圾清理，最有效的设备是什么？',
          options: [
            '人工潜水收集',
            '拖网渔船改装',
            '被动收集系统',
            '机器人潜艇'
          ],
          correctAnswer: 2,
          explanation: '被动收集系统利用洋流和风力，成本低、效率高，且对海洋生物影响最小。',
          points: 20,
          scientificFact: '被动收集系统每年可收集5-10万公斤塑料垃圾，运营成本比主动清理低90%。'
        },
        {
          id: 'oil_spill_response',
          type: 'simulation',
          title: '石油泄漏应对',
          content: '模拟石油泄漏清理：选择围油栏布设位置，调配吸油材料，协调清理船只。时间紧迫，石油正在扩散！',
          points: 40,
          scientificFact: '石油泄漏后的黄金清理时间是24-48小时，超过这个时间清理效率会大幅下降。'
        },
        {
          id: 'wildlife_protection',
          type: 'quiz',
          title: '野生动物保护',
          content: '在清理过程中，如何最大程度保护海洋生物？',
          options: [
            '加快清理速度，不考虑生物',
            '使用选择性清理技术',
            '暂停所有清理活动',
            '只在夜间清理'
          ],
          correctAnswer: 1,
          explanation: '选择性清理技术能够区分垃圾和海洋生物，避免误伤，是现代清理的标准做法。',
          points: 25,
          scientificFact: '先进的清理设备配备生物检测系统，能够识别并避开海洋生物，保护率达到99%以上。'
        },
        {
          id: 'efficiency_optimization',
          type: 'game',
          title: '效率优化',
          content: '你有有限的资源和时间。如何分配清理设备以达到最佳效果？拖拽设备到最需要的区域。',
          points: 30,
          scientificFact: '优化的清理策略能够将效率提高200%，同时减少50%的环境影响。'
        },
        {
          id: 'mission_complete',
          type: 'scenario',
          title: '任务完成',
          content: '恭喜！你成功完成了清理任务。通过科学的方法和策略，这片海域的污染程度降低了85%。',
          points: 15,
          scientificFact: '成功的海洋清理项目平均能够恢复海域生态系统的80-90%功能。'
        }
      ],
      totalPoints: 140
    },
    'pollution-lab': {
      id: 'pollution-lab',
      title: '污染实验室',
      description: '通过虚拟实验深入了解污染物的行为和影响机制',
      learningObjectives: [
        '理解污染物在海水中的扩散机制',
        '学习污染物的降解和转化过程',
        '掌握污染监测和分析方法',
        '了解污染物对生物的毒性机制'
      ],
      content: [
        {
          id: 'lab_intro',
          type: 'scenario',
          title: '实验室介绍',
          content: '欢迎来到海洋污染研究实验室！这里配备了最先进的分析设备，你将进行一系列实验来了解污染物的行为。',
          points: 10,
          scientificFact: '现代海洋污染检测技术可以检测到ppb（十亿分之一）级别的污染物浓度。'
        },
        {
          id: 'diffusion_experiment',
          type: 'simulation',
          title: '扩散实验',
          content: '在虚拟水槽中投入不同类型的污染物，观察它们的扩散模式。调整水流速度、温度等参数，记录扩散速率。',
          points: 35,
          scientificFact: '污染物的扩散速率遵循菲克定律，与浓度梯度成正比，与扩散系数相关。'
        },
        {
          id: 'bioaccumulation_test',
          type: 'quiz',
          title: '生物富集测试',
          content: '在食物链实验中，微塑料在不同营养级的浓度分别是：浮游植物1单位，浮游动物5单位，小鱼25单位。生物富集系数是多少？',
          options: ['2倍', '5倍', '10倍', '25倍'],
          correctAnswer: 1,
          explanation: '生物富集系数 = 上一营养级浓度 / 下一营养级浓度 = 5/1 = 5倍。这说明污染物在食物链中逐级富集。',
          points: 30,
          scientificFact: '顶级捕食者体内的污染物浓度可能比环境浓度高出数万倍。'
        },
        {
          id: 'degradation_kinetics',
          type: 'simulation',
          title: '降解动力学',
          content: '研究不同材料的降解速率：设置不同的环境条件（温度、pH、微生物活性），观察降解曲线。',
          points: 40,
          scientificFact: '塑料在海洋中的降解遵循一级动力学，半衰期可达数百年。'
        },
        {
          id: 'toxicity_assessment',
          type: 'quiz',
          title: '毒性评估',
          content: 'LC50是毒理学中的重要指标，它表示什么？',
          options: [
            '导致50%实验生物死亡的浓度',
            '导致50%实验生物中毒的浓度',
            '50%的致癌浓度',
            '50%的安全浓度'
          ],
          correctAnswer: 0,
          explanation: 'LC50（半致死浓度）是导致50%实验生物在特定时间内死亡的污染物浓度，是评估急性毒性的标准指标。',
          points: 25,
          scientificFact: 'LC50值越小，表示污染物毒性越强。某些重金属的LC50可低至μg/L级别。'
        }
      ],
      totalPoints: 140
    }
  };

  const currentModule = moduleData[moduleId];
  const currentContent = currentModule?.content[currentContentIndex];

  useEffect(() => {
    if (currentContentIndex >= currentModule.content.length) {
      setIsCompleted(true);
      onComplete(score);
    }
  }, [currentContentIndex, currentModule.content.length, score, onComplete]);

  const handleAnswer = (answerIndex: number) => {
    if (currentContent.type === 'quiz') {
      const isCorrect = answerIndex === currentContent.correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + currentContent.points);
      }
      setUserAnswers(prev => [...prev, answerIndex]);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setCurrentContentIndex(prev => prev + 1);
    
    // 对于非quiz类型，直接给分
    if (currentContent.type !== 'quiz') {
      setScore(prev => prev + currentContent.points);
    }
  };

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const renderContent = () => {
    if (!currentContent) return null;

    switch (currentContent.type) {
      case 'scenario':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">{currentContent.title}</h3>
                  <p className="text-blue-800">{currentContent.content}</p>
                </div>
              </div>
            </div>
            {currentContent.scientificFact && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">科学事实</h4>
                    <p className="text-sm text-green-800">{currentContent.scientificFact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{currentContent.title}</h3>
              <p className="text-gray-700 mb-6">{currentContent.content}</p>
              
              <div className="space-y-3">
                {currentContent.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showExplanation
                        ? index === currentContent.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : userAnswers[userAnswers.length - 1] === index
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                        : 'border-gray-200 hover:border-ocean-300 hover:bg-ocean-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">解释</h4>
                    <p className="text-sm text-yellow-800">{currentContent.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentContent.scientificFact && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">科学事实</h4>
                    <p className="text-sm text-green-800">{currentContent.scientificFact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Target className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">{currentContent.title}</h3>
                  <p className="text-purple-800 mb-4">{currentContent.content}</p>
                  
                  {/* 模拟交互界面 */}
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-pulse">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
                          <p className="text-blue-700 font-medium">模拟运行中...</p>
                          <p className="text-sm text-blue-600">观察参数变化</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-600">扩散速率</div>
                        <div className="text-lg font-semibold text-gray-900">2.3 m/s</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-600">浓度</div>
                        <div className="text-lg font-semibold text-gray-900">45 ppm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {currentContent.scientificFact && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">科学事实</h4>
                    <p className="text-sm text-green-800">{currentContent.scientificFact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'game':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Trophy className="h-6 w-6 text-orange-600 mt-1" />
                <div className="w-full">
                  <h3 className="font-semibold text-orange-900 mb-2">{currentContent.title}</h3>
                  <p className="text-orange-800 mb-4">{currentContent.content}</p>
                  
                  {/* 游戏界面 */}
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="h-64 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-lg relative overflow-hidden">
                      {/* 游戏元素 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {currentContent.options?.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-ocean-300"
                              >
                                <div className="text-sm font-medium text-gray-900">{option}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showExplanation && currentContent.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">结果分析</h4>
                    <p className="text-sm text-yellow-800">{currentContent.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentContent.scientificFact && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">科学事实</h4>
                    <p className="text-sm text-green-800">{currentContent.scientificFact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    const percentage = Math.round((score / currentModule.totalPoints) * 100);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">学习完成！</h2>
            <p className="text-gray-600 mb-6">你已经完成了 {currentModule.title}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-ocean-600 mb-1">{score}/{currentModule.totalPoints}</div>
              <div className="text-sm text-gray-600">总得分</div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-ocean-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-1">{percentage}% 完成度</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 ocean-button"
              >
                返回学习中心
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ocean-500 to-ocean-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{currentModule.title}</h2>
              <p className="text-ocean-100 mt-1">{currentModule.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>进度: {currentContentIndex + 1}/{currentModule.content.length}</span>
              <span>得分: {score}/{currentModule.totalPoints}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentContentIndex + 1) / currentModule.content.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentContentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentContentIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>上一步</span>
          </button>

          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-600">+{currentContent?.points || 0} 分</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentContent?.type === 'quiz' && !showExplanation}
            className="flex items-center space-x-2 ocean-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>下一步</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveLearningModule; 