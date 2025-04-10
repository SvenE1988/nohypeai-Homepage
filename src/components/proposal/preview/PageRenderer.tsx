
import React from "react";
import { ProposalSection } from "../types";
import { HeaderSection } from "./HeaderSection";
import { TextSection } from "./TextSection";
import { ImageSection } from "./ImageSection";
import { CaseStudySection } from "./CaseStudySection";
import { PricingSection } from "./PricingSection";
import { ContactSection } from "./ContactSection";
import { TestimonialSection } from "./TestimonialSection";
import { TechStackSection } from "./TechStackSection";
import { SavingsSection } from "./SavingsSection";

interface PageRendererProps {
  sections: ProposalSection[];
  pageIndex: number;
  scale?: number;
  isCoverPage?: boolean;
  showPageNumbers?: boolean;
  showFooter?: boolean;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ 
  sections, 
  pageIndex,
  scale = 1,
  isCoverPage = false,
  showPageNumbers = true,
  showFooter = true
}) => {
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
      case "testimonial":
        return <TestimonialSection content={section.content} />;
      case "techStack":
        return <TechStackSection content={section.content} />;
      case "savings":
        return <SavingsSection content={section.content} />;
      default:
        return <div>Unbekannter Sektionstyp: {section.type}</div>;
    }
  };

  return (
    <div className="a4-page" style={{ transform: `scale(${scale})` }}>
      {/* Enhanced background layers with more dynamic gradients */}
      <div className="bg-gradient-dark"></div>
      <div className="bg-gradient-glow"></div>
      <div className="bg-accent-glow"></div>
      
      {/* Page content with better spacing */}
      <div className="a4-content">
        {/* Add logo to first page only */}
        {pageIndex === 0 && !isCoverPage && (
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="NoHype Logo" 
            className="company-logo"
          />
        )}
        
        {/* Cover page content */}
        {isCoverPage ? (
          <div className="cover-page-content">
            <img 
              src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
              alt="NoHype Logo" 
              className="cover-page-logo"
            />
            <h1 className="cover-page-title">Deckblatt</h1>
            <div className="cover-page-overlay"></div>
          </div>
        ) : (
          /* Regular page content */
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="mb-6 proposal-section">
                {renderSection(section)}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer with company info and page number */}
      {showFooter && (
        <div className="page-footer">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div>NoHype - eine Marke der Powerplant Promotion GmbH • Achim</div>
            <div>Tel: +49 175 9481994 • info@nohype-ai.de</div>
          </div>
          {showPageNumbers && (
            <div className="text-center text-xs text-gray-500 mt-2">
              Seite {pageIndex + 1}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
