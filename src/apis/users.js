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
  updateAccount(userId, fromData) {
    return apiHelper.put(`/api/users/${ userId }/account`, fromData)
  },
  updateProfile(userId, fromData) {
    return apiHelper.put(`/api/users/${ userId }`, fromData)
  },
  getLikes(userId){
    return apiHelper.get(`/api/users/${ userId }/likes`)
  },
}