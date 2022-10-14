<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="tweet.User.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">
            <router-link :to="{name:'user-page', params: {id: tweet.UserId}}">{{tweet.User.name}}</router-link>
          </h5>
          <p class="size-14"><router-link :to="{name: 'user-page', params: {id: tweet.UserId}}">{{tweet.User.account | account}}</router-link></p>
          ・
          <span class="size-14">{{tweet.createdAt | fromNow }}</span>
        </div>
        <div class="comment_wrap_body--content mb-3">
          <router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.description}}</router-link>
        </div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon comment my-auto" @click.stop.prevent="[openModal(), getTweet(tweet.id)]"></div>
            <span class="number-wrap">{{tweet.repliedCount}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked isliked my-auto" v-if="tweet.isFav" @click.stop.prevent="deleteLike(tweet.id)"></div>
            <div class="icon liked my-auto" v-else @click.stop.prevent="addLike(tweet.id)"></div>
            <span class="number-wrap">{{tweet.likedCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <TweetReply :is-show="isShow" :tweet="currentTweet" @close-modal="closeModal" @refresh-replies="update" />
  </div>
</template>

<script>
import TweetReply from './TweetReply'
import tweetsAPI from '../apis/tweets'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isShow: false,
      currentTweet: {
        UserId: 0,
        createdAt: "",
        description: "",
        id: 0,
        likedCount: 0,
        repliedCount: 0,
        updatedAt: ""
      }
    }
  },
  components: {
    TweetReply
  },
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter, accountFilter],
  methods: {
    async addLike(tweetId) {
      try {
        const data = tweetsAPI.addLike({ tweetId })
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.tweets.filter((tweet) => {
          if (tweet.id === tweetId) {
            tweet.likedCount = tweet.likedCount + 1
            tweet.isFav = true
          }
        })
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const data = tweetsAPI.deleteLike({ tweetId })
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.tweets.filter((tweet) => {
          if (tweet.id === tweetId) {
            tweet.likedCount = tweet.likedCount - 1
            tweet.isFav = false
          }
        })
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法刪除最愛，請稍後再試'
        })
      }
    },
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    getTweet(tweetId) {
      const target = this.tweets.filter((tweet) => tweet.id === tweetId)
      this.currentTweet = {
        ...this.currentTweet,
        ...target[0]
      }
    },
    update() {
      this.$emit('refresh-tweets')
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>