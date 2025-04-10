
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { Proposal } from "./types";
import { ExportTabsList } from "./export/ExportTabsList";
import { ExportTabContent } from "./export/ExportTabContent";
import { ExportFooter } from "./export/ExportFooter";

export interface ExportSettings {
  quality: "draft" | "standard" | "high";
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includePageNumbers: boolean;
  includeFooter: boolean;
  format: string;
}

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal;
  onExport: (type: string, settings: ExportSettings) => void;
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

  // Update settings when proposal changes or dialog opens
  useEffect(() => {
    if (open) {
      setSettings(prev => ({
        ...prev,
        includeCoverPage: proposal.useCoverPage ?? true
      }));
    }
  }, [proposal.useCoverPage, open]);

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
          <ExportTabsList activeTab={activeTab} onChange={setActiveTab} />
          <ExportTabContent 
            activeTab={activeTab} 
            settings={settings} 
            onSettingChange={handleSettingChange} 
          />
        </Tabs>

        <DialogFooter>
          <ExportFooter 
            activeTab={activeTab} 
            onCancel={() => onOpenChange(false)} 
            onExport={handleExport} 
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
