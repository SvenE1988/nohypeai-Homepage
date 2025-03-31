
import { Mail, Linkedin, Instagram, ChevronDown, ArrowUpCircle, BarChart3, LineChart, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const OptimizationChart = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/30 opacity-50 blur-xl"></div>
      
      {/* Main chart content */}
      <div className="relative h-full flex flex-col justify-between z-10">
        {/* Chart header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white">KI-Optimierung</h3>
          <div className="flex space-x-2">
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">Live</span>
            <span className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded-full">Analytik</span>
          </div>
        </div>
        
        {/* Chart grid background */}
        <div className="absolute inset-0 z-0">
          {/* Horizontal grid lines */}
          {[...Array(5)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-white/5" style={{ top: `${20 + i * 15}%` }}></div>
          ))}
          
          {/* Vertical grid lines */}
          {[...Array(6)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-white/5" style={{ left: `${10 + i * 15}%` }}></div>
          ))}
        </div>
        
        {/* Chart Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center text-xs text-white/60 mb-1">
              <BarChart3 size={12} className="mr-1" />
              <span>Effizienz</span>
            </div>
            <div className="text-lg font-semibold text-white">+68%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center text-xs text-white/60 mb-1">
              <LineChart size={12} className="mr-1" />
              <span>Workflow</span>
            </div>
            <div className="text-lg font-semibold text-white">+42%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center text-xs text-white/60 mb-1">
              <Zap size={12} className="mr-1" />
              <span>Performance</span>
            </div>
            <div className="text-lg font-semibold text-white">+55%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center text-xs text-white/60 mb-1">
              <Mail size={12} className="mr-1" />
              <span>Response</span>
            </div>
            <div className="text-lg font-semibold text-white">+89%</div>
          </div>
        </div>
        
        {/* Chart visualization */}
        <div className="relative flex-1 flex items-end">
          {/* Growth bars */}
          <motion.div 
            initial={{ height: "20%" }}
            animate={{ height: "50%" }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="w-1/5 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-lg mx-1"
          ></motion.div>
          <motion.div 
            initial={{ height: "30%" }}
            animate={{ height: "65%" }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="w-1/5 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-lg mx-1"
          ></motion.div>
          <motion.div 
            initial={{ height: "40%" }}
            animate={{ height: "75%" }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            className="w-1/5 bg-gradient-to-t from-secondary/80 to-secondary/20 rounded-t-lg mx-1"
          ></motion.div>
          <motion.div 
            initial={{ height: "50%" }}
            animate={{ height: "90%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="w-1/5 bg-gradient-to-t from-secondary/80 to-secondary/20 rounded-t-lg mx-1 relative"
          >
            {/* Optimization arrow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center">
                <ArrowUpCircle size={40} className="text-primary animate-pulse" />
                <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded mt-1 whitespace-nowrap">
                  KI-Optimierung
                </span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ height: "30%" }}
            animate={{ height: "55%" }}
            transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
            className="w-1/5 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-lg mx-1"
          ></motion.div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-white/50 pt-2">
          <span>Q1</span>
          <span>Q2</span>
          <span>Q3</span>
          <span>Q4</span>
          <span>Q5</span>
        </div>
      </div>
    </div>
  );
};

const AIFirstSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return <section className="min-h-screen flex items-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            KI-First: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Was steckt 
            </span>{" "}
            <br />
            dahinter?
          </h2>
          
          <p className="text-xl text-gray-300">
            Rechne selbst nach – wir zeigen dir, wie schon minimale KI-Automatisierungen messbaren Impact bringen. Ganz ohne extra Personal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black hover:bg-black/80 text-white border-2 border-primary">
              Jetzt durchstarten
            </Button>
          </div>

          <div className="flex gap-6 pt-4">
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Instagram size={32} />
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Linkedin size={32} />
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Mail size={32} />
            </motion.a>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <OptimizationChart />
          </motion.div>
          <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-secondary"></div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer" animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }} onClick={scrollToNextSection}>
        <ChevronDown size={32} className="text-white/50 hover:text-white transition-colors" />
      </motion.div>
    </section>;
};

export default AIFirstSection;
