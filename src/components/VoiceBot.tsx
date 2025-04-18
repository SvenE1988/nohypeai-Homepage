
import React, { useState } from "react";
import { Headphones, Smartphone, MicOff, Mic, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const VoiceBot = () => {
  const [useCase, setUseCase] = useState("immobilienmakler");
  const [voice, setVoice] = useState("pia");
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
    <div className="relative">
      <div className="max-w-sm mx-auto">
        {/* Smartphone frame */}
        <div className="relative border-[14px] border-gray-900 rounded-[3rem] shadow-xl bg-black overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl" />
          
          <Card className="border-0 bg-gradient-to-b from-gray-900 to-black min-h-[600px]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                KI-Sprachassistent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    KI-Assistent:
                  </label>
                  <Select
                    value={voice}
                    onValueChange={setVoice}
                    disabled={isActive}
                  >
                    <SelectTrigger className="w-full bg-black/30 border-gray-700 text-white">
                      <SelectValue placeholder="Wählen Sie eine Stimme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pia">🧑‍💼 Pia (freundliche Assistentin)</SelectItem>
                      <SelectItem value="schneider">👨‍🔧 Herr Schneider (Techniker)</SelectItem>
                      <SelectItem value="otto">🤖 Agent Otto (neutral, KI-Stil)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Privacy notice */}
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <Info className="w-4 h-4 text-primary mt-0.5" />
                  <p>
                    🔒 Ihre Spracheingabe wird zur Verarbeitung an unsere Server übermittelt. 
                    Es findet keine dauerhafte Speicherung statt.
                  </p>
                </div>
              </div>

              {!isActive ? (
                <Button
                  onClick={() => startVoiceTest(useCase)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 gap-2"
                >
                  <Mic className="w-5 h-5" />
                  Test starten
                </Button>
              ) : (
                <Button
                  onClick={stopVoiceTest}
                  variant="destructive"
                  className="w-full py-6 gap-2"
                >
                  <MicOff className="w-5 h-5" />
                  Test beenden
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Phone bottom indicator */}
        <div className="w-32 h-1.5 bg-gray-900 mx-auto mt-4 rounded-full" />
      </div>
    </div>
  );
};

export default VoiceBot;
