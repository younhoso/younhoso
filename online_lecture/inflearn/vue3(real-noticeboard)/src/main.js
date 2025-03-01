import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue';

import dayjs from '@/plugins/dayjs.js';

import App from './App.vue';
import globalComponents from './plugins/global-components';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(globalComponents);
app.use(dayjs);
app.mount('#app');
