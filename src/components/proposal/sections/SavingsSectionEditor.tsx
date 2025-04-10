
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SavingsSectionEditorProps {
  content: any;
  onChange: (content: any) => void;
}

export const SavingsSectionEditor: React.FC<SavingsSectionEditorProps> = ({ content, onChange }) => {
  const { content: websiteContent, isLoading, refreshContent } = useWebsiteContent();
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...content,
      title: e.target.value,
    });
  };
  
  const handleHoursChange = (value: number[]) => {
    onChange({
      ...content,
      hours: value[0],
    });
  };
  
  const handleRateChange = (value: number[]) => {
    onChange({
      ...content,
      rate: value[0],
    });
  };
  
  // Initialisiere Calculator-Daten beim ersten Laden
  React.useEffect(() => {
    if (websiteContent.isLoaded && (!content.calculatorData)) {
      onChange({
        ...content,
        calculatorData: websiteContent.savingsCalculator,
        hours: content.hours || websiteContent.savingsCalculator.defaultHours,
        rate: content.rate || websiteContent.savingsCalculator.defaultRate,
      });
    }
  }, [websiteContent.isLoaded]);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          value={content.title || "Potenzielle Einsparungen"}
          onChange={handleTitleChange}
          placeholder="Sektions-Titel"
        />
      </div>
      
      <div className="space-y-6 pt-2">
        <div className="space-y-2">
          <Label>Eingesparte Stunden pro Woche: {content.hours || 0}</Label>
          <Slider
            value={[content.hours || websiteContent.savingsCalculator.defaultHours]}
            onValueChange={handleHoursChange}
            max={40}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Stundensatz (€): {content.rate || 0}</Label>
          <Slider
            value={[content.rate || websiteContent.savingsCalculator.defaultRate]}
            onValueChange={handleRateChange}
            max={200}
            step={5}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshContent}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Standardwerte laden
        </Button>
      </div>
    </div>
  );
};
