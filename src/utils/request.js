import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 根据后端返回的状态码判断请求是否成功
    if (res.code && res.code !== 200) {
      console.error('接口返回错误:', res.message || '未知错误')
      return Promise.reject(new Error(res.message || '未知错误'))
    } else {
      return res
    }
  },
  error => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

export default service
