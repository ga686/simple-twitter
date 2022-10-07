<template>
  <div>
    <div v-for="tweet in favoriteTweets" :key="tweet.id" class="comment_wrap d-flex" >
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
            <div class="icon comment my-auto" @click.stop.prevent = "openModal"></div>
            <span class="number-wrap">{{tweet.commentsLength}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}" @click.stop.prevent="toggleLiked (tweet.id)"></div>
            <span class="number-wrap">{{tweet.likedLength}}</span>
          </div>
        </div>
      </div>
    </div>
    <TweetReply :is-show="isShow" @close-modal="closeModal"/>
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
      currentContent: this.initcurrentContent,
      favoriteTweets: []
    }
  },
  components: {
    TweetReply
  },
  props: {
    initFavoriteTweets:{
      type: Array,
      required: true
    }
  },
  created(){
    this.fetchData()
  },
  mixins: [fromNowFilter, emptyImageFilter,accountFilter],
  methods: {
    fetchData(){
      this.favoriteTweets = {
        ...this.favoriteTweets,
        ...this.initFavoriteTweets
      }
    },
    toggleLiked (tweetId) {
      this.favoriteTweets.filter((tweet)=>{
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
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>
