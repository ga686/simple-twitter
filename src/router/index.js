import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import TweetPage from '../views/TweetPage.vue'
import AccountSettings from '../views/AccountSettings.vue'
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
    path: "/user/follow/:id/:user",
    name: "user-follow",
    component: ()=>import("../views/UserFollow.vue")
  },
  {
    path: "/user/:id",
    name: "userpage",
    component: () => import("../views/UserPage.vue"),
  },
  {
    path: "/admin/signin",
    name: "admin-sign-in",
    component: ()=> import('../views/AdminSignIn.vue'),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: ()=> import('../views/AdminUsers.vue'),
  },
  {
    path: "/admin/tweets",
    name: "admin-tweets",
    component: ()=> import('../views/AdminTweets.vue'),
  },
  {
    path: "/tweet/:id",
    name: "tweet",
    component: TweetPage
  },
  {
    path: "/settings",
    name: "account-settings",
    component: AccountSettings 
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
