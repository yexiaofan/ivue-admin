import router from '../../router/router'
import util from '../../util/util'
const app = {
  state: {
    menuList: [],
    pageOpenedList: [{
      title: '首页',
      name: 'home',
      selected: true
    }],
    currentPath: ['首页'],
    currentMenuOpenNames: [],
    asyncRoutesCompleted: false, // 是否添加过动态路由数据
    acyncRoutes: [],
    unaccessibleAcyncRoutes: []
  },
  mutations: {
    // 添加动态路由
    updateAppRouter (state, routes) {
      // 过滤acyncRoutes，防止添加重复数据，删除已不存在的数据
      let tempRoutes = []
      if (state.acyncRoutes.length === 0) {
        tempRoutes = routes
        state.acyncRoutes = routes
      } else {
        // 过滤已经存在的路由
        tempRoutes = util.martchRoutes(routes, state.acyncRoutes)
        // 保存已添加但是不可访问的路由数据
        state.unaccessibleAcyncRoutes = util.martchRoutes(state.acyncRoutes, routes)
        // 将新的路由进行合并
        tempRoutes.forEach(route => {
          if (route.children) {
            for (let i = 0; i < state.acyncRoutes.length; i++) {
              if (route.name === state.acyncRoutes[i].name) {
                state.acyncRoutes[i].children.concat(route.children)
                break
              }
              if (i === state.acyncRoutes.length - 1) {
                state.acyncRoutes.push(route)
              }
            }
          } else {
            state.acyncRoutes.push(route)
          }
        })
      }
      router.addRoutes(tempRoutes)
      state.asyncRoutesCompleted = true
    },
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
    setCurrentMenuOpenNames (state, routeMatched) {
      if (routeMatched.length === 0 || typeof routeMatched[0] === 'string') {
        state.currentMenuOpenNames = routeMatched
      } else {
        state.currentMenuOpenNames = []
        for (const menu of state.menuList) {
          if (menu.name === routeMatched[0].name) {
            state.currentMenuOpenNames.push(menu.name)
            if (routeMatched[1].meta.parentName) {
              state.currentMenuOpenNames.push(routeMatched[1].meta.parentName)
            }
            break
          }
        }
      }
    }
  },
  actions: {}
}

export default app
