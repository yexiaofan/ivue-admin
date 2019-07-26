import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App.vue'
import util from './util/util'
import router from './router/router'
import store from './store/store'
import VueI18n from 'vue-i18n'
import localeI18n from './i18n/index'

Vue.config.productionTip = false
Vue.prototype.$util = util

Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => {}

const i18n = new VueI18n(localeI18n)

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 判断的当前窗口是新打开
  }
}).$mount('#app')

export default vm

const newRoutes = [
  {
    name: '1',
  },
  {
    name: '2',
    children: [
      {
        name: '3',
      }
    ]
  },
  {
    name: '4',
    children: [
      {
        name: '5',
      },
      {
        name: '6',
      },
      {
        name: '7',
      }
    ]
  }
]

const oldRoutes = [
  {
    name: '1',
  },
  {
    name: '2',
    children: [
      {
        name: '3',
      }
    ]
  },
  {
    name: '4',
    children: [
      {
        name: '5',
      },
      {
        name: '6',
      },
      {
        name: '7',
      }
    ]
  }
]

console.log(util.martchRoutes(newRoutes, oldRoutes))