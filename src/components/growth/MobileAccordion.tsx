
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FeatureCard from "@/components/ui/card/feature-card";
import { GrowthCategory } from "./types";

interface MobileAccordionProps {
  categories: GrowthCategory[];
}

const MobileAccordion = ({ categories }: MobileAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full mt-8">
      {categories.map((category) => (
        <AccordionItem 
          key={category.id}
          value={category.id} 
          className="border-0 mb-4"
        >
          <AccordionTrigger className="py-3 px-4 bg-[#1A1F35] rounded-full text-gray-400 data-[state=open]:text-white data-[state=open]:bg-primary hover:bg-primary/20 transition-all">
            {category.title}
          </AccordionTrigger>
          <AccordionContent className="pt-8">
            <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="grid grid-cols-1 gap-8">
              {category.features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  benefit={feature.benefit}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MobileAccordion;
