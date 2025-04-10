
import React, { useState, useEffect, useRef } from "react";
import { Proposal } from "./types";
import { PageRenderer } from "./preview/PageRenderer";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { ExportDialog, ExportSettings } from "./ExportDialog";

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

  const handlePrintPDF = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDownloadPDF = async (settings?: ExportSettings) => {
    if (!pdfContentRef.current) return;
    
    setIsGeneratingPDF(true);
    toast.loading("PDF wird erstellt...");
    
    try {
      const element = pdfContentRef.current;
      
      // Configure html2pdf options
      const opt = {
        margin: 0,
        filename: `${proposal.title || 'Angebot'}.pdf`,
        image: { type: 'jpeg', quality: settings?.quality === 'high' ? 0.98 : settings?.quality === 'standard' ? 0.92 : 0.85 },
        html2canvas: { 
          scale: settings?.quality === 'high' ? 2 : settings?.quality === 'standard' ? 1.5 : 1, 
          useCORS: true 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Generate PDF
      await html2pdf().set(opt).from(element).save();
      
      toast.success("PDF wurde erfolgreich erstellt");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Fehler beim Erstellen des PDFs");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleExportAction = (type: string, settings: ExportSettings) => {
    switch (type) {
      case "download":
        handleDownloadPDF(settings);
        break;
      case "print":
        handlePrintPDF();
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
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h3 className="text-xl font-medium text-white">Vorschau: {proposal.title}</h3>
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowExportDialog(true)}
            className="flex items-center gap-1"
            disabled={isGeneratingPDF}
          >
            <FileDown size={16} />
            <span className="hidden sm:inline">Exportieren</span>
          </Button>
        </div>
      </div>

      <div className="preview-container" id="pdf-content" ref={pdfContentRef}>
        {/* In print mode, we render all pages */}
        <div className="print:block hidden">
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
      
      {isGeneratingPDF ? (
        <p className="text-center text-sm text-gray-400 mt-4 print:hidden animate-pulse">
          PDF wird generiert...
        </p>
      ) : (
        <p className="text-center text-sm text-gray-400 mt-4 print:hidden print-instructions">
          Klicken Sie auf "Exportieren", um das Angebot als PDF zu speichern oder zu drucken.
        </p>
      )}

      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        proposal={proposal}
        onExport={handleExportAction}
      />
    </div>
  );
};
