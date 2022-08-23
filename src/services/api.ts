import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';
import Config from '../util/Config';

const api = axios.create({
    baseURL: `${Config.API_URL}`,
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getCookie("token"),
      
    } });

const options = {
    method: 'GET',
    url: `${Config.API_URL}user/all`,
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getCookie("token"),
    },
    data: {
        email: "admin@admin.pt",
        password: "Admin!123"
    }
};

axios.request(options).then(function (response) {
    //console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


// For GET requests
api.interceptors.request.use(
    
    async (config) => {
        // Add configurations here
        config.headers!["Authorization"] = 'Bearer ' + getCookie("token");
      //  config.headers!['content - type'] = 'application/x-www-form-urlencoded';
        return config;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
);

// For POST requests
api.interceptors.response.use(response => {
    return response
}, err => {
    return new Promise((resolve, reject) => {
       
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
                console.log("post");
                resolve(res)
            }
            else {
                reject(err)
            }
        }if (err.response.status === 408 || err.code === 'ECONNABORTED') {
            return Promise.reject(err);
        } else {
            reject(err)
        }
        
       
    })
})

export default api;
