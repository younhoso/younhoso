import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import mediaRouter from './media'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  ...mediaRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router