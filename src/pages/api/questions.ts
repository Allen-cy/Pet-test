import type { APIRoute } from 'astro'
import { getQuestions, isSupabaseConfigured } from '../../lib/supabase'

export const GET: APIRoute = async () => {
  if (!isSupabaseConfigured) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Backend not configured'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const result = await getQuestions()

    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      success: true,
      data: result.data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in /api/questions:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
