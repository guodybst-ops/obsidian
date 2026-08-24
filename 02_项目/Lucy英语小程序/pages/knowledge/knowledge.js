const app = getApp()
const { computeNavMetrics } = require('../../utils/nav.js')

const levelOptions = Array.from({ length: 26 }, (_, index) => `Level ${String.fromCharCode(65 + index)}`)
const PRONUNCIATION_ENDPOINT = 'https://dict.youdao.com/dictvoice'

const buildPronunciationUrl = (text) => {
  const content = String(text || '').trim()
  if (!content) return ''
  return `${PRONUNCIATION_ENDPOINT}?audio=${encodeURIComponent(content)}&type=2`
}

Page({
  data: {
    activeTab: 'knowledge',
    levels: levelOptions,
    levelIndex: 11,
    keyword: '',
    lessons: [],
    filteredLessons: [],
    selectedLessonId: '',
    openPointId: '',
    playingPointId: '',
    photoWallImage: wx.getStorageSync('lucyPhotoWallImage') || '',
    showTeacherPanel: false,
    showAddLessonPanel: false,
    newLessonTitle: '',
    newLessonPoints: '',
    generatedPreview: null,
    form: {
      raw: '',
      title: '课后补充知识点'
    },
    navMetrics: { top: 0, center: 0, height: 0 },
    browserScrollHeight: 0,
    headerBottomPx: 0,
    photoWallFadeDistance: 200,
    photoWallOpacity: 1,
    isTeacher: false
  },

  onLoad() {
    // 教师端自动跳转到课文管理
    if (app.isTeacher()) {
      wx.redirectTo({ url: '/pages/manage/lessons' })
      return
    }
    const navMetrics = computeNavMetrics()
    const systemInfo = wx.getSystemInfoSync()
    const rpxRatio = systemInfo.windowWidth / 750
    const searchRowHeight = 100 * rpxRatio
    const totalHeaderPx = navMetrics.top + navMetrics.height + searchRowHeight
    const bottomReserve = 100 * rpxRatio
    const scrollHeight = systemInfo.windowHeight - totalHeaderPx - bottomReserve

    this.setData({
      navMetrics,
      browserScrollHeight: Math.floor(scrollHeight),
      headerBottomPx: Math.floor(totalHeaderPx),
      photoWallFadeDistance: Math.floor(400 * rpxRatio)
    })
    this.refreshLessons()
  },

  onShow() {
    this.setData({ activeTab: 'knowledge', isTeacher: app.isTeacher() })
    const savedPhoto = wx.getStorageSync('lucyPhotoWallImage') || ''
    if (savedPhoto !== this.data.photoWallImage) {
      this.setData({ photoWallImage: savedPhoto })
    }
    this.refreshLessons()
  },

  refreshLessons() {
    const lessons = app.getLessons()
    if (lessons !== this.data.lessons) {
      this.setData({ lessons })
      this.applyFilter()
    }
  },

  getSelectedLesson() {
    const selected = this.data.filteredLessons.find((lesson) => lesson.id === this.data.selectedLessonId)
    return selected || this.data.filteredLessons[0] || this.data.lessons[0]
  },

  applyFilter() {
    const level = this.data.levels[this.data.levelIndex]
    const keyword = this.data.keyword.trim().toLowerCase()
    const lessons = this.data.lessons
    const filteredLessons = lessons.filter((lesson) => {
      const inLevel = lesson.level === level
      const haystack = [
        lesson.title,
        lesson.level,
        (lesson.tags || []).join(' '),
        ...(lesson.points || []).flatMap((point) => [point.text, point.type, point.chinese, point.sentence])
      ].join(' ').toLowerCase()
      return inLevel && (!keyword || haystack.includes(keyword))
    })

    const selectedLessonId = filteredLessons.some((lesson) => lesson.id === this.data.selectedLessonId)
      ? this.data.selectedLessonId
      : ''

    if (!selectedLessonId && this.data.playingPointId) {
      this.stopAudio()
    }

    this.setData({
      filteredLessons,
      selectedLessonId,
      openPointId: '',
      playingPointId: selectedLessonId ? this.data.playingPointId : ''
    })
  },

  handleLevelChange(event) {
    this.setData({ levelIndex: Number(event.detail.value) }, () => this.applyFilter())
  },

  handleSearch(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyFilter())
  },

  clearSearch() {
    this.setData({ keyword: '' }, () => this.applyFilter())
  },

  selectLesson(event) {
    const { id } = event.currentTarget.dataset
    this.stopAudio()
    this.setData({
      selectedLessonId: id,
      openPointId: '',
      playingPointId: ''
    })
  },

  backToLessons() {
    this.stopAudio()
    this.setData({
      selectedLessonId: '',
      openPointId: '',
      playingPointId: ''
    })
  },

  stopAudio() {
    if (this.audioContext) {
      this.audioContext.stop()
      this.audioContext.destroy()
      this.audioContext = null
    }
  },

  handleBrowserScroll(event) {
    const scrollTop = event.detail.scrollTop
    const opacity = Math.max(0, 1 - scrollTop / this.data.photoWallFadeDistance)
    if (Math.abs(opacity - this.data.photoWallOpacity) > 0.01) {
      this.setData({ photoWallOpacity: Math.round(opacity * 100) / 100 })
    }
  },

  /* ---- 添加课文（仅教师端可用） ---- */

  addNewLesson() {
    this.setData({ showAddLessonPanel: true })
  },

  closeAddLessonPanel() {
    this.setData({ showAddLessonPanel: false, newLessonTitle: '', newLessonPoints: '' })
  },

  updateNewLessonTitle(event) {
    this.setData({ newLessonTitle: event.detail.value })
  },

  updateNewLessonPoints(event) {
    this.setData({ newLessonPoints: event.detail.value })
  },

  submitNewLesson() {
    const title = this.data.newLessonTitle.trim()
    const pointsRaw = this.data.newLessonPoints.trim()
    if (!title) {
      wx.showToast({ title: '请输入课文名', icon: 'none' })
      return
    }
    if (!pointsRaw) {
      wx.showToast({ title: '请输入知识点', icon: 'none' })
      return
    }

    const items = pointsRaw
      .split(/[\n,，;；]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 12)
      .map((text, index) => ({
        id: `custom-${Date.now()}-${index}`,
        type: text.includes(' ') ? '词组' : '单词',
        text,
        phonetic: '待补充',
        chinese: '待补充',
        sentence: text + ' is in ' + title + '.',
        example: 'Please use ' + text + ' in a sentence.'
      }))

    const newLesson = {
      id: `lesson-${Date.now()}`,
      level: this.data.levels[this.data.levelIndex],
      title,
      cover: '/assets/references/参考图-积分兑换库.png',
      tags: ['自建课文'],
      points: items
    }

    app.addLesson(newLesson)
    this.setData({
      lessons: app.getLessons(),
      selectedLessonId: newLesson.id,
      showAddLessonPanel: false,
      newLessonTitle: '',
      newLessonPoints: ''
    }, () => this.applyFilter())
  },

  choosePhoto() {
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
            wx.setStorageSync('lucyPhotoWallImage', savedFilePath)
            this.setData({ photoWallImage: savedFilePath })
            wx.showToast({ title: '已更换照片', icon: 'success' })
          },
          fail: () => {
            wx.setStorageSync('lucyPhotoWallImage', tempFilePath)
            this.setData({ photoWallImage: tempFilePath })
            wx.showToast({ title: '已选择照片', icon: 'success' })
          }
        })
      }
    })
  },

  togglePoint(event) {
    const { id, text } = event.currentTarget.dataset
    const nextId = this.data.openPointId === id ? '' : id
    this.setData({ openPointId: nextId })
    app.recordKnowledgeInteraction({ id, text })
  },

  playPoint(event) {
    const { id, text, speakText, audio } = event.currentTarget.dataset
    app.recordKnowledgeInteraction({ id, text })
    this.setData({ playingPointId: id })
    this.speak(speakText || text, audio)
  },

  speak(text, audio) {
    if (!text) return
    const audioSrc = audio || buildPronunciationUrl(text)
    if (!audioSrc) return
    this.playAudioSrc(audioSrc)
  },

  playAudioSrc(audioSrc) {
    if (!audioSrc) {
      this.setData({ playingPointId: '' })
      return
    }

    if (this.audioContext) {
      this.audioContext.stop()
      this.audioContext.destroy()
    }

    const audioContext = wx.createInnerAudioContext()
    this.audioContext = audioContext
    audioContext.obeyMuteSwitch = false
    audioContext.src = audioSrc
    audioContext.play()
    audioContext.onEnded(() => {
      this.setData({ playingPointId: '' })
    })
    audioContext.onError(() => {
      this.setData({ playingPointId: '' })
      wx.showToast({ title: '发音播放失败', icon: 'none' })
    })
  },

  onUnload() {
    this.stopAudio()
    this.setData({ playingPointId: '' })
  },

  /* ---- 课后知识点（学生端可添加） ---- */

  openTeacherPanel() {
    this.setData({ showTeacherPanel: true })
  },

  closeTeacherPanel() {
    this.setData({ showTeacherPanel: false })
  },

  updateFormTitle(event) {
    this.setData({ 'form.title': event.detail.value })
  },

  updateFormRaw(event) {
    this.setData({ 'form.raw': event.detail.value })
  },

  generateKnowledge() {
    const raw = this.data.form.raw.trim()
    if (!raw) {
      wx.showToast({ title: '先输入单词或词组', icon: 'none' })
      return
    }

    const items = raw
      .split(/[\n,，;；]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8)
      .map((text, index) => ({
        id: `generated-${Date.now()}-${index}`,
        type: text.includes(' ') ? '词组' : '单词',
        text,
        phonetic: '待 AI 生成',
        chinese: '待 AI 生成中文释义',
        sentence: `Lucy can read ${text} in the story.`,
        example: `Please make one sentence with ${text}.`
      }))

    this.setData({
      generatedPreview: {
        title: this.data.form.title || '课后补充知识点',
        points: items
      }
    })
    wx.showToast({ title: '已生成预览', icon: 'success' })
  },

  useGenerated() {
    const preview = this.data.generatedPreview
    if (!preview) return

    const newLesson = {
      id: `custom-${Date.now()}`,
      level: this.data.levels[this.data.levelIndex],
      title: preview.title,
      cover: '/assets/references/参考图-积分兑换库.png',
      tags: ['老师录入', '课后复习'],
      points: preview.points
    }

    app.addLesson(newLesson)
    this.setData({
      lessons: app.getLessons(),
      selectedLessonId: newLesson.id,
      showTeacherPanel: false,
      generatedPreview: null,
      form: { raw: '', title: '课后补充知识点' }
    }, () => this.applyFilter())
  },

  noop() {
  }
})
