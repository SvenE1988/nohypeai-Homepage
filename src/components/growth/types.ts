
export interface GrowthFeature {
  title: string;
  description: string;
  benefit: string;
}

export interface GrowthCategory {
  id: string;
  title: string;
  description: string;
  features: GrowthFeature[];
}
