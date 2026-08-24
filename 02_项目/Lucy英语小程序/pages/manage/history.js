const app = getApp()

const pad = (value) => String(value).padStart(2, '0')
const getDateKey = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`
const getMonthKey = (y, m) => `${y}-${pad(m)}`

const heatLevel = (count) => {
  if (count >= 20) return 'level-4'
  if (count >= 15) return 'level-3'
  if (count >= 10) return 'level-2'
  if (count >= 5) return 'level-1'
  return 'level-0'
}

Page({
  data: {
    todayDurationValue: 0,
    todayInteractions: 0,
    todayKnowledgeCount: 0,
    monthlyDurationValue: 0,
    studyDays: 0,
    monthlyKnowledgeCount: 0,
    monthLabel: '',
    heatmap: [],
    heatYear: 0,
    heatMonth: 0,
    todayKnowledge: []
  },

  onShow() {
    if (!app.isTeacher()) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    const now = new Date()
    this.setData({ heatYear: now.getFullYear(), heatMonth: now.getMonth() + 1 })
    this.loadData()
  },

  loadData() {
    const now = new Date()
    const todayKey = getDateKey(now.getFullYear(), now.getMonth() + 1, now.getDate())
    const study = app.getStudyState()
    const records = study.dailyRecords || {}
    const todayRecord = records[todayKey] || {}
    const monthly = app.getMonthlyStats(this.data.heatYear, this.data.heatMonth)

    this.setData({
      todayDurationValue: Math.floor((todayRecord.totalSeconds || 0) / 60),
      todayInteractions: todayRecord.interactions || 0,
      todayKnowledgeCount: Object.keys(todayRecord.knowledgeMap || {}).length,
      monthlyDurationValue: Math.floor(monthly.totalSeconds / 60),
      studyDays: monthly.studyDays,
      monthlyKnowledgeCount: monthly.knowledgeCount,
      monthLabel: `${this.data.heatYear}年${this.data.heatMonth}月`,
      todayKnowledge: Object.values(todayRecord.knowledgeMap || {}),
      heatmap: this.buildHeatmap(this.data.heatYear, this.data.heatMonth, records)
    })
  },

  buildHeatmap(year, month, records) {
    const firstDay = new Date(year, month - 1, 1)
    const daysInMonth = new Date(year, month, 0).getDate()
    const offset = (firstDay.getDay() + 6) % 7
    const cells = []
    for (let i = 0; i < 35; i++) {
      const day = i - offset + 1
      const inMonth = day >= 1 && day <= daysInMonth
      const key = inMonth ? getDateKey(year, month, day) : ''
      const record = key ? (records[key] || {}) : {}
      const count = Object.keys(record.knowledgeMap || {}).length
      cells.push({ day: inMonth ? day : '', inMonth, count, cls: inMonth ? heatLevel(count) : 'level-empty' })
    }
    return cells
  },

  prevMonth() {
    let { heatYear: y, heatMonth: m } = this.data
    if (m === 1) { y -= 1; m = 12 } else { m -= 1 }
    this.setData({ heatYear: y, heatMonth: m }, () => this.loadData())
  },

  nextMonth() {
    let { heatYear: y, heatMonth: m } = this.data
    const now = new Date()
    const maxYm = { year: now.getFullYear(), month: now.getMonth() + 1 }
    if (y < maxYm.year || (y === maxYm.year && m < maxYm.month)) {
      if (m === 12) { y += 1; m = 1 } else { m += 1 }
      this.setData({ heatYear: y, heatMonth: m }, () => this.loadData())
    }
  },

  goKnowledgeList() {
    wx.navigateTo({ url: '/pages/manage/knowledge-list' })
  }
})
