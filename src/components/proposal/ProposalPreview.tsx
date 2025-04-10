
import React, { useState, useEffect, useRef } from "react";
import { Proposal } from "./types";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { PrintPreview } from "./preview/PrintPreview";
import { SinglePagePreview } from "./preview/SinglePagePreview";
import { PreviewControls } from "./preview/PreviewControls";
import { StatusMessage } from "./preview/StatusMessage";
import { generatePDF, printDocument } from "./utils/pdfUtils";
import { toast } from "sonner";

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
  const { pages, useCoverPage } = usePaginatedContent(sortedSections);
  
  // State for current page in preview mode
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);
  const [showAllPages, setShowAllPages] = useState(false);
  
  // Reference to PDF content element
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Reset to first page when proposal changes
  useEffect(() => {
    setCurrentPreviewPage(0);
  }, [proposal.id]);

  const handleExport = async () => {
    if (setIsGeneratingPDF) {
      setIsGeneratingPDF(true);
    }
    
    try {
      if (pdfContentRef.current) {
        await generatePDF(pdfContentRef.current, proposal.title || 'Angebot', {
          quality: 'high',
          includeCoverPage: useCoverPage,
          includeTableOfContents: false,
          includePageNumbers: true,
          includeFooter: true,
          format: 'a4'
        });
      } else {
        toast.error("PDF-Inhalt konnte nicht gefunden werden");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Fehler beim Exportieren");
    } finally {
      if (setIsGeneratingPDF) {
        setIsGeneratingPDF(false);
      }
    }
  };

  const handlePrint = () => {
    printDocument();
  };

  return (
    <div className={`preview-wrapper ${className}`}>
      <PreviewControls
        title={proposal.title || 'Vorschau'}
        onToggleAllPages={() => setShowAllPages(!showAllPages)}
        showAllPages={showAllPages}
        onExport={handleExport}
        onPrint={handlePrint}
      />

      <div className="preview-container" id="pdf-content" ref={pdfContentRef}>
        {/* Print mode - render all pages */}
        <PrintPreview pages={pages} useCoverPage={useCoverPage} />
        
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
                />
              </div>
            )}
            
            {/* Regular pages */}
            {pages.map((page, index) => (
              <div key={`all-page-${index}`} className="mb-8">
                <SinglePagePreview
                  sections={page.sections}
                  pageIndex={useCoverPage ? index + 1 : index}
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
              />
            ) : (
              /* Regular page */
              pages.length > 0 && (useCoverPage ? currentPreviewPage - 1 : currentPreviewPage) < pages.length && (
                <SinglePagePreview
                  sections={pages[useCoverPage ? currentPreviewPage - 1 : currentPreviewPage].sections}
                  pageIndex={currentPreviewPage}
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
          totalPages={useCoverPage ? pages.length + 1 : pages.length}
          onPageChange={setCurrentPreviewPage}
        />
      )}
      
      <StatusMessage isGeneratingPDF={isGeneratingPDF} />
    </div>
  );
};
