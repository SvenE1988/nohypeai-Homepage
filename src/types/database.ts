
import { Database } from "@/integrations/supabase/types";
import { ProposalSection } from "./proposal";

export type DbBrochureTemplate = Database["public"]["Tables"]["brochure_templates"]["Row"];
export type DbSavedBrochure = Database["public"]["Tables"]["saved_brochures"]["Row"];

export type BrochureContent = {
  title: string;
  clientName: string;
  clientLogo?: string;
  sections: ProposalSection[];
  useCoverPage?: boolean;
  useTableOfContents?: boolean;
  documentType: 'proposal' | 'brochure';
};

export type SavedBrochureWithMeta = DbSavedBrochure & {
  content: BrochureContent;
};
