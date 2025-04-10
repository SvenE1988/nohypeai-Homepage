
import React from "react";
import { Proposal } from "./types";
import { HeaderSection } from "./preview/HeaderSection";
import { TextSection } from "./preview/TextSection";
import { ImageSection } from "./preview/ImageSection";
import { CaseStudySection } from "./preview/CaseStudySection";
import { PricingSection } from "./preview/PricingSection";
import { ContactSection } from "./preview/ContactSection";

interface ProposalPreviewProps {
  proposal: Proposal;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ proposal }) => {
  const renderSection = (section: any) => {
    switch (section.type) {
      case "header":
        return <HeaderSection content={section.content} />;
      case "text":
        return <TextSection content={section.content} />;
      case "image":
        return <ImageSection content={section.content} />;
      case "caseStudy":
        return <CaseStudySection content={section.content} />;
      case "pricing":
        return <PricingSection content={section.content} />;
      case "contact":
        return <ContactSection content={section.content} />;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  return (
    <div>
      <div className="border border-gray-300 rounded overflow-hidden print:shadow-none print:border-none">
        <div className="min-h-[842px] w-[595px] mx-auto relative" id="pdf-content">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-dark">
            <div className="absolute inset-0 bg-gradient-glow opacity-70"></div>
            <div className="absolute inset-0 bg-accent-glow opacity-70"></div>
          </div>
          
          {/* Content with padding */}
          <div className="relative z-10 px-8 py-10 m-6">
            {/* Proposal Content */}
            <div className="space-y-6">
              {proposal.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div key={section.id} className="mb-6 proposal-section">
                    {renderSection(section)}
                  </div>
                ))}
            </div>
            
            {/* Footer with company info */}
            <div className="mt-12 pt-4 border-t border-white/20">
              <div className="flex justify-between items-center text-xs text-white/70">
                <div>NoHype GmbH • Weidenallee 13 • 20357 Hamburg</div>
                <div>Tel: +49 40 2093 3340 • info@nohype.io</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">
        Drücke "Download PDF", um das Angebot als PDF herunterzuladen.
      </p>
    </div>
  );
};
