
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Proposal, SavedBrochure } from "./types";
import { defaultProposal } from "./defaultData";
import { ProposalEditor } from "./ProposalEditor";
import { ProposalPreview } from "./ProposalPreview";
import { ProposalTemplates } from "./ProposalTemplates";
import { SavedBrochuresView } from "./SavedBrochuresView";
import { SaveBrochureDialog } from "./SaveBrochureDialog";
import { ProposalTabs } from "./ProposalTabs";
import { ExportDialog, ExportSettings } from "./ExportDialog";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import "./ProposalStyles.css";

export const PDFGenerator = () => {
  const [proposal, setProposal] = useState<Proposal>(defaultProposal);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [savedBrochures, setSavedBrochures] = useState<SavedBrochure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  
  // Fetch saved brochures from Supabase
  useEffect(() => {
    const fetchSavedBrochures = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_brochures')
          .select('*')
          .order('updated_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Convert the Supabase data to our SavedBrochure type
        const typedBrochures = data.map(item => ({
          ...item,
          content: item.content as unknown as Proposal
        }));
        
        setSavedBrochures(typedBrochures);
      } catch (error) {
        console.error('Error fetching saved brochures:', error);
        toast.error('Fehler beim Laden gespeicherter Broschüren');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedBrochures();
  }, []);
  
  const handleTemplateSelect = (template: any) => {
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
  
  const handleSaveBrochure = async () => {
    if (!saveTitle.trim()) {
      toast.error('Bitte geben Sie einen Titel ein');
      return;
    }
    
    setIsLoading(true);
    try {
      // Create a thumbnail from the first page (we could implement this later)
      const thumbnail = null;
      
      const { data, error } = await supabase
        .from('saved_brochures')
        .insert({
          title: saveTitle,
          description: saveDescription || null,
          content: proposal as any,
          thumbnail
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast.success('Broschüre erfolgreich gespeichert');
      setShowSaveDialog(false);
      
      // Add the new brochure to the list
      if (data && data.length > 0) {
        const newBrochure = {
          ...data[0],
          content: data[0].content as unknown as Proposal
        };
        setSavedBrochures([newBrochure, ...savedBrochures]);
      }
    } catch (error) {
      console.error('Error saving brochure:', error);
      toast.error('Fehler beim Speichern der Broschüre');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoadBrochure = (brochure: SavedBrochure) => {
    setProposal(brochure.content);
    toast.success(`Broschüre "${brochure.title}" geladen`);
    setActiveTab("editor");
  };
  
  const handleExportAction = (type: string, settings: ExportSettings) => {
    // This function would be passed to the embedded ProposalPreview component
    // We'll implement it here mainly to handle the dialog
    setShowExportDialog(false);
  };
  
  const handleOpenSaveDialog = () => {
    setSaveTitle(proposal.title || "");
    setShowSaveDialog(true);
  };
  
  const handleResetProposal = () => {
    setProposal(defaultProposal);
    toast.success("Broschüre zurückgesetzt");
  };
  
  // Render split view (editor + preview) when in editor mode
  const renderEditorContent = () => {
    return (
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border border-white/10">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="p-4 h-full overflow-auto">
            <ProposalEditor proposal={proposal} onChange={handleProposalChange} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="p-4 h-full overflow-auto bg-black/10">
            <ProposalPreview proposal={proposal} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };
  
  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "templates":
        return <ProposalTemplates onSelect={handleTemplateSelect} />;
      case "saved":
        return (
          <SavedBrochuresView 
            savedBrochures={savedBrochures}
            isLoading={isLoading}
            onLoadBrochure={handleLoadBrochure}
          />
        );
      case "editor":
        return renderEditorContent();
      case "preview":
        return <ProposalPreview proposal={proposal} className="bg-black/30 p-6 rounded-lg border border-white/10" />;
      default:
        return null;
    }
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
          {renderTabContent()}
        </div>
      </div>
      
      <SaveBrochureDialog 
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        title={saveTitle}
        description={saveDescription}
        onTitleChange={setSaveTitle}
        onDescriptionChange={setSaveDescription}
        onSave={handleSaveBrochure}
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
