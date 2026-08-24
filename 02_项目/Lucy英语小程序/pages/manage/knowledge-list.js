const app = getApp()

Page({
  data: {
    list: [],
    grouped: {}
  },

  onLoad() {
    const all = app.getAllKnowledge()
    const grouped = {}
    all.forEach((item) => {
      const letter = item.charAt(0).toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push(item)
    })
    this.setData({ list: all, grouped })
  },

  goBack() {
    wx.navigateBack()
  }
})
