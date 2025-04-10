
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExportSettings } from "../types";

interface ExportSettingsProps {
  settings: ExportSettings;
  onSettingChange: (key: keyof ExportSettings, value: any) => void;
}

export const ExportSettingsComponent: React.FC<ExportSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Qualität</Label>
        <RadioGroup
          value={settings.quality}
          onValueChange={(value) => onSettingChange("quality", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="draft" id="quality-draft" />
            <Label htmlFor="quality-draft" className="text-sm cursor-pointer">
              Entwurf (schneller, kleinere Dateigröße)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="quality-standard" />
            <Label htmlFor="quality-standard" className="text-sm cursor-pointer">
              Standard (empfohlen)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="quality-high" />
            <Label htmlFor="quality-high" className="text-sm cursor-pointer">
              Hoch (langsamer, größere Dateigröße)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Optionen</Label>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="cover-page"
            checked={settings.includeCoverPage}
            onCheckedChange={(checked) =>
              onSettingChange("includeCoverPage", checked)
            }
          />
          <Label htmlFor="cover-page" className="text-sm cursor-pointer">
            Deckblatt einbeziehen
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="table-of-contents"
            checked={settings.includeTableOfContents}
            onCheckedChange={(checked) =>
              onSettingChange("includeTableOfContents", checked)
            }
          />
          <Label htmlFor="table-of-contents" className="text-sm cursor-pointer">
            Inhaltsverzeichnis einbeziehen
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="page-numbers"
            checked={settings.includePageNumbers}
            onCheckedChange={(checked) =>
              onSettingChange("includePageNumbers", checked)
            }
          />
          <Label htmlFor="page-numbers" className="text-sm cursor-pointer">
            Seitenzahlen anzeigen
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="footer"
            checked={settings.includeFooter}
            onCheckedChange={(checked) =>
              onSettingChange("includeFooter", checked)
            }
          />
          <Label htmlFor="footer" className="text-sm cursor-pointer">
            Fußzeile anzeigen
          </Label>
        </div>
      </div>
    </div>
  );
};
