import { apiHelper } from '../utils/helpers'

export default {
  get(userId){
    return apiHelper.get(`/api/users/${userId}`)
  },
  getTweets(userId) {
    return apiHelper.get(`/api/users/${ userId }/tweets`)
  },
  getCurrentFollow(userId) {
    return apiHelper.get(`/api/users/${ userId }/followings`)
  },
  updateAccount(userId, fromData) {
    return apiHelper.put(`/api/users/${ userId }/account`, fromData)
  }
}