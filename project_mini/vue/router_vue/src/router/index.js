import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import mediaRouter from './media'
import historyRouter from './history'
import memberRouter from './member'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  ...mediaRouter,
  ...historyRouter,
  ...memberRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router