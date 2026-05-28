//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { reqLogin, reqUserInfo } from '@/api/user' //引入接口
import type { loginFormData, loginResponseData } from '@/api/user/types' //引入数据类型
import type { UserState } from './types/types'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', () => {
  //state 存储数据地方
  const userStateList: UserState = reactive({
    token: GET_TOKEN(),
    menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
    username: '',
    avatar: '',
  })

  //actions 异步||逻辑地方
  async function userLogin(data: loginFormData) {
    const result: loginResponseData = await reqLogin(data)
    if (result.code == 200) {
      //pinia仓库存储一下token
      //由于pinia|vuex存储数据其实利用js对象
      userStateList.token = result.data.token as string
      //本地存储持久化
      SET_TOKEN(result.data.token as string)
      //能保证当前async函数返回一个成功的promise
      return 'ok'
    } else {
      console.log(result.data.message)
      return Promise.reject(new Error(result.data.message))
    }
  }
  async function userInfo() {
    const result = await reqUserInfo()
    if (result.code == 200) {
      userStateList.username = result.data.checkUser.username
      userStateList.avatar = result.data.checkUser.avatar
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  }
  function userLogout() {
    userStateList.token = ''
    userStateList.username = ''
    userStateList.avatar = ''
    REMOVE_TOKEN()
  }

  //getter
  return { userStateList, userLogin, userInfo, userLogout }
})

//对外暴露获取小仓库方法
export default useUserStore
