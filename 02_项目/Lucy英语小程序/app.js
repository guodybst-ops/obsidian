const STUDY_STATE_VERSION = 3
const ACTIVE_WINDOW_SECONDS = 10

const pad = (value) => String(value).padStart(2, '0')

const getDateParts = (date = new Date()) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
})

const getDateKey = (date = new Date()) => {
  const { year, month, day } = getDateParts(date)
  return `${year}-${pad(month)}-${pad(day)}`
}

const getMonthKey = (year, month) => `${year}-${pad(month)}`

const getToday = () => {
  const now = new Date()
  const { year, month, day } = getDateParts(now)
  return {
    key: getDateKey(now),
    monthKey: getMonthKey(year, month),
    monthLabel: `${month}月`,
    year,
    month,
    day
  }
}

const normalizeKnowledgeKey = (value) => String(value || '').trim().toLowerCase()

const createDayRecord = (dateKey) => ({
  dateKey,
  totalSeconds: 0,
  knowledgeMap: {},
  interactions: 0,
  updatedAt: 0
})

const createStudyState = (seed = {}) => ({
  version: STUDY_STATE_VERSION,
  points: Number(seed.points || 0),
  totalEarned: Number(seed.totalEarned || 0),
  totalSpent: Number(seed.totalSpent || 0),
  completedTasks: seed.completedTasks || {},
  taskDate: seed.taskDate || '',
  dailyRecords: seed.dailyRecords || {},
  timer: {
    total_time: 0,
    count_time: ACTIVE_WINDOW_SECONDS,
    pause_if: true
  }
})

const normalizeDayRecord = (dateKey, record = {}) => ({
  dateKey,
  totalSeconds: Number(record.totalSeconds || 0),
  knowledgeMap: record.knowledgeMap || {},
  interactions: Number(record.interactions || 0),
  updatedAt: Number(record.updatedAt || 0)
})

const normalizeStudyState = (stored) => {
  const base = createStudyState(stored || {})
  if (!stored || stored.version !== STUDY_STATE_VERSION) {
    if (stored && stored.points && !stored.totalEarned) {
      base.totalEarned = base.points
      base.totalSpent = 0
      base.points = base.totalEarned - base.totalSpent
    }
    return base
  }

  Object.keys(base.dailyRecords).forEach((dateKey) => {
    base.dailyRecords[dateKey] = normalizeDayRecord(dateKey, base.dailyRecords[dateKey])
  })

  return base
}

const ensureDayRecord = (study, dateKey = getDateKey()) => {
  if (!study.dailyRecords) study.dailyRecords = {}
  if (!study.dailyRecords[dateKey]) {
    study.dailyRecords[dateKey] = createDayRecord(dateKey)
  }
  study.dailyRecords[dateKey] = normalizeDayRecord(dateKey, study.dailyRecords[dateKey])
  return study.dailyRecords[dateKey]
}

