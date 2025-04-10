
import React from "react";
import { Proposal, SavedBrochure } from "./types";
import { ProposalEditor } from "./ProposalEditor";
import { ProposalPreview } from "./ProposalPreview";
import { ProposalTemplates } from "./ProposalTemplates";
import { SavedBrochuresView } from "./SavedBrochuresView";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";

interface ProposalContentProps {
  activeTab: string;
  proposal: Proposal;
  savedBrochures: SavedBrochure[];
  isLoading: boolean;
  onProposalChange: (proposal: Proposal) => void;
  onTemplateSelect: (template: any) => void;
  onLoadBrochure: (brochure: SavedBrochure) => void;
}

export const ProposalContent: React.FC<ProposalContentProps> = ({
  activeTab,
  proposal,
  savedBrochures,
  isLoading,
  onProposalChange,
  onTemplateSelect,
  onLoadBrochure
}) => {
  // Render split view (editor + preview) when in editor mode
  const renderEditorContent = () => {
    return (
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border border-white/10">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="p-4 h-full overflow-auto">
            <ProposalEditor proposal={proposal} onChange={onProposalChange} />
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
  switch (activeTab) {
    case "templates":
      return <ProposalTemplates onSelect={onTemplateSelect} />;
    case "saved":
      return (
        <SavedBrochuresView 
          savedBrochures={savedBrochures}
          isLoading={isLoading}
          onLoadBrochure={onLoadBrochure}
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
