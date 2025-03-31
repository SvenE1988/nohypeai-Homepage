
export interface Project {
  year: string;
  industry: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  logoUrl?: string; // Optional, falls Logos hinzugefügt werden sollen
  slug?: string; // Optional, für SEO-freundliche URLs
}
