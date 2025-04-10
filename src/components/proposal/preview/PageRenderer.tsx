
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
  scale?: number;
  isCoverPage?: boolean;
  title?: string;
  clientName?: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ 
  sections, 
  pageIndex,
  scale = 1,
  isCoverPage = false,
  title = "",
  clientName = ""
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
      default:
        return <div>Unbekannter Sektionstyp: {section.type}</div>;
    }
  };

  return (
    <div className="a4-page relative" style={{ 
      transform: `scale(${scale})`,
      width: '210mm',
      height: '297mm',
      margin: '0 auto',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Main dark background like on the homepage */}
      <div className="absolute inset-0 bg-gradient-dark" style={{ zIndex: 0 }}></div>
      
      {/* Gradient glow overlays */}
      <div className="absolute inset-0 bg-gradient-glow" style={{ zIndex: 1, opacity: 0.6 }}></div>
      <div className="absolute inset-0 bg-accent-glow" style={{ zIndex: 2, opacity: 0.4 }}></div>
      
      {/* Page content with proper z-index to be above backgrounds */}
      <div className="a4-content relative p-10 h-full flex flex-col text-white" style={{ zIndex: 10 }}>
        {/* NoHype logo fixed on every page */}
        <div className="absolute top-6 right-6 w-28">
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="NoHype Logo" 
            className="w-full"
          />
        </div>
        
        {/* Add logo to first page only */}
        {pageIndex === 0 && !isCoverPage && (
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="NoHype Logo" 
            className="company-logo w-28 mb-6"
          />
        )}
        
        {/* Cover page content */}
        {isCoverPage ? (
          <div className="cover-page-content flex flex-col items-center justify-center h-full text-center">
            <img 
              src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
              alt="NoHype Logo" 
              className="cover-page-logo w-40 mb-8"
            />
            <h1 className="cover-page-title text-5xl font-bold mb-6 text-white">Angebot</h1>
            <div className="cover-page-subtitle text-2xl mb-4 text-gray-200">
              {title || ""}
            </div>
            {clientName && (
              <div className="cover-page-client text-xl mb-6 text-gray-300">
                für {clientName}
              </div>
            )}
            <div className="cover-page-date text-lg text-gray-300">
              {new Date().toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        ) : (
          /* Regular page content */
          <div className="space-y-6 flex-grow text-white">
            {sections.map((section) => (
              <div key={section.id} className="mb-6 proposal-section">
                {renderSection(section)}
              </div>
            ))}
          </div>
        )}
      
        {/* Footer with company info and page number */}
        <div className="page-footer mt-auto pt-4 border-t border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-300">
            <div>NoHype - eine Marke der Powerplant Promotion GmbH • Achim</div>
            <div>Tel: +49 175 9481994 • info@nohype-ai.de</div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">
            Seite {pageIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
};
