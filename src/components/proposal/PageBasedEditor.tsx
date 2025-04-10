import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Proposal, ProposalSection } from "./types";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2, Copy } from "lucide-react";
import { SectionEditor } from "./sections/SectionEditor";
import { v4 as uuidv4 } from "uuid";
import { PageRenderer } from "./preview/PageRenderer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PageBasedEditorProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pages: Array<{ sections: ProposalSection[] }>;
}

export const PageBasedEditor: React.FC<PageBasedEditorProps> = ({ 
  proposal, 
  onChange, 
  currentPage, 
  setCurrentPage,
  pages
}) => {
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  
  const currentPageSections = pages[currentPage]?.sections || [];
  
  const handleSectionChange = (updatedSection: ProposalSection) => {
    let updatedPages = [...pages];
    let foundPage = false;
    
    updatedPages = updatedPages.map(page => {
      const updatedSections = page.sections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      );
      
      if (updatedSections.some(s => s.id === updatedSection.id)) {
        foundPage = true;
        return { ...page, sections: updatedSections };
      }
      
      return page;
    });
    
    if (foundPage) {
      const allSections = updatedPages.flatMap(page => page.sections);
      
      onChange({
        ...proposal,
        sections: allSections,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(currentPageSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const newSections = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    const updatedPages = [...pages];
    updatedPages[currentPage] = { sections: newSections };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const addSection = (type: ProposalSection['type']) => {
    const newSection: ProposalSection = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: currentPageSections.length
    };
    
    const updatedPages = [...pages];
    if (!updatedPages[currentPage]) {
      updatedPages[currentPage] = { sections: [] };
    }
    updatedPages[currentPage] = { 
      sections: [...updatedPages[currentPage].sections, newSection] 
    };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const removeSection = (sectionId: string) => {
    const updatedPages = [...pages];
    if (updatedPages[currentPage]) {
      const filteredSections = updatedPages[currentPage].sections.filter(
        section => section.id !== sectionId
      );
      
      updatedPages[currentPage] = { 
        sections: filteredSections.map((section, index) => ({
          ...section,
          order: index
        }))
      };
      
      const allSections = updatedPages.flatMap(page => page.sections);
      
      onChange({
        ...proposal,
        sections: allSections,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  const addNewPage = () => {
    const updatedPages = [...pages, { sections: [] }];
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(updatedPages.length - 1);
  };
  
  const duplicatePage = () => {
    if (currentPage < 0 || currentPage >= pages.length) return;
    
    const duplicatedSections = pages[currentPage].sections.map(section => ({
      ...section,
      id: uuidv4()
    }));
    
    const updatedPages = [...pages];
    updatedPages.splice(currentPage + 1, 0, { sections: duplicatedSections });
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(currentPage + 1);
  };
  
  const deletePage = () => {
    if (pages.length <= 1) {
      return;
    }
    
    const updatedPages = [...pages];
    updatedPages.splice(currentPage, 1);
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(Math.max(0, currentPage - 1));
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
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center">
            <h3 className="text-white font-medium">Seite {currentPage + 1} von {pages.length}</h3>
            
            <div className="hidden sm:flex ml-4 space-x-2">
              {pages.map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index)}
                  className="w-8 h-8 p-0"
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addNewPage}
                className="w-8 h-8 p-0"
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={duplicatePage}
              className="text-white"
            >
              <Copy size={16} className="mr-1" /> Duplizieren
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={deletePage}
              className="text-red-500"
              disabled={pages.length <= 1}
            >
              <Trash2 size={16} className="mr-1" /> Löschen
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="sm:hidden"
                  onClick={() => setShowMobilePreview(true)}
                >
                  Vorschau
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-lg overflow-auto">
                <div className="pt-6">
                  <PageRenderer 
                    sections={currentPageSections} 
                    pageIndex={currentPage}
                    scale={0.7}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex overflow-x-auto py-2 mt-2 sm:hidden gap-1">
          {pages.map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(index)}
              className="w-8 h-8 p-0 flex-shrink-0"
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addNewPage}
            className="w-8 h-8 p-0 flex-shrink-0"
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {currentPageSections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-black/30 border border-white/10 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                <GripVertical className="text-gray-400" />
                              </div>
                              <h3 className="text-white font-medium capitalize">
                                {section.type} Sektion
                              </h3>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeSection(section.id)}
                              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                          <SectionEditor 
                            section={section} 
                            onChange={handleSectionChange} 
                          />
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
            <h3 className="text-white font-medium mb-4">Abschnitt hinzufügen</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => addSection('header')} variant="outline" size="sm">Header</Button>
              <Button onClick={() => addSection('text')} variant="outline" size="sm">Text</Button>
              <Button onClick={() => addSection('image')} variant="outline" size="sm">Bild</Button>
              <Button onClick={() => addSection('caseStudy')} variant="outline" size="sm">Case Study</Button>
              <Button onClick={() => addSection('pricing')} variant="outline" size="sm">Preistabelle</Button>
              <Button onClick={() => addSection('contact')} variant="outline" size="sm">Kontakt</Button>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="bg-black/30 p-4 rounded-lg border border-white/10 overflow-auto">
            <PageRenderer 
              sections={currentPageSections} 
              pageIndex={currentPage}
              scale={0.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
