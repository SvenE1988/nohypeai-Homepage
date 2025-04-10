
import React from "react";
import { SavedBrochure } from "./types";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

interface SavedBrochuresViewProps {
  savedBrochures: SavedBrochure[];
  isLoading: boolean;
  onLoadBrochure: (brochure: SavedBrochure) => void;
}

export const SavedBrochuresView: React.FC<SavedBrochuresViewProps> = ({
  savedBrochures,
  isLoading,
  onLoadBrochure
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Gespeicherte Broschüren</h2>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Lade gespeicherte Broschüren...</p>
        </div>
      ) : savedBrochures.length === 0 ? (
        <div className="text-center py-12 bg-black/20 rounded-lg border border-white/10">
          <FileUp className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/80 mb-2">Keine gespeicherten Broschüren vorhanden</p>
          <p className="text-white/60 text-sm">Erstellen Sie eine Broschüre und speichern Sie sie, um sie hier anzuzeigen</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBrochures.map((brochure) => (
            <div key={brochure.id} className="bg-black/50 border border-white/20 text-white rounded-lg overflow-hidden">
              <div className="aspect-[3/4] bg-black/30 relative flex items-center justify-center">
                {brochure.thumbnail ? (
                  <img 
                    src={brochure.thumbnail} 
                    alt={brochure.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl text-white/10">PDF</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1 truncate">{brochure.title}</h3>
                {brochure.description && (
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{brochure.description}</p>
                )}
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(brochure.created_at).toLocaleDateString('de-DE')}
                </p>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => onLoadBrochure(brochure)}
                >
                  Laden
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
