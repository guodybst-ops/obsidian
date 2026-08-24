const app = getApp()
const { computeNavMetrics } = require('../../utils/nav.js')

const defaultTasks = [
  { id: 'login', title: '每日登录', points: 1 },
  { id: 'read-text', title: '阅读课文（0/2）', points: 2 },
  { id: 'read-word', title: '阅读单词', points: 2 },
  { id: 'read-phrase', title: '阅读词组', points: 2 },
  { id: 'read-sentence', title: '阅读句子', points: 2 }
]

const defaultPrizes = [
  { id: 'duck-chair', name: '奶娃扇子', points: 5, image: '/assets/prizes/image01.jpg' },
  { id: 'duck-sticker', name: '奶娃贴纸', points: 5, image: '/assets/prizes/image02.jpg' },
  { id: 'duck-paper', name: '奶娃贴纸', points: 5, image: '/assets/prizes/image03.jpg' },
  { id: 'duck-fan', name: '奶娃扇子', points: 5, image: '/assets/prizes/image04.jpg' },
  { id: 'gift-5', name: '神秘贴纸', points: 8, image: '/assets/prizes/image05.jpg' },
  { id: 'gift-6', name: '学习小礼物', points: 10, image: '/assets/prizes/image06.jpg' },
  { id: 'gift-7', name: '惊喜盲盒', points: 15, image: '/assets/prizes/image07.jpg' },
  { id: 'gift-8', name: '雷霆大奖', points: 20, image: '/assets/prizes/image08.jpg' }
]

const loadConfig = () => {
  const s1 = wx.getStorageSync('lucyTaskConfig')
  const s2 = wx.getStorageSync('lucyPrizeConfig')
  return {
    tasks: (s1 && s1.length) ? s1 : defaultTasks,
    prizes: (s2 && s2.length) ? s2 : defaultPrizes
  }
}

Page({
  data: {
    activeTab: 'rewards',
    navMetrics: computeNavMetrics(),
    mode: 'tasks',
    tasks: [],
    prizes: [],
    points: 0,
    completedTasks: {},
    avatar: ''
  },

  onLoad() {
    this.setData({ navMetrics: computeNavMetrics() })
  },

  onShow() {
    this.loadState()
  },

  loadState() {
    app.resetDailyTasks()
    const study = app.getStudyState()
    const config = loadConfig()
    this.setData({
      points: study.points,
      completedTasks: study.completedTasks || {},
      tasks: config.tasks,
      prizes: config.prizes,
      avatar: wx.getStorageSync('lucyAvatar') || ''
    })
  },

  switchMode(mode) {
    if (typeof mode !== 'string') {
      mode = mode.currentTarget.dataset.mode
    }
    this.setData({ mode })
  },

  handleTouchStart(event) {
    const touch = event.touches[0]
    this.setData({ touchStartX: touch.clientX })
  },

  handleTouchEnd(event) {
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - (this.data.touchStartX || 0)
    const threshold = 50
    if (deltaX < -threshold) {
      this.switchMode('prizes')
    } else if (deltaX > threshold) {
      this.switchMode('tasks')
    }
  },

  completeTask(event) {
    const { id, points } = event.currentTarget.dataset
    const study = app.getStudyState()
    if (this.data.completedTasks[id]) {
      delete study.completedTasks[id]
      app.addPoints(-Number(points))
      app.saveStudyState()
      wx.showToast({ title: `-${points}积分`, icon: 'none' })
    } else {
      study.completedTasks = { ...study.completedTasks, [id]: true }
      app.addPoints(Number(points))
      app.saveStudyState()
      wx.showToast({ title: `+${points}积分`, icon: 'success' })
    }
    this.loadState()
  },

  redeemPrize(event) {
    const { points, name } = event.currentTarget.dataset
    const requiredPoints = Number(points)
    if (this.data.points < requiredPoints) {
      wx.showToast({ title: '积分还不够', icon: 'none' })
      return
    }
    wx.showModal({
      title: '确认兑换',
      content: `确定使用 ${requiredPoints} 积分兑换「${name}」吗？`,
      success: (res) => {
        if (res.confirm) {
          const ok = app.spendPoints(requiredPoints)
          if (!ok) {
            wx.showToast({ title: '积分还不够', icon: 'none' })
            return
          }
          wx.showToast({ title: `已兑换：${name}`, icon: 'success' })
          this.loadState()
        }
      }
    })
  },

  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].tempFilePath
        if (!tempFilePath) return

        const fs = wx.getFileSystemManager()
        fs.saveFile({
          tempFilePath,
          success: (saveRes) => {
            const savedFilePath = saveRes.savedFilePath
            wx.setStorageSync('lucyAvatar', savedFilePath)
            this.setData({ avatar: savedFilePath })
            wx.showToast({ title: '头像已更新', icon: 'success' })
          },
          fail: () => {
            wx.setStorageSync('lucyAvatar', tempFilePath)
            this.setData({ avatar: tempFilePath })
            wx.showToast({ title: '头像已更新', icon: 'success' })
          }
        })
      }
    })
  }
})
