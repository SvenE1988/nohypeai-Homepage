
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
    // Configure html2pdf options
    const opt = {
      margin: 0,
      filename: `${filename}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: settings?.quality === 'high' ? 0.98 : 
                 settings?.quality === 'standard' ? 0.92 : 0.85 
      },
      html2canvas: { 
        scale: settings?.quality === 'high' ? 2 : 
               settings?.quality === 'standard' ? 1.5 : 1, 
        useCORS: true 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate PDF
    await html2pdf().set(opt).from(element).save();
    
    toast.success("PDF wurde erfolgreich erstellt");
    return Promise.resolve();
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Fehler beim Erstellen des PDFs");
    return Promise.reject(error);
  }
};

export const printDocument = (): void => {
  setTimeout(() => {
    window.print();
  }, 100);
};
