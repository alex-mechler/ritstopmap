import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/api/";

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
