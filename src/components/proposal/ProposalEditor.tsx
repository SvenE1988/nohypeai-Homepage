
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Proposal, ProposalSection } from "./types";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2, Book } from "lucide-react";
import { SectionEditor } from "./sections/SectionEditor";
import { v4 as uuidv4 } from "uuid";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProposalEditorProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
}

export const ProposalEditor: React.FC<ProposalEditorProps> = ({ proposal, onChange }) => {
  const { useCoverPage = true } = proposal;

  const handleSectionChange = (updatedSection: ProposalSection) => {
    const updatedSections = proposal.sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    
    onChange({
      ...proposal,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(proposal.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const newSections = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    onChange({
      ...proposal,
      sections: newSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const addSection = (type: ProposalSection['type']) => {
    const newSection: ProposalSection = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: proposal.sections.length
    };
    
    onChange({
      ...proposal,
      sections: [...proposal.sections, newSection],
      updatedAt: new Date().toISOString()
    });
  };
  
  const removeSection = (sectionId: string) => {
    const updatedSections = proposal.sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({
        ...section,
        order: index
      }));
    
    onChange({
      ...proposal,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const toggleCoverPage = () => {
    onChange({
      ...proposal,
      useCoverPage: !useCoverPage,
      updatedAt: new Date().toISOString()
    });
  };
  
  const getDefaultContent = (type: ProposalSection['type']) => {
    switch (type) {
      case 'header':
        return { title: "Neuer Titel", subtitle: "Untertitel", date: new Date().toLocaleDateString('de-DE') };
      case 'text':
        return { title: "Abschnittstitel", text: "Ihr Text hier..." };
      case 'image':
        return { src: "", alt: "Bild Beschreibung", caption: "" };
      case 'caseStudy':
        return { caseStudyId: 0 };
      case 'pricing':
        return { 
          title: "Preise", 
          items: [{ description: "Position", price: 0, unit: "pauschal" }] 
        };
      case 'contact':
        return { 
          title: "Kontakt",
          contact: {
            name: "Name",
            position: "Position",
            email: "email@example.com",
            phone: "+49 123 456789"
          }
        };
      default:
        return {};
    }
  };
  
  return (
    <div className="space-y-6">
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
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {proposal.sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-black/30 border border-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                            <GripVertical className="text-gray-400" size={16} />
                          </div>
                          <h3 className="text-white font-medium capitalize text-sm">
                            {section.type} Sektion
                          </h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeSection(section.id)}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div className="text-sm">
                        <SectionEditor 
                          section={section} 
                          onChange={handleSectionChange} 
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3 text-sm">Abschnitt hinzufügen</h3>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => addSection('header')} variant="outline" size="sm" className="text-xs py-1 h-8">Header</Button>
          <Button onClick={() => addSection('text')} variant="outline" size="sm" className="text-xs py-1 h-8">Text</Button>
          <Button onClick={() => addSection('image')} variant="outline" size="sm" className="text-xs py-1 h-8">Bild</Button>
          <Button onClick={() => addSection('caseStudy')} variant="outline" size="sm" className="text-xs py-1 h-8">Case Study</Button>
          <Button onClick={() => addSection('pricing')} variant="outline" size="sm" className="text-xs py-1 h-8">Preistabelle</Button>
          <Button onClick={() => addSection('contact')} variant="outline" size="sm" className="text-xs py-1 h-8">Kontakt</Button>
        </div>
      </div>
    </div>
  );
};
