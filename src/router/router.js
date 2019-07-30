import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import { staticRoutes, staticMenuList } from './static-routes'
import util from '../util/util'
import store from '../store/store'
import getDynamicMenusRes from './dynamic-routes'

Vue.use(Router)

const routerConfig = {
  routes: [
    ...staticRoutes
  ]
}

const router = new Router(routerConfig)

export default router

router.beforeEach((to, from, next) => {
  // iview 加载进度条
  iView.LoadingBar.start()
  if ((from.path === '/' && !from.name && to.name !== 'login') || from.name === 'login') {
    // 页面刷新或第一次打开页面
    if (store.state.app.asyncRoutesCompleted) {
      next()
    } else {
      initSiderMenuAndAsyncRoutes(to, next)
    }
  } else {
    // 检查当前的路由是否是可访问或是有效的路由
    if (util.canRouteAcccess(to.name, store.state.app.unaccessibleAcyncRoutes, store.state.app.acyncRoutes, staticRoutes)) {
      // 检查当前目标路由是否已添加
      next()
    } else {
      next('/404')
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
})

function initSiderMenuAndAsyncRoutes (to, next) {
  // 初始化静态路由菜单
  store.commit('setMenuList', staticMenuList)
  // 获取动态路由数据
  getDynamicMenusRes().then(res => {
    console.log(res)
    // 添加动态获取的菜单
    store.commit('setMenuList', res.menuList)
    // 添加动态路由
    store.commit('updateAppRouter', res.menuRoutes)
    if (to.name) {
      next()
    } else {
      next(router.resolve(to).route.fullPath)
    }
  }).catch(err => {
    console.log(err)
  })
}
