import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'
// import store from '@/store/index';
// import { Message } from 'view-design'

const statusMes = {
  400:'请求错误(400)',
  401:'未授权，请重新登录(401)',
  403:'拒绝访问(403)',
  404:'请求出错(404)',
  408:'请求超时(408)',
  500:'服务器错误(500)',
  501:'服务未实现(501)',
  502:'网络错误(502)',
  503:'服务不可用(503)',
  504:'网络超时(504)',
  505:'HTTP版本不受支持(505)',
  default:"连接出错"
}
const showStatus = (status) => {
  return statusMes[status] || statusMes['default']
}

const service = axios.create({
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  baseURL:'/api',
  withCredentials: true,
  //超时时间
  timeout:5000,
  //请求次数
  retry:4,
  //请求间隔
  retryDelay:1000,
  // 在向服务器发送请求前，序列化请求数据
  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

// 请求拦截器
service.interceptors.request.use(    
  config => {        
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token =  Cookies.get('user-token')
    token && (config.headers.Authorization = token)    
    return config
  },    
  error => {        
    return Promise.error(error)  
  } )

service.interceptors.response.use(res => {
  const resStatus = res.data.status
  //判断token失效情况
  if(resStatus == 401) {
    setTimeout(() => {
      router.push({path:'/login'})
    },200)
  }
  //提示信息交到业务代码处理
  return res
},error => {
  if(error.status) {
    // 请求已发出，但是不在2xx的范围
    Vue.prototype.$Message.error(showStatus(500))
  }else {
    //断网重连
    //有bug 无法读取到retry，以及每次重新都是新建了service导致无法记录重连次数
    let config = error.config
    if(!config || !config.retry) {
      return Promise.reject(error)
    }
    config.__retryCount = config.__retryCount || 0
    console.log(config.__retryCount,config.retry)
    if(config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err)
    }
  
    // Increase the retry count
    config.__retryCount += 1
    console.log(config.__retryCount)
    // Create new promise to handle exponential backoff
    var backoff = new Promise((resolve) => {
        setTimeout(function() {
            resolve()
        }, config.retryDelay || 1)
    })
    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => {
      console.log(config)
      return service(config)
    })
  }

  // return error
  // const resCode = error.status
  // showStatus(resCode)
  // switch (resCode) {
  //   // 401：未登录
  //   case 401:
  //     // 跳转登录页
  //     router.replace({
  //       path: '/login',
  //       query: {
  //         redirect: router.currentRoute.fullPath
  //       }
  //     })
  //     break
  //   // 403: token过期
  //   case 403:
  //     // 弹出错误信息
  //     Message.eeror({
  //       type: 'error',
  //       message: '登录信息过期，请重新登录'
  //     })
  //     // 清除token
  //     localStorage.removeItem('token')
  //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
  //     setTimeout(() => {
  //       router.replace({
  //         path: '/login',
  //         query: {
  //           redirect: router.currentRoute.fullPath
  //         }
  //       })
  //     }, 1000)
  //     break
  //   // 404请求不存在
  //   case 404:
  //     Message.eeror({
  //       message: '网络请求不存在',
  //       type: 'error'
  //     })
  //     break
  //   // 其他错误，直接抛出错误提示
  //   default:
  //     Message.eeror({
  //       message: error.response.data.message,
  //       type: 'error'
  //     })
  // }
})

export default service