// 用户相关请求模块


import request from '@/utils/request'
// import store from '../store'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 发送验证码
export const sendsms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
        // /v1_0/sms/codes/:mobile
    })
}

export const getuserinfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // 该接口需要授权才能访问
        // headers: {
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
        // headers
    })
}

// 获取用户频道列表
export const getuserchannel = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
