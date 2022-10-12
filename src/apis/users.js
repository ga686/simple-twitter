import { apiHelper } from '../utils/helpers'

export default {
  get(userId){
    return apiHelper.get(`/api/users/${userId}`)
  },
  getCurrentFavorite(userId) {
    return apiHelper.get(`/api/users/${ userId }/likes`)
  }
}