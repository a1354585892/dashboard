import axios from 'axios'

// 全局标志，防止重复处理401错误
let isHandling401 = false

// 特殊处理函数 - 401未授权处理
function handle401Unauthorized(error) {
  console.log('401 未授权访问:', error)
  // TODO: 在这里添加401状态码的特殊处理逻辑
  // 例如：跳转到登录页面、清除token、显示登录弹窗等

  // 示例处理逻辑（可根据实际需求修改）:
  // 1. 清除本地存储的token
  // localStorage.removeItem('token')
  // sessionStorage.removeItem('token')

  // 2. 跳转到登录页面
  // window.location.href = '/login'

  // 3. 或者显示登录弹窗
  // showLoginModal()

  return Promise.reject(error)
}

// 特殊处理函数 - 业务code码非0处理
function handleBusinessCodeError(code, message, response = null) {
  console.log(`业务错误 code: ${code}, message: ${message}`)
  
  // 处理401业务错误码
  if (code === 401 && !isHandling401) {
    isHandling401 = true
    console.log('401 啊 401');
    
    const baseApi = import.meta.env.VITE_APP_BASE_URL || '/api'
    const loginUrl = baseApi + '/#/login'
    // 打开新窗口
    window.open(loginUrl, '_blank')
    // 关闭当前页面
    // window.close()
    // 延迟重置标志，防止短时间内重复处理
    // setTimeout(() => {
    //   isHandling401 = false
    // }, 100)
    
    return Promise.reject(new Error('未授权访问，已跳转到登录页面'))
  }
  
  // TODO: 在这里添加其他业务code码非0的特殊处理逻辑
  // 例如：显示错误提示、特定错误码的特殊处理等

  // 示例处理逻辑（可根据实际需求修改）:
  // 1. 根据不同的code码进行不同处理
  // switch(code) {
  //   case 1001:
  //     // 处理特定业务错误
  //     break
  //   case 1002:
  //     // 处理另一种业务错误
  //     break
  //   default:
  //     // 通用错误处理
  //     break
  // }

  // 2. 显示错误提示
  // showErrorMessage(message)

  // 3. 记录错误日志
  // if (response) {
  //   logError({ code, message, response })
  // }

  return Promise.reject(new Error(message || '业务处理失败'))
}

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 15000
})

// 从Cookie中获取指定域名下的token
function getTokenFromCookie() {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'token') {
      return value
    }
  }
  return null
}

// 请求拦截器
service.interceptors.request.use(
  config => {

    // 从Cookie中获取.ssnj.com域名下的token
    const token = getTokenFromCookie()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // console.log(config, 'config')
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

    // 检查业务code码（假设成功的code为0）
    if (res.code !== undefined && res.code !== 0) {
      // 调用业务code码错误处理函数
      return handleBusinessCodeError(res.code, res.msg, response)
    }

    // 返回成功的数据
    return res
  },
  error => {
    console.error('响应错误:', error)

    // 检查HTTP状态码
    if (error.response) {
      const { status } = error.response

      // 处理401未授权状态码
      if (status === 401) {
        return handle401Unauthorized(error)
      }

      // 可以在这里添加其他状态码的处理
      // if (status === 403) {
      //   // 处理403禁止访问
      // }
      // if (status === 500) {
      //   // 处理500服务器错误
      // }
    }

    return Promise.reject(error)
  }
)

export default service
