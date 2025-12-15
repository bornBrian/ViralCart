import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { product_id } = JSON.parse(event.body || '{}')

    if (!product_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'product_id is required' }),
      }
    }

    // Optional: Get country from IP (you can use a service like ipapi.co)
    // For now, we'll leave it null
    const country = null

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error: any) {
    console.error('Error tracking click:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    }
  }
}
