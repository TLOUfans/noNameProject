'use strict'

const model = require('../database/model.js')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const util = require('../util/util.js')

const User = model('users')

//添加用户
const register = async function (ctx) {
  const data = ctx.request.body
  //判断用户名、密码、昵称不能为空
  if (!data.code || !data.password || !data.name) {
    ctx.body = {
      success: false,
      info: '用户名、密码、昵称不能为空'
    }
    return
  }
  //判断是否有重复的用户名
  const sameUser = await User.findOne({
    code: data.code
  })
  if (sameUser) {
    ctx.body = {
      success: true,
      info: `${sameUser.code}已经存在`
    }
    return
  } else {
    const addUser = new User({
      code: data.code,
      name: data.name,
      password: data.password,
      regDate: new Date()
    })
    const result = await addUser.save().catch(err => err)
    ctx.body = {
      success: true,
      info: result
    }
  }
}

//删除用户
const delUser = async function (ctx) {
  const data = ctx.request.body
  const id = data.id
  const result = await User.findByIdAndRemove(id).catch(err => err)
  if (result) {
    ctx.body = {
      success: true,
      info: `成功删除账户${result.code}:${result.name}`
    }
  } else {
    ctx.body = {
      success: false,
      info: `该用户不存在`
    }
  }
}

//分页查询用户
const listUser = async function (ctx) {
  const data = ctx.request.body
  const index = data.index || 1
  const size = data.size || 10
  let filter = {}
  _.forEach(data, (v, k) => {
    if (!v) return
    switch (typeof v) {
      case 'string':
        filter[k] = {
          $regex: new RegExp(v, 'i')
        }
        break
      case 'object':
        if (v[0] && v[1]) {
          filter[k] = {
            '$gt': v[0],
            '$lt': v[1]
          }
        }
        break
    }
  })
  const result = await User.findByPage(index, size, filter, {}).catch(err => err)
  ctx.body = result
}

//登陆
const login = async function (ctx) {
  const data = ctx.request.body
  const code = data.code
  const password = data.password
  const userInfo = await User.findOne({
    code: code
  }).catch(err => err)
  if (userInfo) {
    if (userInfo.password != password) {
      ctx.body = {
        success: false,
        info: '密码错误'
      }
    } else {
      const userToken = {
        id: userInfo.id,
        code: userInfo.code,
        name: userInfo.name
      }
      const secret = 'power-nanjin'
      ctx.session.user = userToken
      const token = jwt.sign(userToken, secret)
      ctx.session.token = token
      ctx.body = {
        success: true,
        info: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '该用户不存在'
    }
  }
}

//注销
const logout = async function(ctx) {
  ctx.session.token = null
  ctx.session.user = null
  ctx.body = {
    success: true,
    info: '注销成功'
  }
}

//获取session
const checkSession = async function(ctx) {
  const token = ctx.session.token
  const user = ctx.session.user
  ctx.body = {
    success: true,
    info: {
      token: token,
      user: user
    }
  }
}

//获取验证码
const getIdCode = async function(ctx) {
  let code = util.idCode()
  ctx.body = {
    succss: true,
    info: code
  }
}

module.exports = {
  register,
  delUser,
  listUser,
  login,
  logout,
  checkSession,
  getIdCode
}
