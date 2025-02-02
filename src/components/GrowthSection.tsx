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

          <TabsContent value="outbound" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold">AI Outbound Sales Solutions</h3>
                <p className="text-gray-600 text-lg">
                  AI solutions for lead generation, enrichment & personalized multi-channel outreach.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Enhance Lead Generation:</strong> AI scraping systems to add new lead sources to your business
                  </BenefitItem>
                  <BenefitItem>
                    <strong>AI Lead Enrichment:</strong> Automatically research, qualify potential prospects
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Multi-channel Personalized Outreach:</strong> Personalized outreach across email, LinkedIn, and Voice to reach more leads.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#B8E6F3] p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard title="Lead Scraping Automations" />
                  <FeatureCard title="Outbound Email System Setup" />
                  <FeatureCard title="Personalized Outreach Automation" />
                  <FeatureCard title="LinkedIn Outreach Systems" />
                  <FeatureCard title="Outbound Voice Agents" />
                  <FeatureCard title="Custom Projects" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold">AI Content & Marketing Systems</h3>
                <p className="text-gray-600 text-lg">
                  AI solutions for consistent social media posting, persona-aligned content creation, and efficient multi-channel repurposing.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Human-in-the Loop Content Systems:</strong> Give every team member a personal content system to stay consistent.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Repurpose Effectively:</strong> Create AI Systems to take full advantage of existing content.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Convert Post Engagers into Deals:</strong> Leverage Content engagers into deals with social media scraping & personalized outreach.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#E2F5E2] p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard title="Social Media Content Systems" />
                  <FeatureCard title="Brand-Aligned Fine-tuned Content LLM's" />
                  <FeatureCard title="Content Repurposing Systems" />
                  <FeatureCard title="AI Lead Magnet Automations" />
                  <FeatureCard title="LinkedIn Content & Outreach Systems" />
                  <FeatureCard title="Custom Projects" />
                </div>
              </div>
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
