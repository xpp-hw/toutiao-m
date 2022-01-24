/**
 * 封装本地存储模块
 *  **/

//存储数据
export const setItem = (key, data) => {
    // if (typeof data === 'object') {
    //     data = JSON.stringify(data)
    // }两种判断数据类型的方式
    if (data instanceof Object) {
        data = JSON.stringify(data)
    }
    window.localStorage.setItem(key, data)
}

//获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {//判断json格式字符串较麻烦，我也不会，用捕获来在此作为判断，进try成功转换对象及返回，
        //失败则进catch并直接返回数据
        return JSON.parse(data)
    }
    catch (e) {
        return data
    }
}

//删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}