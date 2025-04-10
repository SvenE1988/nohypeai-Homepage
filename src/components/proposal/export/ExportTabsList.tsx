
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Printer, Mail } from "lucide-react";

interface ExportTabsListProps {
  activeTab: string;
  onChange: (value: string) => void;
}

export const ExportTabsList: React.FC<ExportTabsListProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <TabsList className="grid grid-cols-3 mb-4">
      <TabsTrigger 
        value="download" 
        className="flex items-center gap-2"
      >
        <FileDown className="h-4 w-4" />
        <span className="hidden sm:inline">PDF</span>
      </TabsTrigger>
      <TabsTrigger 
        value="print" 
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" />
        <span className="hidden sm:inline">Drucken</span>
      </TabsTrigger>
      <TabsTrigger 
        value="email" 
        className="flex items-center gap-2"
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">E-Mail</span>
      </TabsTrigger>
    </TabsList>
  );
};
