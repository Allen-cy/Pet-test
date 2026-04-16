import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Backend features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = !!supabase

export interface TestResult {
  id?: string
  session_id: string
  answers: { questionId: number; optionIndex: number }[]
  result_pet: string
  total_scores?: Record<string, number>
  report_unlocked?: boolean
  created_at?: string
}

export interface Pet {
  id: string
  name: string
  title: string
  short_desc: string
  why_suitable: string
  daily_scene: string
  advice: string
  tags: string[]
  bg_gradient: string
  accent_color: string
  emoji: string
  image: string
}

export interface Question {
  id: number
  dim: string
  text: string
  options: { text: string; score: Record<string, number> }[]
}

// 保存测试结果
export async function saveTestResult(result: TestResult): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { data, error } = await supabase
    .from('test_results')
    .insert(result)
    .select('id')
    .single()

  if (error) {
    console.error('Error saving test result:', error)
    return { success: false, error: error.message }
  }

  return { success: true, id: data.id }
}

// 获取测试结果（通过session_id）
export async function getTestResultBySession(sessionId: string): Promise<{ success: boolean; data?: TestResult; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching test result:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 解锁报告
export async function unlockReport(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { error } = await supabase
    .from('test_results')
    .update({ report_unlocked: true, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error unlocking report:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// 获取所有宠物数据
export async function getPets(): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('id')

  if (error) {
    console.error('Error fetching pets:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 获取所有题目
export async function getQuestions(): Promise<{ success: boolean; data?: Question[]; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id')

  if (error) {
    console.error('Error fetching questions:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 获取统计数据
export async function getStats(): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  const { data, error } = await supabase
    .from('test_stats')
    .select('*')

  if (error) {
    console.error('Error fetching stats:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
