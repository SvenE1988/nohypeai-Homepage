import { Database } from "@/integrations/supabase/types";

export type DbBrochureTemplate = Database["public"]["Tables"]["brochure_templates"]["Row"];
export type DbSavedBrochure = Database["public"]["Tables"]["saved_brochures"]["Row"];

export type BrochureContent = {
  title: string;
  clientName: string;
  clientLogo?: string;
  sections: any[];
  useCoverPage?: boolean;
  useTableOfContents?: boolean;
  documentType: 'proposal' | 'brochure';
};

export type SavedBrochureWithMeta = {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string | null;
  content: BrochureContent;
};
