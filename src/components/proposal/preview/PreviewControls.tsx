
import React from "react";
import { Button } from "@/components/ui/button";
import { Layers, Book, Download, Printer } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PreviewControlsProps {
  title: string;
  onToggleAllPages: () => void;
  showAllPages: boolean;
  onExport?: () => void;
  onPrint?: () => void;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({ 
  title, 
  onToggleAllPages,
  showAllPages,
  onExport,
  onPrint
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 print:hidden">
      <h3 className="text-xl font-medium text-white">{title || 'Vorschau'}</h3>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch 
            id="show-all-pages" 
            checked={showAllPages} 
            onCheckedChange={onToggleAllPages}
          />
          <Label htmlFor="show-all-pages" className="text-white text-sm flex items-center">
            <Layers className="h-4 w-4 mr-1.5" />
            Alle Seiten anzeigen
          </Label>
        </div>
        
        {onExport && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="text-xs h-8"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Exportieren
          </Button>
        )}
        
        {onPrint && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrint}
            className="text-xs h-8"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            Drucken
          </Button>
        )}
      </div>
    </div>
  );
};
