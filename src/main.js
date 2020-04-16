import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.component('Loading', Loading);

axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
      Accept: 'application/json',
    };
    return config;
  },
  (error) => Promise.reject(error),
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
