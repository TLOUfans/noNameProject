'user strict'

const Koa = require('koa')
const koaRouter = require('koa-router')()
const path = require('path')
const serve = require('koa-static')
const session = require('koa-session2')

const user = require('./server/routes/user')

const app = new Koa()

app.use(require('koa-bodyparser')())
app.use(session({
  key: 'sessionId',
  maxAge: 50000000
}))

koaRouter.use('/user',user.routes())
app.use(koaRouter.routes())

app.listen(9999, () => {
  console.log('app start at port 9999')
});

module.exports = app
