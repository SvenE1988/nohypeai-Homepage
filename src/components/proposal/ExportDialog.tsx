
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, FileDown, Send, Settings, Mail } from "lucide-react";
import { toast } from "sonner";
import { Proposal } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal;
  onExport: (type: string, settings: ExportSettings) => void;
}

export interface ExportSettings {
  quality: "draft" | "standard" | "high";
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includePageNumbers: boolean;
  includeFooter: boolean;
  format: string;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onOpenChange,
  proposal,
  onExport,
}) => {
  const [activeTab, setActiveTab] = useState<string>("download");
  const [settings, setSettings] = useState<ExportSettings>({
    quality: "standard",
    includeCoverPage: true,
    includeTableOfContents: false,
    includePageNumbers: true,
    includeFooter: true,
    format: "pdf",
  });

  const handleSettingChange = (key: keyof ExportSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExport = () => {
    onExport(activeTab, settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Angebot exportieren</DialogTitle>
          <DialogDescription>
            Wählen Sie aus, wie Sie "{proposal.title || 'Unbenanntes Angebot'}" exportieren möchten.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="download" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </TabsTrigger>
            <TabsTrigger value="print" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Drucken</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">E-Mail</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Qualität</Label>
                <RadioGroup 
                  value={settings.quality} 
                  onValueChange={(value) => handleSettingChange("quality", value)}
                  className="grid grid-cols-3 gap-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="quality-draft" />
                    <Label htmlFor="quality-draft">Entwurf</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="quality-standard" />
                    <Label htmlFor="quality-standard">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="quality-high" />
                    <Label htmlFor="quality-high">Hochwertig</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Optionen</Label>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="coverpage" 
                      checked={settings.includeCoverPage}
                      onCheckedChange={(checked) => handleSettingChange("includeCoverPage", checked)}
                    />
                    <label htmlFor="coverpage" className="text-sm">Deckblatt einschließen</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="toc" 
                      checked={settings.includeTableOfContents}
                      onCheckedChange={(checked) => handleSettingChange("includeTableOfContents", checked)}
                    />
                    <label htmlFor="toc" className="text-sm">Inhaltsverzeichnis erstellen</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="page-numbers" 
                      checked={settings.includePageNumbers}
                      onCheckedChange={(checked) => handleSettingChange("includePageNumbers", checked)}
                    />
                    <label htmlFor="page-numbers" className="text-sm">Seitenzahlen anzeigen</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="footer" 
                      checked={settings.includeFooter}
                      onCheckedChange={(checked) => handleSettingChange("includeFooter", checked)}
                    />
                    <label htmlFor="footer" className="text-sm">Fußzeile anzeigen</label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="print" className="space-y-4">
            <div className="space-y-2">
              <Label>Druckoptionen</Label>
              <div className="text-sm text-gray-400">
                Der Systemdialog zum Drucken wird geöffnet, in dem Sie weitere Einstellungen vornehmen können.
              </div>
              
              <div className="grid gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="print-page-numbers" 
                    checked={settings.includePageNumbers}
                    onCheckedChange={(checked) => handleSettingChange("includePageNumbers", checked)}
                  />
                  <label htmlFor="print-page-numbers" className="text-sm">Seitenzahlen anzeigen</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="print-footer" 
                    checked={settings.includeFooter}
                    onCheckedChange={(checked) => handleSettingChange("includeFooter", checked)}
                  />
                  <label htmlFor="print-footer" className="text-sm">Fußzeile anzeigen</label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Diese Funktion wird in einer zukünftigen Version verfügbar sein.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button 
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            {activeTab === "download" && <FileDown className="h-4 w-4" />}
            {activeTab === "print" && <Printer className="h-4 w-4" />}
            {activeTab === "email" && <Send className="h-4 w-4" />}
            
            {activeTab === "download" && "PDF herunterladen"}
            {activeTab === "print" && "Drucken"}
            {activeTab === "email" && "Per E-Mail senden"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
