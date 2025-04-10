
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
      <div className="bg-white text-black border border-gray-300 rounded overflow-hidden print:shadow-none print:border-none">
        <div className="px-8 py-10 m-6 shadow-xl min-h-[842px] w-[595px] mx-auto" id="pdf-content">
          {/* Proposal Content */}
          <div className="space-y-6">
            {proposal.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div key={section.id} className="mb-6">
                  {renderSection(section)}
                </div>
              ))}
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">
        Drücke "Download PDF", um das Angebot als PDF herunterzuladen.
      </p>
    </div>
  );
};
