
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { useCase, voice } = await req.json()
    
    // Log the incoming request parameters
    console.log("Received request with useCase:", useCase, "and voice:", voice)

    const apiKey = Deno.env.get('WEBHOOK_API_KEY')
    if (!apiKey) {
      console.error("No WEBHOOK_API_KEY found in environment")
      throw new Error("API key not configured")
    }

    // Call Ultravox API to create a call
    const response = await fetch('https://api.ultravox.ai/api/calls', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemPrompt: `Du bist ein ${useCase} Assistent. Deine Aufgabe ist es, Fragen zu beantworten und zu helfen.`,
        temperature: 0.7,
        model: "ultravox-70B",
        voice: voice
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Ultravox API responded with status: ${response.status}, error: ${errorText}`);
      throw new Error(`Ultravox API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the join URL in the format expected by the frontend
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><Stream url="${data.joinUrl}"/>`,
      {
        headers: { ...corsHeaders, 'Content-Type': 'text/xml' }
      }
    );
  } catch (error) {
    console.error("Error in Edge Function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
