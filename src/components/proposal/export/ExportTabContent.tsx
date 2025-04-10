
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ExportSettings } from "../types";
import { ExportSettingsPanel } from "./ExportSettings";

interface ExportTabContentProps {
  activeTab: string;
  settings: ExportSettings;
  onSettingChange: (key: keyof ExportSettings, value: any) => void;
}

export const ExportTabContent: React.FC<ExportTabContentProps> = ({
  activeTab,
  settings,
  onSettingChange,
}) => {
  return (
    <>
      <TabsContent value="download" className="space-y-4">
        <ExportSettingsPanel 
          type="download" 
          settings={settings} 
          onSettingChange={onSettingChange} 
        />
      </TabsContent>

      <TabsContent value="print" className="space-y-4">
        <ExportSettingsPanel 
          type="print" 
          settings={settings} 
          onSettingChange={onSettingChange} 
        />
      </TabsContent>

      <TabsContent value="email" className="space-y-4">
        <ExportSettingsPanel 
          type="email" 
          settings={settings} 
          onSettingChange={onSettingChange} 
        />
      </TabsContent>
    </>
  );
};
