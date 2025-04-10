
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Download } from "lucide-react";
import { proposalTemplates } from "@/data/proposalData";

interface ProposalTemplateListProps {
  onSelectTemplate: (templateId: string) => void;
}

const ProposalTemplateList = ({ onSelectTemplate }: ProposalTemplateListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Verfügbare Vorlagen</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposalTemplates.map((template) => (
          <Card key={template.id} className="bg-[#0A0A0A] border border-white/10 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1A1F35] to-[#2D1F35] border-b border-white/10">
              <CardTitle className="text-white">{template.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="aspect-[1/1.414] bg-[#1A1F35] border border-white/10 flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white/70 text-sm">{template.description}</p>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(template.previewUrl, '_blank')}
                className="text-white/80 border-white/20"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vorschau
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onSelectTemplate(template.id)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Editieren
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProposalTemplateList;
