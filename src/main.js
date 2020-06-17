import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from 'moment';
import {
  ValidationObserver, ValidationProvider, extend, localize,
} from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;

Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VueSweetalert2);
Vue.use(Snotify);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', zhTW);

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
