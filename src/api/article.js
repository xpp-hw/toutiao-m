// 文章获取请求模块

import request from '@/utils/request'

// 获取新闻文章推荐
export const getarticlelist = params => {
    return request({
        method: "GET",
        url: "/v1_0/articles",
        params
    })
}