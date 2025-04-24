
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
    
    // Check for recent sessions in the last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const { data: existingSessions } = await supabase
      .from('voice_bot_sessions')
      .select()
      .eq('email', email)
      .gte('created_at', thirtyMinutesAgo);

    if (existingSessions && existingSessions.length > 0) {
      console.log(`Duplicate session attempt from ${email}`);
      return new Response(
        JSON.stringify({ 
          message: "Session already initiated recently",
          joinUrl: existingSessions[0].join_url
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Extract IP address from request headers
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const sessionUUID = crypto.randomUUID();

    // Log session data
    console.log({
      timestamp: new Date().toISOString(),
      sessionUUID,
      clientIP,
      email,
      useCase
    });
    
    // Log session data
    const { error: insertError } = await supabase
      .from('voice_bot_sessions')
      .insert([{ 
        email, 
        use_case: useCase,
        session_uuid: sessionUUID,
        client_ip: clientIP
      }])

    if (insertError) {
      console.error("Error logging session:", insertError)
    }
    
    const apiKey = Deno.env.get('WEBHOOK_API_KEY')
    if (!apiKey) {
      throw new Error("API key not configured")
    }

    const webhookURL = `https://automatisierung.seserver.nohype-ai.de/webhook/ultra3550-90c7-4a40-a201-3a3062a205ed`
    
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ useCase, email })
    })

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`)
    }

    const webhookData = await response.json()
    
    if (!webhookData.joinUrl || typeof webhookData.joinUrl !== 'string') {
      throw new Error("Invalid joinUrl in webhook response")
    }
    
    return new Response(
      JSON.stringify({ joinUrl: webhookData.joinUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
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
