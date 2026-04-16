App<IAnyObject>({
  globalData: {
    sessionId: '',
    testResultId: '',
    userInfo: null
  },
  onLaunch() {
    // 生成会话ID
    this.globalData.sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }
})
