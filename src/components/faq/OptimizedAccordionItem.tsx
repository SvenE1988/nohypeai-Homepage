
import React, { memo } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface OptimizedAccordionItemProps {
  question: string;
  answer: React.ReactNode;
  value: string;
  className?: string;
}

// Using memo to prevent unnecessary re-renders
const OptimizedAccordionItem = memo(({ 
  question, 
  answer, 
  value,
  className = ""
}: OptimizedAccordionItemProps) => {
  return (
    <AccordionItem
      value={value}
      className={`rounded-lg bg-black/30 border border-white/10 transition-shadow hover:shadow-md ${className}`}
    >
      <AccordionTrigger className="px-6 py-3 text-lg text-white font-medium hover:text-primary">
        {question}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-4 text-base text-white">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
});

OptimizedAccordionItem.displayName = "OptimizedAccordionItem";

export default OptimizedAccordionItem;
