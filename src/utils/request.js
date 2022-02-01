/**
 * yarn add axios
 * 封装 axios 请求模块
 * 方式二
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    // baseURL: "http://toutiao-app.itheima.net/"
    baseURL: "http://toutiao.itheima.net"
    // http://toutiao.itheima.net/api.html
})
//请求拦截器
request.interceptors.request.use(function (config) {
    // 请求会经过这里
    // config:本次请求的对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config);
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器

export default request

// - 方式一（简单方便，但是不利于接口维护）：我们可以把请求对象挂载到 Vue.prototype 原型对象中，然后在组件中通过 this.xxx 直接访问
// - 方式二（推荐）：我们把每一个请求都封装成每个独立的功能函数，在需要的时候加载调用，这种做法更便于接口的管理和维护