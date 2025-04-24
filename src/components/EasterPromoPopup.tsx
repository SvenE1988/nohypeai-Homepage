import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useCallToAction } from "@/hooks/useCallToAction";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const EasterPromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openCalendarBooking } = useCallToAction();
  const scrollListenerRef = useRef<((e: Event) => void) | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(currentDate.getFullYear(), 3, 30); // April 30th
    
    if (currentDate > endDate) {
      return;
    }
    
    const lastPopupTime = localStorage.getItem('lastEasterPromoTime');
    const currentTime = Date.now();
    const hasRecentlyDismissed = lastPopupTime && (currentTime - parseInt(lastPopupTime)) < 120000; // 2 minutes in milliseconds
    
    if (hasRecentlyDismissed) {
      return;
    }
    
    const handleScroll = () => {
      if (window.scrollY > 300 && !isVisible && !hasRecentlyDismissed) {
        setIsVisible(true);
        
        if (scrollListenerRef.current) {
          window.removeEventListener("scroll", scrollListenerRef.current);
        }
      }
    };
    
    scrollListenerRef.current = handleScroll;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    if (window.scrollY > 300 && !hasRecentlyDismissed) {
      const initialTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => {
        clearTimeout(initialTimer);
        if (scrollListenerRef.current) {
          window.removeEventListener("scroll", scrollListenerRef.current);
        }
      };
    }
    
    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
      }
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('lastEasterPromoTime', Date.now().toString());
  };

  const currentDate = new Date();
  const endDate = new Date(currentDate.getFullYear(), 3, 30); // April 30th
  if (currentDate > endDate) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={cn(
            "fixed z-50",
            isMobile ? "bottom-4 left-4 right-4" : "bottom-8 right-8 max-w-sm"
          )}
        >
          <div className="bg-gradient-to-br from-primary/50 to-secondary/50 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden shadow-xl">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FFEB3B]/30 to-[#FFC107]/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#E1BEE7]/30 to-[#CE93D8]/30 rounded-full blur-xl"></div>
            
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-white/70 hover:text-white z-10 p-2 touch-manipulation"
            >
              <X size={20} />
            </button>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                  Oster-Aktion
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  Bis 30. April
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                KI-Implementierung
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-300">Monatlich:</span>
                  <span className="text-xl font-bold text-white">ab 249 €</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-300">Einrichtung:</span>
                  <span className="text-xl font-bold text-white">ab 499 €</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="text-center text-sm text-gray-300">
                  Jetzt Erst-Analyse vereinbaren und von unserem
                  Oster-Rabatt profitieren!
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity flex items-center justify-center gap-2 touch-manipulation"
                onClick={openCalendarBooking}
              >
                <Calendar className="w-4 h-4" />
                <span className="whitespace-nowrap">Kostenloses Erstgespräch buchen</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterPromoPopup;
