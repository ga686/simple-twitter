import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import TweetPage from '../views/TweetPage.vue'
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

export default router
