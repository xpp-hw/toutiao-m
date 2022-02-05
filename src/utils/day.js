import Vue from 'vue'
import dayjs from "dayjs"
import 'dayjs/locale/zh-cn'// 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)// 配置使用处理相对时间的插件

dayjs.locale('zh-cn') // 配置使用中文语言包,全局使用

// dayjs默认语言是英文，我们这里配置中文

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

