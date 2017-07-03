import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import register from '@/components/register'
import login from '@/components/login'
import user from '@/components/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '用户管理',
      component: home,
      iconCls: 'fa fa-users',
      leaf: true,
      type: 'admin',
      hideen: false,
      children: [
        {path: '/user', component: user, name: '用户管理', hidden: true}
      ]
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: login
    },
    {
      path: '/register',
      name: 'register',
      hidden: true,
      component: register
    }
  ]
})
