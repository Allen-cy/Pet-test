/**
 * 前端 API 调用服务
 * 与后端 Vercel Serverless Functions 通信
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export interface TestResult {
  session_id: string
  answers: { questionId: number; optionIndex: number }[]
  result_pet: string
  total_scores?: Record<string, number>
  report_unlocked?: boolean
}

export interface SaveResultResponse {
  success: boolean
  id?: string
  error?: string
}

// 保存测试结果
export async function saveTestResult(data: TestResult): Promise<SaveResultResponse> {
  try {
    const response = await fetch(`${API_BASE}/save-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await response.json()
  } catch (error: any) {
    console.error('Error saving test result:', error)
    return { success: false, error: error.message }
  }
}

// 解锁报告
export async function unlockReport(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/unlock-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

    return await response.json()
  } catch (error: any) {
    console.error('Error unlocking report:', error)
    return { success: false, error: error.message }
  }
}

// 获取宠物数据
export async function getPets(): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/pets`)
    return await response.json()
  } catch (error: any) {
    console.error('Error fetching pets:', error)
    return { success: false, error: error.message }
  }
}

// 获取题目数据
export async function getQuestions(): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/questions`)
    return await response.json()
  } catch (error: any) {
    console.error('Error fetching questions:', error)
    return { success: false, error: error.message }
  }
}

// 生成会话ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
