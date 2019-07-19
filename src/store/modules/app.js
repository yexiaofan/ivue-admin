const app = {
  state: {
    menuList: [],
    menuListMap: {}, // 将每个路径对title进行映射
    pageOpenedList: [{
      title: '首页',
      name: 'home',
      selected: true
    }],
    currentPath: ['首页'],
    currentMenuOpenNames: []
  },
  mutations: {
    // 设置左侧菜单数据
    setMenuList (state, menus) {
      state.menuList = state.menuList.concat(menus)
    },
    // 设置PageOpenedList数据
    setPageOpenedList (state, params = null) {
      // 设置前先读取本地保存的打开列表数据
      state.pageOpenedList = sessionStorage.pageOpenedList
        ? JSON.parse(sessionStorage.pageOpenedList) : [{
          title: '首页',
          name: 'home',
          selected: true
        }]
      if (!params) {
        return
      }
      if (params.index === -1) {
        // 新打开一个页面
        state.pageOpenedList.push({
          title: params.route.meta.title,
          name: params.route.name,
          selected: false
        })
        params.index = state.pageOpenedList.length - 1
      }
      // 更新selected值
      for (let i = 0; i < state.pageOpenedList.length; i++) {
        if (params.index === i) {
          state.pageOpenedList[i].selected = true
        } else {
          state.pageOpenedList[i].selected = false
        }
      }
      // 更新下本地新的打开页面列表数据
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 移除PageOpenedList
    removePageOpenedList (state, params = null) {
      if (!params) {
        return
      }
      if (typeof params.action === 'number') {
        state.pageOpenedList.splice(params.action, 1)
      } else {
        state.pageOpenedList = [{
          title: '首页',
          name: 'home',
          selected: true
        }]
        if (params.action === 'closeOthers') {
          state.pageOpenedList[0].selected = false
          state.pageOpenedList.push({
            title: params.route.meta.title,
            name: params.route.name,
            selected: true
          })
        }
      }
      // 更新下本地新的打开页面列表数据
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 设置当前header上面包屑路径
    setCurrentPath (state, currentPathArr = []) {
      state.currentPath = ['首页']
      state.currentPath = state.currentPath.concat(currentPathArr)
    },
    // 设置当前左侧菜单的openNames属性
    setCurrentMenuOpenNames (state, name = false) {
      state.currentMenuOpenNames = []
      if (name !== false) {
        state.currentMenuOpenNames.push(name)
      }
    }
  },
  actions: {}
}

export default app
