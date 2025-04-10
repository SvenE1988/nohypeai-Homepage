
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { ExportSettings } from "../types";

export const generatePDF = async (
  element: HTMLElement, 
  filename: string, 
  settings?: ExportSettings
): Promise<void> => {
  toast.loading("PDF wird erstellt...");
  
  try {
    // Prepare element for PDF generation
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Show all content for printing
    const allPrintElements = clonedElement.querySelectorAll('.print\\:hidden');
    allPrintElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    
    const allPrintShowElements = clonedElement.querySelectorAll('.print\\:block');
    allPrintShowElements.forEach(el => {
      (el as HTMLElement).style.display = 'block';
    });
    
    // Configure html2pdf options
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${filename}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: settings?.quality === 'high' ? 0.98 : 
                 settings?.quality === 'standard' ? 0.92 : 0.85 
      },
      html2canvas: { 
        scale: settings?.quality === 'high' ? 2 : 
               settings?.quality === 'standard' ? 1.5 : 1, 
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };
    
    // Generate PDF
    await html2pdf().set(opt).from(clonedElement).save();
    
    toast.success("PDF wurde erfolgreich erstellt");
    return Promise.resolve();
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Fehler beim Erstellen des PDFs");
    return Promise.reject(error);
  }
};

export const printDocument = (): void => {
  // Add a small delay to ensure the DOM is ready for printing
  setTimeout(() => {
    // Apply print-specific styling
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print\\:block, .print\\:block * {
          visibility: visible;
        }
        .print\\:block {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .page-break-after {
          page-break-after: always;
        }
      }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Clean up the style after printing
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  }, 200);
};
