
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from '@/data/industriesData';

interface FilterControlsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterControls = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col items-center space-y-6 mb-12">
      <Tabs 
        defaultValue="all" 
        value={activeCategory} 
        onValueChange={setActiveCategory}
        className="w-full max-w-3xl"
      >
        <TabsList className="w-full bg-black/40 border border-gray-800 p-1 gap-1">
          {categories.map(category => (
            <TabsTrigger 
              key={category.value} 
              value={category.value}
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="w-full max-w-md relative">
        <Input
          type="search"
          placeholder="Suche nach Branchen oder Problemen..."
          className="w-full bg-black/40 border-gray-800 text-white placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;
