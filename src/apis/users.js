import { apiHelper } from '../utils/helpers'

export default {
  get(userId){
    return apiHelper.get(`/api/users/${userId}`)
  },
  getCurrentFavorite(userId) {
    return apiHelper.get(`/api/users/${ userId }/likes`)
  },
  getCurrentFollow(userId) {
    return apiHelper.get(`/api/users/${ userId }/followings`)
  },
  updateAccount(userId, data) {
    return apiHelper.post(`api/users/${ userId }/account`, data )
  }
}