import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import { staticRoutes, siderRoutes } from './static-routes'
import store from '../store/store'
// import util from '../util/util'

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
  if (store.state.app.menuList.length === 0) {
    store.commit('setMenuList', siderRoutes.filter(item => {
      return item.children && item.children.length > 0
    }))
  }
  next()
})

router.afterEach(to => {
  iView.LoadingBar.finish()
})
