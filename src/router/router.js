import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import { staticRoutes, siderRoutes, staticMenuList } from './static-routes'
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
    // 检查当前的路由是否是动态路由且可访问
    if (util.canRouteAcccess(to.name, store.state.app.unaccessibleAcyncRoutes)) {
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
      next(to.path)
    }
  }).catch(err => {
    console.log(err)
  })
}
