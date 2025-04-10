
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
}
