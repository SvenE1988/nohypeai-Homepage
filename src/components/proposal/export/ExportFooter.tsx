
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Send } from "lucide-react";

interface ExportFooterProps {
  activeTab: string;
  onCancel: () => void;
  onExport: () => void;
}

export const ExportFooter: React.FC<ExportFooterProps> = ({
  activeTab,
  onCancel,
  onExport,
}) => {
  return (
    <div className="sm:justify-between mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <Button
        variant="outline"
        onClick={onCancel}
      >
        Abbrechen
      </Button>
      <Button 
        onClick={onExport}
        className="flex items-center gap-2"
      >
        {activeTab === "download" && <FileDown className="h-4 w-4" />}
        {activeTab === "print" && <Printer className="h-4 w-4" />}
        {activeTab === "email" && <Send className="h-4 w-4" />}
        
        {activeTab === "download" && "PDF herunterladen"}
        {activeTab === "print" && "Drucken"}
        {activeTab === "email" && "Per E-Mail senden"}
      </Button>
    </div>
  );
};
