
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { useCase, email } = await req.json()
    
    if (!useCase || !email) {
      throw new Error("Missing required parameters: useCase and email")
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
    
    // Log session data
    const { error: insertError } = await supabase
      .from('voice_bot_sessions')
      .insert([{ email, use_case: useCase }])

    if (insertError) {
      console.error("Error logging session:", insertError)
    }
    
    console.log(`Processing request for email: "${email}" with useCase: "${useCase}"`)

    const apiKey = Deno.env.get('WEBHOOK_API_KEY')
    if (!apiKey) {
      throw new Error("API key not configured")
    }

    const webhookURL = `https://automatisierung.seserver.nohype-ai.de/webhook/ultra3550-90c7-4a40-a201-3a3062a205ed`
    
    console.log(`Sending request to webhook: ${webhookURL}`)
    
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ useCase, voice: 'pia' })
    })

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`)
    }

    // Parse response and ensure it's in the correct format
    const responseText = await response.text()
    console.log('Webhook raw response:', responseText)

    try {
      // Attempt to parse as JSON first
      const jsonData = JSON.parse(responseText)
      return new Response(
        JSON.stringify(jsonData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (e) {
      // If JSON parsing fails, assume it's XML and return the joinUrl in the expected format
      const joinUrlMatch = responseText.match(/joinUrl="([^"]*)"/)
      if (!joinUrlMatch) {
        throw new Error('No joinUrl found in response')
      }

      const joinUrl = joinUrlMatch[1]
      return new Response(
        JSON.stringify([{ joinUrl }]),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error("Error in Edge Function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
