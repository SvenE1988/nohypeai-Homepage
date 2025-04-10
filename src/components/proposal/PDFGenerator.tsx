
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Proposal } from "./types";
import { ProposalTabs } from "./ProposalTabs";
import { ProposalContent } from "./ProposalContent";
import { SaveBrochureDialog } from "./SaveBrochureDialog";
import { ExportDialog, ExportSettings } from "./ExportDialog";
import { useProposal } from "../../hooks/useProposal";
import { useSavedBrochures } from "../../hooks/useSavedBrochures";
import "./ProposalStyles.css";

export const PDFGenerator = () => {
  const { 
    proposal, 
    setProposal, 
    handleProposalChange,
    handleTemplateSelect,
    handleResetProposal
  } = useProposal();
  
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  
  const { 
    savedBrochures, 
    isLoading, 
    handleSaveBrochure, 
    handleLoadBrochure 
  } = useSavedBrochures(proposal, setProposal);
  
  useEffect(() => {
    // Update the save dialog values when proposal changes
    setSaveTitle(proposal.title || "");
  }, [proposal.title]);
  
  const handleOpenSaveDialog = () => {
    setSaveTitle(proposal.title || "");
    setShowSaveDialog(true);
  };
  
  const handleExportAction = (type: string, settings: ExportSettings) => {
    setShowExportDialog(false);
  };
  
  const handleOnSaveBrochure = async () => {
    await handleSaveBrochure(saveTitle, saveDescription);
    setShowSaveDialog(false);
  };
  
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-6">
      <div className="w-full">
        <ProposalTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSaveClick={handleOpenSaveDialog}
          onResetClick={handleResetProposal}
          onExportClick={() => setShowExportDialog(true)}
        />
        
        <div className="mt-6">
          <ProposalContent
            activeTab={activeTab}
            proposal={proposal}
            savedBrochures={savedBrochures}
            isLoading={isLoading}
            onProposalChange={handleProposalChange}
            onTemplateSelect={handleTemplateSelect}
            onLoadBrochure={handleLoadBrochure}
          />
        </div>
      </div>
      
      <SaveBrochureDialog 
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        title={saveTitle}
        description={saveDescription}
        onTitleChange={setSaveTitle}
        onDescriptionChange={setSaveDescription}
        onSave={handleOnSaveBrochure}
        isLoading={isLoading}
      />
      
      <ExportDialog 
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        proposal={proposal}
        onExport={handleExportAction}
      />
    </div>
  );
};
