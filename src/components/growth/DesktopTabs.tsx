
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FeatureCard from "@/components/ui/card/feature-card";
import { GrowthCategory } from "./types";

interface DesktopTabsProps {
  categories: GrowthCategory[];
}

const DesktopTabs = ({ categories }: DesktopTabsProps) => {
  return (
    <Tabs defaultValue={categories[0].id} className="w-full">
      <TabsList className="w-full max-w-2xl mx-auto flex bg-[#1A1F35] p-1 rounded-full mb-8 md:mb-12 gap-1">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 text-sm py-2 flex-1"
          >
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-8">
          <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto mt-10">
            {category.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {category.features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                benefit={feature.benefit}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DesktopTabs;
