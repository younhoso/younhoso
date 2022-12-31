import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  },
  {
    path: '/career',
    name: 'career',
    component: () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/CareerView.vue')
  },
  {
    path: '/intend',
    name: 'intend',
    component: () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/IntendView.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingSelectView.vue')
  },
  {
    path: '/check',
    name: 'check',
    component: () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingCheckboxView.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingRadioView.vue')
  }
]

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
