
import { industries } from '@/data/industriesData';
import { useIndustriesFilter } from '@/hooks/useIndustriesFilter';
import IndustryCard from './IndustryCard';
import FilterControls from './industry/FilterControls';

export default function IndustryShowcase() {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredIndustries
  } = useIndustriesFilter(industries);

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Branchen-Beispiele
          </span>
        </h2>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Entdecken Sie, wie unsere KI-Lösungen in verschiedenen Branchen eingesetzt werden
        </p>
        
        <FilterControls
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry, index) => (
            <IndustryCard key={index} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
