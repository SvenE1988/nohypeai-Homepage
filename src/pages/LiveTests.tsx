
import React from "react";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import VoiceHeroSection from "../components/voice/VoiceHeroSection";
import VoiceFeatures from "../components/voice/VoiceFeatures";
import VoiceUseCases from "../components/voice/VoiceUseCases";
import VoiceBenefits from "../components/voice/VoiceBenefits";
import VoiceCTA from "../components/voice/VoiceCTA";
import { BaseCard } from "../components/ui/base-card";
import VoiceBot from "../components/VoiceBot";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const LiveTests = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <VoiceHeroSection />
        <div className="relative max-w-4xl mx-auto mb-16">
          <BaseCard>
            <VoiceBot />
          </BaseCard>
          
          <motion.div 
            className="absolute -left-48 top-1/2 -translate-y-1/2 hidden lg:block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Button
              className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Star className="w-5 h-5 mr-2 animate-pulse" />
              Jetzt KI testen!
            </Button>
          </motion.div>
        </div>
        
        <VoiceFeatures />
        <VoiceUseCases />
        <VoiceBenefits />
        <VoiceCTA />
      </div>
      <Footer />
    </main>
  );
};

export default LiveTests;
