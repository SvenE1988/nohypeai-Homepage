
import React from "react";
import { Proposal } from "../types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Book, List, FileText, Presentation } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PageTitleProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
}

export const PageTitle: React.FC<PageTitleProps> = ({ proposal, onChange }) => {
  const { 
    useCoverPage = true, 
    useTableOfContents = false,
    documentType = 'proposal'
  } = proposal;

  const toggleCoverPage = () => {
    onChange({
      ...proposal,
      useCoverPage: !useCoverPage,
      updatedAt: new Date().toISOString()
    });
  };
  
  const toggleTableOfContents = () => {
    onChange({
      ...proposal,
      useTableOfContents: !useTableOfContents,
      updatedAt: new Date().toISOString()
    });
  };
  
  const handleDocumentTypeChange = (value: string) => {
    if (value === 'proposal' || value === 'brochure') {
      onChange({
        ...proposal,
        documentType: value as 'proposal' | 'brochure',
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="bg-black/50 p-3 rounded-lg border border-white/10">
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={proposal.title || ""}
          onChange={(e) => onChange({ ...proposal, title: e.target.value })}
          className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-white w-full text-sm"
          placeholder="Titel des Dokuments"
        />
        {documentType === 'proposal' && (
          <input
            type="text"
            value={proposal.clientName || ""}
            onChange={(e) => onChange({ ...proposal, clientName: e.target.value })}
            className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-white w-full text-sm"
            placeholder="Name des Kunden"
          />
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-2">
        <div className="flex flex-col space-y-1.5">
          <div className="text-white text-xs mb-1">Dokumenttyp</div>
          <ToggleGroup type="single" value={documentType} onValueChange={handleDocumentTypeChange} size="sm">
            <ToggleGroupItem value="proposal" className="text-xs h-7 data-[state=on]:bg-primary">
              <FileText className="h-3.5 w-3.5 mr-1" />
              Angebot
            </ToggleGroupItem>
            <ToggleGroupItem value="brochure" className="text-xs h-7 data-[state=on]:bg-primary">
              <Presentation className="h-3.5 w-3.5 mr-1" />
              Broschüre
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2 text-white text-sm">
            <Switch 
              id="cover-page-toggle" 
              checked={useCoverPage} 
              onCheckedChange={toggleCoverPage}
            />
            <Label htmlFor="cover-page-toggle" className="flex items-center">
              <Book className="h-3.5 w-3.5 mr-1.5" />
              Deckblatt
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 text-white text-sm">
            <Switch 
              id="table-of-contents-toggle" 
              checked={useTableOfContents} 
              onCheckedChange={toggleTableOfContents}
            />
            <Label htmlFor="table-of-contents-toggle" className="flex items-center">
              <List className="h-3.5 w-3.5 mr-1.5" />
              Inhaltsverzeichnis
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
