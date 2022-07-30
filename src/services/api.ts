import axios from 'axios';


const api = axios.create({ baseURL: 'http://localhost:3333/' });


/*
api.interceptors.request.use(async config => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    if (token&&config.headers) {
        config.headers.Authorization = `Bearer ${token}`;//intercepts the request,verifies if there is a token, add Header and sent request
    }
    return config;
});*/

export default api;