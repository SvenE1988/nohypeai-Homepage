
import React, { useState, useRef, useEffect } from "react";
import { Mic, Headphones } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VoiceBot = () => {
  const [prompt, setPrompt] = useState(
    "Du bist ein hilfsbereiter deutscher Sprachassistent für eine KI-Agentur. Begrüße neue Nutzer freundlich, stelle Fragen zu ihren Bedürfnissen und erkläre, wie Sprach-KI helfen kann."
  );
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  const deepgramScriptAdded = useRef(false);

  useEffect(() => {
    if (!deepgramScriptAdded.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@deepgram/agents-client/browser.min.js";
      script.async = true;
      
      script.onload = () => {
        console.log("Deepgram SDK geladen");
        setScriptLoaded(true);
        setScriptError(null);
      };
      
      script.onerror = (error) => {
        console.error("Fehler beim Laden des Deepgram SDK:", error);
        setScriptError("Deepgram SDK konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
      };
      
      document.body.appendChild(script);
      deepgramScriptAdded.current = true;
    }
  }, []);

  const startAgent = async () => {
    try {
      setListening(true);
      setMessages([]);
      setScriptError(null);

      // Check if DeepgramAgents is available
      const DeepgramAgents = (window as any).DeepgramAgents;
      if (!DeepgramAgents) {
        console.error("Deepgram SDK nicht geladen");
        setScriptError("Deepgram SDK nicht geladen. Bitte versuchen Sie es später erneut.");
        setListening(false);
        return;
      }

      const { connectToAgent } = DeepgramAgents;

      const agent = await connectToAgent({
        apiKey: "ca56f058f600d2432e546bc000976a8da9a82d73", // Deepgram API-Key
        agent: {
          prompt: prompt,
          speak_model: "aura-2-thalia-de",
          llm: {
            provider: "openai",
            model: "gpt-4o-mini"
          }
        },
        handler: {
          onMessage: (msg: { text: string }) => {
            setMessages((prev) => [...prev, { sender: "bot", text: msg.text }]);
            const utterance = new SpeechSynthesisUtterance(msg.text);
            utterance.lang = "de-DE";
            speechSynthesis.speak(utterance);
          },
          onUserUtterance: (msg: { text: string }) => {
            setMessages((prev) => [...prev, { sender: "user", text: msg.text }]);
          },
          onDisconnect: () => setListening(false),
          onError: (err: any) => {
            console.error("Fehler:", err);
            setScriptError(`Fehler bei der Kommunikation mit Deepgram: ${err.message || "Unbekannter Fehler"}`);
            setListening(false);
          }
        }
      });

      await agent.start();
    } catch (error) {
      console.error("Fehler beim Starten des Agents:", error);
      setScriptError(`Fehler beim Starten des Sprachassistenten: ${(error as Error).message || "Unbekannter Fehler"}`);
      setListening(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
          <Headphones className="w-5 h-5 text-primary" />
          KI-Sprachassistent testen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">System-Prompt:</label>
          <Textarea
            className="w-full bg-black/30 border-gray-700 text-white"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="System-Prompt eingeben..."
          />
        </div>
        
        {scriptError && (
          <div className="p-3 bg-red-900/20 border border-red-800 text-red-300 rounded-lg text-sm">
            {scriptError}
          </div>
        )}
        
        <Button
          onClick={startAgent}
          disabled={listening || !(window as any).DeepgramAgents}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6"
        >
          {listening ? (
            <span className="flex items-center gap-2">
              <Headphones className="animate-pulse" /> Sprachdialog läuft...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mic /> Sprachdialog starten
            </span>
          )}
        </Button>

        {messages.length > 0 && (
          <div className="mt-4 max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === "user" 
                    ? "bg-gray-800/70 self-start mr-auto" 
                    : "bg-primary/20 self-end ml-auto"
                }`}
              >
                <div className="text-xs mb-1 text-gray-400">
                  {msg.sender === "user" ? "Du" : "KI-Assistent"}:
                </div>
                <div className="text-white">{msg.text}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceBot;
