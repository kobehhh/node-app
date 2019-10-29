const Login = resolve => require(['@/views/Login/login.vue'],resolve)
const Register = resolve => require(['@/views/Register/register.vue'],resolve)
const NotFound = resolve => require(['@/views/404/index.vue'],resolve)
const Main = resolve => require(['@/views/Main/main'],resolve)


export const RouterMap = [
  {
    path:'/',
    component:Login
  },
  {
    path:'/login',
    component:Login,
    name:'login'
  },
  {
    path:'/register',
    component:Register,
    name:'register'
  },
  {
    path:'*',
    component:NotFound,
    name:'notfond'
  },
  {
    path:'/main',
    component:Main,
    name:'main'
  }
]