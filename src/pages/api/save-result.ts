import type { APIRoute } from 'astro'
import { saveTestResult, isSupabaseConfigured } from '../../lib/supabase'

export const POST: APIRoute = async ({ request }) => {
  if (!isSupabaseConfigured) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Backend not configured. Please set up Supabase credentials.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await request.json()
    const { session_id, answers, result_pet, total_scores, report_unlocked } = body

    if (!session_id || !answers || !result_pet) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: session_id, answers, result_pet'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const result = await saveTestResult({
      session_id,
      answers,
      result_pet,
      total_scores,
      report_unlocked
    })

    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      success: true,
      id: result.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in /api/save-result:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
