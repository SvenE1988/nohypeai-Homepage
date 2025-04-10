
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TestimonialSectionEditorProps {
  content: any;
  onChange: (content: any) => void;
}

export const TestimonialSectionEditor: React.FC<TestimonialSectionEditorProps> = ({ content, onChange }) => {
  const { content: websiteContent, isLoading, refreshContent } = useWebsiteContent();
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...content,
      title: e.target.value,
    });
  };
  
  const handleMaxDisplayChange = (value: string) => {
    onChange({
      ...content,
      maxDisplay: parseInt(value),
    });
  };
  
  // Initialisiere Testimonials beim ersten Laden
  React.useEffect(() => {
    if (websiteContent.isLoaded && (!content.testimonials || content.testimonials.length === 0)) {
      onChange({
        ...content,
        testimonials: websiteContent.testimonials,
      });
    }
  }, [websiteContent.isLoaded]);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          value={content.title || "Kundenfeedback"}
          onChange={handleTitleChange}
          placeholder="Sektions-Titel"
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="maxDisplay">Anzahl angezeigter Testimonials</Label>
        <Select 
          value={content.maxDisplay?.toString() || "2"} 
          onValueChange={handleMaxDisplayChange}
        >
          <SelectTrigger id="maxDisplay" className="w-full">
            <SelectValue placeholder="Anzahl auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-muted-foreground">
          {content.testimonials?.length || 0} Testimonials verfügbar
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshContent}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Aktualisieren
        </Button>
      </div>
    </div>
  );
};
