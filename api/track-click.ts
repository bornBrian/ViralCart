import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: Request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    )
  }

  try {
    const { product_id } = await req.json()

    if (!product_id) {
      return new Response(
        JSON.stringify({ error: 'product_id is required' }),
        { status: 400, headers }
      )
    }

    // Optional: Get country from IP
    // Vercel provides headers like 'x-vercel-ip-country'
    const country = req.headers.get('x-vercel-ip-country') || null

    // Insert click record
    const { error } = await supabase.from('clicks').insert([
      {
        product_id,
        country,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers }
    )
  } catch (error: any) {
    console.error('Error tracking click:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers }
    )
  }
}
