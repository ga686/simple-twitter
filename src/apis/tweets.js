import { apiHelper } from '../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get(`/api/tweets`)
  },
  postNewTweet ({ description }) {
    return apiHelper.post(`/api/tweets`,{description})
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }`)
  },
  addLike ({ tweetId }) {
    return apiHelper.post(`/api/tweets/${ tweetId }/like`, null)
  },
  deleteLike ({ tweetId }) {
    return apiHelper.post(`/api/tweets/${ tweetId }/unlike`,null)
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`api/tweets/${ tweetId }/replies`)
  },
  addReply({ tweetId , fromData }) {
    return apiHelper.post(`api/tweets${ tweetId }/replies`, fromData)
  }
}