
import { Mail, Linkedin, ChevronDown, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useCallToAction } from "@/hooks/useCallToAction";

const AIFirstSection = () => {
  const { openCalendarBooking, openContactForm } = useCallToAction();
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            KI-First: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Was steckt dahinter?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300">
            Rechne selbst nach – wir zeigen dir, wie schon minimale KI-Automatisierungen messbaren Impact bringen. Ganz ohne extra Personal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all flex items-center gap-2 border border-[#3A3F55] rounded-md"
              onClick={openCalendarBooking}
            >
              <Calculator className="w-5 h-5 text-primary" />
              Termin buchen
            </Button>
          </div>

          <div className="flex gap-6 pt-4 pl-0">
            <motion.a 
              href="https://www.linkedin.com/in/svenerkens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" 
              whileHover={{
                scale: 1.1
              }} 
              whileTap={{
                scale: 0.95
              }}
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" 
              onClick={openContactForm}
              whileHover={{
                scale: 1.1
              }} 
              whileTap={{
                scale: 0.95
              }}
            >
              <Mail size={32} />
            </motion.a>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <motion.div 
            className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Easter decoration elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FFEB3B]/30 to-[#FFC107]/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#E1BEE7]/30 to-[#CE93D8]/30 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                  Oster-Aktion
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
                  Bis 15. April
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                KI-Implementierung
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-300">Monatlich:</span>
                  <span className="text-xl font-bold text-white">ab 499 €</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-300">Einrichtung:</span>
                  <span className="text-xl font-bold text-white">1.799 €</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="text-center text-sm text-gray-300">
                  Jetzt Erstgespräch vereinbaren und von unserem
                  Oster-Rabatt profitieren!
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                onClick={openCalendarBooking}
              >
                Jetzt Termin sichern
              </Button>
            </div>
          </motion.div>
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
    </section>
  );
};

export default AIFirstSection;
