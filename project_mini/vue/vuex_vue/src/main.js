import Vue from 'vue';
import App from './App.vue';
import store from './store.js';
import '@/assets/styles/index.scss';

Vue.config.productionTip = false

export const EventBus = new Vue();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
