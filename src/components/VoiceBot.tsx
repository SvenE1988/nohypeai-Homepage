
import React, { useState } from "react";
import { Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const VoiceBot = () => {
  const [useCase, setUseCase] = useState("immobilienmakler");
  const [isActive, setIsActive] = useState(false);

  const startVoiceTest = (selectedUseCase: string) => {
    console.log("Starting voice test for use case:", selectedUseCase);
    setIsActive(true);
    // This will be implemented with Twilio/UltraVox later
  };

  const stopVoiceTest = () => {
    setIsActive(false);
    // This will be implemented with Twilio/UltraVox later
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
          <Headphones className="w-5 h-5 text-primary" />
          KI-Sprachassistent testen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Bitte wählen Sie einen Anwendungsfall:
          </label>
          <Select
            value={useCase}
            onValueChange={setUseCase}
            disabled={isActive}
          >
            <SelectTrigger className="w-full bg-black/30 border-gray-700 text-white">
              <SelectValue placeholder="Wählen Sie einen Anwendungsfall" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immobilienmakler">Immobilienmakler</SelectItem>
              <SelectItem value="hausverwaltung">Hausverwaltung</SelectItem>
              <SelectItem value="support">Technischer Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!isActive ? (
          <Button
            onClick={() => startVoiceTest(useCase)}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6"
          >
            Test starten
          </Button>
        ) : (
          <Button
            onClick={stopVoiceTest}
            variant="destructive"
            className="w-full py-6"
          >
            Test beenden
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceBot;
