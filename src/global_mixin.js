import axios from 'axios';
import config from './config'

axios.defaults.baseURL = config.api_root;

axios.interceptors.response.use(response => {
    if (response.hasOwnProperty("data") && response.data.hasOwnProperty('err') && response.data.err === true) {
        return Promise.reject(response.data.hasOwnProperty('message') ? response.data.message : null)
    }

    return response;
}, error => {
    return Promise.reject(error);
});

export default {
    methods: {
        request(options) {
            if (options !== undefined) {
                return axios(options)
            }

            return axios
        }
    }
};
