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
    
    if (previousPath === '/proposals') {
      setTimeout(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [previousPath]);

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
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut"
          }} 
          viewport={{
            once: false,
            amount: 0.3
          }}
          className="text-center z-50"
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
