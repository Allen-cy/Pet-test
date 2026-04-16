const app = getApp()

Page({
  data: {},

  onStart() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  }
})
