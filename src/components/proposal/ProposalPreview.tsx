
import React, { useState, useEffect, useRef } from "react";
import { Proposal } from "./types";
import { PageRenderer } from "./preview/PageRenderer";
import { PaginationControls } from "./preview/PaginationControls";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Download } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

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

  const handleDownloadPDF = async () => {
    if (!pdfContentRef.current) return;
    
    setIsGeneratingPDF(true);
    toast.loading("PDF wird erstellt...");
    
    try {
      const element = pdfContentRef.current;
      
      // Configure html2pdf options
      const opt = {
        margin: 0,
        filename: `${proposal.title || 'Angebot'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
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

  return (
    <div className={`preview-wrapper ${className}`}>
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h3 className="text-xl font-medium text-white">Vorschau: {proposal.title}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrintPDF} 
            className="flex items-center gap-1"
            disabled={isGeneratingPDF}
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Drucken</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleDownloadPDF} 
            className="flex items-center gap-1"
            disabled={isGeneratingPDF}
          >
            <FileDown size={16} />
            <span className="hidden sm:inline">PDF herunterladen</span>
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
          Klicken Sie auf "PDF herunterladen", um das Angebot als PDF zu speichern.
        </p>
      )}
    </div>
  );
};
