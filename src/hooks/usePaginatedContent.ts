
import { useState, useEffect } from "react";
import { ProposalSection } from "../components/proposal/types";

interface PageData {
  sections: ProposalSection[];
}

/**
 * Hook to paginate content based on estimated heights for A4 pages
 */
export const usePaginatedContent = (sections: ProposalSection[]) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [useCoverPage, setUseCoverPage] = useState<boolean>(true);
  const [useTableOfContents, setUseTableOfContents] = useState<boolean>(false);
  
  useEffect(() => {
    const paginateContent = () => {
      const sortedSections = [...sections].sort((a, b) => a.order - b.order);
      const newPages: PageData[] = [];
      let currentPage: ProposalSection[] = [];
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
          case "tableOfContents":
            sectionHeight = 500; // Table of contents takes more space
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
  }, [sections]);
  
  return { pages, useCoverPage, setUseCoverPage, useTableOfContents, setUseTableOfContents };
};
