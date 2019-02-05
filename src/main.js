import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global_mixin from './global_mixin'
import VueAnalytics from 'vue-analytics'
import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'
import Notifications from 'vue-notification'
import AuthManager from './auth/AuthManager'
import EventBus from './EventBus'
import LoadingIndicator from './components/LoadingIndicator'
import AsynchronousService from './support/AsynchronousService'
import VueClipboard from 'vue-clipboard2'

import './bootstrap'

// App Styles
import './assets/style.scss';

// BUG https://github.com/Leaflet/Leaflet/issues/4968
import {L} from 'vue2-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Global Configuration
import config from './config';
import Bottle from "bottlejs";
import UserPreferencesManager from "./preferences/UserPreferencesManager";
import QuestVisibilityManager from "./preferences/QuestVisibilityManager";

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

Vue.use(Notifications);

Vue.prototype.$auth = new AuthManager();

// Bugsnag
const bugsnagClient = bugsnag({
    apiKey: config.bugsnag_id,
    notifyReleaseStages: ['production'],
    releaseStage: config.environment,
    appVersion: config.version
});
bugsnagClient.use(bugsnagVue, Vue);
Vue.prototype.$bugsnag = bugsnagClient;

// Event Bus
Vue.prototype.$eventBus = EventBus;

// Vue Clipboard
Vue.use(VueClipboard)

// Service Container
const services = new Bottle();
Vue.prototype.$services = services;
services.factory('Preferences', AsynchronousService(UserPreferencesManager, 'Vue'));
services.factory('QuestVisibility', AsynchronousService(QuestVisibilityManager, 'Preferences'));

// Loading Component
Vue.component('LoadingIndicator', LoadingIndicator);

new Vue({
    router,
    beforeCreate() {
        console.log('oof');
        this.$services.factory('Vue', () => {
            return this;
        });
    },
    render: function (h) {
        return h(App)
    }
}).$mount('#app');