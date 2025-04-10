
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, FileDown } from "lucide-react";

interface ProposalTabsProps {
  activeTab: string;
  onSaveClick: () => void;
  onResetClick: () => void;
  onPrintPDF: () => void;
}

export const ProposalTabs: React.FC<ProposalTabsProps> = ({
  activeTab,
  onSaveClick,
  onResetClick,
  onPrintPDF
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <TabsList className="bg-black/50">
        <TabsTrigger value="templates" className="text-white">Vorlagen</TabsTrigger>
        <TabsTrigger value="saved" className="text-white">Gespeichert</TabsTrigger>
        <TabsTrigger value="editor" className="text-white">Editor</TabsTrigger>
        <TabsTrigger value="preview" className="text-white">Vorschau</TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2">
        {activeTab === "editor" && (
          <Button variant="outline" onClick={onSaveClick}>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        )}
        <Button variant="outline" onClick={onResetClick}>
          Zurücksetzen
        </Button>
        {activeTab === "preview" && (
          <Button onClick={onPrintPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            PDF herunterladen
          </Button>
        )}
      </div>
    </div>
  );
};
