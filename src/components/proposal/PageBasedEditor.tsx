
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Proposal, ProposalSection } from "./types";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2, Copy, Book } from "lucide-react";
import { SectionEditor } from "./sections/SectionEditor";
import { v4 as uuidv4 } from "uuid";
import { PageRenderer } from "./preview/PageRenderer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";

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
  const { useCoverPage = true } = proposal;
  
  // Account for cover page in current page index
  const effectivePageIndex = useCoverPage && currentPage > 0 ? currentPage - 1 : currentPage;
  const currentPageSections = effectivePageIndex >= 0 && effectivePageIndex < pages.length 
    ? pages[effectivePageIndex].sections 
    : [];
  
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
    updatedPages[effectivePageIndex] = { sections: newSections };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const addSection = (type: ProposalSection['type']) => {
    // Don't add sections to cover page
    if (useCoverPage && currentPage === 0) return;
    
    const newSection: ProposalSection = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: currentPageSections.length
    };
    
    const updatedPages = [...pages];
    if (!updatedPages[effectivePageIndex]) {
      updatedPages[effectivePageIndex] = { sections: [] };
    }
    updatedPages[effectivePageIndex] = { 
      sections: [...updatedPages[effectivePageIndex].sections, newSection] 
    };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const removeSection = (sectionId: string) => {
    // Don't remove sections from cover page
    if (useCoverPage && currentPage === 0) return;
    
    const updatedPages = [...pages];
    if (updatedPages[effectivePageIndex]) {
      const filteredSections = updatedPages[effectivePageIndex].sections.filter(
        section => section.id !== sectionId
      );
      
      updatedPages[effectivePageIndex] = { 
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
    
    setCurrentPage(useCoverPage ? updatedPages.length : updatedPages.length - 1);
  };
  
  const duplicatePage = () => {
    // Don't duplicate cover page
    if (useCoverPage && currentPage === 0) return;
    
    if (effectivePageIndex < 0 || effectivePageIndex >= pages.length) return;
    
    const duplicatedSections = pages[effectivePageIndex].sections.map(section => ({
      ...section,
      id: uuidv4()
    }));
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex + 1, 0, { sections: duplicatedSections });
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(currentPage + 1);
  };
  
  const deletePage = () => {
    // Don't delete cover page
    if (useCoverPage && currentPage === 0) return;
    
    if (pages.length <= 1) {
      return;
    }
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex, 1);
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(Math.max(useCoverPage ? 1 : 0, currentPage - 1));
  };

  const toggleCoverPage = () => {
    onChange({
      ...proposal,
      useCoverPage: !useCoverPage,
      updatedAt: new Date().toISOString()
    });

    // If turning on cover page and we're at page 0, we need to ensure editor is ready
    if (!useCoverPage && currentPage === 0) {
      setCurrentPage(1);
    }
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

  const titleInput = (
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
      
      <div className="flex items-center space-x-2 text-white mb-4">
        <Switch 
          id="cover-page-toggle" 
          checked={useCoverPage} 
          onCheckedChange={toggleCoverPage}
        />
        <Label htmlFor="cover-page-toggle" className="flex items-center">
          <Book className="h-4 w-4 mr-2" />
          Deckblatt verwenden
        </Label>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Document title and client name */}
      {titleInput}
      
      {/* Page controls */}
      <div className="bg-black/50 p-4 rounded-lg border border-white/10">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center">
            <h3 className="text-white font-medium">Seite {currentPage + 1} von {useCoverPage ? pages.length + 1 : pages.length}</h3>
            
            <div className="hidden sm:flex ml-4 space-x-2">
              {useCoverPage && (
                <Button
                  key="cover"
                  variant={currentPage === 0 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(0)}
                  className="w-8 h-8 p-0"
                >
                  <Book size={14} />
                </Button>
              )}
              
              {pages.map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === (useCoverPage ? index + 1 : index) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(useCoverPage ? index + 1 : index)}
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
              className="text-gray-900 bg-white hover:bg-gray-100"
              disabled={useCoverPage && currentPage === 0}
            >
              <Copy size={16} className="mr-1" /> Duplizieren
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={deletePage}
              className="text-red-500"
              disabled={(useCoverPage && currentPage === 0) || pages.length <= 1}
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
                  {useCoverPage && currentPage === 0 ? (
                    <PageRenderer 
                      sections={[]} 
                      pageIndex={0}
                      scale={0.7}
                      isCoverPage={true}
                    />
                  ) : (
                    <PageRenderer 
                      sections={currentPageSections} 
                      pageIndex={currentPage}
                      scale={0.7}
                    />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex overflow-x-auto py-2 mt-2 sm:hidden gap-1">
          {useCoverPage && (
            <Button
              key="cover-mobile"
              variant={currentPage === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(0)}
              className="w-8 h-8 p-0 flex-shrink-0"
            >
              <Book size={14} />
            </Button>
          )}
          
          {pages.map((_, index) => (
            <Button
              key={index}
              variant={currentPage === (useCoverPage ? index + 1 : index) ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(useCoverPage ? index + 1 : index)}
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
      
      {/* Main content area with editor and preview */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full overflow-y-auto pr-4">
            {useCoverPage && currentPage === 0 ? (
              <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">Deckblatt</h3>
                <p className="text-white/70 text-sm">
                  Das Deckblatt wird automatisch generiert und enthält das Logo und den Titel des Angebots.
                </p>
              </div>
            ) : (
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
            )}
            
            {/* Section adder - not shown on cover page */}
            {(!useCoverPage || currentPage > 0) && (
              <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-4">
                <h3 className="text-white font-medium mb-4 text-sm">Abschnitt hinzufügen</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => addSection('header')} variant="outline" size="sm" className="text-xs py-1 h-8">Header</Button>
                  <Button onClick={() => addSection('text')} variant="outline" size="sm" className="text-xs py-1 h-8">Text</Button>
                  <Button onClick={() => addSection('image')} variant="outline" size="sm" className="text-xs py-1 h-8">Bild</Button>
                  <Button onClick={() => addSection('caseStudy')} variant="outline" size="sm" className="text-xs py-1 h-8">Case Study</Button>
                  <Button onClick={() => addSection('pricing')} variant="outline" size="sm" className="text-xs py-1 h-8">Preistabelle</Button>
                  <Button onClick={() => addSection('contact')} variant="outline" size="sm" className="text-xs py-1 h-8">Kontakt</Button>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full overflow-y-auto bg-black/30 p-4 rounded-lg border border-white/10">
            {useCoverPage && currentPage === 0 ? (
              <PageRenderer 
                sections={[]} 
                pageIndex={0}
                scale={0.8}
                isCoverPage={true}
              />
            ) : (
              <PageRenderer 
                sections={currentPageSections} 
                pageIndex={currentPage}
                scale={0.8}
              />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
