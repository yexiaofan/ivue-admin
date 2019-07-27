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
      console.log(this.state.app.menuList)
    },
    initUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {

  }
}

export default user
