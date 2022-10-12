import { apiHelper } from '../utils/helpers'

export default {
  getFollowship() {
    return apiHelper.get(`/api/followships/top`)
  },
  addFollow (followingId) {
    return apiHelper.post(`/api/followships/`, {id: followingId})
  },
  deleteFollow ({ userId }) {
    return apiHelper.delete(`/api/followships/${ userId }`)
  },
}