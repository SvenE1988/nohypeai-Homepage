
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { proposalTemplates } from "./defaultData";
import { ProposalTemplate } from "./types";

interface ProposalTemplatesProps {
  onSelect: (template: ProposalTemplate) => void;
}

export const ProposalTemplates: React.FC<ProposalTemplatesProps> = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Wähle eine Vorlage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposalTemplates.map((template) => (
          <Card key={template.id} className="bg-black/50 border border-white/20 text-white">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription className="text-gray-400">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>Sektionen: {template.sections.length}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Array.from(new Set(template.sections.map(s => s.type))).map(type => (
                    <span 
                      key={type} 
                      className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => onSelect(template)} 
                variant="default" 
                className="w-full"
              >
                Verwenden
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
