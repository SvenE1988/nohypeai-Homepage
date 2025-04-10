
import { useState } from "react";
import { Proposal, ProposalTemplate } from "../components/proposal/types";
import { defaultProposal } from "../components/proposal/defaultData";
import { toast } from "sonner";

export const useProposal = () => {
  const [proposal, setProposal] = useState<Proposal>(defaultProposal);
  
  const handleProposalChange = (updatedProposal: Proposal) => {
    setProposal(updatedProposal);
  };
  
  const handleTemplateSelect = (template: ProposalTemplate) => {
    setProposal({
      ...proposal,
      sections: [...template.sections],
      documentType: template.documentType || 'proposal',
      useTableOfContents: template.useTableOfContents || false,
      updatedAt: new Date().toISOString()
    });
    toast.success("Vorlage erfolgreich angewendet!");
  };
  
  const handleResetProposal = () => {
    setProposal(defaultProposal);
    toast.success("Broschüre zurückgesetzt");
  };
  
  return {
    proposal,
    setProposal,
    handleProposalChange,
    handleTemplateSelect,
    handleResetProposal,
  };
};
