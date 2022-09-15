import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login"
import Home from "@/views/Home"
import OverView from "@/components/analysis/OverView"
import DashBoard from "@/components/analysis/DashBoard"
import User from "@/components/system/User"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/login",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component:Home,
    children:[
      {
        path:"/main/analysis/overview",
        component:OverView,
      },
      {
        path:"/main/analysis/dashboard",
        component:DashBoard
      },
      {
        path:"/main/system/user",
        component:User
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
// 导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path == '/login'){
    if(!token) next()
    else {
      next({path:'/home'})
    }
  }
  else {
    if(token){
      next()
    }else{
      next({path:'/login'})
    }
  }
})



export default router;
