function computeNavMetrics() {
  try {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const screenWidth = systemInfo.screenWidth || 375
    const menuTop = menuButton.top || (statusBarHeight + 4)
    const menuHeight = menuButton.height || 32
    const menuBottom = menuButton.bottom || (menuTop + menuHeight)
    const menuRight = menuButton.right || (menuButton.left + menuButton.width)
    const baseHeight = menuBottom - statusBarHeight
    const extra = Math.ceil((23 * 1.2 + 6) * screenWidth / 750)
    const backLeftPx = screenWidth - menuRight
    return {
      top: statusBarHeight,
      center: menuTop + menuHeight / 2,
      height: baseHeight,
      heroHeight: menuBottom + extra,
      backLeft: Math.round(backLeftPx * 750 / screenWidth)
    }
  } catch (e) {
    return { top: 20, center: 64, height: 44, heroHeight: 108, backLeft: 16 }
  }
}

module.exports = {
  computeNavMetrics
}
