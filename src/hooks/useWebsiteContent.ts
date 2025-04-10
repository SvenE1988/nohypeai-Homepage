
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types for website content
export interface TestimonialData {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface TechStackData {
  categories: {
    name: string;
    icon: string;
  }[];
  description: string;
}

export interface SavingsCalculatorData {
  defaultHours: number;
  defaultRate: number;
}

export interface WebsiteContent {
  testimonials: TestimonialData[];
  techStack: TechStackData;
  savingsCalculator: SavingsCalculatorData;
  isLoaded: boolean;
}

export const useWebsiteContent = () => {
  const [content, setContent] = useState<WebsiteContent>({
    testimonials: [],
    techStack: {
      categories: [],
      description: "",
    },
    savingsCalculator: {
      defaultHours: 20,
      defaultRate: 50,
    },
    isLoaded: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback content from the component
  const fetchFallbackContent = () => {
    // Testimonials from Testimonials.tsx
    const testimonials = [
      {
        name: "Daniel Müller",
        role: "CEO",
        company: "Kraftwerk Fitness",
        content: "Die Zusammenarbeit mit Fastlane AI war großartig! Unser Instagram-Chatbot beantwortet jetzt automatisch DMs, schnell und professionell. Das Team hat unsere Wünsche perfekt umgesetzt, und wir sind absolut zufrieden. Klare Empfehlung!",
        image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png",
      },
      {
        name: "Elke Schwarz",
        role: "CEO",
        company: "OrangeSalamander",
        content: "Die KI-E-Mail-Automatisierung von Fastlane AI hat uns überzeugt! Die Abstimmung war schnell und effizient, die Kommunikation immer klar und angenehm. Ein Top-Ergebnis – absolut empfehlenswert!",
        image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png",
      },
    ];

    // TechStack data
    const techStack = {
      categories: [
        { name: 'KI-Agenten', icon: 'Bot' },
        { name: 'KI-Automatisierungen', icon: 'Cpu' },
        { name: 'Eingehender Anruf', icon: 'Mic2' },
        { name: 'Ausgehender Anruf', icon: 'MessageSquare' },
      ],
      description: "Wir helfen dir, dich im KI-Dschungel zurechtzufinden. Mit tausenden von KI-Softwares und Tools unterstützen wir dich dabei, den richtigen Tech Stack für deine Bedürfnisse und dein Unternehmen zu finden."
    };

    // SavingsCalculator data
    const savingsCalculator = {
      defaultHours: 20,
      defaultRate: 50
    };

    return {
      testimonials,
      techStack,
      savingsCalculator,
      isLoaded: true
    };
  };

  // Load content from Supabase
  const loadContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to load data from the website_content table
      // We use 'from' with any type to avoid TypeScript errors since the tables aren't fully typed
      const { data: websiteData, error: websiteError } = await supabase
        .from('website_content' as any)
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .single();
      
      if (websiteError) {
        console.warn("Could not load content from database, using fallback content:", websiteError);
        const fallbackContent = fetchFallbackContent();
        setContent(fallbackContent);
        return;
      }
      
      if (websiteData) {
        // Since TypeScript doesn't know about website_content table structure,
        // we need to cast the data to access the properties
        const data = websiteData as any;
        setContent({
          testimonials: data.testimonials || [],
          techStack: data.tech_stack || {
            categories: [],
            description: "",
          },
          savingsCalculator: data.savings_calculator || {
            defaultHours: 20,
            defaultRate: 50,
          },
          isLoaded: true
        });
      } else {
        const fallbackContent = fetchFallbackContent();
        setContent(fallbackContent);
      }
    } catch (err) {
      console.error("Error loading website content:", err);
      setError("Error loading content");
      const fallbackContent = fetchFallbackContent();
      setContent(fallbackContent);
    } finally {
      setIsLoading(false);
    }
  };

  // Update content
  const updateContent = async (newContent: Partial<WebsiteContent>) => {
    setIsLoading(true);
    
    try {
      // Prepare data for Supabase
      const updateData = {
        testimonials: newContent.testimonials || content.testimonials,
        tech_stack: newContent.techStack || content.techStack,
        savings_calculator: newContent.savingsCalculator || content.savingsCalculator,
        updated_at: new Date()
      };
      
      // Get the current record ID or default to 1
      const { data: existingData, error: fetchError } = await supabase
        .from('website_content' as any)
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      const id = existingData?.id || 1;
      
      // Use 'from' with any type to avoid TypeScript errors
      const { error: upsertError } = await supabase
        .from('website_content' as any)
        .upsert({ 
          id, 
          testimonials: updateData.testimonials,
          tech_stack: updateData.tech_stack,
          savings_calculator: updateData.savings_calculator,
          updated_at: updateData.updated_at
        });
      
      if (upsertError) throw upsertError;
      
      setContent({
        ...content,
        ...newContent
      });
      
      toast.success("Content updated successfully");
    } catch (err) {
      console.error("Error updating website content:", err);
      toast.error("Error updating content");
    } finally {
      setIsLoading(false);
    }
  };

  // Load content on first load
  useEffect(() => {
    loadContent();
  }, []);

  return {
    content,
    isLoading,
    error,
    updateContent,
    refreshContent: loadContent
  };
};
