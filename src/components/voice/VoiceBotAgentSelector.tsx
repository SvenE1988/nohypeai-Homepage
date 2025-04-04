
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export interface AgentOption {
  id: string;
  name: string;
  prompt: string;
}

// Vordefinierte Agenten-Optionen
export const AGENT_OPTIONS: AgentOption[] = [
  {
    id: "default",
    name: "Standard-Assistent",
    prompt: "Du bist ein hilfsbereiter deutscher Sprachassistent für eine KI-Agentur. Begrüße neue Nutzer freundlich, stelle Fragen zu ihren Bedürfnissen und erkläre, wie Sprach-KI helfen kann."
  },
  {
    id: "hausverwaltung",
    name: "Hausverwaltung",
    prompt: "Du bist ein Kundenservice-Assistent für eine Hausverwaltung. Beantworte Fragen zu Mietangelegenheiten, Reparaturen, Betriebskosten und anderen immobilienbezogenen Themen. Sei höflich, kompetent und lösungsorientiert."
  },
  {
    id: "schluesseldienst",
    name: "Schlüsseldienst",
    prompt: "Du bist ein Mitarbeiter eines Schlüsseldienstes. Hilf Kunden bei Anfragen zu Türöffnungen, Schlossaustausch und Sicherheitslösungen. Erfrage bei Notfällen die Adresse und erkläre die Preise und Anfahrtszeiten."
  },
  {
    id: "immobilienmakler",
    name: "Immobilienmakler",
    prompt: "Du bist ein Immobilienmakler. Beantworte Fragen zum Immobilienmarkt, Kaufpreisen, Mietpreisen und Besichtigungsterminen. Erfrage bei Interesse Details zu gesuchten Immobilien und biete an, weitere Informationen zu senden."
  },
  {
    id: "photovoltaik",
    name: "Photovoltaikunternehmen",
    prompt: "Du bist ein Berater für Photovoltaikanlagen. Beantworte Fragen zu Solarpanels, Energiespeichern, Kosten und staatlichen Förderungen. Erkläre den Prozess der Installation und die erwarteten Einsparungen durch Solarstrom."
  },
  {
    id: "waermepumpe",
    name: "Wärmepumpenfirma",
    prompt: "Du bist ein Experte für Wärmepumpen. Beantworte Fragen zu verschiedenen Wärmepumpentypen, Installation, Kosten und Effizienz. Erkläre die Vorteile gegenüber konventionellen Heizungssystemen und die möglichen Fördermöglichkeiten."
  }
];

interface VoiceBotAgentSelectorProps {
  selectedAgentId: string;
  onAgentChange: (agentId: string) => void;
  disabled: boolean;
}

const VoiceBotAgentSelector = ({ 
  selectedAgentId,
  onAgentChange,
  disabled
}: VoiceBotAgentSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300">Assistent wählen:</label>
      <Select 
        value={selectedAgentId} 
        onValueChange={onAgentChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full bg-black/30 border-gray-700 text-white">
          <SelectValue placeholder="Wähle einen Assistenten" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-gray-700 text-white">
          {AGENT_OPTIONS.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceBotAgentSelector;
