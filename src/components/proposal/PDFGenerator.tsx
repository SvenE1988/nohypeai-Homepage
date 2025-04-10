
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProposalEditor } from "./ProposalEditor";
import { ProposalPreview } from "./ProposalPreview";
import { ProposalTemplates } from "./ProposalTemplates";
import { Proposal, ProposalTemplate } from "./types";
import { defaultProposal } from "./defaultData";
import { toast } from "sonner";
import "./ProposalStyles.css";

export const PDFGenerator = () => {
  const [proposal, setProposal] = useState<Proposal>(defaultProposal);
  const [activeTab, setActiveTab] = useState<string>("editor");
  
  const handleTemplateSelect = (template: ProposalTemplate) => {
    setProposal({
      ...proposal,
      sections: [...template.sections],
    });
    setActiveTab("editor");
    toast.success("Vorlage erfolgreich angewendet!");
  };
  
  const handleProposalChange = (updatedProposal: Proposal) => {
    setProposal(updatedProposal);
  };
  
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-black/50">
            <TabsTrigger value="templates" className="text-white">Vorlagen</TabsTrigger>
            <TabsTrigger value="editor" className="text-white">Editor</TabsTrigger>
            <TabsTrigger value="preview" className="text-white">Vorschau</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setProposal(defaultProposal)}>
              Zurücksetzen
            </Button>
            {activeTab === "preview" && (
              <Button onClick={() => window.print()}>
                PDF herunterladen
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="templates" className="mt-0">
          <ProposalTemplates onSelect={handleTemplateSelect} />
        </TabsContent>
        
        <TabsContent value="editor" className="mt-0">
          <ProposalEditor proposal={proposal} onChange={handleProposalChange} />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <ProposalPreview proposal={proposal} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
