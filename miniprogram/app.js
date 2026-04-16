App({
  globalData: {
    sessionId: '',
    testResultId: '',
    userInfo: null,
    petId: '',
    answers: []
  },
  onLaunch() {
    // 生成会话ID
    this.global