
import React, { useState, useEffect, useRef } from "react";
import { Proposal } from "./types";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { toast } from "sonner";
import { ExportDialog } from "./ExportDialog";
import { ExportSettings } from "./types";
import { generatePDF, printDocument } from "./utils/pdfUtils";
import { PrintPreview } from "./preview/PrintPreview";
import { SinglePagePreview } from "./preview/SinglePagePreview";
import { PreviewControls } from "./preview/PreviewControls";
import { StatusMessage } from "./preview/StatusMessage";

interface ProposalPreviewProps {
  proposal: Proposal;
  className?: string;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ proposal, className = "" }) => {
  // Sort sections by order
  const sortedSections = [...proposal.sections].sort((a, b) => a.order - b.order);
  
  // Use custom hook for pagination
  const { pages } = usePaginatedContent(sortedSections);
  
  // State for current page in preview mode
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  // Reference to PDF content element
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Reset to first page when proposal changes
  useEffect(() => {
    setCurrentPreviewPage(0);
  }, [proposal.id]);

  const handleExportAction = async (type: string, settings: ExportSettings) => {
    switch (type) {
      case "download":
        if (!pdfContentRef.current) return;
        setIsGeneratingPDF(true);
        try {
          await generatePDF(
            pdfContentRef.current, 
            proposal.title || 'Angebot',
            settings
          );
        } finally {
          setIsGeneratingPDF(false);
        }
        break;
      case "print":
        printDocument();
        break;
      case "email":
        toast.info("E-Mail-Funktion wird in einer zukünftigen Version verfügbar sein");
        break;
      default:
        break;
    }
  };

  return (
    <div className={`preview-wrapper ${className}`}>
      <PreviewControls
        title={proposal.title}
        isGeneratingPDF={isGeneratingPDF}
        onExportClick={() => setShowExportDialog(true)}
      />

      <div className="preview-container" id="pdf-content" ref={pdfContentRef}>
        {/* Print mode - render all pages */}
        <PrintPreview pages={pages} />
        
        {/* Preview mode - render only current page */}
        {pages.length > 0 && currentPreviewPage < pages.length && (
          <SinglePagePreview
            sections={pages[currentPreviewPage].sections}
            pageIndex={currentPreviewPage}
          />
        )}
      </div>
      
      {/* Pagination controls - only shown in preview mode */}
      <PaginationControls
        currentPage={currentPreviewPage}
        totalPages={pages.length}
        onPageChange={setCurrentPreviewPage}
      />
      
      <StatusMessage isGeneratingPDF={isGeneratingPDF} />

      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        proposal={proposal}
        onExport={handleExportAction}
      />
    </div>
  );
};
