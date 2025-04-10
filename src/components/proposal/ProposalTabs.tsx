
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileDown, Pencil, Eye, LayoutTemplate, BookOpen, Printer } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ProposalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSaveClick: () => void;
  onResetClick: () => void;
  onExportClick: () => void;
  onPrintClick: () => void;
  isGeneratingPDF?: boolean;
}

export const ProposalTabs: React.FC<ProposalTabsProps> = ({
  activeTab,
  setActiveTab,
  onSaveClick,
  onResetClick,
  onExportClick,
  onPrintClick,
  isGeneratingPDF = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button 
          variant={activeTab === "templates" ? "default" : "outline"} 
          onClick={() => setActiveTab("templates")}
          className={`whitespace-nowrap text-sm ${activeTab === "templates" ? "text-white" : "text-gray-200"}`}
          size="sm"
        >
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Vorlagen
        </Button>
        <Button 
          variant={activeTab === "saved" ? "default" : "outline"} 
          onClick={() => setActiveTab("saved")}
          className={`whitespace-nowrap text-sm ${activeTab === "saved" ? "text-white" : "text-gray-200"}`}
          size="sm"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Gespeichert
        </Button>
        <Button 
          variant={activeTab === "editor" ? "default" : "outline"} 
          onClick={() => setActiveTab("editor")}
          className={`whitespace-nowrap text-sm ${activeTab === "editor" ? "text-white" : "text-gray-200"}`}
          size="sm"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editor
        </Button>
        <Button 
          variant={activeTab === "preview" ? "default" : "outline"} 
          onClick={() => setActiveTab("preview")}
          className={`whitespace-nowrap text-sm ${activeTab === "preview" ? "text-white" : "text-gray-200"}`}
          size="sm"
        >
          <Eye className="mr-2 h-4 w-4" />
          Vorschau
        </Button>
      </div>
      
      <div className="flex gap-2">
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button variant="outline" onClick={onSaveClick} size="sm" className="text-gray-200 text-sm">
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        )}
        <Button variant="outline" onClick={onResetClick} size="sm" className="text-gray-200 text-sm">
          Zurücksetzen
        </Button>
        {(activeTab === "editor" || activeTab === "preview") && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                className="text-sm"
                disabled={isGeneratingPDF}
              >
                <FileDown className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Wird erstellt..." : "Exportieren"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onExportClick} className="cursor-pointer">
                <FileDown className="mr-2 h-4 w-4" />
                PDF exportieren
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onPrintClick} className="cursor-pointer">
                <Printer className="mr-2 h-4 w-4" />
                Drucken
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
