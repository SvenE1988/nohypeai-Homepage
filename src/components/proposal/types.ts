
export interface ProposalSection {
  id: string;
  type: 'header' | 'text' | 'image' | 'caseStudy' | 'pricing' | 'contact' | 'tableOfContents';
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
  useCoverPage?: boolean;
  useTableOfContents?: boolean;
  documentType: 'proposal' | 'brochure';
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  sections: ProposalSection[];
  documentType: 'proposal' | 'brochure';
  useTableOfContents?: boolean;
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
  document_type?: string;
}

export interface SavedBrochure {
  id: string;
  title: string;
  description: string | null;
  content: Proposal;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export interface ExportSettings {
  quality: "draft" | "standard" | "high";
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includePageNumbers: boolean;
  includeFooter: boolean;
  format: string;
}
