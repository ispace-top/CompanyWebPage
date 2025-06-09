import axios from 'axios'

// 获取网站信息（对应服务端 /api/site-info 接口）
export const getSiteInfo = () => {
  return axios.get('/api/site-info')
}

// 获取公司信息（对应服务端 /api/company-info 接口）
export const getCompanyInfo = () => {
  return axios.get('/api/company-info')
}