
export interface BaseSection {
  id: string;
  type: SectionType;
  order: number;
}

export type SectionType = 'header' | 'text' | 'image' | 'caseStudy' | 'pricing' | 'contact' | 'tableOfContents';

export interface HeaderSection extends BaseSection {
  type: 'header';
  content: {
    title: string;
    subtitle: string;
    date: string;
  };
}

export interface TextSection extends BaseSection {
  type: 'text';
  content: {
    title: string;
    text: string;
  };
}

export interface ImageSection extends BaseSection {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption: string;
  };
}

export interface CaseStudySection extends BaseSection {
  type: 'caseStudy';
  content: {
    caseStudyId: number;
  };
}

export interface PricingSection extends BaseSection {
  type: 'pricing';
  content: {
    title: string;
    items: Array<{
      description: string;
      price: number;
      unit?: string;
    }>;
  };
}

export interface ContactSection extends BaseSection {
  type: 'contact';
  content: {
    title: string;
    contact: {
      name: string;
      position: string;
      email: string;
      phone: string;
      profileImage?: string;
    };
  };
}

export interface TableOfContentsSection extends BaseSection {
  type: 'tableOfContents';
  content: Record<string, never>;
}

export type ProposalSection =
  | HeaderSection
  | TextSection
  | ImageSection
  | CaseStudySection
  | PricingSection
  | ContactSection
  | TableOfContentsSection;

export interface Page {
  sections: ProposalSection[];
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
