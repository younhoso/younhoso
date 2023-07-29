import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue';
import User from '../views/User.vue';

const CareerView = () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/CareerView.vue')
const IntendView = () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/IntendView.vue')
const DataBindingSelectView = () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingSelectView.vue')
const DataBindingCheckboxView = () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingCheckboxView.vue')
const DataBindingRadioView = () => import(/* webpackChunkName: "career", webpackPrefetch: true */ '../views/DataBindingRadioView.vue')
const UserDetail = () => import(/* webpackChunkName: "userdetail", webpackPrefetch: true */ '../views/UserDetail.vue')
const UserEdit = () => import(/* webpackChunkName: "useredit", webpackPrefetch: true */ '../views/UserEdit.vue')


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/career',
    name: 'career',
    component: CareerView
  },
  {
    path: '/intend',
    name: 'intend',
    component: IntendView
  },
  {
    path: '/select',
    name: 'select',
    component: DataBindingSelectView
  },
  {
    path: '/check',
    name: 'check',
    component: DataBindingCheckboxView
  },
  {
    path: '/radio',
    name: 'radio',
    component: DataBindingRadioView
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      {
        path: ':id',
        name: 'user-detail',
        component: UserDetail
      },
      {
        path: ':id/edit',
        name: 'user-edit',
        component: UserEdit
      },
    ]
  }

]

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
