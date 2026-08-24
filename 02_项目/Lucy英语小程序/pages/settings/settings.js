const app = getApp()

Page({
  data: {
    account: '',
    displayName: '',
    avatar: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },

  onLoad() {
    const user = app.getCurrentUser()
    if (!user) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1000)
      return
    }
    this.setData({
      account: user.account,
      displayName: user.displayName || '',
      avatar: user.avatar || ''
    })
  },

  onShow() {
    // 从设置页返回后可能更新了数据，重新加载
    const user = app.getCurrentUser()
    if (user) {
      this.setData({
        displayName: user.displayName || '',
        avatar: user.avatar || ''
      })
    }
  },

  /* ---- 头像 ---- */

  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const path = res.tempFilePaths[0]
        this.setData({ avatar: path })
      }
    })
  },

  /* ---- 修改显示名 ---- */

  updateDisplayName(e) {
    this.setData({ displayName: e.detail.value })
  },

  /* ---- 密码相关 ---- */

  updateOldPassword(e) {
    this.setData({ oldPassword: e.detail.value })
  },

  updateNewPassword(e) {
    this.setData({ newPassword: e.detail.value })
  },

  updateConfirmPassword(e) {
    this.setData({ confirmPassword: e.detail.value })
  },

  /* ---- 保存 ---- */

  saveProfile() {
    const { account, displayName, avatar, oldPassword, newPassword, confirmPassword } = this.data
    const updates = {}

    // 修改显示名
    const name = (displayName || '').trim()
    if (!name) {
      wx.showToast({ title: '用户名不能为空', icon: 'none' })
      return
    }
    updates.displayName = name

    // 修改密码
    if (newPassword || confirmPassword) {
      if (!oldPassword) {
        wx.showToast({ title: '请输入旧密码', icon: 'none' })
        return
      }
      if (newPassword !== confirmPassword) {
        wx.showToast({ title: '两次新密码不一致', icon: 'none' })
        return
      }
      if (newPassword.length < 4) {
        wx.showToast({ title: '密码至少4位', icon: 'none' })
        return
      }
    }

    // 保存头像
    if (avatar) {
      updates.avatar = avatar
      wx.setStorageSync('lucyAvatar', avatar)
    }

    // 保存用户信息
    const ok = app.updateUser(account, updates)
    if (!ok) {
      wx.showToast({ title: '保存失败', icon: 'none' })
      return
    }

    // 修改密码单独处理
    if (newPassword && oldPassword) {
      const pwdOk = app.changePassword(account, oldPassword, newPassword)
      if (!pwdOk) {
        wx.showToast({ title: '旧密码错误', icon: 'none' })
        return
      }
    }

    wx.showToast({ title: '保存成功', icon: 'success' })
    this.setData({ oldPassword: '', newPassword: '', confirmPassword: '' })

    // 如果 displayName 改了，触发页面更新
    const pages = getCurrentPages()
    if (pages.length > 1) {
      const prev = pages[pages.length - 2]
      if (prev && prev.checkLoginState) {
        prev.checkLoginState()
      }
    }
  },

  /* ---- 返回 ---- */

  goBack() {
    wx.navigateBack()
  }
})
