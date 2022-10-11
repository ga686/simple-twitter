import { apiHelper } from '../utils/helpers'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/api/admin/signin', {
      account,
      password
    })
  },
  getAllTweets() {
    return apiHelper.get(`/api/admin/tweets`)
  },
  getAllUsers () {
    return apiHelper.get(`/api/admin/users`)
  },
  deleteTweet (tweetId) {
    return apiHelper.delete(`/api/admin/tweets/${tweetId}`)
  }
}