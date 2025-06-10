import axios from 'axios'

// 创建axios实例
const api = axios.create()

// 请求拦截器
api.interceptors.request.use(config => {
  console.log(`[API] 请求: ${config.method.toUpperCase()} ${config.url}`)
  return config
})

// 响应拦截器
api.interceptors.response.use(response => {
  console.log(`[API] 响应: ${response.status} ${response.config.url}`)
  return response
}, error => {
  console.error(`[API] 错误: ${error.message} ${error.config.url}`)
  return Promise.reject(error)
})

// 导出API方法
export const getSiteInfo = () => api.get('/api/site-info')
export const getCompanyInfo = () => api.get('/api/company-info')
export const checkInitialized = () => api.get('/api/check-initialized')