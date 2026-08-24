Component({
  properties: {
    active: {
      type: String,
      value: 'knowledge'
    }
  },

  data: {
    tabs: []
  },

  attached() {
    this.updateTabs()
  },

  observers: {
    'active': function () {
      this.updateTabs()
    }
  },

  pageLifetimes: {
    show() {
      this.updateTabs()
    }
  },

  methods: {
    updateTabs() {
      const app = getApp()
      const role = app.getRole()
      const hasSession = !!app.getSession()
      const loginText = hasSession ? '我的' : '登录'

      if (role === 'student') {
        this.setData({
          tabs: [
            { key: 'knowledge', text: '知识点', url: '/pages/knowledge/knowledge' },
            { key: 'calendar', text: '学习日历', url: '/pages/calendar/calendar' },
            { key: 'rewards', text: '积分库', url: '/pages/rewards/rewards' },
            { key: 'login', text: loginText, url: '/pages/login/login' }
          ]
        })
      } else if (role === 'teacher') {
        this.setData({
          tabs: [
            { key: 'lessons', text: '课文管理', url: '/pages/manage/lessons' },
            { key: 'history', text: '学习记录', url: '/pages/manage/history' },
            { key: 'settings', text: '积分配置', url: '/pages/manage/settings' },
            { key: 'login', text: loginText, url: '/pages/login/login' }
          ]
        })
      } else {
        this.setData({
          tabs: [
            { key: 'login', text: loginText, url: '/pages/login/login' }
          ]
        })
      }
    },

    handleTap(event) {
      const { key, url } = event.currentTarget.dataset
      if (key === this.properties.active) return
      wx.redirectTo({ url })
    }
  }
})
