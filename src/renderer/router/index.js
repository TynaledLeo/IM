import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/loginPage/login').default
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'login',
      component: require('@/components/home/home').default
    },
    {
      path: '/reg',
      name: 'reg',
      component: require('@/components/loginPage/reg').default
    }
  ]
})
