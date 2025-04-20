
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

    // Construct the correct webhook URL for n8n with the new webhook ID
    const webhookURL = `https://automatisierung.seserver.nohype-ai.de/webhook/ultra3550-90c7-4a40-a201-3a3062a205ed`
    
    // Forward the parameters to the n8n webhook
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ useCase, voice })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n webhook responded with status: ${response.status}, error: ${errorText}`);
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const data = await response.text();
    
    // Return the response from n8n which should contain the XML with Stream URL
    return new Response(
      data,
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
