<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="tweet.avatar | emptyImage " /></div>
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
            <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}"></div>
            <span class="number-wrap">{{tweet.likedCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <TweetReply :is-show="isShow" :tweet="targetTweet" @close-modal="closeModal" />
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import TweetReply from './TweetReply'

export default {
    data() {
        return {
            isShow: false,
            tweets: [],
            targetTweet: {
              createdAt: '',
              description: '',
              id: '',
              User: []
            }
        };
    },
    props: {
        initUser: {
            type: Object,
            required: true
        }
    },
    components:{
      TweetReply
    },
    computed: {
        ...mapState(["currentUser", "isAuthenticated"])
    },
    mixins: [fromNowFilter, emptyImageFilter, accountFilter],
    created(){
      this.fetchTweets(this.initUser.id)
    },
    methods: {
        async fetchTweets(userId){
          const {data} = await usersAPI.getTweets(userId)
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
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>
