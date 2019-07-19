import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import util from './util/util'

Vue.config.productionTip = false
Vue.prototype.$util = util

Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
