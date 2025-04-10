
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Layers, Book } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PreviewControlsProps {
  title: string;
  isGeneratingPDF: boolean;
  onExportClick: () => void;
  onToggleAllPages: () => void;
  showAllPages: boolean;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({ 
  title, 
  isGeneratingPDF, 
  onExportClick,
  onToggleAllPages,
  showAllPages
}) => {
  return (
    <div className="flex justify-between items-center mb-4 print:hidden">
      <h3 className="text-xl font-medium text-white">Vorschau: {title}</h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch 
            id="show-all-pages" 
            checked={showAllPages} 
            onCheckedChange={onToggleAllPages}
          />
          <Label htmlFor="show-all-pages" className="text-white text-sm">
            Alle Seiten anzeigen
          </Label>
        </div>
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
