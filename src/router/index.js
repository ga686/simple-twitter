import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import TweetPage from '../views/TweetPage.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

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
    component: HomePage
  },
  {
    path: "/user/:id",
    name: "userpage",
    component: () => import("../views/UserPage.vue"),
  },
  {
    path: "/user/:id/edit",
    name: "editprofile",
    component: () => import("../views/EditProfile.vue"),
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
    path: "/home",
    name: "home",
    component: HomePage
  },
  {
    path: "/tweet/:id",
    name: "tweet",
    component: TweetPage
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

router.beforeEach(async (to, from, next) => {

  let isAuthenticated = store.state.isAuthenticated
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  if(token && token!== tokenInStore){
    isAuthenticated = store.dispatch("fetchCurrentUser")
  }

  const paths = ['sign-in','sign-up','admin-sign-in']

  if(!isAuthenticated && !paths.includes(to.name)){
    next('/signin')
    return
  }
  if(isAuthenticated && paths.includes(to.name)){
    next('/homepage')
    return
  }
  next()
})

export default router