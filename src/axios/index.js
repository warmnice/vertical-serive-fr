import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})
export default instance
