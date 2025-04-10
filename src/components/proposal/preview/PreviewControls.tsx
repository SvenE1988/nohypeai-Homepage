
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface PreviewControlsProps {
  title: string;
  isGeneratingPDF: boolean;
  onExportClick: () => void;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({ 
  title, 
  isGeneratingPDF, 
  onExportClick 
}) => {
  return (
    <div className="flex justify-between items-center mb-4 print:hidden">
      <h3 className="text-xl font-medium text-white">Vorschau: {title}</h3>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          onClick={onExportClick}
          className="flex items-center gap-1"
          disabled={isGeneratingPDF}
        >
          <FileDown size={16} />
          <span className="hidden sm:inline">Exportieren</span>
        </Button>
      </div>
    </div>
  );
};
