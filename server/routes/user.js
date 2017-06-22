'use strict';

const user = require('../controllers/user.js')
const router = require('koa-router')()

router.post('/register', user.register)
router.post('/delUser', user.delUser)
router.post('/listUser', user.listUser)
router.post('/login', user.login)

module.exports = router
