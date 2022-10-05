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
          account: "user1",
          name: 'John Doe',
          email: "user1@example.com",
          password: "12345678",
          image: "../assets/UserPhoto.png",
          isAdmin: false,
        },
      }
      try {
        const { id, account, name, email, image, isAdmin } = data.user
        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          image,
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
