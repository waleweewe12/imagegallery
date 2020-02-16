import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/Registration',
      name:'Registration',
      component:() => import('./views/Registration.vue') 
    },
    {
      path:'/Admin',
      name:'Admin',
      component:()=>import('./views/Admin.vue')
    },
    {
      path:'/Search/:searchwords',
      name:'Search',
      props:true,
      component:()=>import('./views/Search.vue')
    },
    {
      path:'/Page/:pagenum',
      name:'Page',
      props:true,
      component:()=>import('./views/Page.vue')
    }
    

  ]
})
