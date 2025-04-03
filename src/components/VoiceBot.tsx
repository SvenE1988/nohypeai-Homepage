
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

  const deepgramScriptAdded = useRef(false);

  useEffect(() => {
    if (!deepgramScriptAdded.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@deepgram/agents-client/browser.min.js";
      script.onload = () => {
        console.log("Deepgram SDK geladen");
      };
      document.body.appendChild(script);
      deepgramScriptAdded.current = true;
    }
  }, []);

  const startAgent = async () => {
    setListening(true);
    setMessages([]);

    // Typeerweiterung für Window-Objekt
    const DeepgramAgents = (window as any).DeepgramAgents;
    if (!DeepgramAgents) {
      console.error("Deepgram SDK nicht geladen");
      setListening(false);
      return;
    }

    const { connectToAgent } = DeepgramAgents;

    try {
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
            setListening(false);
          }
        }
      });

      await agent.start();
    } catch (error) {
      console.error("Fehler beim Starten des Agents:", error);
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
        
        <Button
          onClick={startAgent}
          disabled={listening}
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
