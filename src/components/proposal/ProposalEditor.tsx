
import React from "react";
import { Proposal } from "./types";
import { ProposalHeader } from "./editor/ProposalHeader";
import { SectionManager } from "./editor/SectionManager";
import { SectionTypesAdder } from "./editor/SectionTypesAdder";
import { useProposalSections } from "./editor/useProposalSections";

interface ProposalEditorProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
}

export const ProposalEditor: React.FC<ProposalEditorProps> = ({ proposal, onChange }) => {
  const { 
    handleSectionChange, 
    handleDragEnd, 
    addSection, 
    removeSection 
  } = useProposalSections(proposal, onChange);
  
  return (
    <div className="space-y-4">
      <ProposalHeader proposal={proposal} onChange={onChange} />
      
      <SectionManager 
        sections={proposal.sections} 
        onDragEnd={handleDragEnd}
        onSectionChange={handleSectionChange}
        onSectionRemove={removeSection}
      />
      
      <SectionTypesAdder onAddSection={addSection} />
    </div>
  );
};
