// App.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
//import FloatingWidget from "./components/FloatingWidget";
import FAQChat from "./components/FAQChat";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaMicrochip, 
  FaCoins, 
  FaPassport, 
  FaArrowRight,
  FaBuilding,
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaDownload,
  FaShareAlt,
  FaPrint,
  FaEllipsisV,
  FaSearch,
  FaFilter,
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaGlobe,
  FaBriefcase,
  FaGem,
  FaShoppingCart,
  FaLandmark,
  FaLeaf,
  FaPlane,
  FaFlask,
  FaBrain,
  FaRobot,
  FaCloud,
  FaCrown
} from "react-icons/fa";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import axios from "axios";
// Remove this import since we're defining ErrorBoundary locally
// import ErrorBoundary from "./components/ErrorBoundary"

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md border border-red-500/30 shadow-2xl">
            <FaExclamationTriangle className="text-red-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl text-white font-semibold mb-2 text-center">System Error</h3>
            <p className="text-slate-300 text-center mb-4">An unexpected error occurred. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Rest of your code remains exactly the same...
// AI Recommendation Engine
const getAIRecommendation = async (inputs) => {
  const { industry, budget, visas } = inputs;
  
  // Simulate AI processing with realistic data generation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // AI-powered freezone generation based on inputs
  const generateFreezone = () => {
    const locations = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Fujairah'];
    const industries = ['Tech', 'Consulting', 'E-commerce', 'Fintech', 'Biotech', 'Media', 'Education', 'Healthcare'];
    const names = [
      'Dubai Silicon Oasis', 'DMCC', 'IFZA', 'ADGM', 'RAKEZ', 'Masdar City',
      'Dubai Airport Freezone', 'Sharjah Research Park', 'Ajman Freezone',
      'Fujairah Creative City', 'Dubai South', 'Jebel Ali Freezone'
    ];
    
    const baseCost = budget * (0.7 + Math.random() * 0.3);
    const visaCost = 5500 + Math.random() * 3500;
    
    return {
      name: names[Math.floor(Math.random() * names.length)],
      industry: industry,
      minBudget: Math.round(baseCost * 0.8),
      visaCost: Math.round(visaCost),
      totalCost: Math.round(baseCost + (visaCost * visas)),
      perks: [
        '100% foreign ownership',
        'Tax exemptions',
        'Fast-track processing',
        'Global market access',
        'Modern infrastructure'
      ].slice(0, 3 + Math.floor(Math.random() * 2)),
      processingDays: `${2 + Math.floor(Math.random() * 8)}-${5 + Math.floor(Math.random() * 10)}`,
      documents: 3 + Math.floor(Math.random() * 4),
      benefits: [
        'Zero corporate tax',
        'Full profit repatriation',
        'No currency restrictions',
        'Strategic location',
        'World-class infrastructure',
        'Business friendly environment'
      ].slice(0, 4 + Math.floor(Math.random() * 2)),
      rating: (4 + Math.random()).toFixed(1),
      successRate: 85 + Math.floor(Math.random() * 12),
      established: `${2000 + Math.floor(Math.random() * 22)}`,
      companies: Math.floor(Math.random() * 20000) + 1000,
      location: locations[Math.floor(Math.random() * locations.length)],
      setupTime: `${3 + Math.floor(Math.random() * 10)}-${7 + Math.floor(Math.random() * 14)} days`,
      image: `https://images.unsplash.com/photo-${1512453979798 + Math.floor(Math.random() * 1000000)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
      score: 70 + Math.random() * 25,
      marketSize: Math.floor(Math.random() * 500) + 100,
      growthRate: (5 + Math.random() * 15).toFixed(1),
      infrastructure: Math.floor(Math.random() * 100),
      accessibility: Math.floor(Math.random() * 100),
      supportServices: ['Legal', 'Banking', 'HR', 'Marketing', 'IT'].slice(0, 3 + Math.floor(Math.random() * 3))
    };
  };

  // Generate multiple options and score them
  const options = Array(8).fill().map(() => generateFreezone());
  
  // Score each option based on user criteria
  const scored = options.map(option => {
    const budgetScore = Math.max(0, 100 - (Math.abs(option.totalCost - budget) / budget) * 100);
    const industryScore = option.industry === industry ? 100 : 50;
    const visaScore = Math.min(100, (visas / 10) * 100);
    const successScore = option.successRate;
    const ratingScore = parseFloat(option.rating) * 20;
    
    const totalScore = (
      budgetScore * 0.35 +
      industryScore * 0.25 +
      visaScore * 0.15 +
      successScore * 0.15 +
      ratingScore * 0.1
    );
    
    return { ...option, totalScore };
  });
  
  // Sort by score and return best match
  scored.sort((a, b) => b.totalScore - a.totalScore);
  return scored[0];
};

// Professional Result Card Component
const ResultCard = ({ result, onExport, onShare, onPrint }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullReport, setShowFullReport] = useState(false);

  // Icon mapping
  const getIcon = () => {
    const icons = {
      Tech: FaMicrochip,
      Consulting: FaBriefcase,
      'E-commerce': FaShoppingCart,
      Fintech: FaGem,
      Biotech: FaFlask,
      Media: FaGlobe,
      Education: FaBrain,
      Healthcare: FaLeaf
    };
    return icons[result.industry] || FaBuilding;
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
    >
      {/* Header with gradient and image */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl shadow-xl"
            >
              <Icon className="text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white">{result.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm bg-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  ⭐ {result.rating} Rating
                </span>
                <span className="text-sm bg-green-500/30 text-green-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  ✅ {result.successRate}% Success
                </span>
                <span className="text-sm bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  🏢 Est. {result.established}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExport}
            className="p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-lg transition-colors text-white"
            title="Export Report"
          >
            <FaDownload />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-lg transition-colors text-white" 
            title="Share"
          >
            <FaShareAlt />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrint}
            className="p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-lg transition-colors text-white" 
            title="Print"
          >
            <FaPrint />
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {['overview', 'financial', 'requirements', 'market'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <FaBrain className="text-blue-400" />
                  <span className="text-blue-400 font-semibold">AI Analysis</span>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Based on your budget of {result.totalCost.toLocaleString()} AED and {result.visas} visa requirements, 
                  {result.name} is the optimal choice with a {result.totalScore?.toFixed(1) || 95}% match score. 
                  The zone specializes in {result.industry} with {result.companies.toLocaleString()} registered companies 
                  and a {result.successRate}% business success rate.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Investment', value: `${result.totalCost.toLocaleString()} AED`, icon: FaCoins, color: 'blue' },
                  { label: 'License Fee', value: `${result.minBudget.toLocaleString()} AED`, icon: FaFileAlt, color: 'green' },
                  { label: 'Visa Cost', value: `${(result.visaCost * result.visas).toLocaleString()} AED`, icon: FaPassport, color: 'purple' },
                  { label: 'Setup Time', value: result.setupTime, icon: FaClock, color: 'orange' }
                ].map((metric, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br from-${metric.color}-500/20 to-transparent rounded-xl p-4 border border-${metric.color}-500/30`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className={`text-${metric.color}-400`} />
                      <span className={`text-${metric.color}-400 text-xs`}>{metric.label}</span>
                    </div>
                    <div className="text-lg lg:text-xl font-bold text-white">{metric.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaCrown className="text-yellow-400" /> Key Benefits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.benefits?.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-white/80 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'financial' && (
            <motion.div
              key="financial"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Cost Breakdown Chart */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-4">Cost Breakdown</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>License Fee</span>
                      <span>{result.minBudget.toLocaleString()} AED</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(result.minBudget / result.totalCost) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>Visa Fees</span>
                      <span>{(result.visaCost * result.visas).toLocaleString()} AED</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((result.visaCost * result.visas) / result.totalCost) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>Office/Setup</span>
                      <span>{(result.totalCost - result.minBudget - (result.visaCost * result.visas)).toLocaleString()} AED</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((result.totalCost - result.minBudget - (result.visaCost * result.visas)) / result.totalCost) * 100}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI & Growth Projections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-4">ROI Projection</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Break-even Period</span>
                      <span className="text-white font-bold">18-24 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Avg. Profit Margin</span>
                      <span className="text-green-400 font-bold">{result.growthRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">License Validity</span>
                      <span className="text-white font-bold">5 years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                  <h4 className="text-white font-semibold mb-4">Market Insights</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-400" />
                      <span className="text-white/70">{result.companies.toLocaleString()}+ Companies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-400" />
                      <span className="text-white/70">{result.marketSize}+ Active Businesses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-purple-400" />
                      <span className="text-white/70">Global Market Access</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <FaShieldAlt className="text-green-400" /> Tax Benefits
                </h4>
                <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                  <li>0% Corporate Tax for 50 years</li>
                  <li>100% repatriation of capital and profits</li>
                  <li>No personal income tax</li>
                  <li>No currency restrictions</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'requirements' && (
            <motion.div
              key="requirements"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Required Documents */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaFileAlt className="text-blue-400" /> Required Documents
                </h4>
                <div className="bg-white/5 rounded-xl divide-y divide-white/10 border border-white/10">
                  {[
                    "Passport copies of all shareholders",
                    "Business plan (English)",
                    "Bank reference letter",
                    "Shareholder declaration form",
                    "Proof of address",
                    "No objection certificate (if applicable)",
                    "CV of proposed directors",
                    "Memorandum of Association"
                  ].slice(0, result.documents + 2).map((doc, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                    >
                      <FaFileAlt className="text-blue-400 flex-shrink-0" />
                      <span className="text-white/80">{doc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Processing Timeline */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaClock className="text-green-400" /> Processing Timeline
                </h4>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCalendarAlt className="text-blue-400" />
                    <span className="text-white/80">Estimated: {result.setupTime}</span>
                  </div>
                  <div className="relative pt-4">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/10"></div>
                    <div className="relative flex justify-between">
                      {['Application', 'Review', 'Approval', 'License'].map((step, i) => (
                        <div key={step} className="text-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-2"
                          ></motion.div>
                          <div className="text-xs text-white/50">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Services */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                <h4 className="text-white font-semibold mb-2">Support Services Included</h4>
                <div className="flex flex-wrap gap-2">
                  {result.supportServices?.map((service, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div
              key="market"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Market Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{result.marketSize}+</div>
                  <div className="text-xs text-white/50">Active Companies</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{result.growthRate}%</div>
                  <div className="text-xs text-white/50">Market Growth</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">{result.infrastructure}</div>
                  <div className="text-xs text-white/50">Infrastructure Score</div>
                </div>
              </div>

              {/* Infrastructure Ratings */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3">Infrastructure Ratings</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Connectivity</span>
                      <span className="text-blue-400">{result.infrastructure}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${result.infrastructure}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Accessibility</span>
                      <span className="text-green-400">{result.accessibility}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${result.accessibility}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Insights */}
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2">Industry Insights</h4>
                <p className="text-white/80 text-sm">
                  The {result.industry} sector in {result.location} has shown {result.growthRate}% growth over the past year, 
                  with {result.marketSize}+ companies currently operating. Average ROI ranges from 18-24 months with 
                  profit margins averaging 25-35%.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-white/10 p-4 flex justify-between items-center">
        <button 
          onClick={() => setShowFullReport(!showFullReport)}
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
        >
          {showFullReport ? 'Show Less' : 'View Full Report'} <FaArrowRight className="text-xs" />
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
          Contact Advisor
        </button>
      </div>
    </motion.div>
  );
};

// FloatingWidget component (commented out in your original code)
const FloatingWidget = ({ total, zone }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-4 max-w-xs z-50"
    >
      <div className="text-white">
        <div className="flex items-center gap-2 mb-2">
          <FaRocket className="text-yellow-300" />
          <span className="font-semibold">Quick Quote</span>
        </div>
        <div className="text-sm opacity-90">{zone}</div>
        <div className="text-2xl font-bold mt-1">{total.toLocaleString()} AED</div>
        <button className="mt-3 w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-medium transition-colors">
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

// Main App Component
export default function App() {
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [visas, setVisas] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = async () => {
    if (!industry || !budget || !visas) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all fields to generate a recommendation.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        iconColor: "#f59e0b",
        backdrop: `
          rgba(0,0,0,0.8)
          url("https://media.giphy.com/media/3o7abB06u9bNzA8LC8/giphy.gif")
          center top
          no-repeat
        `
      });
      return;
    }

    setLoading(true);
    
    // Show loading popup
    Swal.fire({
      title: 'AI Analysis in Progress',
      html: 'Our AI is analyzing thousands of data points...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      background: "#1e293b",
      color: "#fff",
      allowOutsideClick: false
    });

    try {
      // Get AI recommendation
      const recommendation = await getAIRecommendation({ 
        industry, 
        budget: Number(budget), 
        visas: Number(visas) 
      });

      Swal.close();

      if (!recommendation) {
        Swal.fire({
          icon: "info",
          title: "No Match Found",
          text: "No suitable free zone matches your criteria. Try adjusting your budget or requirements.",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
          iconColor: "#3b82f6"
        });
        return;
      }

      // Enhanced result with user inputs
      const enhancedResult = {
        ...recommendation,
        visas: Number(visas),
        budget: Number(budget),
        reason: `Based on your budget of ${Number(budget).toLocaleString()} AED and requirement of ${visas} visas, ${recommendation.name} offers the optimal balance of cost, benefits, and success rate.`
      };
      
      setResult(enhancedResult);

      // Success popup
      Swal.fire({
        icon: "success",
        title: "Recommendation Ready!",
        text: `We found the perfect match for your business in ${recommendation.name}`,
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        timer: 3000,
        showConfirmButton: false
      });

      // Save to recent searches
      const search = {
        id: Date.now(),
        industry,
        budget,
        visas,
        result: enhancedResult.name,
        timestamp: new Date().toISOString()
      };
      const updated = [search, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Service Temporarily Unavailable",
        text: "Please try again later.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        iconColor: "#ef4444"
      });
    }
    setLoading(false);
  };

  const handleExport = () => {
    if (!result) return;
    
    const content = `
╔══════════════════════════════════════════════════════════════╗
║                    FOUNDERAI - FREE ZONE REPORT              ║
╚══════════════════════════════════════════════════════════════╝

Date: ${new Date().toLocaleDateString()}
Generated by: FounderAI Intelligent System

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED FREE ZONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${result.name}
Location: ${result.location}
Industry: ${result.industry}
Rating: ⭐ ${result.rating}/5
Success Rate: ${result.successRate}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINANCIAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Investment: ${result.totalCost.toLocaleString()} AED
License Fee: ${result.minBudget.toLocaleString()} AED
Visa Cost (${result.visas} visas): ${(result.visaCost * result.visas).toLocaleString()} AED
Setup Cost: ${(result.totalCost - result.minBudget - (result.visaCost * result.visas)).toLocaleString()} AED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIMELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Setup Time: ${result.setupTime}
License Validity: 5 years renewable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KEY BENEFITS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${result.benefits?.map(b => `• ${b}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL PERKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${result.perks?.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED DOCUMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Passport copies of all shareholders
• Business plan (English)
• Bank reference letter
• Shareholder declaration form
• Proof of address
• No objection certificate (if applicable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARKET INSIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Companies: ${result.companies.toLocaleString()}+
Market Growth: ${result.growthRate}%
Infrastructure Score: ${result.infrastructure}%
Accessibility Score: ${result.accessibility}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by FounderAI - Intelligent Business Solutions
Contact: support@founderai.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `founderai-${result.name.toLowerCase().replace(/\s+/g, '-')}-report.txt`;
    a.click();
    URL.revokeObjectURL(url);

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Report Exported",
      text: "Your comprehensive report has been downloaded successfully.",
      background: "#1e293b",
      color: "#fff",
      confirmButtonColor: "#3b82f6",
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleShare = () => {
    if (!result) return;
    
    // Copy to clipboard
    const shareText = `Check out ${result.name} - Perfect for ${result.industry} businesses! Total setup cost: ${result.totalCost.toLocaleString()} AED. Found via FounderAI 🚀`;
    navigator.clipboard.writeText(shareText);
    
    Swal.fire({
      icon: "success",
      title: "Copied to Clipboard!",
      text: "Share this recommendation with your partners.",
      background: "#1e293b",
      color: "#fff",
      confirmButtonColor: "#3b82f6",
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuickSearch = (search) => {
    setIndustry(search.industry);
    setBudget(search.budget);
    setVisas(search.visas);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Particle Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                resize: true,
              },
              modes: {
                grab: { distance: 200, lineLinked: { opacity: 0.3 } }
              }
            },
            particles: {
              color: { value: "#3b82f6" },
              links: {
                enable: true,
                distance: 200,
                color: "#3b82f6",
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                straight: false,
              },
              number: {
                value: 60,
                density: { enable: true, area: 1000 },
              },
              opacity: { value: 0.2 },
              size: { value: { min: 1, max: 2 } },
            },
          }}
          className="absolute inset-0 z-0"
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FounderAI
              </h1>
              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <FaRobot className="text-blue-400" />
                Intelligent Free Zone Recommendation Engine Powered by AI
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
              >
                <FaShieldAlt className="text-blue-400" />
                <span className="text-sm text-slate-300">AI-Powered</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
              >
                <FaChartLine className="text-green-400" />
                <span className="text-sm text-slate-300">Real-time Data</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:p-8 mb-8 shadow-2xl"
          >
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Industry Sector
                </label>
                <div className="relative group">
                  <FaMicrochip className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-white/10"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="" className="bg-slate-800">Select industry</option>
                    <option value="Tech" className="bg-slate-800">Technology & Software</option>
                    <option value="Consulting" className="bg-slate-800">Consulting & Professional Services</option>
                    <option value="E-commerce" className="bg-slate-800">E-commerce & Retail</option>
                    <option value="Biotech" className="bg-slate-800">Biotechnology & Healthcare</option>
                    <option value="Fintech" className="bg-slate-800">Fintech & Financial Services</option>
                    <option value="Media" className="bg-slate-800">Media & Marketing</option>
                    <option value="Education" className="bg-slate-800">Education & Training</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Budget (AED)
                </label>
                <div className="relative group">
                  <FaCoins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 transition-all hover:bg-white/10"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              {/* Visas */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Number of Visas
                </label>
                <div className="relative group">
                  <FaPassport className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <input
                    type="number"
                    placeholder="e.g., 3"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 transition-all hover:bg-white/10"
                    value={visas}
                    onChange={(e) => setVisas(e.target.value)}
                    min="1"
                    max="50"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AI Analyzing Data...
                </>
              ) : (
                <>
                  <FaBrain />
                  Generate AI Recommendation
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {result && (
              <ResultCard 
                key="result" 
                result={result} 
                onExport={handleExport}
                onShare={handleShare}
                onPrint={handlePrint}
              />
            )}
          </AnimatePresence>

          {/* Floating Widget - Fixed position */}
          {result && <FloatingWidget total={result.totalCost} zone={result.name} />}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaClock className="text-blue-400" /> Recent Searches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentSearches.map((search, index) => (
                  <motion.div 
                    key={search.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all cursor-pointer group"
                    onClick={() => handleQuickSearch(search)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-blue-400">
                        <FaClock className="text-xs" />
                        <span className="text-xs">{new Date(search.timestamp).toLocaleDateString()}</span>
                      </div>
                      <FaSearch className="text-white/30 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="text-sm text-white/90 mb-1 font-medium">{search.industry}</div>
                    <div className="text-xs text-slate-400">
                      {Number(search.budget).toLocaleString()} AED · {search.visas} visas
                    </div>
                    {search.result && (
                      <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                        <FaCheckCircle /> {search.result}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-sm text-slate-500 border-t border-white/10 pt-8"
          >
            <p>© 2024 FounderAI - AI-Powered Business Solutions. All recommendations are generated by artificial intelligence.</p>
            <p className="mt-2 flex items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2">
                <FaCheckCircle className="text-green-400/50" />
                <span>AI-powered analysis</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <FaShieldAlt className="text-blue-400/50" />
                <span>Enterprise-grade security</span>
              </span>
            </p>
          </motion.div>
        </div>

        {/* FAQ Chat */}
        <FAQChat />
      </div>
    </ErrorBoundary>
  );
}