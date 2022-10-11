import { apiHelper } from '../utils/helpers'

export default {
  getFollowship() {
    return apiHelper.get(`/api/followships/top`)
  },
  addFollow ({ userId }) {
    return apiHelper.post(`/api/followships/${ userId }`, null)
  },
  deleteFollow ({ userId }) {
    return apiHelper.delete(`/api/followships/${ userId }`)
  },
}