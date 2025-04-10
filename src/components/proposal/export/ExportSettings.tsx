
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ExportSettings } from "../types";

interface ExportSettingsProps {
  settings: ExportSettings;
  onSettingChange: (key: keyof ExportSettings, value: any) => void;
  type: string;
}

export const ExportSettingsPanel: React.FC<ExportSettingsProps> = ({
  settings,
  onSettingChange,
  type,
}) => {
  if (type === "download") {
    return (
      <div className="space-y-4">
        <div>
          <Label>Qualität</Label>
          <RadioGroup 
            value={settings.quality} 
            onValueChange={(value) => onSettingChange("quality", value)}
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
                onCheckedChange={(checked) => onSettingChange("includeCoverPage", checked)}
              />
              <label htmlFor="coverpage" className="text-sm">Deckblatt einschließen</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="toc" 
                checked={settings.includeTableOfContents}
                onCheckedChange={(checked) => onSettingChange("includeTableOfContents", checked)}
              />
              <label htmlFor="toc" className="text-sm">Inhaltsverzeichnis erstellen</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="page-numbers" 
                checked={settings.includePageNumbers}
                onCheckedChange={(checked) => onSettingChange("includePageNumbers", checked)}
              />
              <label htmlFor="page-numbers" className="text-sm">Seitenzahlen anzeigen</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="footer" 
                checked={settings.includeFooter}
                onCheckedChange={(checked) => onSettingChange("includeFooter", checked)}
              />
              <label htmlFor="footer" className="text-sm">Fußzeile anzeigen</label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "print") {
    return (
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
              onCheckedChange={(checked) => onSettingChange("includePageNumbers", checked)}
            />
            <label htmlFor="print-page-numbers" className="text-sm">Seitenzahlen anzeigen</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="print-footer" 
              checked={settings.includeFooter}
              onCheckedChange={(checked) => onSettingChange("includeFooter", checked)}
            />
            <label htmlFor="print-footer" className="text-sm">Fußzeile anzeigen</label>
          </div>
        </div>
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-400">
          Diese Funktion wird in einer zukünftigen Version verfügbar sein.
        </p>
      </div>
    );
  }

  return null;
};
