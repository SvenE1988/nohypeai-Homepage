
import { Database } from "@/integrations/supabase/types";

// Define types directly instead of referencing non-existent tables
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

// Export the voice bot session type from the actual database
export type DbVoiceBotSession = Database["public"]["Tables"]["voice_bot_sessions"]["Row"];
