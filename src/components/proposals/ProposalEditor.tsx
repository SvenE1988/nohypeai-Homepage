
import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Download, FileText, Image, List, User, Building, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PDFPreview from "./PDFPreview";
import { proposalTemplates, getTemplateById } from "@/data/proposalData";

interface ProposalEditorProps {
  templateId: string;
}

const ProposalEditor = ({ templateId }: ProposalEditorProps) => {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const template = getTemplateById(templateId);
  
  const [proposalData, setProposalData] = useState({
    title: template?.defaultData.title || "Neues Proposal",
    subtitle: template?.defaultData.subtitle || "Erstellt für Ihren Kunden",
    companyName: template?.defaultData.companyName || "Kundenname",
    contactName: template?.defaultData.contactName || "Ansprechpartner",
    contactEmail: template?.defaultData.contactEmail || "email@kunde.de",
    contactPhone: template?.defaultData.contactPhone || "+49 123 456789",
    introduction: template?.defaultData.introduction || "Einführungstext für das Proposal...",
    problemStatement: template?.defaultData.problemStatement || "Beschreibung der Herausforderungen...",
    solution: template?.defaultData.solution || "Unsere Lösung im Detail...",
    benefits: template?.defaultData.benefits || "Die Vorteile unserer Lösung...",
    conclusion: template?.defaultData.conclusion || "Abschließende Gedanken...",
    callToAction: template?.defaultData.callToAction || "Nächste Schritte...",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProposalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real application, save to database or localStorage
    toast({
      title: "Speichern erfolgreich",
      description: "Ihr Proposal wurde gespeichert.",
    });
  };

  const handleDownload = () => {
    // This is a placeholder for the actual PDF generation functionality
    // We'll implement the full PDF download in a later step
    toast({
      title: "PDF wird generiert",
      description: "Ihr PDF wird vorbereitet und heruntergeladen.",
    });

    // Print the page to PDF using browser print functionality as a temporary solution
    if (pdfRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print PDF</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(pdfRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (!template) {
    return <div className="text-white">Template nicht gefunden.</div>;
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          {template.name} Bearbeiten
        </h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Als PDF herunterladen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-[#0A0A0A] border border-white/10">
            <CardContent className="p-6">
              <Tabs defaultValue="content">
                <TabsList className="mb-6">
                  <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" />Inhalt</TabsTrigger>
                  <TabsTrigger value="company"><Building className="w-4 h-4 mr-2" />Unternehmen</TabsTrigger>
                  <TabsTrigger value="contact"><User className="w-4 h-4 mr-2" />Kontakt</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="title">Titel</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="Proposal Titel" 
                      value={proposalData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="subtitle">Untertitel</Label>
                    <Input 
                      id="subtitle" 
                      name="subtitle" 
                      placeholder="Untertitel" 
                      value={proposalData.subtitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="introduction">Einführung</Label>
                    <Textarea 
                      id="introduction" 
                      name="introduction" 
                      rows={4}
                      placeholder="Einführungstext für das Proposal"
                      value={proposalData.introduction}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="problemStatement">Problemstellung</Label>
                    <Textarea 
                      id="problemStatement" 
                      name="problemStatement" 
                      rows={4}
                      placeholder="Beschreibung der Herausforderungen"
                      value={proposalData.problemStatement}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="solution">Lösung</Label>
                    <Textarea 
                      id="solution" 
                      name="solution" 
                      rows={4}
                      placeholder="Unsere Lösung im Detail"
                      value={proposalData.solution}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="benefits">Vorteile</Label>
                    <Textarea 
                      id="benefits" 
                      name="benefits" 
                      rows={4}
                      placeholder="Die Vorteile unserer Lösung"
                      value={proposalData.benefits}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="conclusion">Fazit</Label>
                    <Textarea 
                      id="conclusion" 
                      name="conclusion" 
                      rows={4}
                      placeholder="Abschließende Gedanken"
                      value={proposalData.conclusion}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="callToAction">Call-to-Action</Label>
                    <Textarea 
                      id="callToAction" 
                      name="callToAction" 
                      rows={3}
                      placeholder="Nächste Schritte"
                      value={proposalData.callToAction}
                      onChange={handleInputChange}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="company" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="companyName">Firmenname</Label>
                    <Input 
                      id="companyName" 
                      name="companyName" 
                      placeholder="Firmenname" 
                      value={proposalData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="contactName">Name</Label>
                    <Input 
                      id="contactName" 
                      name="contactName" 
                      placeholder="Ansprechpartner" 
                      value={proposalData.contactName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="contactEmail">E-Mail</Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail" 
                      placeholder="Email" 
                      value={proposalData.contactEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="contactPhone">Telefon</Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone" 
                      placeholder="Telefonnummer" 
                      value={proposalData.contactPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-3">
          <Card className="bg-[#0A0A0A] border border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <PDFPreview proposalData={proposalData} templateId={templateId} ref={pdfRef} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProposalEditor;
