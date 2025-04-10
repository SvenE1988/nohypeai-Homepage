export interface ProposalSection {
  id: string;
  type: 'header' | 'text' | 'image' | 'caseStudy' | 'pricing' | 'contact';
  content: any;
  order: number;
}

export interface Proposal {
  id: string;
  title: string;
  clientName: string;
  clientLogo?: string;
  createdAt: string;
  updatedAt: string;
  sections: ProposalSection[];
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  sections: ProposalSection[];
}

export interface PricingItem {
  description: string;
  price: number;
  unit?: string;
}

export interface ContactInfo {
  name: string;
  position: string;
  email: string;
  phone: string;
  profileImage?: string;
}

// Types for Supabase
export interface BrochureTemplate {
  id: string;
  name: string;
  description: string | null;
  sections: ProposalSection[];
  created_at: string;
  updated_at: string;
}

export interface SavedBrochure {
  id: string;
  title: string;
  description: string | null;
  content: Proposal;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExportSettings {
  quality: "draft" | "standard" | "high";
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includePageNumbers: boolean;
  includeFooter: boolean;
  format: string;
}
