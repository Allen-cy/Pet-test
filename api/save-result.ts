import type { VercelRequest, VercelResponse } from '@vercel/node'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

// Simple Supabase client without external imports for Vercel
async function saveTestResultToSupabase(data: {
  session_id: string
  answers: any[]
  result_pet: string
  total_scores?: Record<string, number>
  report_unlocked?: boolean
}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: 'Supabase not configured' }
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/test_results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error }
    }

    const result = await response.json()
    return { success: true, id: result[0]?.id }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(503).json({
      success: false,
      error: 'Backend not configured. Please set Supabase environment variables.'
    })
  }

  try {
    const { session_id, answers, result_pet, total_scores, report_unlocked } = req.body

    if (!session_id || !answers || !result_pet) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: session_id, answers, result_pet'
      })
    }

    const result = await saveTestResultToSupabase({
      session_id,
      answers,
      result_pet,
      total_scores,
      report_unlocked: report_unlocked || false
    })

    if (!result.success) {
      return res.status(500).json(result)
    }

    return res.status(200).json({ success: true, id: result.id })
  } catch (error: any) {
    console.error('Error in /api/save-result:', error)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
