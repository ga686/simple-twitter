<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <div v-for="tweet in favoriteTweets" :key="tweet" class="comment_wrap d-flex">
        <div class="avatar_image"><img :src="tweet.userData.avatar | emptyImage " /></div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">
              <router-link :to="{name:'userpage', params:{id: tweet.userData.id}}">{{tweet.userData.name}}</router-link>
            </h5>
            <p class="size-14">{{tweet.userData.account | account}}</p>
            ・
            <span class="size-14">{{tweet.createdAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">
            <router-link :to="{name: 'tweet', params: { id: tweet.TweetId}}">{{tweet.description}}</router-link>
          </div>
          <div class="comment_wrap_footer d-flex">
            <div class="comment_wrap_footer--comments-num d-flex mr-10">
              <div class="icon comment my-auto" @click.stop.prevent="openModal"></div>
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
    </template>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import LoadingSpinner from './LoadingSpinner.vue'
import usersAPI from '../apis/users'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      isShow: false,
      favoriteTweets: [],
      isLoading: false,
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter, accountFilter],
  components: { LoadingSpinner },
  created() {
    this.fetchLikes(this.initUser.id)
  },
  methods: {
    async fetchLikes(userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getLikes(userId)
        this.favoriteTweets = data
        this.isLoading = false
      }
      catch (err) {
        console.log(err)
      }
    },
    async deleteLike(tweet) {
      try {
        const tweetId = tweet.tweetId
        if (tweet.isLiked === true) {
          const { data } = await tweetsAPI.deleteLike({ tweetId })
          if (data.status === 'error') {
            throw new Error(data.message)
          }
          Toast.fire({
            icon: 'success',
            title: '收回愛心'
          })
          tweet.isLiked = !tweet.isLiked
          tweet.likedCount -= 1
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '收回讚失敗，請稍後再試'
        })
      }
    },
    openModal() {
      return this.isShow = true;
    },
    closeModal(show) {
      return this.isShow = show;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>
