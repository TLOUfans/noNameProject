'use strict'

const model = require('../database/model.js')

let User = model('users');

const addUser = async function (ctx) {
  let data = ctx.request.body
  let addUser = new User({
    code: data.code,
    name: data.name,
    password: data.password,
    regDate: new Date()
  })
  let result = await addUser.save().catch(err => err)
  ctx.body = {
    success: true,
    info: result
  }
}

module.exports = {
  addUser
}
