<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex" >
      <div class="avatar_image"><img :src="tweet.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{tweet.name}}</h5>
          <p class="size-14">{{tweet.account | account}}</p>
          ・
          <span class="size-14">{{tweet.createAt | fromNow }}</span>
        </div>
        <div class="comment_wrap_body--content mb-3"><router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.content}}</router-link></div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon comment my-auto" @click.stop.prevent = "[openModal(), getTweet(tweet.id)]"></div>
            <span class="number-wrap">{{tweet.commentsLength}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}" @click.stop.prevent="toggleLiked (tweet.id)"></div>
            <span class="number-wrap">{{tweet.likedLength}}</span>
          </div>
        </div>
      </div>
      <TweetReply :is-show="isShow" :tweet="currentTweet" @close-modal="closeModal"/>
    </div>
  </div>
</template>

<script>
import TweetReply from './TweetReply'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'

export default{
  data (){
    return{
      isShow: false,
      currentTweet: {
        id: 0,
        content: '',
        video: null,
        createAt: '',
        account: '',
        name: '',
        likedLength: 0,
        commentsLength: 0,
        isFavorite: false,
        avatar: null
      }
    }
  },
  components: {
    TweetReply
  },
  props: {
    tweets:{
      type: Array,
      required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter,accountFilter],
  methods: {
    toggleLiked (tweetId) {
      this.tweets.filter((tweet)=>{
        if(tweet.id === tweetId && tweet.isFavorite === false){
          tweet.isFavorite = true
          tweet.likedLength = tweet.likedLength + 1
        }else if(tweet.id === tweetId && tweet.isFavorite === true){
          tweet.isFavorite = false
          tweet.likedLength = tweet.likedLength - 1
        }
        
      })
    },
    openModal (){
      return this.isShow = true
    },
    closeModal (show){
      return this.isShow = show
    },
    getTweet (tweetId) {
      const target = this.tweets.filter((tweet) => tweet.id === tweetId )
      this.currentTweet = {
        ...this.currentTweet,
        ...target[0]
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>