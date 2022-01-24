import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_NAME = "TOKEN_USER"

export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(TOKEN_NAME))
    user: getItem(TOKEN_NAME)// 利用封装好的本地存储模块的方法传参获取token数据
    // user: null
  },
  mutations: {
    stateUser(state, data) {
      //这个传来的参数就会是用户token
      state.user = data
      //为了token数据的持久化，防止被用户刷新掉
      // localStorage.setItem(TOKEN_NAME, JSON.stringify(state.user))
      setItem(TOKEN_NAME, state.user)// 利用封装好的本地存储模块的方法传参存储token数据
    }
  },
  actions: {
  },
  modules: {
  }
})
