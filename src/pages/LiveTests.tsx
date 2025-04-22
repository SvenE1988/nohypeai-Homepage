
import React from "react";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import VoiceHeroSection from "../components/voice/VoiceHeroSection";
import VoiceFeatures from "../components/voice/VoiceFeatures";
import VoiceUseCases from "../components/voice/VoiceUseCases";
import VoiceBenefits from "../components/voice/VoiceBenefits";
import VoiceCTA from "../components/voice/VoiceCTA";
import { BaseCard } from "../components/ui/base-card";

const LiveTests = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <VoiceHeroSection />
        <BaseCard className="max-w-4xl mx-auto mb-16">
          <VoiceFeatures />
        </BaseCard>
        <VoiceUseCases />
        <VoiceBenefits />
        <VoiceCTA />
      </div>
      <Footer />
    </main>
  );
};

export default LiveTests;
