
import React, { useState, useRef, useEffect } from "react";
import { Mic, Headphones, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const VoiceBot = () => {
  const [prompt, setPrompt] = useState(
    "Du bist ein hilfsbereiter deutscher Sprachassistent für eine KI-Agentur. Begrüße neue Nutzer freundlich, stelle Fragen zu ihren Bedürfnissen und erkläre, wie Sprach-KI helfen kann."
  );
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const deepgramScriptAdded = useRef(false);

  // Load the Deepgram script
  useEffect(() => {
    const loadDeepgramScript = () => {
      if (deepgramScriptAdded.current) {
        return;
      }
      
      setScriptLoading(true);
      setScriptError(null);
      
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@deepgram/agents-client/browser.min.js";
      script.async = true;
      
      script.onload = () => {
        console.log("Deepgram SDK erfolgreich geladen");
        setScriptLoaded(true);
        setScriptLoading(false);
        setScriptError(null);
      };
      
      script.onerror = () => {
        console.error("Fehler beim Laden des Deepgram SDK");
        setScriptError("Deepgram SDK konnte nicht geladen werden. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
        setScriptLoading(false);
        setScriptLoaded(false);
      };
      
      document.body.appendChild(script);
      deepgramScriptAdded.current = true;
    };

    loadDeepgramScript();
  }, [retryCount]);

  // Function to retry loading the script
  const retryLoadingScript = () => {
    deepgramScriptAdded.current = false;
    setRetryCount(prev => prev + 1);
  };

  const startAgent = async () => {
    try {
      // Check if DeepgramAgents is available in the window object
      if (!(window as any).DeepgramAgents) {
        console.error("Deepgram SDK nicht verfügbar");
        setScriptError("Deepgram SDK nicht verfügbar. Bitte laden Sie die Seite neu und versuchen Sie es erneut.");
        return;
      }

      setListening(true);
      setMessages([]);
      setScriptError(null);

      const DeepgramAgents = (window as any).DeepgramAgents;
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
            disabled={listening}
          />
        </div>
        
        {scriptLoading && (
          <div className="flex flex-col space-y-2 p-4 bg-black/30 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
              <p className="text-gray-300 text-sm">Deepgram SDK wird geladen...</p>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/2 animate-pulse"></div>
            </div>
          </div>
        )}
        
        {scriptError && (
          <div className="p-4 bg-red-600/30 border border-red-500 text-white rounded-lg text-sm font-medium flex flex-col gap-2">
            <p>{scriptError}</p>
            <Button 
              onClick={retryLoadingScript} 
              variant="outline" 
              size="sm" 
              className="self-start bg-black/20 border-red-500/50 hover:bg-black/40 text-white"
            >
              <RefreshCw className="w-3 h-3 mr-1" /> Erneut versuchen
            </Button>
          </div>
        )}
        
        <Button
          onClick={startAgent}
          disabled={listening || scriptLoading || !(window as any).DeepgramAgents}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 disabled:bg-gray-700 disabled:text-gray-300"
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
          <div className="mt-4">
            <Separator className="mb-3 bg-gray-700" />
            <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceBot;
