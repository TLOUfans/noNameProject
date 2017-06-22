import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import table from '@/components/table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: register
    }, {
      path: '/table',
      name: 'table',
      component: table
    }
  ]
})
