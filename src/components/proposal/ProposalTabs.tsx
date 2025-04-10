
import React from "react";
import { Save, FileDown, Pencil, Eye, LayoutTemplate, BookOpen, Printer } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/neon-button"; // Using neon-button for consistency

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
          variant={activeTab === "templates" ? "solid" : "default"} 
          onClick={() => setActiveTab("templates")}
          className={`whitespace-nowrap ${activeTab === "templates" ? "bg-primary hover:bg-primary/90" : "hover:bg-blue-500/10"}`}
          size="sm"
        >
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Vorlagen
        </Button>
        <Button 
          variant={activeTab === "saved" ? "solid" : "default"} 
          onClick={() => setActiveTab("saved")}
          className={`whitespace-nowrap ${activeTab === "saved" ? "bg-primary hover:bg-primary/90" : "hover:bg-blue-500/10"}`}
          size="sm"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Gespeichert
        </Button>
        <Button 
          variant={activeTab === "editor" ? "solid" : "default"} 
          onClick={() => setActiveTab("editor")}
          className={`whitespace-nowrap ${activeTab === "editor" ? "bg-primary hover:bg-primary/90" : "hover:bg-blue-500/10"}`}
          size="sm"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editor
        </Button>
        <Button 
          variant={activeTab === "preview" ? "solid" : "default"} 
          onClick={() => setActiveTab("preview")}
          className={`whitespace-nowrap ${activeTab === "preview" ? "bg-primary hover:bg-primary/90" : "hover:bg-blue-500/10"}`}
          size="sm"
        >
          <Eye className="mr-2 h-4 w-4" />
          Vorschau
        </Button>
      </div>
      
      <div className="flex gap-2">
        {(activeTab === "editor" || activeTab === "preview") && (
          <Button variant="default" onClick={onSaveClick} size="sm" className="hover:bg-blue-500/10">
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        )}
        <Button variant="default" onClick={onResetClick} size="sm" className="hover:bg-blue-500/10">
          Zurücksetzen
        </Button>
        {(activeTab === "editor" || activeTab === "preview") && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="solid" 
                size="sm" 
                className="bg-primary hover:bg-primary/90"
                disabled={isGeneratingPDF}
              >
                <FileDown className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Wird erstellt..." : "Exportieren"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border border-white/10 text-white">
              <DropdownMenuItem onClick={onExportClick} className="cursor-pointer hover:bg-white/10">
                <FileDown className="mr-2 h-4 w-4" />
                PDF exportieren
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onPrintClick} className="cursor-pointer hover:bg-white/10">
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
