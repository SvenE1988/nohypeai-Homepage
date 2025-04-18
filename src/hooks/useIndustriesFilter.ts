
import { useMemo, useState } from 'react';
import { Industry } from '@/data/industriesData';

export const useIndustriesFilter = (industries: Industry[]) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      const matchesCategory = activeCategory === "all" || industry.category === activeCategory;
      const matchesSearch = industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          industry.problem.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, industries]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredIndustries
  };
};
