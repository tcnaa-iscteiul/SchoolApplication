import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';
import Config from '../util/Config';

const api = axios.create({
    baseURL: `${Config.API_URL}`,
    headers: {
<<<<<<< HEAD
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie("token"),
        withCredentials: true,
        mode: 'no-cors',
    }
});

const options = {
    method: 'GET',
    url: `${Config.API_URL}user/all`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie("token"),
        withCredentials: true,
        mode: 'no-cors',
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
=======
        Accept: 'application/json',
        Authorization: 'Bearer ' + getCookie("token"),
    }
>>>>>>> 4a6c8d4799045593ee341f8b33acbde78c9de8f0
});


// For GET requests
api.interceptors.request.use(
<<<<<<< HEAD

    async (config) => {
        // Add configurations here
        config.headers!["Authorization"] = 'Bearer ' + getCookie("token");
        //  config.headers!['content - type'] = 'application/x-www-form-urlencoded';
=======
    async (config) => {
        // Add configurations here
        config.headers!["Authorization"] = 'Bearer ' + getCookie("token");
>>>>>>> 4a6c8d4799045593ee341f8b33acbde78c9de8f0
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// For POST requests
api.interceptors.response.use(response => {
    return response
}, err => {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD

=======
>>>>>>> 4a6c8d4799045593ee341f8b33acbde78c9de8f0
        const originalReq = err.config;
        if (err.response.status === 401 && err.config && !err.config._retry) {
            originalReq._retry = true;
            const token = getCookie("token");
            if (token) {
                originalReq.headers!["Authorization"] = 'Bearer ' + getCookie("token");
                let res = api.put('token/refresh', { oldToken: token })
                    .then((res) => {
                        setCookie("token", res.data.accessToken);
                        originalReq.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                        return axios(originalReq);
                    })
                resolve(res)
            }
            else {
                reject(err)
            }
        } if (err.response.status === 408 || err.code === 'ECONNABORTED') {
            return Promise.reject(err);
        } else {
            reject(err)
        }


    })
})

export default api;