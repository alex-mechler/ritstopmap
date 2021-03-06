import axios from 'axios';
import config from './config'
import Vue from "vue";

const instance = axios.create();

instance.defaults.baseURL = config.api_root;
instance.defaults.timeout = 2500;

instance.interceptors.response.use(response => {
    if (response.hasOwnProperty("data") && response.data.hasOwnProperty('err') && response.data.err === true) {
        return Promise.reject(response.data.hasOwnProperty('message') ? response.data.message : null)
    }

    return response;
}, error => {
    return Promise.reject(error);
});

Vue.prototype.$http = options => {
    if (options !== undefined) {
        return instance(options)
    }

    return instance
};

export default {
    methods: {
        request(options) {
            // Maintained for legacy purposes
            return this.$http(options);
        }
    }
};
