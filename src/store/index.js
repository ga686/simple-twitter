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
      Replies: [],
      Likes: []
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
      localStorage.removeItem("currentId")
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const currentUserId = localStorage.getItem('currentId')
        const {data} = await usersAPI.get(currentUserId)
        const { id, account, email,name, password, role, avatar, coverPhoto, introduction, Tweets, Replies, Likes } = data
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
          Replies,
          Likes
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
