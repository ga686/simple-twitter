<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex">
        <div class="avatar_image"><img :src="tweet.avatar | emptyImage " /></div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">
              <router-link :to="{name:'userpage', params:{id:tweet.User.id}}">{{tweet.User.name}}</router-link>
            </h5>
            <p class="size-14">{{tweet.User.account | account}}</p>
            ・
            <span class="size-14">{{tweet.createdAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">
            <router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.description}}</router-link>
          </div>
          <div class="comment_wrap_footer d-flex">
            <div class="comment_wrap_footer--comments-num d-flex mr-10">
              <div class="icon comment my-auto" @click.prevent.stop="openModal(tweet)"></div>
              <span class="number-wrap">{{tweet.Replies.length}}</span>
            </div>
            <div class="comment_wrap_footer--liked-num d-flex">
              <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}"></div>
              <span class="number-wrap">{{tweet.Likes.length}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <TweetReply :is-show="isShow" :tweet="targetTweet" @close-modal="closeModal" /> -->
    </template>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import LoadingSpinner from './LoadingSpinner.vue'
// import TweetReply from './TweetReply'

export default {
  data() {
    return {
      isShow: false,
      tweets: [],
      targetTweet: {},
      isLoading: false
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true
    }
  },
  components: {
    LoadingSpinner
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
      try {
        this.isLoading = true
        const { data } = await usersAPI.getTweets(userId)
        this.tweets = data
        this.isLoading = false
        //缺少比對currentUser是否喜歡此貼文, isLike
      }
      catch (err) {
        console.log(err)
      }

    },
    openModal(tweet) {
      this.targetTweet = tweet
      return this.isShow = true;
    },
    closeModal(show) {
      return this.isShow = show;
    },
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>
