
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useRef, useEffect } from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const AIFirstSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { previousPath } = useNavigation();

  // Reset section position when component mounts
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.transform = 'none';
      sectionRef.current.style.opacity = '1';
    }
    
    // Special handling for when coming from proposals page
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
      className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white py-16 relative overflow-hidden"
      id="hero"
    >
      {/* Lamp container in background */}
      <div className="absolute inset-0 z-0 translate-y-[10rem]">
        <LampContainer>
          {/* Empty div as children for the LampContainer */}
          <div></div>
        </LampContainer>
      </div>
      
      {/* Text content overlaid on top */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
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
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-First
            </span>: <br />
            Was steckt dahinter?
          </h2>
          
          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
            Unser KI-First Ansatz stellt künstliche Intelligenz in den Mittelpunkt jeder Unternehmenslösung. 
            Dies ermöglicht maximale Effizienz und Zukunftssicherheit für Ihr Unternehmen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFirstSection;
