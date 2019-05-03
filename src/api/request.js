import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
// create an axios instance
// axios.defaults.withCredentials = false;
const service = axios.create({
  withCredentials:false,
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 8000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.tokenCode == 5000) {
      Message({
        message: '请重新登录!',
        type: 'error',
        duration: 5 * 1000
      })
      localStorage.removeItem('ms_username');
      router.push('/login')
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })
function http(config){
  if(config.method.toLowerCase() === 'post'){
    config.data = qs.stringify(config.data,{arrayFormat: 'repeat',allowDots: true,allowDots: true});
  }else{
    config.params = config.data;
  }
  return service(config);
}

export default http;
