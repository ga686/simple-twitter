import Vue from "vue"
import Vuex from "vuex"
import usersAPI from "../apis/users"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: "",
      email: "",
      name: "",
      password: "",
      role: "",
      avatar: '',
      coverPhoto: '',
      introduction: '',
      Tweets: [],
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
        const {data} = await usersAPI.getCurrentUser()
        const { id, account, email,name, password, role, avatar, coverPhoto, introduction, Tweets} = data
        commit("setCurrentUser", {
          id,
          account,
          email,
          name,
          password,
          role,
          avatar,
          coverPhoto,
          introduction,
          Tweets,
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
