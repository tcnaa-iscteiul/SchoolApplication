import axios from 'axios'
import { getCookie, setCookie } from 'typescript-cookie'
import store from '../store'
import { authActions } from '../store/auth-slice'
import Config from '../util/Config'

const api = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getCookie('token')}`,
  },
})

// For GET requests
api.interceptors.request.use(
  config => {
    // Add configurations here
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getCookie('token')}`
      return config
    }
  },
  err => Promise.reject(err),
)
const { dispatch } = store
// For POST requests
api.interceptors.response.use(
  response => response,
  err =>
    new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status === 401 && err.config && !err.config._retry) {
        originalReq._retry = true
        const token = getCookie('token')
        if (token) {
          if (originalReq.headers) {
            originalReq.headers.Authorization = `Bearer ${getCookie('token')}`
          }
          const res = api.put(`${Config.API_URL}token/refresh`, { oldToken: token }).then(res => {
            setCookie('token', res.data.accessToken)
            originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`
            return axios(originalReq)
          })
          resolve(res)
        } else {
          reject(err)
          dispatch(authActions.logout())
        }
      }
      if (err.response.status === 408 || err.code === 'ECONNABORTED') {
        dispatch(authActions.logout())
        return Promise.reject(err)
      }
      const token = getCookie('token')
      if (!token) {
        dispatch(authActions.logout())
      }
      reject(err)
    }),
)

export default api
