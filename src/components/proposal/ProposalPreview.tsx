
import React, { useState, useEffect, useRef } from "react";
import { Proposal } from "./types";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { PrintPreview } from "./preview/PrintPreview";
import { SinglePagePreview } from "./preview/SinglePagePreview";
import { PreviewControls } from "./preview/PreviewControls";
import { StatusMessage } from "./preview/StatusMessage";

interface ProposalPreviewProps {
  proposal: Proposal;
  className?: string;
  isGeneratingPDF?: boolean;
  setIsGeneratingPDF?: (isGenerating: boolean) => void;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ 
  proposal, 
  className = "",
  isGeneratingPDF = false,
  setIsGeneratingPDF
}) => {
  // Sort sections by order
  const sortedSections = [...proposal.sections].sort((a, b) => a.order - b.order);
  
  // Use custom hook for pagination
  const { pages, useCoverPage, useTableOfContents } = usePaginatedContent(sortedSections);
  
  // State for current page in preview mode
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);
  const [showAllPages, setShowAllPages] = useState(false);
  
  // Reference to PDF content element
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Reset to first page when proposal changes
  useEffect(() => {
    setCurrentPreviewPage(0);
  }, [proposal.id]);
  
  // Calculate total pages including cover page and table of contents
  const totalPages = calculateTotalPages(pages.length, proposal.useCoverPage, proposal.useTableOfContents);

  return (
    <div className={`preview-wrapper ${className}`}>
      <PreviewControls
        title={proposal.title || 'Vorschau'}
        onToggleAllPages={() => setShowAllPages(!showAllPages)}
        showAllPages={showAllPages}
        documentType={proposal.documentType}
      />

      <div className="preview-container bg-black/30" id="pdf-content" ref={pdfContentRef}>
        {/* Print mode - render all pages for PDF export */}
        <PrintPreview 
          pages={pages} 
          useCoverPage={useCoverPage}
          useTableOfContents={useTableOfContents}
          allSections={sortedSections}
          title={proposal.title}
          clientName={proposal.clientName}
          documentType={proposal.documentType}
        />
        
        {/* Preview mode - single page or all pages */}
        {showAllPages ? (
          // All pages view for preview
          <div className="all-pages-preview space-y-8 print:hidden">
            {/* Cover page if enabled */}
            {useCoverPage && (
              <div className="mb-8 flex justify-center">
                <SinglePagePreview
                  sections={[]}
                  pageIndex={0}
                  isCoverPage={true}
                  title={proposal.title}
                  clientName={proposal.clientName}
                  documentType={proposal.documentType}
                />
              </div>
            )}
            
            {/* Table of contents if enabled */}
            {useTableOfContents && (
              <div className="mb-8 flex justify-center">
                <SinglePagePreview
                  sections={[]}
                  pageIndex={useCoverPage ? 1 : 0}
                  isTableOfContents={true}
                  allSections={sortedSections}
                  title={proposal.title}
                  clientName={proposal.clientName}
                  documentType={proposal.documentType}
                />
              </div>
            )}
            
            {/* Regular pages */}
            {pages.map((page, index) => (
              <div key={`all-page-${index}`} className="mb-8">
                <SinglePagePreview
                  sections={page.sections}
                  pageIndex={getAdjustedPageIndex(index, useCoverPage, useTableOfContents)}
                  title={proposal.title}
                  clientName={proposal.clientName}
                  documentType={proposal.documentType}
                />
              </div>
            ))}
          </div>
        ) : (
          // Single page view for preview
          <>
            {/* If cover page is enabled and current preview page is 0, show cover page */}
            {useCoverPage && currentPreviewPage === 0 ? (
              <SinglePagePreview
                sections={[]}
                pageIndex={0}
                isCoverPage={true}
                title={proposal.title}
                clientName={proposal.clientName}
                documentType={proposal.documentType}
              />
            ) : useTableOfContents && (useCoverPage ? currentPreviewPage === 1 : currentPreviewPage === 0) ? (
              // Table of contents page
              <SinglePagePreview
                sections={[]}
                pageIndex={useCoverPage ? 1 : 0}
                isTableOfContents={true}
                allSections={sortedSections}
                title={proposal.title}
                clientName={proposal.clientName}
                documentType={proposal.documentType}
              />
            ) : (
              /* Regular page */
              pages.length > 0 && (getContentPageIndex(currentPreviewPage, useCoverPage, useTableOfContents) < pages.length) && (
                <SinglePagePreview
                  sections={pages[getContentPageIndex(currentPreviewPage, useCoverPage, useTableOfContents)].sections}
                  pageIndex={currentPreviewPage}
                  title={proposal.title}
                  clientName={proposal.clientName}
                  documentType={proposal.documentType}
                />
              )
            )}
          </>
        )}
      </div>
      
      {/* Pagination controls - only shown in preview mode when not showing all pages */}
      {!showAllPages && (
        <PaginationControls
          currentPage={currentPreviewPage}
          totalPages={totalPages}
          onPageChange={setCurrentPreviewPage}
        />
      )}
      
      <StatusMessage isGeneratingPDF={isGeneratingPDF} />
    </div>
  );
};

// Helper function to calculate adjusted page index with cover page and table of contents
function getAdjustedPageIndex(pageIndex: number, useCoverPage: boolean, useTableOfContents: boolean): number {
  let adjustment = 0;
  if (useCoverPage) adjustment += 1;
  if (useTableOfContents) adjustment += 1;
  return pageIndex + adjustment;
}

// Helper function to calculate content page index considering cover page and table of contents
function getContentPageIndex(currentPage: number, useCoverPage: boolean, useTableOfContents: boolean): number {
  let offset = 0;
  if (useCoverPage) offset += 1;
  if (useTableOfContents) offset += 1;
  return currentPage - offset;
}

// Helper function to calculate total pages
function calculateTotalPages(contentPages: number, useCoverPage?: boolean, useTableOfContents?: boolean): number {
  let total = contentPages;
  if (useCoverPage) total += 1;
  if (useTableOfContents) total += 1;
  return total;
}
