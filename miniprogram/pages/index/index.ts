const app = getApp<IAppOption>()

Page({
  data: {},

  onStart() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  }
})
