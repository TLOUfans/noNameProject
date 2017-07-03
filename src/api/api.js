'use strict'

import axios from 'axios'

let base = ''

//注册
export const register = params => {
  return axios.post(`${base}/user/register`, params).then(res => res.data)
}

//登陆
export const login = params => {
  return axios.post(`${base}/user/login`, params).then(res => res.data)
}

//注销
export const logout = params => {
  return axios.post(`${base}/user/logout`, params).then(res => res.data)
}

//验证session
export const checkSession = params => {
  return axios.post(`${base}/user/checkSession`, params).then(res => res.data)
}

//用户列表
export const listUser = params => {
  return axios.post(`${base}/user/listUser`, params).then(res => res.data)
}

//删除用户
export const delUser = params => {
  return axios.post(`${base}/user/delUser`, params).then(res => res.data)
}
