
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { useCase, voice } = await req.json()

    // Call the webhook with the API key securely stored in Edge Function
    const webhookUrl = `https://automatisierung.seserver.nohype-ai.de/webhook/0c5e538a-90c7-4a40-a201-3a3062a205ed?useCase=${useCase}&voice=${voice}`
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        'X-API-Key': Deno.env.get('WEBHOOK_API_KEY') ?? '',
      }
    })

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`)
    }

    const data = await response.text()
    console.log("Webhook response:", data)

    return new Response(data, {
      headers: { ...corsHeaders, 'Content-Type': 'text/xml' }
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
