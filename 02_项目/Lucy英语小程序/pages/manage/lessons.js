const app = getApp()
const levelOptions = Array.from({ length: 26 }, (_, i) => `Level ${String.fromCharCode(65 + i)}`)

Page({
  data: {
    lessons: [],
    filteredLessons: [],
    levels: levelOptions,
    levelIndex: 11,
    keyword: '',
    showModal: false,
    editMode: false,
    editingId: '',
    editTitle: '',
    editLevel: 'Level L',
    editLevelIndex: 11,
    pointsText: '',
    editPointsList: []
  },

  onShow() {
    if (!app.isTeacher()) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    this.refresh()
  },

  refresh() {
    const lessons = app.getLessons()
    this.setData({ lessons })
    this.applyFilter()
  },

  applyFilter() {
    const level = this.data.levels[this.data.levelIndex]
    const keyword = this.data.keyword.trim().toLowerCase()
    const filtered = this.data.lessons.filter((l) => {
      const matchLevel = l.level === level
      const matchKeyword = !keyword || l.title.toLowerCase().includes(keyword)
      return matchLevel && matchKeyword
    })
    this.setData({ filteredLessons: filtered })
  },

  handleLevel(event) {
    this.setData({ levelIndex: Number(event.detail.value) }, () => this.applyFilter())
  },

  handleSearch(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyFilter())
  },

  openAdd() {
    this.setData({
      showModal: true,
      editMode: false,
      editingId: '',
      editTitle: '',
      editLevel: this.data.levels[this.data.levelIndex],
      editLevelIndex: this.data.levelIndex,
      pointsText: '',
      editPointsList: []
    })
  },

  openEdit(event) {
    const { id } = event.currentTarget.dataset
    const lesson = this.data.lessons.find((l) => l.id === id)
    if (!lesson) return
    const levelIdx = this.data.levels.indexOf(lesson.level)
    this.setData({
      showModal: true,
      editMode: true,
      editingId: lesson.id,
      editTitle: lesson.title,
      editLevel: lesson.level,
      editLevelIndex: levelIdx >= 0 ? levelIdx : 11,
      pointsText: '',
      editPointsList: JSON.parse(JSON.stringify(lesson.points || []))
    })
  },

  handleEditTitle(event) { this.setData({ editTitle: event.detail.value }) },
  handleEditLevel(event) { this.setData({ editLevelIndex: Number(event.detail.value), editLevel: levelOptions[event.detail.value] }) },
  handlePointsText(event) { this.setData({ pointsText: event.detail.value }) },

  addPoints() {
    const raw = this.data.pointsText.trim()
    if (!raw) { wx.showToast({ title: '请输入知识点', icon: 'none' }); return }
    const items = raw.split(/[\n,，;；]/).map((item) => item.trim()).filter(Boolean).map((text, index) => ({
      id: `pt-${Date.now()}-${index}`,
      type: text.includes(' ') ? '词组' : '单词',
      text,
      phonetic: '待补充',
      chinese: '待补充',
      sentence: `${text} is in ${this.data.editTitle || 'the lesson'}.`,
      example: `Please use ${text} in a sentence.`
    }))
    this.setData({
      editPointsList: [...this.data.editPointsList, ...items],
      pointsText: ''
    })
  },

  removePoint(event) {
    const { idx } = event.currentTarget.dataset
    const list = this.data.editPointsList
    list.splice(idx, 1)
    this.setData({ editPointsList: list })
  },

  saveLesson() {
    const { editTitle, editPointsList, editMode, editingId, editLevel } = this.data
    if (!editTitle.trim()) { wx.showToast({ title: '请输入课文名', icon: 'none' }); return }
    if (!editPointsList.length) { wx.showToast({ title: '请添加知识点', icon: 'none' }); return }

    const lessonData = {
      title: editTitle.trim(),
      level: editLevel,
      points: editPointsList,
      cover: '/assets/references/参考图-积分兑换库.png',
      tags: ['自建课文']
    }

    if (editMode) {
      app.updateLesson(editingId, lessonData)
    } else {
      app.addLesson({ id: `lesson-${Date.now()}`, ...lessonData })
    }

    this.setData({ showModal: false })
    this.refresh()
  },

  deleteLesson(event) {
    const { id, title } = event.currentTarget.dataset
    wx.showModal({
      title: '确认删除',
      content: `确定要删除「${title}」吗？`,
      success: (res) => {
        if (res.confirm) {
          app.deleteLesson(id)
          this.refresh()
        }
      }
    })
  },

  closeModal() { this.setData({ showModal: false }) },
  noop() {}
})
