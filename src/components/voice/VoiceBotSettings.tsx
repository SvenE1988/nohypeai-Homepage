
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceBotSettingsProps {
  useCase: string;
  setUseCase: (value: string) => void;
  voice: string;
  setVoice: (value: string) => void;
  isActive: boolean;
}

const VoiceBotSettings = ({
  useCase,
  setUseCase,
  voice,
  setVoice,
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

      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          KI-Assistent:
        </label>
        <Select
          value={voice}
          onValueChange={setVoice}
          disabled={isActive}
        >
          <SelectTrigger className="w-full bg-[#2D2F3F] border-gray-700 text-white">
            <SelectValue placeholder="Wählen Sie eine Stimme" />
          </SelectTrigger>
          <SelectContent className="bg-[#2D2F3F] border-gray-700 text-white">
            <SelectItem value="pia">🧑‍💼 Pia (freundliche Assistentin)</SelectItem>
            <SelectItem value="schneider">👨‍🔧 Herr Schneider (Techniker)</SelectItem>
            <SelectItem value="otto">🤖 Agent Otto (neutral, KI-Stil)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VoiceBotSettings;