const defaultLessons = [
  {
    id: 'big-machines',
    level: 'Level L',
    title: 'Big Machines',
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['机器', '工程', '被动语态'],
    points: [
      {
        id: 'machine',
        type: '单词',
        text: 'machine',
        phonetic: '/məˈʃiːn/',
        chinese: '机器；机械',
        phraseAudio: 'machine',
        sentence: 'Big machines are used to move heavy things.',
        example: 'A machine can help people do hard work.'
      },
      {
        id: 'resource',
        type: '单词',
        text: 'resource',
        phonetic: '/ˈriːsɔːrs/',
        chinese: '资源',
        phraseAudio: 'resource',
        sentence: 'They are used to take resources from the earth.',
        example: 'Water is an important resource.'
      },
      {
        id: 'be-used-to',
        type: '词组',
        text: 'be used to do',
        phonetic: '/bi juːzd tu duː/',
        chinese: '被用来做某事',
        phraseAudio: 'be used to do',
        sentence: 'Machines are used to do the work.',
        example: 'A shovel is used to move dirt.'
      },
      {
        id: 'move-from-a-to-b',
        type: '词组',
        text: 'move from A to B',
        phonetic: '/muːv frəm eɪ tu biː/',
        chinese: '从 A 移动到 B',
        phraseAudio: 'move from one place to another',
        sentence: 'They move things from place to place.',
        example: 'Please move the chair from the door to the desk.'
      },
      {
        id: 'it-takes',
        type: '句式',
        text: 'It takes...to...',
        phonetic: '/ɪt teɪks tuː/',
        chinese: '做某事需要……',
        phraseAudio: 'It takes many big machines to build a tall building.',
        sentence: 'It takes many big machines to build a tall building.',
        example: 'It takes ten minutes to read this story.'
      }
    ]
  },
  {
    id: 'colosseum',
    level: 'Level L',
    title: 'Colosseum',
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['建筑', '历史'],
    points: [
      {
        id: 'colosseum-ancient',
        type: '单词',
        text: 'ancient',
        phonetic: '/ˈeɪnʃənt/',
        chinese: '古代的',
        phraseAudio: 'ancient',
        sentence: 'The Colosseum is an ancient building.',
        example: 'This is an ancient city.'
      }
    ]
  },
  {
    id: 'im-the-guest',
    level: 'Level L',
    title: "I'm the guest",
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['故事', '礼仪'],
    points: [
      {
        id: 'guest',
        type: '单词',
        text: 'guest',
        phonetic: '/ɡest/',
        chinese: '客人',
        phraseAudio: 'guest',
        sentence: "I'm the guest today.",
        example: 'A guest came to my home.'
      }
    ]
  },
  {
    id: 'karate',
    level: 'Level L',
    title: 'Karate',
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['运动', '文化'],
    points: [
      {
        id: 'karate-practice',
        type: '单词',
        text: 'practice',
        phonetic: '/ˈpræktɪs/',
        chinese: '练习',
        phraseAudio: 'practice',
        sentence: 'Karate takes a lot of practice.',
        example: 'I practice English every day.'
      }
    ]
  },
  {
    id: 'kenya',
    level: 'Level L',
    title: 'Kenya',
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['国家', '地理'],
    points: [
      {
        id: 'kenya-country',
        type: '单词',
        text: 'country',
        phonetic: '/ˈkʌntri/',
        chinese: '国家',
        phraseAudio: 'country',
        sentence: 'Kenya is a country in Africa.',
        example: 'China is my country.'
      }
    ]
  },
  {
    id: 'morocco',
    level: 'Level L',
    title: 'Morocco',
    cover: '/assets/references/参考图-知识点首页.png',
    tags: ['国家', '地理'],
    points: [
      {
        id: 'morocco-market',
        type: '单词',
        text: 'market',
        phonetic: '/ˈmɑːrkɪt/',
        chinese: '市场',
        phraseAudio: 'market',
        sentence: 'The market is full of colors.',
        example: 'We went to the market.'
      }
    ]
  },
  {
    id: 'big-ben',
    level: 'Level L',
    title: 'Big Ben and Westminster Palace',
    cover: '/assets/references/参考图-课文展开.png',
    tags: ['地标', '英国', '同级比较'],
    points: [
      {
        id: 'bell',
        type: '单词',
        text: 'bell',
        phonetic: '/bel/',
        chinese: '钟；铃',
        phraseAudio: 'bell',
        sentence: 'Big Ben is a huge bell at the top of a tall clock tower.',
        example: 'The bell rings at eight o clock.'
      },
      {
        id: 'tower',
        type: '单词',
        text: 'tower',
        phonetic: '/ˈtaʊər/',
        chinese: '塔；塔楼',
        phraseAudio: 'tower',
        sentence: 'Big Ben is at the top of a tall clock tower.',
        example: 'The tower is very tall.'
      },
      {
        id: 'as-heavy-as',
        type: '词组',
        text: 'as heavy as',
        phonetic: '/əz ˈhevi əz/',
        chinese: '和……一样重',
        phraseAudio: 'as heavy as two elephants',
        sentence: 'The bell is as heavy as two elephants.',
        example: 'This box is as heavy as my schoolbag.'
      },
      {
        id: 'be-home-to',
        type: '词组',
        text: 'be home to',
        phonetic: '/bi hoʊm tuː/',
        chinese: '是……的所在地',
        phraseAudio: 'be home to',
        sentence: 'Westminster Palace is home to Parliament.',
        example: 'This school is home to many clubs.'
      }
    ]
  },
  {
    id: 'chichen-itza',
    level: 'Level L',
    title: 'Chichen Itza',
    cover: '/assets/references/参考图-学习日历.png',
    tags: ['历史', '文化', '地点描写'],
    points: [
      {
        id: 'ancient',
        type: '单词',
        text: 'ancient',
        phonetic: '/ˈeɪnʃənt/',
        chinese: '古代的',
        phraseAudio: 'ancient',
        sentence: 'Chichen Itza is an ancient city.',
        example: 'We learned about ancient Egypt today.'
      },
      {
        id: 'temple',
        type: '单词',
        text: 'temple',
        phonetic: '/ˈtempəl/',
        chinese: '寺庙；神殿',
        phraseAudio: 'temple',
        sentence: 'The temple stands in the center of the city.',
        example: 'The old temple is quiet.'
      }
    ]
  },
  {
    id: 'cinderello',
    level: 'Level L',
    title: 'Cinderello',
    cover: '/assets/references/参考图-每日任务.png',
    tags: ['故事', '人物', '复述'],
    points: [
      {
        id: 'kind',
        type: '单词',
        text: 'kind',
        phonetic: '/kaɪnd/',
        chinese: '善良的',
        phraseAudio: 'kind',
        sentence: 'Cinderello is a kind boy.',
        example: 'Lucy is kind to her friends.'
      },
      {
        id: 'try-on',
        type: '词组',
        text: 'try on',
        phonetic: '/traɪ ɑːn/',
        chinese: '试穿',
        phraseAudio: 'try on',
        sentence: 'He tried on the shoe.',
        example: 'Can I try on this dress?'
      }
    ]
  }
]

