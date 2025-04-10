
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, FileDown } from "lucide-react";

interface ProposalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSaveClick: () => void;
  onResetClick: () => void;
  onPrintPDF: () => void;
}

export const ProposalTabs: React.FC<ProposalTabsProps> = ({
  activeTab,
  setActiveTab,
  onSaveClick,
  onResetClick,
  onPrintPDF
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant={activeTab === "templates" ? "default" : "outline"} 
          onClick={() => setActiveTab("templates")}
          className="text-white"
        >
          Vorlagen
        </Button>
        <Button 
          variant={activeTab === "saved" ? "default" : "outline"} 
          onClick={() => setActiveTab("saved")}
          className="text-white"
        >
          Gespeichert
        </Button>
        <Button 
          variant={activeTab === "editor" ? "default" : "outline"} 
          onClick={() => setActiveTab("editor")}
          className="text-white"
        >
          Editor
        </Button>
        <Button 
          variant={activeTab === "preview" ? "default" : "outline"} 
          onClick={() => setActiveTab("preview")}
          className="text-white"
        >
          Vorschau
        </Button>
      </div>
      
      <div className="flex gap-2">
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button variant="outline" onClick={onSaveClick}>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        )}
        <Button variant="outline" onClick={onResetClick}>
          Zurücksetzen
        </Button>
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button onClick={onPrintPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            PDF herunterladen
          </Button>
        )}
      </div>
    </div>
  );
};
