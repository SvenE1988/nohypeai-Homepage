
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, FileDown, Pencil, Eye, LayoutTemplate, BookOpen } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button 
          variant={activeTab === "templates" ? "default" : "outline"} 
          onClick={() => setActiveTab("templates")}
          className="text-white whitespace-nowrap"
          size="sm"
        >
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Vorlagen
        </Button>
        <Button 
          variant={activeTab === "saved" ? "default" : "outline"} 
          onClick={() => setActiveTab("saved")}
          className="text-white whitespace-nowrap"
          size="sm"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Gespeichert
        </Button>
        <Button 
          variant={activeTab === "editor" ? "default" : "outline"} 
          onClick={() => setActiveTab("editor")}
          className="text-white whitespace-nowrap"
          size="sm"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editor
        </Button>
        <Button 
          variant={activeTab === "preview" ? "default" : "outline"} 
          onClick={() => setActiveTab("preview")}
          className="text-white whitespace-nowrap"
          size="sm"
        >
          <Eye className="mr-2 h-4 w-4" />
          Vorschau
        </Button>
      </div>
      
      <div className="flex gap-2">
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button variant="outline" onClick={onSaveClick} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        )}
        <Button variant="outline" onClick={onResetClick} size="sm">
          Zurücksetzen
        </Button>
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button onClick={onPrintPDF} size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            PDF herunterladen
          </Button>
        )}
      </div>
    </div>
  );
};
