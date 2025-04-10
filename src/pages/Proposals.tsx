
import React, { useState } from "react";
import NavHeader from "@/components/blocks/nav-header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalEditor from "@/components/proposals/ProposalEditor";
import ProposalTemplateList from "@/components/proposals/ProposalTemplateList";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "@/components/ui/redirect";

const Proposals = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Simple authentication check - remove this in production if you implement proper auth
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            PDF Proposal Generator
          </h1>
          <p className="text-white/70">
            Erstellen Sie professionelle PDF-Dokumente für Ihre Kunden basierend auf vorgefertigten Vorlagen.
          </p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="templates">Vorlagen</TabsTrigger>
            <TabsTrigger value="editor" disabled={!selectedTemplate}>
              Editor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <ProposalTemplateList onSelectTemplate={setSelectedTemplate} />
          </TabsContent>
          
          <TabsContent value="editor">
            {selectedTemplate && (
              <ProposalEditor templateId={selectedTemplate} />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Proposals;
