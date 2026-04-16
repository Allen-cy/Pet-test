interface Option {
  text: string
  score: Record<string, number>
  selected?: boolean
  letter?: string
}

interface Question {
  id: number
  dim: string
  text: string
  options: Option[]
}

const questions: Question[] = [
  // 18道题目，从 web 版复制
]

function calcResult(answers: { questionId: number; optionIndex: number }[]): string {
  const totals: Record<string, number> = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 }
  answers.forEach(({ questionId, optionIndex }) => {
    const q = questions.find(q => q.id === questionId)
    if (q) {
      const scores = q.options[optionIndex].score
      Object.keys(scores).forEach(pet => {
        totals[pet] += scores[pet]
      })
    }
  })
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]
}

Page({
  data: {
    questions: questions.map((q, qi) => ({
      ...q,
      options: q.options.map((o, oi) => ({
        ...o,
        letter: String.fromCharCode(65 + oi)
      }))
    })),
    currentIndex: 0,
    answers: [] as { questionId: number; optionIndex: number }[],
    hasAnswered: false
  },

  computed: {
    currentQuestion() {
      return this.data.questions[this.data.currentIndex]
    },
    progress() {
      return ((this.data.currentIndex + 1) / this.data.questions.length) * 100
    },
    isLastQuestion() {
      return this.data.currentIndex === this.data.questions.length - 1
    }
  },

  onSelectOption(e: any) {
    const index = e.currentTarget.dataset.index
    const question = this.data.questions[this.data.currentIndex]
    const newAnswers = [...this.data.answers]
    const existingIndex = newAnswers.findIndex(a => a.questionId === question.id)

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: question.id, optionIndex: index }
    } else {
      newAnswers.push({ questionId: question.id, optionIndex: index })
    }

    this.setData({
      answers: newAnswers,
      hasAnswered: true
    })

    // 更新选项选中状态
    const questions = this.data.questions
    questions[this.data.currentIndex].options.forEach((opt, i) => {
      opt.selected = i === index
    })
    this.setData({ questions })

    // 自动进入下一题（如果不是最后一题）
    if (!this.data.isLastQuestion) {
      setTimeout(() => {
        this.setData({ currentIndex: this.data.currentIndex + 1 })
      }, 300)
    }
  },

  onFinish() {
    const petId = calcResult(this.data.answers)
    const app = getApp()
    app.globalData.petId = petId
    app.globalData.answers = this.data.answers

    wx.redirectTo({
      url: `/pages/result/result?petId=${petId}`
    })
  }
})
