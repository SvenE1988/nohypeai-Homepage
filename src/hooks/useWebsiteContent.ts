
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Typen für die Website-Inhalte
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

  // Fallback-Inhalte aus der Komponente extrahieren
  const fetchFallbackContent = () => {
    // Testimonials aus Testimonials.tsx extrahieren
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

    // TechStack-Daten
    const techStack = {
      categories: [
        { name: 'KI-Agenten', icon: 'Bot' },
        { name: 'KI-Automatisierungen', icon: 'Cpu' },
        { name: 'Eingehender Anruf', icon: 'Mic2' },
        { name: 'Ausgehender Anruf', icon: 'MessageSquare' },
      ],
      description: "Wir helfen dir, dich im KI-Dschungel zurechtzufinden. Mit tausenden von KI-Softwares und Tools unterstützen wir dich dabei, den richtigen Tech Stack für deine Bedürfnisse und dein Unternehmen zu finden."
    };

    // SavingsCalculator-Daten
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

  // Funktion zum Laden der Inhalte aus Supabase
  const loadContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Versuche, Daten aus der Supabase-Tabelle 'website_content' zu laden
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .single();
      
      if (error) {
        console.warn("Konnte keine Inhalte aus der Datenbank laden, verwende Fallback-Inhalte:", error);
        const fallbackContent = fetchFallbackContent();
        setContent(fallbackContent);
        return;
      }
      
      if (data) {
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
      console.error("Fehler beim Laden der Website-Inhalte:", err);
      setError("Fehler beim Laden der Inhalte");
      const fallbackContent = fetchFallbackContent();
      setContent(fallbackContent);
    } finally {
      setIsLoading(false);
    }
  };

  // Inhalte aktualisieren
  const updateContent = async (newContent: Partial<WebsiteContent>) => {
    setIsLoading(true);
    
    try {
      // Bereite Daten für Supabase vor
      const updateData = {
        testimonials: newContent.testimonials || content.testimonials,
        tech_stack: newContent.techStack || content.techStack,
        savings_calculator: newContent.savingsCalculator || content.savingsCalculator,
      };
      
      const { error } = await supabase
        .from('website_content')
        .upsert({ id: 1, ...updateData });
      
      if (error) throw error;
      
      setContent({
        ...content,
        ...newContent
      });
      
      toast.success("Inhalte erfolgreich aktualisiert");
    } catch (err) {
      console.error("Fehler beim Aktualisieren der Website-Inhalte:", err);
      toast.error("Fehler beim Aktualisieren der Inhalte");
    } finally {
      setIsLoading(false);
    }
  };

  // Lade Inhalte beim ersten Laden
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
