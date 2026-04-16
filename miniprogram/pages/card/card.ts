const app = getApp()

Page({
  data: {
    cardImagePath: ''
  },

  onLoad() {
    this.drawCard()
  },

  drawCard() {
    const petId = app.globalData.petId || 'cat'
    const ctx = wx.createCanvasContext('shareCard')

    // 渐变背景
    const gradients: Record<string, [string, string]> = {
      cat: ['#2C2420', '#6B4E37'],
      dog: ['#1A2E1A', '#4A7040'],
      rabbit: ['#2A1F2E', '#5E4480'],
      small: ['#2E2010', '#7A5830'],
      fish: ['#0D1E2E', '#1A4A6A'],
      bird: ['#1A2A10', '#4A7020']
    }

    const [color1, color2] = gradients[petId] || gradients.cat

    // 绘制渐变背景
    ctx.setFillStyle(color1)
    ctx.fillRect(0, 0, 320, 520)

    // 绘制内容
    ctx.setFillStyle('#ffffff')
    ctx.setTextAlign('center')

    // 标题
    ctx.setFontSize(10)
    ctx.fillText('🐾 宠物缘分测试', 160, 40)

    // 标签
    ctx.setFillStyle('#E8C9A0')
    ctx.setFontSize(12)
    ctx.fillText('The Fated Match', 160, 320)

    // Emoji
    ctx.setFontSize(80)
    const emojis: Record<string, string> = { cat: '🐈', dog: '🐕', rabbit: '🐇', small: '🐹', fish: '🐠', bird: '🦜' }
    ctx.fillText(emojis[petId] || '🐈', 160, 200)

    // 宠物名
    const names: Record<string, string> = { cat: '猫', dog: '狗', rabbit: '兔子', small: '仓鼠', fish: '鱼', bird: '鸟' }
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(32)
    ctx.fillText(names[petId] || '猫', 160, 370)

    // 标题
    const titles: Record<string, string> = {
      cat: '独立灵魂的安静陪伴者',
      dog: '忠诚热烈的灵魂守护者',
      rabbit: '温婉细腻的无声倾听者',
      small: '微小确幸的治愈系精灵',
      fish: '沉静如水的哲思观察者',
      bird: '自由灵动的云端歌唱家'
    }
    ctx.setFontSize(14)
    ctx.fillText(titles[petId] || '', 160, 410)

    ctx.draw()
  },

  onSave() {
    wx.showLoading({ title: '保存中...' })
    wx.canvasToTempFilePath({
      canvasId: 'shareCard',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.hideLoading()
            wx.showToast({ title: '保存成功', icon: 'success' })
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({ title: '保存失败', icon: 'none' })
          }
        })
      }
    })
  },

  onShare() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onRestart() {
    wx.redirectTo({ url: '/pages/index/index' })
  }
})
