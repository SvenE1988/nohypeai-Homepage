
export interface Project {
  id?: string; // Add optional id property
  year: string;
  industry: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  logoUrl?: string; // Path to the company logo
  logoAspectRatio?: string; // Aspect ratio for the logo
  company?: string; // Company name
  slug?: string; // Optional, für SEO-freundliche URLs
}
