import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check } from "lucide-react";

const GrowthSection = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Drive Growth
          <br />
          Without Adding Staff
        </h2>

        <Tabs defaultValue="inbound" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 bg-gray-100 p-1 rounded-full">
            <TabsTrigger
              value="inbound"
              className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Inbound Sales
            </TabsTrigger>
            <TabsTrigger
              value="outbound"
              className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Outbound Sales
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Content & Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbound" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold">AI Inbound Sales Automations</h3>
                <p className="text-gray-600 text-lg">
                  AI Solutions for better lead flow, 24/7 responsiveness, faster qualification, and a focused sales team.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Increase Lead Conversion:</strong> Research, Qualify, and score leads on autopilot.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Save Time and Resources:</strong> Automate repetitive tasks, so your team focuses on closing deals.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Improve Customer Experience:</strong> Immediate & personalized responses across all inbound channels.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#E5F6FF] p-8 rounded-3xl">
                <div className="grid grid-cols-3 gap-4">
                  <FeatureCard title="Automated Lead Research & Enrichment" />
                  <FeatureCard title="Automated Lead Qualification & Scoring" />
                  <FeatureCard title="Inbound Appointment Setters & Chatbots" />
                  <FeatureCard title="Inbound Voice Agents" />
                  <FeatureCard title="Inbound Responder Agents" />
                  <FeatureCard title="Personalized Lead Nurturing" />
                  <FeatureCard title="Automated Proposal Generation" />
                  <FeatureCard title="Onboarding automation Systems" />
                  <FeatureCard title="Custom Projects" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="outbound">
            <div className="h-96 flex items-center justify-center text-gray-500">
              Outbound Sales Inhalt folgt...
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="h-96 flex items-center justify-center text-gray-500">
              Content & Marketing Inhalt folgt...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const BenefitItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <Check className="w-6 h-6 text-primary flex-shrink-0" />
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

const FeatureCard = ({ title }: { title: string }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-sm font-medium text-center">{title}</p>
    </div>
  );
};

export default GrowthSection;