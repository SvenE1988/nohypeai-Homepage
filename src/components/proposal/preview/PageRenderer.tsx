
import React from "react";
import { ProposalSection } from "../types";
import { HeaderSection } from "./HeaderSection";
import { TextSection } from "./TextSection";
import { ImageSection } from "./ImageSection";
import { CaseStudySection } from "./CaseStudySection";
import { PricingSection } from "./PricingSection";
import { ContactSection } from "./ContactSection";

interface PageRendererProps {
  sections: ProposalSection[];
  pageIndex: number;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ sections, pageIndex }) => {
  const renderSection = (section: ProposalSection) => {
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
        return <div>Unbekannter Sektionstyp: {section.type}</div>;
    }
  };

  return (
    <div className="a4-page">
      {/* Background layers */}
      <div className="bg-gradient-dark"></div>
      <div className="bg-gradient-glow"></div>
      <div className="bg-accent-glow"></div>
      
      {/* Page content */}
      <div className="a4-content">
        {/* Add logo to first page only */}
        {pageIndex === 0 && (
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="NoHype Logo" 
            className="company-logo"
          />
        )}
        
        {/* Render the sections for this page */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mb-6 proposal-section">
              {renderSection(section)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer with company info */}
      <div className="page-footer">
        <div className="flex justify-between items-center text-xs text-white/70">
          <div>NoHype - eine Marke der Powerplant Promotion GmbH • Achim</div>
          <div>Tel: +49 175 9481994 • info@nohype-ai.de</div>
        </div>
      </div>
    </div>
  );
};
