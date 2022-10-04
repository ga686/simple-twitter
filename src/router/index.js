import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: ()=> import('../views/SignUp.vue'),
  },
  {
    path: "/homepage",
    name: "home-page",
    component: ()=> import('../views/HomePage.vue'),
  },
  {
    path: "/adminsignin",
    name: "admin-sign-in",
    component: ()=> import('../views/AdminSignIn.vue'),
  },
  {
    path: "/adminpage",
    name: "admin-page",
    component: ()=> import('../views/AdminPage.vue'),
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})

export default router
