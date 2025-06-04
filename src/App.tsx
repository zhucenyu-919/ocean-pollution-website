import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/index.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import DeepThinking from './pages/DeepThinking';
import GlobalStatistics from './pages/GlobalStatistics';
import InteractiveLearning from './pages/InteractiveLearning';
import AnimationModels from './pages/AnimationModels';
import ExpertResources from './pages/ExpertResources';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deep-thinking" element={<DeepThinking />} />
            <Route path="/statistics" element={<GlobalStatistics />} />
            <Route path="/interactive-learning" element={<InteractiveLearning />} />
            <Route path="/animations" element={<AnimationModels />} />
            <Route path="/experts" element={<ExpertResources />} />
          </Routes>
        </motion.main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 