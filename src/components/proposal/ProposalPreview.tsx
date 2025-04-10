
import React, { useState } from "react";
import { Proposal } from "./types";
import { PageRenderer } from "./preview/PageRenderer";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";

interface ProposalPreviewProps {
  proposal: Proposal;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ proposal }) => {
  // Sort sections by order
  const sortedSections = [...proposal.sections].sort((a, b) => a.order - b.order);
  
  // Use custom hook for pagination
  const { pages } = usePaginatedContent(sortedSections);
  
  // State for current page in preview mode
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);

  return (
    <div className="preview-wrapper">
      <div className="preview-container" id="pdf-content">
        {/* In print mode, we render all pages */}
        <div className="print:block">
          {pages.map((page, pageIndex) => (
            <PageRenderer
              key={`page-${pageIndex}`}
              sections={page.sections}
              pageIndex={pageIndex}
            />
          ))}
        </div>
        
        {/* In preview mode, we only render the current page */}
        <div className="print:hidden">
          {pages.length > 0 && currentPreviewPage < pages.length && (
            <PageRenderer
              sections={pages[currentPreviewPage].sections}
              pageIndex={currentPreviewPage}
            />
          )}
        </div>
      </div>
      
      {/* Pagination controls - only shown in preview mode */}
      <PaginationControls
        currentPage={currentPreviewPage}
        totalPages={pages.length}
        onPageChange={setCurrentPreviewPage}
      />
      
      <p className="text-center text-sm text-gray-400 mt-4 print:hidden print-instructions">
        Klicken Sie auf "PDF herunterladen", um das Angebot als PDF zu speichern.
      </p>
    </div>
  );
};
