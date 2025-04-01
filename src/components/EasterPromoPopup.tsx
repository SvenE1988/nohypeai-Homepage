
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useCallToAction } from "@/hooks/useCallToAction";

const EasterPromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openCalendarBooking } = useCallToAction();
  
  useEffect(() => {
    const handleScroll = () => {
      // Show popup after scrolling 300px
      if (window.scrollY > 300 && !isVisible) {
        setIsVisible(true);
      }
    };

    // Set up the scroll listener
    window.addEventListener("scroll", handleScroll);
    
    // Store the popup state in session storage to prevent repeated appearances
    const hasSeenPopup = sessionStorage.getItem('hasSeenEasterPromo');
    
    if (!hasSeenPopup && window.scrollY > 300) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenEasterPromo', 'true');
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-8 right-8 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden shadow-xl">
            {/* Easter decoration elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FFEB3B]/30 to-[#FFC107]/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#E1BEE7]/30 to-[#CE93D8]/30 rounded-full blur-xl"></div>
            
            <button 
              onClick={() => {
                setIsVisible(false);
                // When closed manually, remember it for the entire browser session
                sessionStorage.setItem('hasSeenEasterPromo', 'true');
              }}
              className="absolute top-2 right-2 text-white/70 hover:text-white z-10"
            >
              <X size={20} />
            </button>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                  Oster-Aktion
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
                  Bis 15. April
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
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
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={openCalendarBooking}
              >
                <Calendar className="w-4 h-4" />
                Kostenloses Erstgespräch buchen
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterPromoPopup;
