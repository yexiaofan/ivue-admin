const user = {
  state: {
    userInfo: null
  },
  mutations: {
    logout (state) {
      // 清理账号
      this.state.app.menuList = []
      this.state.app.asyncRoutesCompleted = false
      state.userInfo = null
      localStorage.clear()
      sessionStorage.clear()
    },
    initUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {

  }
}

export default user
