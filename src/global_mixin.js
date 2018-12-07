import axios from 'axios';

axios.defaults.baseURL = "https://pokes.top/api/";

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
