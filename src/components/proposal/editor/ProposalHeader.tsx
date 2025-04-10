
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Book } from "lucide-react";
import { Proposal } from "../types";

interface ProposalHeaderProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
}

export const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal, onChange }) => {
  const { useCoverPage = true } = proposal;

  const toggleCoverPage = () => {
    onChange({
      ...proposal,
      useCoverPage: !useCoverPage,
      updatedAt: new Date().toISOString()
    });
  };
  
  return (
    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={proposal.title || ""}
          onChange={(e) => onChange({ ...proposal, title: e.target.value })}
          className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white w-full"
          placeholder="Titel des Angebots"
        />
        <input
          type="text"
          value={proposal.clientName || ""}
          onChange={(e) => onChange({ ...proposal, clientName: e.target.value })}
          className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white w-full"
          placeholder="Name des Kunden"
        />
      </div>
      
      <div className="flex items-center space-x-2 text-white">
        <Switch 
          id="cover-page-toggle-categories" 
          checked={useCoverPage} 
          onCheckedChange={toggleCoverPage}
        />
        <Label htmlFor="cover-page-toggle-categories" className="flex items-center">
          <Book className="h-4 w-4 mr-2" />
          Deckblatt verwenden
        </Label>
      </div>
    </div>
  );
};
