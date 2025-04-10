
import { useState, useEffect } from "react";
import { Proposal, SavedBrochure } from "../components/proposal/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const useSavedBrochures = (
  proposal: Proposal,
  setProposal: (proposal: Proposal) => void
) => {
  const [savedBrochures, setSavedBrochures] = useState<SavedBrochure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  // Fetch saved brochures from Supabase
  useEffect(() => {
    const fetchSavedBrochures = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_brochures')
          .select('*')
          .order('updated_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Convert the Supabase data to our SavedBrochure type
        const typedBrochures = data.map(item => ({
          ...item,
          content: item.content as unknown as Proposal
        }));
        
        setSavedBrochures(typedBrochures);
      } catch (error) {
        console.error('Error fetching saved brochures:', error);
        toast.error('Fehler beim Laden gespeicherter Broschüren');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedBrochures();
  }, [user]);
  
  const handleSaveBrochure = async (title: string, description: string) => {
    if (!user) {
      toast.error('Sie müssen angemeldet sein, um Broschüren zu speichern');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Bitte geben Sie einen Titel ein');
      return;
    }
    
    setIsLoading(true);
    try {
      // Create a thumbnail from the first page (we could implement this later)
      const thumbnail = null;
      
      const { data, error } = await supabase
        .from('saved_brochures')
        .insert({
          title: title,
          description: description || null,
          content: proposal as any,
          thumbnail,
          user_id: user.id
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast.success('Broschüre erfolgreich gespeichert');
      
      // Add the new brochure to the list
      if (data && data.length > 0) {
        const newBrochure = {
          ...data[0],
          content: data[0].content as unknown as Proposal
        };
        setSavedBrochures([newBrochure, ...savedBrochures]);
      }
    } catch (error) {
      console.error('Error saving brochure:', error);
      toast.error('Fehler beim Speichern der Broschüre');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoadBrochure = (brochure: SavedBrochure) => {
    setProposal(brochure.content);
    toast.success(`Broschüre "${brochure.title}" geladen`);
  };
  
  return {
    savedBrochures,
    isLoading,
    handleSaveBrochure,
    handleLoadBrochure
  };
};
