import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  Sliders,
  Timer,
  Activity
} from 'lucide-react';

interface AnimationModel {
  id: string;
  title: string;
  description: string;
  duration: number; // 秒
  type: 'pollution' | 'ecosystem' | 'cleanup';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  scientificBasis: string;
  parameters: SimulationParam[];
}

interface SimulationParam {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  description: string;
  impact: string;
}

interface AnimationState {
  isPlaying: boolean;
  currentTime: number;
  speed: number;
  particles: Particle[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'plastic' | 'oil' | 'chemical' | 'organism' | 'cleaner';
  life: number;
  maxLife: number;
}

const AnimationModels: React.FC = () => {
  const [activeModel, setActiveModel] = useState<string>('plastic-spread');
  const [animationState, setAnimationState] = useState<AnimationState>({
    isPlaying: false,
    currentTime: 0,
    speed: 1,
    particles: []
  });
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const animationModels: AnimationModel[] = [
    {
      id: 'plastic-spread',
      title: '塑料污染扩散模型',
      description: '基于真实洋流数据模拟塑料垃圾在海洋中的扩散过程',
      duration: 180,
      type: 'pollution',
      difficulty: 'basic',
      scientificBasis: '基于NOAA洋流数据和Maximenko等人(2012)的塑料扩散研究',
      parameters: [
        {
          id: 'current_speed',
          name: '洋流速度',
          value: 0.5,
          min: 0.1,
          max: 2.0,
          unit: 'm/s',
          description: '海洋表面洋流的平均速度',
          impact: '影响塑料垃圾的传播速度和方向'
        },
        {
          id: 'wind_speed',
          name: '风速',
          value: 8,
          min: 0,
          max: 25,
          unit: 'm/s',
          description: '海面风速，影响表面漂浮物运动',
          impact: '强风会加速塑料垃圾的扩散'
        },
        {
          id: 'plastic_density',
          name: '塑料密度',
          value: 50,
          min: 10,
          max: 200,
          unit: '件/km²',
          description: '单位面积内的塑料垃圾数量',
          impact: '密度越高，形成垃圾带的可能性越大'
        },
        {
          id: 'degradation_rate',
          name: '降解速率',
          value: 0.1,
          min: 0.01,
          max: 0.5,
          unit: '%/年',
          description: '塑料在海洋环境中的年降解率',
          impact: '影响塑料在海洋中的存留时间'
        }
      ]
    },
    {
      id: 'oil-spill',
      title: '石油泄漏扩散动画',
      description: '模拟石油泄漏的扩散、乳化和风化过程',
      duration: 300,
      type: 'pollution',
      difficulty: 'intermediate',
      scientificBasis: '基于NOAA GNOME模型和Fingas(2011)的石油风化研究',
      parameters: [
        {
          id: 'spill_volume',
          name: '泄漏量',
          value: 1000,
          min: 100,
          max: 10000,
          unit: '桶',
          description: '石油泄漏的总体积',
          impact: '决定污染范围和持续时间'
        },
        {
          id: 'viscosity',
          name: '石油粘度',
          value: 15,
          min: 5,
          max: 50,
          unit: 'cSt',
          description: '石油的运动粘度',
          impact: '影响扩散速度和乳化程度'
        },
        {
          id: 'wave_height',
          name: '波浪高度',
          value: 1.5,
          min: 0.5,
          max: 5.0,
          unit: 'm',
          description: '海面波浪的平均高度',
          impact: '影响石油的混合和乳化过程'
        },
        {
          id: 'temperature',
          name: '海水温度',
          value: 15,
          min: 0,
          max: 30,
          unit: '°C',
          description: '海水表面温度',
          impact: '温度越高，挥发和生物降解越快'
        }
      ]
    },
    {
      id: 'microplastic-food-chain',
      title: '微塑料食物链传递',
      description: '展示微塑料如何通过食物链在不同营养级间传递和生物富集',
      duration: 240,
      type: 'ecosystem',
      difficulty: 'advanced',
      scientificBasis: '基于Rochman等人(2015)的微塑料生物富集研究',
      parameters: [
        {
          id: 'microplastic_size',
          name: '微塑料尺寸',
          value: 100,
          min: 1,
          max: 5000,
          unit: 'μm',
          description: '微塑料颗粒的平均直径',
          impact: '尺寸影响被摄食的可能性'
        },
        {
          id: 'bioaccumulation_factor',
          name: '生物富集系数',
          value: 2.5,
          min: 1.0,
          max: 10.0,
          unit: '倍',
          description: '每个营养级的富集倍数',
          impact: '决定顶级捕食者体内的浓度'
        },
        {
          id: 'trophic_levels',
          name: '营养级数',
          value: 4,
          min: 2,
          max: 6,
          unit: '级',
          description: '食物链的营养级层数',
          impact: '级数越多，顶级富集浓度越高'
        },
        {
          id: 'transfer_efficiency',
          name: '传递效率',
          value: 0.8,
          min: 0.1,
          max: 1.0,
          unit: '比例',
          description: '微塑料在营养级间的传递效率',
          impact: '影响食物链污染的严重程度'
        }
      ]
    },
    {
      id: 'coral-bleaching',
      title: '珊瑚白化过程模拟',
      description: '模拟海洋酸化和温度升高导致的珊瑚白化动态过程',
      duration: 200,
      type: 'ecosystem',
      difficulty: 'intermediate',
      scientificBasis: '基于Hughes等人(2017)的全球珊瑚白化研究',
      parameters: [
        {
          id: 'temperature_anomaly',
          name: '温度异常',
          value: 2.0,
          min: 0.5,
          max: 5.0,
          unit: '°C',
          description: '相对于长期平均值的温度升高',
          impact: '温度异常越大，白化越严重'
        },
        {
          id: 'ph_level',
          name: 'pH值',
          value: 7.8,
          min: 7.5,
          max: 8.2,
          unit: 'pH',
          description: '海水的酸碱度',
          impact: 'pH越低，珊瑚钙化能力越弱'
        },
        {
          id: 'stress_duration',
          name: '胁迫持续时间',
          value: 30,
          min: 7,
          max: 90,
          unit: '天',
          description: '高温胁迫的持续时间',
          impact: '持续时间越长，恢复可能性越小'
        },
        {
          id: 'coral_resilience',
          name: '珊瑚抗性',
          value: 0.6,
          min: 0.1,
          max: 1.0,
          unit: '指数',
          description: '珊瑚对环境胁迫的抗性',
          impact: '抗性越强，白化程度越轻'
        }
      ]
    },
    {
      id: 'ocean-cleanup',
      title: '海洋清理技术演示',
      description: '展示不同海洋清理技术的工作原理和效果对比',
      duration: 360,
      type: 'cleanup',
      difficulty: 'basic',
      scientificBasis: '基于The Ocean Cleanup项目和各种清理技术的实际数据',
      parameters: [
        {
          id: 'cleanup_efficiency',
          name: '清理效率',
          value: 75,
          min: 20,
          max: 95,
          unit: '%',
          description: '清理设备的垃圾收集效率',
          impact: '效率越高，清理效果越好'
        },
        {
          id: 'operation_speed',
          name: '作业速度',
          value: 3,
          min: 1,
          max: 8,
          unit: 'km/h',
          description: '清理设备的作业速度',
          impact: '速度影响清理覆盖面积'
        },
        {
          id: 'selectivity',
          name: '选择性',
          value: 0.9,
          min: 0.5,
          max: 1.0,
          unit: '比例',
          description: '只收集垃圾而不伤害海洋生物的能力',
          impact: '选择性越高，生态影响越小'
        },
        {
          id: 'capacity',
          name: '载荷容量',
          value: 500,
          min: 100,
          max: 2000,
          unit: 'kg',
          description: '单次作业的最大载荷',
          impact: '容量越大，作业效率越高'
        }
      ]
    }
  ];

  const currentModel = animationModels.find(m => m.id === activeModel)!;
  const [modelParams, setModelParams] = useState<SimulationParam[]>(currentModel.parameters);

  // 初始化粒子系统
  const initializeParticles = (modelId: string, params: SimulationParam[]) => {
    const particles: Particle[] = [];
    const particleCount = getParticleCount(modelId, params);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(i, modelId, params));
    }
    
