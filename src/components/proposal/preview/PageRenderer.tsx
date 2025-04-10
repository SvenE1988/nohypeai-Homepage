
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
}

export const PageRenderer: React.FC<PageRendererProps> = ({ 
  sections, 
  pageIndex,
  scale = 1,
  isCoverPage = false
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
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Enhanced background layers with more dynamic gradients */}
      <div className="bg-gradient-dark absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
      <div className="bg-gradient-glow absolute inset-0 opacity-20"></div>
      <div className="bg-accent-glow absolute top-0 right-0 w-1/3 h-1/3 opacity-10 bg-gradient-to-br from-blue-300 to-transparent"></div>
      
      {/* Page content with better spacing */}
      <div className="a4-content relative z-10 p-10 h-full flex flex-col">
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
            <h1 className="cover-page-title text-5xl font-bold mb-6 text-gray-800">Angebot</h1>
            <div className="cover-page-subtitle text-2xl mb-4 text-gray-600">
              {/* Placeholder for dynamic title */}
            </div>
            <div className="cover-page-date text-lg text-gray-500">
              {new Date().toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="cover-page-overlay absolute inset-0 bg-gradient-to-b from-transparent to-blue-50 opacity-20"></div>
          </div>
        ) : (
          /* Regular page content */
          <div className="space-y-6 flex-grow">
            {sections.map((section) => (
              <div key={section.id} className="mb-6 proposal-section">
                {renderSection(section)}
              </div>
            ))}
          </div>
        )}
      
        {/* Footer with company info and page number */}
        <div className="page-footer mt-auto pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
            <div>NoHype - eine Marke der Powerplant Promotion GmbH • Achim</div>
            <div>Tel: +49 175 9481994 • info@nohype-ai.de</div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Seite {pageIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
};
