import React, { useState } from "react";
import { Headphones, Mic, MicOff, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import VoiceBotLoading from "./voice/VoiceBotLoading";
import VoiceBotError from "./voice/VoiceBotError";
import VoiceBotMessages from "./voice/VoiceBotMessages";
import VoiceBotControls from "./voice/VoiceBotControls";

const VoiceBot = () => {
  const [useCase, setUseCase] = useState("immobilienmakler");
  const [voice, setVoice] = useState("pia");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const startVoiceTest = async (selectedUseCase: string) => {
    setIsActive(true);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://automatisierung.seserver.nohype-ai.de/webhook/0c5e538a-90c7-4a40-a201-3a3062a205ed", {
        method: "GET",
        mode: "no-cors" // 👈 Nur diese Zeile wurde angepasst
      });

      // Da "no-cors" keine lesbare Response zurückgibt, kannst du `response.ok` etc. hier ignorieren.
      console.log("✅ Webhook (no-cors) ausgelöst.");

    } catch (error) {
      console.error("❌ Fehler beim Aufruf:", error);
      setErrorMessage("Es gab ein Problem beim Starten des Sprachdialogs.");
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopVoiceTest = () => {
    setIsActive(false);
    setIsLoading(false);
    setErrorMessage("");
    setMessages([]);
  };

  return (
    <div className="relative">
      <div className="max-w-sm mx-auto">
        {/* Smartphone frame */}
        <div className="relative border-[14px] border-gray-900 rounded-[3rem] shadow-xl bg-black overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl" />
          
          <Card className="border-0 bg-gradient-to-b from-[#1A1F35] to-black min-h-[600px]">
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

              {/* Privacy notice */}
              <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <Info className="w-4 h-4 text-primary mt-0.5" />
                  <p>
                    🔒 Ihre Spracheingabe wird zur Verarbeitung an unsere Server übermittelt. 
                    Es findet keine dauerhafte Speicherung statt.
                  </p>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && <VoiceBotLoading />}

              {/* Error State */}
              {errorMessage && <VoiceBotError errorMessage={errorMessage} />}

              {/* Messages */}
              <VoiceBotMessages messages={messages} />

              {/* Controls */}
              <VoiceBotControls 
                listening={isActive} 
                isLoading={isLoading} 
                onStart={() => startVoiceTest(useCase)} 
                onStop={stopVoiceTest} 
              />
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