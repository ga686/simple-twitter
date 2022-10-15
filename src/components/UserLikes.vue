<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <div v-for="tweet in favoriteTweets" :key="tweet.TweetId" class="comment_wrap d-flex">
        <div class="avatar_image"><img :src="tweet.userData.avatar | emptyImage " /></div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">
              <router-link :to="{name:'user-page', params:{id: tweet.userData.id}}">{{tweet.userData.name}}</router-link>
            </h5>
            <p class="size-14"><router-link :to="{name:'user-page', params:{id: tweet.userData.id}}">{{tweet.userData.account | account}}</router-link></p>
            ・
            <span class="size-14">{{tweet.createdAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">
            <router-link :to="{name: 'tweet', params: { id: tweet.TweetId}}">{{tweet.description}}</router-link>
          </div>
          <div class="comment_wrap_footer d-flex">
            <div class="comment_wrap_footer--comments-num d-flex mr-10">
              <div class="icon comment my-auto" @click.prevent.stop="openModal(tweet)"></div>
              <span class="number-wrap">{{tweet.repliedCount}}</span>
            </div>
            <div class="comment_wrap_footer--liked-num d-flex">
              <div class="icon liked my-auto" :class="{isliked: tweet.isLiked}" @click.prevent.stop="deleteLike(tweet)">
              </div>
              <span class="number-wrap">{{tweet.likedCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <TweetReply :is-show="isShow" :tweet="targetTweet" @close-modal="closeModal" @refresh-replies="refreshCommentLength"/>
    </template>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import LoadingSpinner from './LoadingSpinner'
import TweetReply from '../components/TweetReply'
import usersAPI from '../apis/users'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      isShow: false,
      favoriteTweets: [],
      isLoading: false,
      LikesLength: 0,
      targetTweet: {}
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter, accountFilter],
  components: { 
    LoadingSpinner,
    TweetReply
  },
  methods: {
    async fetchLikes(userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getLikes(userId)
        this.favoriteTweets = data
        this.LikesLength = data.length
        this.isLoading = false
      }
      catch (err) {
        console.log(err)
      }
    },
    async deleteLike(tweet) {
      try {
        const tweetId = tweet.TweetId
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '收回愛心'
        })
        this.LikesLength = this.LikesLength - 1
        this.favoriteTweets = this.favoriteTweets.filter(tweet=>tweet.TweetId !== tweetId)
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '收回讚失敗，請稍後再試'
        })
      }
    },
    openModal(tweet) {
      console.log('open')
      const {
        createdAt,
        description,
        TweetId,
        userData
      } = tweet

      this.targetTweet.createdAt = createdAt
      this.targetTweet.description =  description
      this.targetTweet.id = TweetId
      this.targetTweet.User = userData
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show;
    },
    refreshCommentLength (tweetId){
      this.favoriteTweets.filter((tweet) => {
        if(tweet.TweetId === tweetId){
          return tweet.repliedCount = tweet.repliedCount + 1
        }
      })
    }
  },
  created() {
    this.fetchLikes(this.initUser.id)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/userPage/tweet.scss';
</style>
