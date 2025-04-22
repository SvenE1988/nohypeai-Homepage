
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useRef, useEffect } from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const AIFirstSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { previousPath } = useNavigation();

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.transform = 'none';
      sectionRef.current.style.opacity = '1';
    }
    
    // Only scroll to top when coming from specific routes
    if (previousPath === '/proposals') {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        
        // Trigger resize event in next frame for better performance
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    }
  }, [previousPath]);

  // Content animation with optimized properties
  const contentAnimation = {
    initial: {
      opacity: 0,
      y: 20,
      willChange: "opacity, transform" // Hint to browser for optimization
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] // Optimized cubic-bezier
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-[70vh] sm:min-h-screen flex flex-col items-center justify-center bg-transparent text-white py-12 sm:py-16 relative overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 z-0 translate-y-[8rem] sm:translate-y-[10rem]">
        <LampContainer>
          <div></div>
        </LampContainer>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-4">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
            amount: 0.3
          }}
          variants={contentAnimation}
          className="text-center z-50"
          style={{ 
            willChange: "transform", 
            backfaceVisibility: "hidden" 
          }}
          key="ai-first-section-content"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-First
            </span>: <br className="hidden sm:block" />
            Was steckt dahinter?
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mt-5 sm:mt-8 max-w-2xl sm:max-w-3xl mx-auto">
            Unser KI-First Ansatz stellt künstliche Intelligenz in den Mittelpunkt jeder Unternehmenslösung. 
            Dies ermöglicht maximale Effizienz und Zukunftssicherheit für Ihr Unternehmen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFirstSection;
