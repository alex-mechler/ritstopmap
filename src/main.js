import Vue from 'vue'
import App from './App.vue'
import router from './router'
import popper from 'popper.js';
import jquery from 'jquery';
import axios from 'axios';

// Bootstrap
window.popper = popper;
window.$ = window.jQuery = jquery;
import 'bootstrap';

// App Styles
import './assets/style.scss';

// Axios
window.axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app');
