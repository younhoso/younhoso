import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '@/views/LoginPage.vue'
import SignupPage from '@/views/SignupPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: '',
    component: SignupPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;