const defaultUsers = [
  { account: 'Lucy', password: 'Lucy123', role: 'student', displayName: 'Lucy', avatar: '' },
  { account: 'Admin', password: 'Admin666', role: 'teacher', displayName: 'Lucy妈妈', avatar: '' }
]

App({
  globalData: {
    study: null,
    studyTimerId: null,
    role: '',
    lessons: [],
    _lessonsLoaded: false
  },

  onLaunch() {
    const stored = wx.getStorageSync('lucyStudyState')
    this.globalData.study = normalizeStudyState(stored)
    this.initUsers()
    this.restoreSession()
    this.syncTimerWithToday()
    this.resetDailyTasks()
    this.loadLessons()
  },

  /* ---- 用户管理 ---- */

  initUsers() {
    let users = wx.getStorageSync('lucyUsers')
    if (!users || !users.length) {
      users = JSON.parse(JSON.stringify(defaultUsers))
      wx.setStorageSync('lucyUsers', users)
    }
    return users
  },

  getUsers() {
    return wx.getStorageSync('lucyUsers') || this.initUsers()
  },

  saveUsers(users) {
    wx.setStorageSync('lucyUsers', users)
  },

  getUserByAccount(account) {
    return this.getUsers().find(u => u.account === account) || null
  },

  /** 更新用户信息（account 不可改，role 不可改） */
  updateUser(account, updates) {
    const users = this.getUsers()
    const idx = users.findIndex(u => u.account === account)
    if (idx === -1) return false
    const safe = { ...updates }
    delete safe.account
    delete safe.role
    users[idx] = { ...users[idx], ...safe }
    this.saveUsers(users)
    return true
  },

  /** 修改密码：需要验证旧密码 */
  changePassword(account, oldPassword, newPassword) {
    const user = this.getUserByAccount(account)
    if (!user || user.password !== oldPassword) return false
    return this.updateUser(account, { password: newPassword })
  },

  /* ---- Session 管理 ---- */

  restoreSession() {
    const session = wx.getStorageSync('lucySession')
    if (session && session.account) {
      const user = this.getUserByAccount(session.account)
      if (user) {
        this.globalData.role = user.role
        return user
      }
    }
    this.globalData.role = ''
    wx.removeStorageSync('lucySession')
    return null
  },

  getSession() {
    return wx.getStorageSync('lucySession') || null
  },

  setSession(user) {
    const session = { account: user.account, role: user.role }
    wx.setStorageSync('lucySession', session)
    this.globalData.role = user.role
  },

  clearSession() {
    wx.removeStorageSync('lucySession')
    this.globalData.role = ''
  },

  getCurrentUser() {
    const session = this.getSession()
    if (!session) return null
    return this.getUserByAccount(session.account)
  },

  /* ---- 角色管理 ---- */

  getRole() {
    return this.globalData.role
  },

  isStudent() {
    return this.globalData.role === 'student'
  },

  isTeacher() {
    return this.globalData.role === 'teacher'
  },

  logout() {
    this.clearSession()
  },

  /* ---- 课文数据（共享） ---- */

  loadLessons() {
    if (this.globalData._lessonsLoaded) return this.globalData.lessons
    const stored = wx.getStorageSync('lucyLessons')
    if (stored && stored.length) {
      this.globalData.lessons = stored
    } else {
      this.globalData.lessons = JSON.parse(JSON.stringify(defaultLessons))
      this.saveLessons()
    }
    this.globalData._lessonsLoaded = true
    return this.globalData.lessons
  },

  getLessons() {
    if (!this.globalData._lessonsLoaded) return this.loadLessons()
    return this.globalData.lessons
  },

  saveLessons() {
    wx.setStorageSync('lucyLessons', this.globalData.lessons)
  },

  addLesson(lesson) {
    this.globalData.lessons.unshift(lesson)
    this.saveLessons()
  },

  updateLesson(id, updates) {
    const idx = this.globalData.lessons.findIndex((l) => l.id === id)
    if (idx === -1) return false
    this.globalData.lessons[idx] = { ...this.globalData.lessons[idx], ...updates }
    this.saveLessons()
    return true
  },

  deleteLesson(id) {
    const idx = this.globalData.lessons.findIndex((l) => l.id === id)
    if (idx === -1) return false
    this.globalData.lessons.splice(idx, 1)
    this.saveLessons()
    return true
  },

  /* ---- 学习状态 ---- */

  getStudyState() {
    if (!this.globalData.study) {
      this.globalData.study = normalizeStudyState(wx.getStorageSync('lucyStudyState'))
    }
    return this.globalData.study
  },

  saveStudyState() {
    wx.setStorageSync('lucyStudyState', this.globalData.study)
  },

  resetDailyTasks() {
    const study = this.getStudyState()
    const today = getDateKey()
    if (study.taskDate !== today) {
      study.completedTasks = {}
      study.taskDate = today
      this.saveStudyState()
    }
  },

  syncTimerWithToday() {
    const study = this.getStudyState()
    const record = ensureDayRecord(study, getToday().key)
    study.timer = study.timer || {}
    study.timer.total_time = record.totalSeconds
    study.timer.count_time = Math.min(Number(study.timer.count_time || ACTIVE_WINDOW_SECONDS), ACTIVE_WINDOW_SECONDS)
    study.timer.pause_if = study.timer.pause_if !== false
    this.saveStudyState()
  },

  startStudyTimer() {
    if (this.globalData.studyTimerId) return
    this.globalData.studyTimerId = setInterval(() => this.tickStudyTimer(), 1000)
  },

  stopStudyTimer() {
    if (!this.globalData.studyTimerId) return
    clearInterval(this.globalData.studyTimerId)
    this.globalData.studyTimerId = null
  },

  tickStudyTimer() {
    const study = this.getStudyState()
    const record = ensureDayRecord(study, getToday().key)
    const timer = study.timer

    if (!timer || timer.pause_if) {
      this.stopStudyTimer()
      return
    }

    if (timer.count_time >= ACTIVE_WINDOW_SECONDS) {
      timer.count_time = ACTIVE_WINDOW_SECONDS
      timer.total_time = record.totalSeconds
      timer.pause_if = true
      this.saveStudyState()
      this.stopStudyTimer()
      return
    }

    record.totalSeconds += 1
    record.updatedAt = Date.now()
    timer.total_time = record.totalSeconds
    timer.count_time = Math.min(timer.count_time + 1, ACTIVE_WINDOW_SECONDS)

    if (timer.count_time >= ACTIVE_WINDOW_SECONDS) {
      timer.pause_if = true
      this.stopStudyTimer()
    }

    this.saveStudyState()
  },

  recordKnowledgeInteraction(knowledge = {}) {
    const study = this.getStudyState()
    const today = getToday()
    const record = ensureDayRecord(study, today.key)
    const text = String(knowledge.text || knowledge.knowledgeText || knowledge.id || '').trim()
    const key = normalizeKnowledgeKey(knowledge.id || text)

    record.interactions += 1
    record.updatedAt = Date.now()

    if (key && !record.knowledgeMap[key]) {
      record.knowledgeMap[key] = text || key
    }

    study.timer = {
      total_time: record.totalSeconds,
      count_time: 0,
      pause_if: false
    }

    this.saveStudyState()
    this.startStudyTimer()
    return study
  },

  recordStudy(minutes = 1, knowledge = '') {
    const study = this.getStudyState()
    const record = ensureDayRecord(study, getToday().key)
    const seconds = Math.max(0, Number(minutes || 0) * 60)
    const key = normalizeKnowledgeKey(knowledge)

    record.totalSeconds += seconds
    record.updatedAt = Date.now()
    if (key && !record.knowledgeMap[key]) record.knowledgeMap[key] = knowledge

    study.timer.total_time = record.totalSeconds
    this.saveStudyState()
    return study
  },

  getDailyStats(dateKey = getDateKey()) {
    const study = this.getStudyState()
    const record = ensureDayRecord(study, dateKey)
    const knowledge = Object.values(record.knowledgeMap || {})
    return {
      dateKey,
      totalSeconds: record.totalSeconds,
      knowledge,
      knowledgeCount: knowledge.length
    }
  },

  getMonthlyStats(year, month) {
    const study = this.getStudyState()
    const monthKey = getMonthKey(year, month)
    const uniqueKnowledge = {}
    let totalSeconds = 0
    let studyDays = 0

    Object.keys(study.dailyRecords || {}).forEach((dateKey) => {
      if (!dateKey.startsWith(monthKey)) return
      const record = normalizeDayRecord(dateKey, study.dailyRecords[dateKey])
      const knowledgeMap = record.knowledgeMap || {}
      const knowledgeCount = Object.keys(knowledgeMap).length

      totalSeconds += record.totalSeconds
      if (record.totalSeconds > 0 || knowledgeCount > 0) studyDays += 1
      Object.keys(knowledgeMap).forEach((key) => {
        uniqueKnowledge[key] = knowledgeMap[key]
      })
    })

    return {
      monthKey,
      totalSeconds,
      studyDays,
      knowledgeCount: Object.keys(uniqueKnowledge).length
    }
  },

  getAllKnowledge() {
    const study = this.getStudyState()
    const allMap = {}
    Object.keys(study.dailyRecords || {}).forEach((dateKey) => {
      const record = study.dailyRecords[dateKey]
      const km = record.knowledgeMap || {}
      Object.keys(km).forEach((key) => {
        if (!allMap[key]) allMap[key] = km[key]
      })
    })
    return Object.keys(allMap)
      .map((key) => allMap[key])
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  },

  addPoints(points) {
    const study = this.getStudyState()
    study.totalEarned += points
    study.points = study.totalEarned - study.totalSpent
    this.saveStudyState()
    return study.points
  },

  spendPoints(points) {
    const study = this.getStudyState()
    if (study.points < points) return false
    study.totalSpent += points
    study.points = study.totalEarned - study.totalSpent
    this.saveStudyState()
    return true
  }
})
