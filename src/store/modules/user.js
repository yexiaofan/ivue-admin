const user = {
  state: {
    userInfo: null
  },
  mutations: {
    logout (state) {
      // 清理账号
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

export default app
