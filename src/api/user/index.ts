//统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './types'

const API = {
  LOGING_URL: '/user/login',
  USERINFO_URL: '/user/info',
}

//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGING_URL, data)

export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)
