import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/api/users`)
  },
  getUser(userId){
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
  getFollowers(userId){
    return apiHelper.get(`api/users/${userId}/followers`)
  },
  getFollowings(userId){
    return apiHelper.get(`api/users/${userId}/followings`)
  }
}