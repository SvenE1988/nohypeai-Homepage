
import React from "react";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import VoiceBot from "../components/VoiceBot";

const LiveTests = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Live Tests</h1>
        <div className="max-w-4xl mx-auto">
          <VoiceBot />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LiveTests;
