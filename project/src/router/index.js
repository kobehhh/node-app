import Vue from 'vue'
import Router from 'vue-router'
import { RouterMap } from './menu.js'

Vue.use(Router)
const VueRouter = new Router({
  routes:RouterMap,
  mode:'history'
})
export default VueRouter