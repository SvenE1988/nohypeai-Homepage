
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
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Erstellen Sie professionelle Angebote und Broschüren in wenigen Minuten. 
          Wählen Sie eine Vorlage, passen Sie den Inhalt an und exportieren Sie als PDF.
        </p>
        <div className="max-w-7xl mx-auto">
          <PDFGenerator />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProposalGenerator;