    return particles;
  };

  const getParticleCount = (modelId: string, params: SimulationParam[]): number => {
    switch (modelId) {
      case 'plastic-spread':
        const density = params.find(p => p.id === 'plastic_density')?.value || 50;
        return Math.floor(density * 2);
      case 'oil-spill':
        const volume = params.find(p => p.id === 'spill_volume')?.value || 1000;
        return Math.floor(volume / 10);
      case 'microplastic-food-chain':
        return 200;
      case 'coral-bleaching':
        return 150;
      case 'ocean-cleanup':
        return 300;
      default:
        return 100;
    }
  };

  const createParticle = (id: number, modelId: string, params: SimulationParam[]): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return { id, x: 0, y: 0, vx: 0, vy: 0, size: 1, color: '#000', type: 'plastic', life: 1, maxLife: 1 };

    const baseParticle = {
      id,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 1
    };

    switch (modelId) {
      case 'plastic-spread':
        return {
          ...baseParticle,
          x: canvas.width * 0.1 + Math.random() * canvas.width * 0.2,
          y: canvas.height * 0.4 + Math.random() * canvas.height * 0.2,
          size: Math.random() * 3 + 1,
          color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 4)],
          type: 'plastic'
        };
      case 'oil-spill':
        const distance = Math.random() * 50;
        const angle = Math.random() * Math.PI * 2;
        return {
          ...baseParticle,
          x: canvas.width * 0.5 + Math.cos(angle) * distance,
          y: canvas.height * 0.5 + Math.sin(angle) * distance,
          size: Math.random() * 8 + 2,
          color: `rgba(${139 + Math.random() * 50}, ${69 + Math.random() * 30}, ${19 + Math.random() * 20}, ${0.7 + Math.random() * 0.3})`,
          type: 'oil'
        };
      case 'microplastic-food-chain':
        const level = Math.floor(Math.random() * 4);
        const colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'];
        const sizes = [1, 2, 4, 6];
        return {
          ...baseParticle,
          size: sizes[level] + Math.random() * 2,
          color: colors[level],
          type: level === 0 ? 'plastic' : 'organism'
        };
      case 'coral-bleaching':
        return {
          ...baseParticle,
          x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
          y: canvas.height * 0.6 + Math.random() * canvas.height * 0.3,
          size: Math.random() * 6 + 3,
          color: Math.random() > 0.5 ? '#ff7f7f' : '#ffb347',
          type: 'organism'
        };
      case 'ocean-cleanup':
        return {
          ...baseParticle,
          size: Math.random() * 4 + 1,
          color: Math.random() > 0.8 ? '#4ecdc4' : '#ff6b6b',
          type: Math.random() > 0.8 ? 'cleaner' : 'plastic'
        };
      default:
        return { ...baseParticle, size: 2, color: '#000', type: 'plastic' };
    }
  };

  // 动画更新逻辑
  const updateAnimation = () => {
    if (!animationState.isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制海洋背景
    drawOceanBackground(ctx, canvas);

    // 更新和绘制粒子
    const updatedParticles = animationState.particles.map(particle => 
      updateParticle(particle, activeModel, modelParams, canvas)
    ).filter(particle => particle.life > 0);

    // 绘制粒子
    updatedParticles.forEach(particle => drawParticle(ctx, particle));

    // 绘制模型特定效果
    drawModelSpecificEffects(ctx, canvas, activeModel, modelParams, animationState.currentTime);

    // 更新状态
    setAnimationState(prev => ({
      ...prev,
      currentTime: prev.currentTime + 0.016 * prev.speed, // 60fps
      particles: updatedParticles
    }));

    animationRef.current = requestAnimationFrame(updateAnimation);
  };

  const drawOceanBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#4682B4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 波浪效果
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = canvas.height * 0.1 + Math.sin((x + animationState.currentTime * 50 + i * 100) * 0.01) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  const updateParticle = (particle: Particle, modelId: string, params: SimulationParam[], canvas: HTMLCanvasElement): Particle => {
    let newParticle = { ...particle };

    switch (modelId) {
      case 'plastic-spread':
        const currentSpeed = params.find(p => p.id === 'current_speed')?.value || 0.5;
        const windSpeed = params.find(p => p.id === 'wind_speed')?.value || 8;
        newParticle.vx += (currentSpeed * 0.1 + windSpeed * 0.05) * (Math.random() - 0.5);
        newParticle.vy += currentSpeed * 0.1 * (Math.random() - 0.5);
        break;
      
      case 'oil-spill':
        const viscosity = params.find(p => p.id === 'viscosity')?.value || 15;
        const waveHeight = params.find(p => p.id === 'wave_height')?.value || 1.5;
        newParticle.vx *= (1 - viscosity * 0.01);
        newParticle.vy *= (1 - viscosity * 0.01);
        newParticle.vx += waveHeight * 0.1 * (Math.random() - 0.5);
        newParticle.vy += waveHeight * 0.1 * (Math.random() - 0.5);
        newParticle.size *= 1.001; // 扩散
        break;

      case 'microplastic-food-chain':
        // 模拟食物链传递
        if (particle.type === 'plastic') {
          newParticle.vx += (Math.random() - 0.5) * 0.5;
          newParticle.vy += (Math.random() - 0.5) * 0.5;
        } else {
          // 生物运动
          newParticle.vx += (Math.random() - 0.5) * 2;
          newParticle.vy += (Math.random() - 0.5) * 2;
        }
        break;

      case 'coral-bleaching':
        const tempAnomaly = params.find(p => p.id === 'temperature_anomaly')?.value || 2.0;
        const phLevel = params.find(p => p.id === 'ph_level')?.value || 7.8;
        // 根据温度和pH调整颜色
        if (tempAnomaly > 2.5 || phLevel < 7.7) {
          newParticle.color = '#ffffff'; // 白化
        }
        break;

      case 'ocean-cleanup':
        if (particle.type === 'cleaner') {
          newParticle.vx = Math.sin(animationState.currentTime * 0.1) * 2;
          newParticle.vy = Math.cos(animationState.currentTime * 0.1) * 1;
        }
        break;
    }

    // 更新位置
    newParticle.x += newParticle.vx;
    newParticle.y += newParticle.vy;

    // 边界处理
    if (newParticle.x < 0 || newParticle.x > canvas.width) newParticle.vx *= -0.8;
    if (newParticle.y < 0 || newParticle.y > canvas.height) newParticle.vy *= -0.8;
    
    newParticle.x = Math.max(0, Math.min(canvas.width, newParticle.x));
    newParticle.y = Math.max(0, Math.min(canvas.height, newParticle.y));

    // 生命周期
    const degradationRate = params.find(p => p.id === 'degradation_rate')?.value || 0.1;
    newParticle.life -= degradationRate * 0.001;

    return newParticle;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawModelSpecificEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, modelId: string, params: SimulationParam[], time: number) => {
    switch (modelId) {
      case 'plastic-spread':
        // 绘制洋流箭头
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        for (let x = 50; x < canvas.width; x += 100) {
          for (let y = 50; y < canvas.height; y += 100) {
            const angle = Math.sin(time * 0.01 + x * 0.01) * 0.5;
            drawArrow(ctx, x, y, x + Math.cos(angle) * 30, y + Math.sin(angle) * 30);
          }
        }
        break;
      
      case 'oil-spill':
        // 绘制扩散圈
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.5, canvas.height * 0.5, time * 2, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  // 控制函数
  const handlePlay = () => {
    if (!animationState.isPlaying) {
      const particles = initializeParticles(activeModel, modelParams);
      setAnimationState(prev => ({
        ...prev,
        isPlaying: true,
        particles
      }));
    } else {
      setAnimationState(prev => ({ ...prev, isPlaying: false }));
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const handleReset = () => {
    setAnimationState({
      isPlaying: false,
      currentTime: 0,
      speed: 1,
      particles: []
    });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleParamChange = (paramId: string, newValue: number) => {
    setModelParams(prev => 
      prev.map(param => 
        param.id === paramId ? { ...param, value: newValue } : param
      )
    );
  };

  const handleModelChange = (modelId: string) => {
    handleReset();
    setActiveModel(modelId);
    const newModel = animationModels.find(m => m.id === modelId)!;
    setModelParams(newModel.parameters);
  };

  // 动画循环
  useEffect(() => {
    if (animationState.isPlaying) {
      animationRef.current = requestAnimationFrame(updateAnimation);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationState.isPlaying, animationState.particles, activeModel, modelParams]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            海洋污染动态模拟
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            基于真实科学数据的交互式动画模型，深入理解海洋污染的动态过程
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Model List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="ocean-card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">模拟模型</h2>
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
                      onClick={() => handleModelChange(model.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{model.title}</h3>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          activeModel === model.id ? 'rotate-90 text-ocean-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{model.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-500">{formatTime(model.duration)}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(model.type)}`}>
                          {model.type === 'pollution' ? '污染' : model.type === 'ecosystem' ? '生态' : '清理'}
                        </span>
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
              <div className="relative mb-6">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-96 bg-gradient-to-br from-ocean-100 to-blue-200 rounded-lg border-2 border-gray-200"
                />
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg">
                  <div className="text-sm font-medium">{currentModel.title}</div>
                  <div className="text-xs opacity-75">
                    时间: {formatTime(animationState.currentTime)} / {formatTime(currentModel.duration)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/30 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (animationState.currentTime / currentModel.duration) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlay}
                    className="ocean-button flex items-center space-x-2"
                  >
                    {animationState.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span>{animationState.isPlaying ? '暂停' : '播放'}</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="ocean-button-secondary flex items-center space-x-2"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>重置</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Timer className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 min-w-[60px]">
                      速度: {animationState.speed}x
                    </span>
                    <input
                      type="range"
                      min={0.25}
                      max={4}
                      step={0.25}
                      value={animationState.speed}
                      onChange={(e) => setAnimationState(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                      className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      title="调整播放速度"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-lg transition-colors ${
                      showSettings ? 'bg-ocean-100 text-ocean-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scientific Basis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">科学依据</h4>
                    <p className="text-sm text-blue-700">{currentModel.scientificBasis}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parameters Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="ocean-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">模拟参数</h2>
                <Sliders className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="space-y-6">
                {modelParams.map((param) => (
                  <div key={param.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        {param.name}
                      </label>
                      <span className="text-sm text-gray-500">
                        {param.value.toFixed(param.unit === '%' ? 0 : 1)} {param.unit}
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={(param.max - param.min) / 100}
                      value={param.value}
                      onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    
                    <p className="text-xs text-gray-500">{param.description}</p>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <p className="text-xs text-yellow-700">
                        <strong>影响:</strong> {param.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">实时统计</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">粒子数量:</span>
                    <span className="font-medium">{animationState.particles.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">模拟进度:</span>
                    <span className="font-medium">
                      {Math.min(100, (animationState.currentTime / currentModel.duration) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">状态:</span>
                    <span className={`font-medium ${animationState.isPlaying ? 'text-green-600' : 'text-gray-600'}`}>
                      {animationState.isPlaying ? '运行中' : '已停止'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimationModels; 