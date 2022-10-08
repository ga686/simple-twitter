import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: "",
      email: "",
      name: "",
      password: "",
      isAdmin: false,
      image: "",
    },
    isAuthenticated: false,
    token: "",
  },
  getters: {},
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem("token")
    },
    rmAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ""
      localStorage.removeItem("token")
    },
  },
  actions: {
    fetchCurrentUser({ commit }) {
      const data = {
        user: {
          id: 1,
          account: "heyjohn",
          name: 'John Doe',
          email: "user1@example.com",
          password: "12345678",
          banner: require('@/assets/banner.jpeg'),
          image: require('@/assets/user_avatar.png'),
          description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
          tweetsLength: 4,
          isAdmin: false,
        },
      }
      try {
        const { id, account, name, email, image, banner, tweetsLength, description, isAdmin } = data.user
        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          image,
          banner,
          tweetsLength,
          description,
          isAdmin,
        })
        return true
      } catch (error) {
        console.log(error.message)
        commit("rmAuthentication")
        return false
      }
    },
  },
  modules: {},
})
