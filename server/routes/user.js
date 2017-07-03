'use strict';

const user = require('../controllers/user.js')
const router = require('koa-router')()

router.post('/register', user.register)
router.post('/delUser', user.delUser)
router.post('/listUser', user.listUser)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.post('/checkSession', user.checkSession)
router.post('/getIdCode', user.getIdCode)

module.exports = router
