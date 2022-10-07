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
          tweets: [
            {
              id: 0,
              content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
              video: null,
              createAt: '2022-10-04',
              account: 'user1',
              name: 'user1',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: false
            },
            {
              id: 1,
              content: 'hello world',
              video: null,
              createAt: '2022-10-04',
              account: 'user1',
              name: 'user1',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            },
            {
              id: 2,
              content: 'hello world',
              video: null,
              createAt: '2022-10-04',
              account: 'user1',
              name: 'user1',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            },
            {
              id: 3,
              content: 'hello world',
              video: null,
              createAt: '2022-10-04',
              account: 'user1',
              name: 'user1',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: false
            }
          ],
          replyTweets: [
            {
              id: 0,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
            },
            {
              id: 1,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
            },
            {
              id: 2,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
            },
            {
              id: 3,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
            }
          ],
          favoriteTweets:[
            {
              id: 0,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            },
            {
              id: 1,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            },
            {
              id: 2,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            },
            {
              id: 3,
              content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
              createAt: '2022-10-04',
              account: 'apple',
              name: 'apple',
              likedLength: 72,
              commentsLength: 13,
              isFavorite: true
            }
          ],
          isAdmin: false,
        },
      }
      try {
        const { id, account, name, email, image, banner, tweetsLength, description, tweets,replyTweets,favoriteTweets, isAdmin } = data.user
        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          image,
          banner,
          tweetsLength,
          description,
          tweets,
          replyTweets,
          favoriteTweets,
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
