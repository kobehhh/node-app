import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
// plugins iview
import './plugins/iview'

import { Message } from 'view-design'
Vue.prototype.$Message = Message

Vue.config.productionTip = false

// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
