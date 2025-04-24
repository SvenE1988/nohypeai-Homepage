
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

interface VoiceBotSettingsProps {
  useCase: string;
  setUseCase: (value: string) => void;
  isActive: boolean;
}

const useCaseInfo = {
  immobilienmakler: "Ein KI-Assistent spezialisiert auf Immobilienanfragen. Beantwortet Fragen zu Immobilien, Besichtigungen und Preisen.",
  hausverwaltung: "Ein KI-Assistent für Hausverwaltungsthemen. Hilft bei Anliegen zu Wartung, Reparaturen und Verwaltungsaufgaben.",
  support: "Ein technischer Support-Assistent. Unterstützt bei technischen Problemen und Produktfragen."
};

const VoiceBotSettings = ({
  useCase,
  setUseCase,
  isActive
}: VoiceBotSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Anwendungsfall:
        </label>
        <Select
          value={useCase}
          onValueChange={setUseCase}
          disabled={isActive}
        >
          <SelectTrigger className="w-full bg-[#2D2F3F] border-gray-700 text-white">
            <SelectValue placeholder="Wählen Sie einen Anwendungsfall" />
          </SelectTrigger>
          <SelectContent className="bg-[#2D2F3F] border-gray-700 text-white">
            <SelectItem value="immobilienmakler">Immobilienmakler</SelectItem>
            <SelectItem value="hausverwaltung">Hausverwaltung</SelectItem>
            <SelectItem value="support">Technischer Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {useCase && (
        <div className="p-4 bg-[#2D2F3F]/50 rounded-lg border border-gray-700">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">
              {useCaseInfo[useCase as keyof typeof useCaseInfo]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceBotSettings;
