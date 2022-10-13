import { apiHelper } from '../utils/helpers'

export default {
  get(userId){
    return apiHelper.get(`/api/users/${userId}`)
  },
  getTweets(userId) {
    return apiHelper.get(`/api/users/${ userId }/tweets`)
  },
  getReplies(userId){
    return apiHelper.get(`/api/users/${ userId }/replied_tweets`)
  },
  getLikes(userId){
    return apiHelper.get(`/api/users/${ userId }/likes`)
  },

}