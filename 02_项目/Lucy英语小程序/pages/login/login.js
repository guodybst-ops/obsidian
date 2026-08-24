const app = getApp()

Page({
  data: {
    isLoggedIn: false,
    currentUser: null,

    // 登录表单
    selectedRole: 'student',
    account: '',
    password: ''
  },

  onShow() {
    this.checkLoginState()
  },

  checkLoginState() {
    const user = app.getCurrentUser()
    if (user) {
      this.setData({
        isLoggedIn: true,
        currentUser: { ...user },
        account: '',
        password: ''
      })
    } else {
      this.setData({
        isLoggedIn: false,
        currentUser: null
      })
    }
  },

  /* ---- 登录 ---- */

  switchRole(event) {
    const role = event.currentTarget.dataset.role
    this.setData({ selectedRole: role, account: '', password: '' })
  },

  updateAccount(event) {
    this.setData({ account: event.detail.value })
  },

  updatePassword(event) {
    this.setData({ password: event.detail.value })
  },

  doLogin() {
    const { account, password } = this.data
    const acc = (account || '').trim()
    if (!acc) {
      wx.showToast({ title: '请输入账号', icon: 'none' })
      return
    }
    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return
    }

    const user = app.getUserByAccount(acc)
    if (!user || user.password !== password) {
      wx.showToast({ title: '账号或密码错误', icon: 'none' })
      return
    }

    app.setSession(user)
    this.checkLoginState()

    // 更新头像（兼容旧版 lucyAvatar）
    if (user.avatar) {
      wx.setStorageSync('lucyAvatar', user.avatar)
    }
  },

  /* ---- 退出 ---- */

  doLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.checkLoginState()
        }
      }
    })
  },

  /* ---- 设置 ---- */

  goSettings() {
    wx.navigateTo({ url: '/pages/settings/settings' })
  }
})
