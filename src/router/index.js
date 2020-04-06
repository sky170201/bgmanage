import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Welcome from '@/views/Welcome'
import Users from '@/views/Users'

Vue.use(Router)

const router =  new Router({
  routes: [
    { path: '/', redirect: "Login" },
    { path: '/login', name: 'Login', component: Login },
    { 
      path: '/home', 
      name: 'Home', 
      component: Home, 
      redirect: '/welcome', 
      children: [
        { path: "/welcome", name: 'welcome', component: Welcome},
        { path: "/users", name: 'users', component: Users}
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) { 
    // this.$message.error("请先登录!")
    alert("请先登录!")
    return next('/login')
  }
  next()
})

export default router
