
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAccordion from "./growth/MobileAccordion";
import DesktopTabs from "./growth/DesktopTabs";
import { growthCategories } from "./growth/growthData";
import { memo } from "react";

// Memoize component to prevent unnecessary re-renders
const GrowthSection = memo(() => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 sm:py-24 px-2 sm:px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-white">
          Steigern Sie Ihr Wachstum
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Ohne Zusätzliches Personal
          </span>
        </h2>
        {/* Conditionally render based on screen size for better performance */}
        {isMobile ? (
          <MobileAccordion categories={growthCategories} />
        ) : (
          <DesktopTabs categories={growthCategories} />
        )}
      </div>
    </section>
  );
});

// Set displayName for better debugging
GrowthSection.displayName = 'GrowthSection';

export default GrowthSection;
