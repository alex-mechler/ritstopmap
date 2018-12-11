import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global_mixin from './global_mixin'
import VueAnalytics from 'vue-analytics'
import './bootstrap'

// App Styles
import './assets/style.scss';

// BUG https://github.com/Leaflet/Leaflet/issues/4968
import { L } from 'vue2-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Global Configuration
import config from './config';
Vue.prototype.$config = config;

Vue.config.productionTip = false;


Vue.mixin(global_mixin);

Vue.use(VueAnalytics, {
    id: config.tracking_id,
    router,
    debug: {
        sendHitTask: config.environment === 'production'
    }
});

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app');
