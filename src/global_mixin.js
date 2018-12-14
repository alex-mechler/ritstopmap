import axios from 'axios';
import config from './config'

axios.defaults.baseURL = config.api_root;

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
