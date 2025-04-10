
import React, { useEffect, useState } from "react";
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
  // Sort sections by order
  const sortedSections = [...proposal.sections].sort((a, b) => a.order - b.order);
  
  // State to store our paginated content
  const [pages, setPages] = useState<Array<{ sections: typeof sortedSections }>>([]);
  
  // Calculate pagination when sections change
  useEffect(() => {
    const paginateContent = () => {
      const newPages: Array<{ sections: typeof sortedSections }> = [];
      let currentPage: typeof sortedSections = [];
      let currentEstimatedHeight = 0;
      
      // First page always has the header which takes more space
      const firstPageMaxHeight = 900; // Approximate pixel height for A4 page with margins minus header space
      const otherPagesMaxHeight = 1000; // Approximate pixel height for subsequent A4 pages with margins
      
      sortedSections.forEach((section, index) => {
        // Estimated heights in pixels for different section types
        let sectionHeight = 0;
        
        switch (section.type) {
          case "header":
            sectionHeight = 200; // Header with logo takes more space
            break;
          case "text":
            // Calculate height based on text length
            sectionHeight = 80 + (section.content.text.length / 4); // Approximation
            break;
          case "image":
            sectionHeight = 350; // Image with caption
            break;
          case "caseStudy":
            sectionHeight = 450; // Case studies have more content
            break;
          case "pricing":
            sectionHeight = 100 + (section.content.items.length * 50); // Base + rows
            break;
          case "contact":
            sectionHeight = 200; // Contact information
            break;
          default:
            sectionHeight = 150; // Default fallback
        }
        
        const maxHeightForCurrentPage = currentPage.length === 0 && newPages.length === 0 
          ? firstPageMaxHeight 
          : otherPagesMaxHeight;
        
        // Check if adding this section would exceed the current page's height
        if (currentEstimatedHeight + sectionHeight > maxHeightForCurrentPage) {
          // Create a new page with current sections
          if (currentPage.length > 0) {
            newPages.push({ sections: [...currentPage] });
            currentPage = [];
            currentEstimatedHeight = 0;
          }
        }
        
        // Add section to current page
        currentPage.push(section);
        currentEstimatedHeight += sectionHeight;
        
        // If this is the last section, add the current page
        if (index === sortedSections.length - 1 && currentPage.length > 0) {
          newPages.push({ sections: [...currentPage] });
        }
      });
      
      setPages(newPages);
    };
    
    paginateContent();
  }, [sortedSections]);
  
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
        return <div>Unbekannter Sektionstyp: {section.type}</div>;
    }
  };

  return (
    <div>
      <div className="preview-container" id="pdf-content">
        {pages.map((page, pageIndex) => (
          <div key={`page-${pageIndex}`} className="a4-page">
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
                {page.sections.map((section) => (
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
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-400 mt-4 print-instructions">
        Klicken Sie auf "PDF herunterladen", um das Angebot als PDF zu speichern.
      </p>
    </div>
  );
};
