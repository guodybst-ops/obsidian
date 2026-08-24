const app = getApp()

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

const load = (key, defaults) => {
  const s = wx.getStorageSync(key)
  return (s && s.length) ? s : defaults
}

const save = (key, data) => wx.setStorageSync(key, data)

Page({
  data: {
    tasks: [],
    prizes: [],
    showTaskModal: false,
    showPrizeModal: false,
    editTaskId: '',
    editTaskTitle: '',
    editTaskPoints: '',
    editPrizeId: '',
    editPrizeName: '',
    editPrizePoints: '',
    editPrizeImage: ''
  },

  onShow() {
    if (!app.isTeacher()) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    this.loadConfig()
  },

  loadConfig() {
    this.setData({
      tasks: load('lucyTaskConfig', defaultTasks),
      prizes: load('lucyPrizeConfig', defaultPrizes)
    })
  },

  /* ---- 任务管理 ---- */
  openTaskAdd() {
    this.setData({ showTaskModal: true, editTaskId: '', editTaskTitle: '', editTaskPoints: '' })
  },

  openTaskEdit(e) {
    const { id } = e.currentTarget.dataset
    const task = this.data.tasks.find((t) => t.id === id)
    if (!task) return
    this.setData({
      showTaskModal: true, editTaskId: task.id,
      editTaskTitle: task.title, editTaskPoints: String(task.points)
    })
  },

  saveTask() {
    const { editTaskId, editTaskTitle, editTaskPoints, tasks } = this.data
    const pts = Number(editTaskPoints)
    if (!editTaskTitle.trim() || isNaN(pts) || pts < 1) {
      wx.showToast({ title: '请填写完整', icon: 'none' }); return
    }
    let updated
    if (editTaskId) {
      updated = tasks.map((t) => t.id === editTaskId ? { ...t, title: editTaskTitle.trim(), points: pts } : t)
    } else {
      updated = [...tasks, { id: `task-${Date.now()}`, title: editTaskTitle.trim(), points: pts }]
    }
    save('lucyTaskConfig', updated)
    this.setData({ tasks: updated, showTaskModal: false })
  },

  deleteTask(e) {
    const { id } = e.currentTarget.dataset
    const updated = this.data.tasks.filter((t) => t.id !== id)
    save('lucyTaskConfig', updated)
    this.setData({ tasks: updated })
  },

  /* ---- 奖品管理 ---- */
  openPrizeAdd() {
    this.setData({ showPrizeModal: true, editPrizeId: '', editPrizeName: '', editPrizePoints: '', editPrizeImage: '' })
  },

  openPrizeEdit(e) {
    const { id } = e.currentTarget.dataset
    const prize = this.data.prizes.find((p) => p.id === id)
    if (!prize) return
    this.setData({
      showPrizeModal: true, editPrizeId: prize.id,
      editPrizeName: prize.name, editPrizePoints: String(prize.points),
      editPrizeImage: prize.image
    })
  },

  choosePrizeImage() {
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      success: (res) => {
        const path = res.tempFiles?.[0]?.tempFilePath
        if (path) this.setData({ editPrizeImage: path })
      }
    })
  },

  savePrize() {
    const { editPrizeId, editPrizeName, editPrizePoints, editPrizeImage, prizes } = this.data
    const pts = Number(editPrizePoints)
    if (!editPrizeName.trim() || isNaN(pts) || pts < 1) {
      wx.showToast({ title: '请填写完整', icon: 'none' }); return
    }
    let updated
    if (editPrizeId) {
      updated = prizes.map((p) => p.id === editPrizeId ? { ...p, name: editPrizeName.trim(), points: pts, image: editPrizeImage || p.image } : p)
    } else {
      updated = [...prizes, { id: `prize-${Date.now()}`, name: editPrizeName.trim(), points: pts, image: editPrizeImage || '/assets/prizes/image01.jpg' }]
    }
    save('lucyPrizeConfig', updated)
    this.setData({ prizes: updated, showPrizeModal: false })
  },

  deletePrize(e) {
    const { id } = e.currentTarget.dataset
    const updated = this.data.prizes.filter((p) => p.id !== id)
    save('lucyPrizeConfig', updated)
    this.setData({ prizes: updated })
  },

  closeTaskModal() { this.setData({ showTaskModal: false }) },
  closePrizeModal() { this.setData({ showPrizeModal: false }) },

  updateTaskTitle(e) { this.setData({ editTaskTitle: e.detail.value }) },
  updateTaskPoints(e) { this.setData({ editTaskPoints: e.detail.value }) },
  updatePrizeName(e) { this.setData({ editPrizeName: e.detail.value }) },
  updatePrizePoints(e) { this.setData({ editPrizePoints: e.detail.value }) },

  noop() {}
})
