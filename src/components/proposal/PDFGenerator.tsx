
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProposalEditor } from "./ProposalEditor";
import { ProposalPreview } from "./ProposalPreview";
import { ProposalTemplates } from "./ProposalTemplates";
import { Proposal, ProposalTemplate, SavedBrochure } from "./types";
import { defaultProposal } from "./defaultData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Save, FileDown, FileUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./ProposalStyles.css";

export const PDFGenerator = () => {
  const [proposal, setProposal] = useState<Proposal>(defaultProposal);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [savedBrochures, setSavedBrochures] = useState<SavedBrochure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
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
        
        setSavedBrochures(data || []);
      } catch (error) {
        console.error('Error fetching saved brochures:', error);
        toast.error('Fehler beim Laden gespeicherter Broschüren');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedBrochures();
  }, []);
  
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
          content: proposal,
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
        setSavedBrochures([data[0], ...savedBrochures]);
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
  
  const handlePrintPDF = () => {
    // Setze einen Timeout, um sicherzustellen, dass alle Styles angewendet werden
    setTimeout(() => {
      window.print();
    }, 100);
  };
  
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-black/50">
            <TabsTrigger value="templates" className="text-white">Vorlagen</TabsTrigger>
            <TabsTrigger value="saved" className="text-white">Gespeichert</TabsTrigger>
            <TabsTrigger value="editor" className="text-white">Editor</TabsTrigger>
            <TabsTrigger value="preview" className="text-white">Vorschau</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === "editor" && (
              <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Speichern
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Broschüre speichern</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">Titel</label>
                      <Input
                        id="title"
                        value={saveTitle}
                        onChange={(e) => setSaveTitle(e.target.value)}
                        placeholder="Titel der Broschüre"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">Beschreibung (optional)</label>
                      <Textarea
                        id="description"
                        value={saveDescription}
                        onChange={(e) => setSaveDescription(e.target.value)}
                        placeholder="Beschreibung der Broschüre"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      disabled={isLoading} 
                      onClick={handleSaveBrochure}
                    >
                      {isLoading ? 'Speichern...' : 'Speichern'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" onClick={() => setProposal(defaultProposal)}>
              Zurücksetzen
            </Button>
            {activeTab === "preview" && (
              <Button onClick={handlePrintPDF}>
                <FileDown className="mr-2 h-4 w-4" />
                PDF herunterladen
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="templates" className="mt-0">
          <ProposalTemplates onSelect={handleTemplateSelect} />
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Gespeicherte Broschüren</h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white">Lade gespeicherte Broschüren...</p>
              </div>
            ) : savedBrochures.length === 0 ? (
              <div className="text-center py-12 bg-black/20 rounded-lg border border-white/10">
                <FileUp className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/80 mb-2">Keine gespeicherten Broschüren vorhanden</p>
                <p className="text-white/60 text-sm">Erstellen Sie eine Broschüre und speichern Sie sie, um sie hier anzuzeigen</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBrochures.map((brochure) => (
                  <div key={brochure.id} className="bg-black/50 border border-white/20 text-white rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] bg-black/30 relative flex items-center justify-center">
                      {brochure.thumbnail ? (
                        <img 
                          src={brochure.thumbnail} 
                          alt={brochure.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl text-white/10">PDF</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1 truncate">{brochure.title}</h3>
                      {brochure.description && (
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{brochure.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(brochure.updated_at).toLocaleDateString('de-DE')}
                      </p>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => handleLoadBrochure(brochure)}
                      >
                        Laden
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
