
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExportSettings } from "../types";

interface ExportSettingsPanelProps {
  type: string;
  settings: ExportSettings;
  onSettingChange: (key: keyof ExportSettings, value: any) => void;
}

export const ExportSettingsPanel: React.FC<ExportSettingsPanelProps> = ({
  type,
  settings,
  onSettingChange,
}) => {
  return (
    <div className="space-y-5">
      {/* Quality settings (for PDF and Print) */}
      {(type === "download" || type === "print") && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Qualität</h4>
          <RadioGroup
            value={settings.quality}
            onValueChange={(value) => onSettingChange("quality", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draft" id="draft" className="border-gray-600" />
              <Label htmlFor="draft" className="text-gray-300">Entwurf (schneller)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" className="border-gray-600" />
              <Label htmlFor="standard" className="text-gray-300">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" className="border-gray-600" />
              <Label htmlFor="high" className="text-gray-300">Hohe Qualität (langsamer)</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* General layout settings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-300">Layout</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="cover-page" className="text-gray-300 text-sm">Deckblatt einbeziehen</Label>
          <Switch
            id="cover-page"
            checked={settings.includeCoverPage}
            onCheckedChange={(value) => onSettingChange("includeCoverPage", value)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="page-numbers" className="text-gray-300 text-sm">Seitenzahlen anzeigen</Label>
          <Switch
            id="page-numbers"
            checked={settings.includePageNumbers}
            onCheckedChange={(value) => onSettingChange("includePageNumbers", value)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="footer" className="text-gray-300 text-sm">Fußzeile anzeigen</Label>
          <Switch
            id="footer"
            checked={settings.includeFooter}
            onCheckedChange={(value) => onSettingChange("includeFooter", value)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>

      {/* Email specific settings */}
      {type === "email" && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Format</h4>
          <RadioGroup
            value={settings.format}
            onValueChange={(value) => onSettingChange("format", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdf" id="format-pdf" className="border-gray-600" />
              <Label htmlFor="format-pdf" className="text-gray-300">PDF Anhang</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="link" id="format-link" className="border-gray-600" />
              <Label htmlFor="format-link" className="text-gray-300">Link (kommt bald)</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};
