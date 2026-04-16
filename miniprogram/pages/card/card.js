var app = getApp()

Page({
  data: {
    cardImagePath: ''
  },

  onLoad: function() {
    this.drawCard()
  },

  drawCard: function() {
    var petId = app.globalData.petId || 'cat'
    var ctx = wx.createCanvasContext('shareCard')

    var gradients = {
      cat: ['#2C2420', '#6B4E37'],
      dog: ['#1A2E1A', '#4A7040'],
      rabbit: ['#2A1F2E', '#5E4480'],
      small: ['#2E2010', '#7A5830'],
      fish: ['#0D1E2E', '#1A4A6A'],
      bird: ['#1A2A10', '#4A7020']
    }

    var colors = gradients[petId] || gradients.cat

    ctx.setFillStyle(colors[0])
    ctx.fillRect(0, 0, 320, 520)

    ctx.setFillStyle('#ffffff')
    ctx.setTextAlign('center')

    ctx.setFontSize(10)
    ctx.fillText('🐾 宠物缘分测试', 160, 40)

    ctx.setFillStyle('#E8C9A0')
    ctx.setFontSize(12)
    ctx.fillText('The Fated Match', 160, 320)

    ctx.setFontSize(80)
    var emojis = { cat: '🐈', dog: '🐕', rabbit: '🐇', small: '🐹', fish: '🐠', bird: '🦜' }
    ctx.fillText(emojis[petId] || '🐈', 160, 200)

    var names = { cat: '猫', dog: '狗', rabbit: '兔子', small: '仓鼠', fish: '鱼', bird: '鸟' }
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(32)
    ctx.fillText(names[petId] || '猫', 160, 370)

    var titles = {
      cat: '独立灵魂的安静陪伴者',
      dog: '忠诚热烈的灵魂守护者',
      rabbit: '温婉细腻的无声倾听者',
      small: '微小确幸的治愈系精灵',
      fish: '沉静如水的哲思观察者',
      bird: '自由灵动的云端歌唱家'
    }
    ctx.setFontSize(14)
    ctx.fillText(titles[petId] || '', 160, 410)

    ctx.draw(true)
  },

  onSave: function() {
    var that = this
    wx.showLoading({ title: '保存中...' })
    wx.canvasToTempFilePath({
      canvasId: 'shareCard',
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.hideLoading()
            wx.showToast({ title: '保存成功', icon: 'success' })
          },
          fail: function() {
            wx.hideLoading()
            wx.showToast({ title: '保存失败', icon: 'none' })
          }
        })
      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '🐾 测测我和哪种宠物最有缘',
      path: '/pages/index/index'
    }
  },

  onShareTimeline: function() {
    return {
      title: '🐾 宠物缘分测试'
    }
  },

  onShare: function() {
    wx.showToast({ title: '请点击右上角分享', icon: 'none' }): '请点击右上角分享', icon: 'none' })
  },

  onRestart: function() {
    wx.redirectTo({ url: '/pages/index/index' })
  }
})