import { useIsMobile } from "@/hooks/use-mobile";
import MobileAccordion from "./growth/MobileAccordion";
import DesktopTabs from "./growth/DesktopTabs";
import { growthCategories } from "./growth/growthData";

const GrowthSection = () => {
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
        {isMobile ? (
          <MobileAccordion categories={growthCategories} />
        ) : (
          <DesktopTabs categories={growthCategories} />
        )}
      </div>
    </section>
  );
};

export default GrowthSection;
