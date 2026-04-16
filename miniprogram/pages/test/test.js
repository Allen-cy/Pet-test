// 题目数据
const questions = [
  { id: 1, dim: "A", text: "你的日常作息节奏是？", options: [
    { text: "非常规律，几点起几点睡基本固定", score: {dog:3,cat:1,rabbit:2,small:2,fish:2,bird:2} },
    { text: "大致规律，但偶尔会有波动", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
    { text: "不太规律，经常熬夜或作息混乱", score: {dog:0,cat:3,rabbit:1,small:1,fish:3,bird:0} },
    { text: "完全随心，随遇而安", score: {dog:0,cat:3,rabbit:1,small:1,fish:3,bird:1} }
  ]},
  { id: 2, dim: "B", text: "周末难得休息，你更倾向于怎么度过？", options: [
    { text: "去户外徒步、运动，释放精力", score: {dog:3,cat:0,rabbit:0,small:0,fish:0,bird:2} },
    { text: "找个安静的咖啡馆看书发呆", score: {dog:0,cat:3,rabbit:2,small:1,fish:2,bird:0} },
    { text: "宅在家里打扫卫生、布置房间", score: {dog:1,cat:2,rabbit:2,small:3,fish:3,bird:1} },
    { text: "和朋友聚餐、逛街、看电影", score: {dog:2,cat:1,rabbit:0,small:1,fish:0,bird:2} }
  ]},
  { id: 3, dim: "C", text: "当你感到压力很大时，你通常会？", options: [
    { text: "找人倾诉，大哭一场", score: {dog:3,cat:0,rabbit:1,small:0,fish:0,bird:2} },
    { text: "一个人静静待着，自我消化", score: {dog:0,cat:3,rabbit:2,small:1,fish:3,bird:0} },
    { text: "做一些重复性的手工或家务", score: {dog:0,cat:1,rabbit:2,small:3,fish:2,bird:1} },
    { text: "去运动出汗，或者大吃一顿", score: {dog:2,cat:0,rabbit:0,small:1,fish:0,bird:1} }
  ]},
  { id: 4, dim: "D", text: "你理想中的居住环境是？", options: [
    { text: "宽敞明亮，有大阳台或院子", score: {dog:3,cat:1,rabbit:1,small:0,fish:1,bird:2} },
    { text: "温馨舒适，有很多柔软的靠垫", score: {dog:1,cat:3,rabbit:3,small:1,fish:0,bird:0} },
    { text: "极简干净，东西越少越好", score: {dog:0,cat:1,rabbit:0,small:2,fish:3,bird:0} },
    { text: "充满生活气息，有很多小摆件", score: {dog:1,cat:1,rabbit:1,small:3,fish:1,bird:2} }
  ]},
  { id: 5, dim: "E", text: "你对待感情的态度更接近？", options: [
    { text: "热烈直接，毫无保留", score: {dog:3,cat:0,rabbit:0,small:0,fish:0,bird:1} },
    { text: "慢热内敛，需要时间建立信任", score: {dog:0,cat:3,rabbit:2,small:1,fish:1,bird:0} },
    { text: "顺其自然，不强求不执着", score: {dog:1,cat:2,rabbit:1,small:2,fish:3,bird:1} },
    { text: "细水长流，注重日常的陪伴", score: {dog:2,cat:1,rabbit:3,small:2,fish:1,bird:1} }
  ]},
  { id: 6, dim: "F", text: "如果宠物弄坏了你心爱的物品，你的第一反应是？", options: [
    { text: "非常生气，必须严厉教育", score: {dog:1,cat:0,rabbit:0,small:0,fish:3,bird:0} },
    { text: "无奈叹气，默默收拾残局", score: {dog:1,cat:3,rabbit:2,small:2,fish:1,bird:1} },
    { text: "觉得好笑，先拍个照发朋友圈", score: {dog:2,cat:2,rabbit:1,small:1,fish:0,bird:2} },
    { text: "反思是不是自己没把东西收好", score: {dog:2,cat:1,rabbit:3,small:3,fish:1,bird:1} }
  ]},
  { id: 7, dim: "G", text: "你每天能抽出多少时间专门陪伴宠物？", options: [
    { text: "2小时以上，随时待命", score: {dog:3,cat:1,rabbit:1,small:0,fish:0,bird:2} },
    { text: "1-2小时，主要在早晚", score: {dog:2,cat:2,rabbit:2,small:1,fish:1,bird:2} },
    { text: "半小时左右，摸摸抱抱", score: {dog:0,cat:3,rabbit:2,small:2,fish:1,bird:1} },
    { text: "时间很少，只能保证基本喂养", score: {dog:0,cat:0,rabbit:0,small:3,fish:3,bird:0} }
  ]},
  { id: 8, dim: "H", text: "你对宠物掉毛的容忍度是？", options: [
    { text: "完全不能忍受，有洁癖", score: {dog:0,cat:0,rabbit:0,small:1,fish:3,bird:2} },
    { text: "能接受少量，定期清理即可", score: {dog:1,cat:1,rabbit:2,small:3,fish:2,bird:1} },
    { text: "无所谓，习惯了就好", score: {dog:3,cat:3,rabbit:2,small:1,fish:0,bird:0} },
    { text: "觉得毛茸茸的到处都是也很可爱", score: {dog:2,cat:3,rabbit:3,small:0,fish:0,bird:0} }
  ]},
  { id: 9, dim: "I", text: "你希望宠物在你的生活中扮演什么角色？", options: [
    { text: "形影不离的家人", score: {dog:3,cat:1,rabbit:1,small:0,fish:0,bird:1} },
    { text: "保持距离的室友", score: {dog:0,cat:3,rabbit:1,small:1,fish:2,bird:0} },
    { text: "需要呵护的小宝宝", score: {dog:1,cat:1,rabbit:3,small:2,fish:0,bird:1} },
    { text: "安静美丽的艺术品", score: {dog:0,cat:1,rabbit:0,small:1,fish:3,bird:1} }
  ]},
  { id: 10, dim: "J", text: "你更喜欢哪种声音环境？", options: [
    { text: "绝对安静，一点噪音都受不了", score: {dog:0,cat:2,rabbit:3,small:1,fish:3,bird:0} },
    { text: "有点白噪音，比如水流声或轻音乐", score: {dog:0,cat:2,rabbit:1,small:2,fish:3,bird:1} },
    { text: "充满生机，喜欢听大自然的声音", score: {dog:1,cat:1,rabbit:1,small:1,fish:1,bird:3} },
    { text: "热闹喧嚣，有人气的感觉", score: {dog:3,cat:0,rabbit:0,small:0,fish:0,bird:2} }
  ]},
  { id: 11, dim: "K", text: "如果宠物生病了，你会？", options: [
    { text: "非常焦虑，立刻请假带去看医生", score: {dog:3,cat:3,rabbit:3,small:1,fish:0,bird:2} },
    { text: "先上网查资料，观察一下再决定", score: {dog:1,cat:2,rabbit:1,small:2,fish:1,bird:1} },
    { text: "觉得是自然规律，顺其自然", score: {dog:0,cat:0,rabbit:0,small:1,fish:3,bird:0} },
    { text: "平时就做好预防，很少生病", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} }
  ]},
  { id: 12, dim: "L", text: "你对宠物智商的要求是？", options: [
    { text: "越聪明越好，能听懂指令", score: {dog:3,cat:1,rabbit:0,small:0,fish:0,bird:3} },
    { text: "有点小聪明就行，会互动", score: {dog:2,cat:3,rabbit:1,small:1,fish:0,bird:2} },
    { text: "笨笨的也很可爱，不需要太聪明", score: {dog:1,cat:1,rabbit:3,small:3,fish:1,bird:0} },
    { text: "完全不在乎智商，好看就行", score: {dog:0,cat:1,rabbit:1,small:1,fish:3,bird:1} }
  ]},
  { id: 13, dim: "M", text: "你每个月愿意为宠物花费多少钱？", options: [
    { text: "1000元以上，给它最好的", score: {dog:3,cat:3,rabbit:1,small:0,fish:2,bird:1} },
    { text: "500-1000元，保证生活质量", score: {dog:2,cat:2,rabbit:2,small:1,fish:1,bird:2} },
    { text: "200-500元，经济适用", score: {dog:1,cat:1,rabbit:3,small:2,fish:1,bird:1} },
    { text: "200元以下，能省则省", score: {dog:0,cat:0,rabbit:1,small:3,fish:2,bird:1} }
  ]},
  { id: 14, dim: "N", text: "你旅行或出差的频率是？", options: [
    { text: "经常出差，十天半个月不在家", score: {dog:0,cat:0,rabbit:0,small:1,fish:3,bird:0} },
    { text: "偶尔短途旅行，两三天左右", score: {dog:1,cat:2,rabbit:1,small:2,fish:2,bird:1} },
    { text: "很少出门，基本都在家", score: {dog:3,cat:3,rabbit:3,small:2,fish:1,bird:3} },
    { text: "出门一定要带着宠物一起", score: {dog:3,cat:1,rabbit:0,small:0,fish:0,bird:1} }
  ]},
  { id: 15, dim: "O", text: "你更喜欢哪种触感？", options: [
    { text: "毛茸茸、温暖柔软的", score: {dog:2,cat:3,rabbit:3,small:2,fish:0,bird:0} },
    { text: "结实、有力量感的", score: {dog:3,cat:1,rabbit:0,small:0,fish:0,bird:0} },
    { text: "光滑、冰凉的", score: {dog:0,cat:0,rabbit:0,small:0,fish:3,bird:0} },
    { text: "轻盈、羽毛般的", score: {dog:0,cat:0,rabbit:0,small:0,fish:0,bird:3} }
  ]},
  { id: 16, dim: "P", text: "当你工作或学习时，你希望宠物？", options: [
    { text: "安静地待在旁边陪着我", score: {dog:1,cat:3,rabbit:3,small:1,fish:1,bird:0} },
    { text: "自己去玩，不要打扰我", score: {dog:0,cat:2,rabbit:1,small:3,fish:3,bird:1} },
    { text: "偶尔过来求摸摸，互动一下", score: {dog:2,cat:2,rabbit:1,small:1,fish:0,bird:2} },
    { text: "最好能和我一起\"工作\"", score: {dog:3,cat:0,rabbit:0,small:0,fish:0,bird:1} }
  ]},
  { id: 17, dim: "Q", text: "你对宠物寿命的看法是？", options: [
    { text: "希望它能陪伴我越久越好", score: {dog:3,cat:3,rabbit:1,small:0,fish:1,bird:3} },
    { text: "顺其自然，珍惜在一起的时光", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
    { text: "害怕面对离别，不敢养寿命太长的", score: {dog:0,cat:0,rabbit:1,small:3,fish:1,bird:0} },
    { text: "无所谓，只在乎曾经拥有", score: {dog:1,cat:1,rabbit:1,small:2,fish:3,bird:1} }
  ]},
  { id: 18, dim: "R", text: "最后，凭直觉选择一个词：", options: [
    { text: "羁绊", score: {dog:3,cat:1,rabbit:1,small:0,fish:0,bird:1} },
    { text: "自由", score: {dog:0,cat:3,rabbit:0,small:1,fish:2,bird:3} },
    { text: "宁静", score: {dog:0,cat:2,rabbit:3,small:1,fish:3,bird:0} },
    { text: "生机", score: {dog:2,cat:1,rabbit:1,small:3,fish:1,bird:2} }
  ]}
]

// 计算结果
function calcResult(answers) {
  const totals = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 }
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
    questions: [],
    currentIndex: 0,
    answers: [],
    hasAnswered: false
  },

  onLoad() {
    // 初始化题目，添加字母选项
    const formattedQuestions = questions.map((q, qi) => ({
      ...q,
      options: q.options.map((o, oi) => ({
        ...o,
        letter: String.fromCharCode(65 + oi)
      }))
    }))
    this.setData({ questions: formattedQuestions })
  },

  get currentQuestion() {
    return this.data.questions[this.data.currentIndex]
  },

  get progress() {
    return ((this.data.currentIndex + 1) / this.data.questions.length) * 100
  },

  get isLastQuestion() {
    return this.data.currentIndex === this.data.questions.length - 1
  },

  onSelectOption(e) {
    const index = e.currentTarget.dataset.index
    const question = this.data.questions[this.data.currentIndex]
    const newAnswers = [...this.data.answers]
    const existingIndex = newAnswers.findIndex(a => a.questionId === question.id)

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: question.id, optionIndex: index }
    } else {
      newAnswers.push({ questionId: question.id, optionIndex: index })
    }

    // 更新选项选中状态
    const questions = this.data.questions
    questions[this.data.currentIndex].options.forEach((opt, i) => {
      opt.selected = i === index
    })

    this.setData({
      answers: newAnswers,
      hasAnswered: true,
      questions: questions
    })

    // 自动进入下一题
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
