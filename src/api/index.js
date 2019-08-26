import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 1.配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.配置请求头
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  const status = err.response.status
  if (status === 401) {
    alert('登陆失效，请重新登陆！')
    store.delUser()
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
