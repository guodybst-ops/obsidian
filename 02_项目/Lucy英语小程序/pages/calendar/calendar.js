const app = getApp()
const { computeNavMetrics } = require('../../utils/nav.js')

const pad = (value) => String(value).padStart(2, '0')
const getMonthKey = (year, month) => `${year}-${pad(month)}`
const getDateKey = (year, month, day) => `${year}-${pad(month)}-${pad(day)}`

const getTodayParts = () => {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
}

const formatDuration = (seconds) => {
  const totalSeconds = Math.max(0, Number(seconds || 0))
  return { value: Math.floor(totalSeconds / 60), unit: '分钟' }
}

const heatLevel = (count) => {
  if (count >= 20) return 'level-4'
  if (count >= 15) return 'level-3'
  if (count >= 10) return 'level-2'
  if (count >= 5) return 'level-1'
  return 'level-0'
}

const buildHeatmap = (year, month, dailyRecords) => {
  const firstDay = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const mondayFirstOffset = (firstDay.getDay() + 6) % 7
  const cells = []

  for (let index = 0; index < 35; index += 1) {
    const day = index - mondayFirstOffset + 1
    const inMonth = day >= 1 && day <= daysInMonth
    const dateKey = inMonth ? getDateKey(year, month, day) : ''
    const record = dateKey ? (dailyRecords[dateKey] || {}) : {}
    const knowledgeCount = Object.keys(record.knowledgeMap || {}).length

    cells.push({
      id: dateKey || `blank-${index}`,
      day: inMonth ? day : '',
      inMonth,
      knowledgeCount,
      className: inMonth ? heatLevel(knowledgeCount) : 'level-empty'
    })
  }

  return cells
}

Page({
  data: {
    activeTab: 'calendar',
    navMetrics: computeNavMetrics(),
    currentYear: 0,
    currentMonth: 0,
    monthLabel: '',
    todayDurationValue: 0,
    todayDurationUnit: '分钟',
    todayKnowledgeCount: 0,
    todayKnowledge: [],
    monthlyDurationValue: 0,
    monthlyDurationUnit: '分钟',
    studyDays: 0,
    monthlyKnowledgeCount: 0,
    heatmap: [],
    showMonthPicker: false,
    pickerYear: 0,
    selectedYear: 0,
    selectedMonth: 0,
    todayYear: 0,
    todayMonth: 0,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },

  onLoad() {
    const today = getTodayParts()
    this.setData({
      currentYear: today.year,
      currentMonth: today.month,
      selectedYear: today.year,
      selectedMonth: today.month,
      todayYear: today.year,
      todayMonth: today.month,
      navMetrics: computeNavMetrics()
    })
  },

  onShow() {
    this.loadStudyData()
    this.refreshTimer = setInterval(() => this.loadStudyData(), 1000)
  },

  onHide() {
    this.clearRefreshTimer()
  },

  onUnload() {
    this.clearRefreshTimer()
  },

  clearRefreshTimer() {
    if (!this.refreshTimer) return
    clearInterval(this.refreshTimer)
    this.refreshTimer = null
  },

  loadStudyData() {
    const today = getTodayParts()
    const study = app.getStudyState()
    const dailyRecords = study.dailyRecords || {}
    const todayStats = app.getDailyStats(getDateKey(today.year, today.month, today.day))
    const monthlyStats = app.getMonthlyStats(this.data.currentYear, this.data.currentMonth)
    const todayDuration = formatDuration(todayStats.totalSeconds)
    const monthlyDuration = formatDuration(monthlyStats.totalSeconds)

    this.setData({
      monthLabel: `${this.data.currentYear}年${this.data.currentMonth}月`,
      todayDurationValue: todayDuration.value,
      todayDurationUnit: todayDuration.unit,
      todayKnowledgeCount: todayStats.knowledgeCount,
      todayKnowledge: todayStats.knowledge,
      monthlyDurationValue: monthlyDuration.value,
      monthlyDurationUnit: monthlyDuration.unit,
      studyDays: monthlyStats.studyDays,
      monthlyKnowledgeCount: monthlyStats.knowledgeCount,
      heatmap: buildHeatmap(this.data.currentYear, this.data.currentMonth, dailyRecords)
    })
  },

  openMonthPicker() {
    this.setData({
      showMonthPicker: true,
      pickerYear: this.data.currentYear,
      selectedYear: this.data.currentYear,
      selectedMonth: this.data.currentMonth
    })
  },

  closeMonthPicker() {
    this.setData({ showMonthPicker: false })
  },

  pickerPrevYear() {
    this.setData({ pickerYear: this.data.pickerYear - 1 })
  },

  pickerNextYear() {
    this.setData({ pickerYear: this.data.pickerYear + 1 })
  },

  switchToMonth(e) {
    const month = Number(e.currentTarget.dataset.month)
    const year = this.data.pickerYear
    this.setData({
      currentYear: year,
      currentMonth: month,
      selectedYear: year,
      selectedMonth: month,
      showMonthPicker: false
    }, () => this.loadStudyData())
  },

  noop() {}
})
