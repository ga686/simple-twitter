<template>
  <div>
    <div class="sweetalert" v-if="tweets.length === 0">使用者無任何推文</div>
    <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="initUser.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{initUser.name}}</h5>
          <p class="size-14">{{initUser.account | account}}</p>
          ・
          <span class="size-14">{{tweet.createdAt | fromNow }}</span>
        </div>
        <div class="comment_wrap_body--content mb-3">
          <router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.description}}</router-link>
        </div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon comment my-auto" @click.prevent.stop="openModal(tweet)"></div>
            <span class="number-wrap">{{tweet.repliedCount}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked my-auto" :class="{isliked: tweet.isLiked}" @click.prevent.stop="toggleLike(tweet)">
            </div>
            <span class="number-wrap">{{tweet.likedCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <TweetReply :is-show="isShow" :tweet="targetTweet" @close-modal="closeModal" @refresh-replies="refreshAgain"/>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import TweetReply from './TweetReply'
import tweetsAPI from '../apis/tweets'
import { alert } from '../utils/mixins'


export default {
  data() {
    return {
      isShow: false,
      tweets: [],
      targetTweet: {}
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true
    }
  },
  components: {
    TweetReply
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  mixins: [fromNowFilter, emptyImageFilter, accountFilter],
  created() {
    this.fetchTweets(this.initUser.id)
  },
  methods: {
    async fetchTweets(userId) {
      const { data } = await usersAPI.getTweets(userId)
      this.tweets = data
    },
    openModal(tweet) {
      const {
        createdAt,
        description,
        id,
        userData
      } = tweet
  
      this.targetTweet.createdAt = createdAt
      this.targetTweet.description =  description
      this.targetTweet.id = id
      this.targetTweet.User = userData
      return this.isShow = true;
    },
    closeModal(show) {
      return this.isShow = show;
    },
    async toggleLike(tweet) {
      if (tweet.isLiked === false) {
        try {
          const tweetId = tweet.id
          const { data } = await tweetsAPI.addLike({tweetId})
          if (data.status === 'error') {
            throw new Error(data.message)
          }

          tweet.likedCount += 1
          tweet.isLiked = !tweet.isLiked
        }
        catch (err) {
          console.log(err)
          alert.error('按讚失敗，請稍後再試')
        }

      } else if (tweet.isLiked === true) {
        try {
          const tweetId = tweet.id
          const { data } = await tweetsAPI.deleteLike({tweetId})
          if (data.status === 'error') {
            throw new Error(data.message)
          }

          tweet.isLiked = !tweet.isLiked
          tweet.likedCount -= 1
        } catch (err) {
          console.log(err)
          alert.error('收回讚失敗，請稍後再試')
        }
      }
    },
    refreshAgain (){
      const { id } = this.$route.params
      this.fetchTweets(id)
    }
  },
}

</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
.sweetalert{
margin: 50px 0;
text-align: center;
color: var(--secondary-color);
}
</style>
