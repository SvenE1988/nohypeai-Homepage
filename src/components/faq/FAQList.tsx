
import React from "react";
import OptimizedAccordionItem from "./OptimizedAccordionItem";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import faq from "./faqData";
import { useDeferredLoading } from "@/hooks/useDeferredLoading";

export const FAQList: React.FC = () => {
  const isLoaded = useDeferredLoading({
    delay: 300,
    priority: false,
  });

  return isLoaded ? (
    <Accordion
      type="single"
      collapsible
      className="rounded-xl shadow-lg bg-gradient-to-br from-[#1a1f2c] via-[#20243a] to-[#181633] border border-[#232244] space-y-3 p-2"
    >
      {faq.map((entry, i) => (
        <OptimizedAccordionItem
          key={i}
          value={"item" + i}
          question={entry.question}
          answer={entry.answer}
        />
      ))}
    </Accordion>
  ) : (
    <div className="space-y-3 p-2 rounded-xl shadow-lg bg-gradient-to-br from-[#1a1f2c]/50 via-[#20243a]/50 to-[#181633]/50 border border-[#232244]/50">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-3/4 bg-gray-700/30" />
            <Skeleton className="h-4 w-4 rounded-full bg-gray-700/30" />
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8">
        <LoadingSpinner size="md" text="Inhalte werden geladen..." />
      </div>
    </div>
  );
};

export default FAQList;
