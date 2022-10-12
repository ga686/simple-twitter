import { apiHelper } from '../utils/helpers'

export default {
  getFollowship() {
    return apiHelper.get(`/api/followships/top`)
  },
  addFollow () {
    return apiHelper.post(`/api/followships/`, null)
  },
  deleteFollow ({ userId }) {
    return apiHelper.delete(`/api/followships/${ userId }`)
  },
}