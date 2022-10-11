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
      avatar: "",
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
    async fetchCurrentUser({ commit }) {
      try {
        //not done
        const { id, account, name, email, avatar, banner, tweetsLength, description, isAdmin } = this.currentUser
        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          avatar,
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
