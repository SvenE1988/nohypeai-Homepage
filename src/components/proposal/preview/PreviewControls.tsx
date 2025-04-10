
import React from "react";
import { Layers, FileText, Presentation } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/neon-button"; 

interface PreviewControlsProps {
  title: string;
  onToggleAllPages: () => void;
  showAllPages: boolean;
  documentType?: 'proposal' | 'brochure';
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({ 
  title, 
  onToggleAllPages,
  showAllPages,
  documentType = 'proposal'
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 print:hidden">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-medium text-white">{title || 'Vorschau'}</h3>
        <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs flex items-center">
          {documentType === 'brochure' ? (
            <>
              <Presentation className="h-3 w-3 mr-1" />
              Broschüre
            </>
          ) : (
            <>
              <FileText className="h-3 w-3 mr-1" />
              Angebot
            </>
          )}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch 
            id="show-all-pages" 
            checked={showAllPages} 
            onCheckedChange={onToggleAllPages}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="show-all-pages" className="text-white text-sm flex items-center">
            <Layers className="h-4 w-4 mr-1.5" />
            Alle Seiten anzeigen
          </Label>
        </div>
      </div>
    </div>
  );
};
