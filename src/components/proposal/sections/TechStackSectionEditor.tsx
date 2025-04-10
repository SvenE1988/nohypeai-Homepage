
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TechStackSectionEditorProps {
  content: any;
  onChange: (content: any) => void;
}

export const TechStackSectionEditor: React.FC<TechStackSectionEditorProps> = ({ content, onChange }) => {
  const { content: websiteContent, isLoading, refreshContent } = useWebsiteContent();
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...content,
      title: e.target.value,
    });
  };
  
  const handleShowDescriptionChange = (checked: boolean) => {
    onChange({
      ...content,
      showDescription: checked,
    });
  };
  
  // Initialisiere TechStack-Daten beim ersten Laden
  React.useEffect(() => {
    if (websiteContent.isLoaded && (!content.techStack || !content.techStack.categories)) {
      onChange({
        ...content,
        techStack: websiteContent.techStack,
        showDescription: content.showDescription !== undefined ? content.showDescription : true,
      });
    }
  }, [websiteContent.isLoaded]);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          value={content.title || "Unser Tech Stack"}
          onChange={handleTitleChange}
          placeholder="Sektions-Titel"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="showDescription"
          checked={content.showDescription !== undefined ? content.showDescription : true}
          onCheckedChange={handleShowDescriptionChange}
        />
        <Label htmlFor="showDescription">Beschreibung anzeigen</Label>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-muted-foreground">
          {content.techStack?.categories?.length || 0} Tech-Stack-Kategorien verfügbar
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
