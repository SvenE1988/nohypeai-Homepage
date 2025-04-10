
import React from "react";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { PDFGenerator } from "../components/proposal/PDFGenerator";

const ProposalGenerator = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Broschüren- und Angebotsgenerator</h1>
        <div className="max-w-7xl mx-auto">
          <PDFGenerator />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProposalGenerator;
