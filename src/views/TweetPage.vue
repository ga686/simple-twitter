<template>
  <main class="main-view">
    <NavbarLeft />
    <div class="tweet_list">
      <div class="tweet_list-title d-flex">
        <a @click="$router.back()"><i class="fa-solid fa-arrow-left size-20"></i></a><h4>推文</h4>
      </div>
      <div class="comment_wrap detail d-flex" >
        <div class="comment_wrap_body">
          <div class="d-flex">
            <div class="avatar_image"><img :src="tweet.User.avatar | emptyImage" /></div>
            <div class="comment_wrap_body--title">
              <h5 class="size-16">{{tweet.User.name}}</h5>
              <p class="size-14">{{tweet.User.account | account}}</p>
            </div>
          </div>
          <div class="comment_wrap_body--content size-24 mb-2">{{tweet.description}}</div>
          <div class="comment_wrap_body--time">
            <span class="size-14">{{tweet.createdAt | getTime }}</span>
            ・
            <span class="size-14">{{tweet.createdAt | fullDate }}</span>
          </div>
        </div>
        <div class="comment_wrap_footer d-flex mt-3 detail">
            <div class="comment_wrap_footer--comments-num d-flex mr-10">
              <div class="number-wrap mr-1">{{tweet.repliedCount}}</div><p>回覆</p>
            </div>
            <div class="comment_wrap_footer--liked-num d-flex">
              <div class="number-wrap mr-1">{{tweet.likedCount}}</div><p>喜歡次數</p>
            </div>
          </div>
      </div> 
      <div class="tweet_list-detail btn-wrap d-flex">
        <div class="icon-btn reply" @click.stop.prevent="openModal"></div>
        <div class="icon-btn liked isliked my-auto" v-if="tweet.isFav" @click.stop.prevent="deleteLike(tweet.id)"></div>
        <div class="icon-btn liked my-auto" v-else @click.stop.prevent="addLike(tweet.id)"></div>
      </div>
      <ReplyTweets :reply-to="tweet" />
    </div>
    <SuggestUser />
    <TweetReply :is-show="isShow" :tweet = "tweet" @close-modal="closeModal" @refresh-replies="refreshAgain"/>
  </main>
</template>
<script>
import NavbarLeft from "../components/NavbarLeft"
import SuggestUser from "../components/SuggestUser"
import ReplyTweets from "../components/ReplyTweets"
import TweetReply from "../components/TweetReply"
import usersAPI from '../apis/users'
import tweetsAPI from '../apis/tweets'
import { accountFilter } from './../utils/mixins'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from "@/utils/helpers"
import { mapState } from 'vuex'

export default{
  data () {
    return{
      tweet: [],
      isShow: false
    }
  },
  components: {
    NavbarLeft,
    SuggestUser,
    ReplyTweets,
    TweetReply
  },
  mixins: [accountFilter, emptyImageFilter,fromNowFilter],
  methods: {
    async addLike (tweetId) {
      try{
        const data = tweetsAPI.addLike({ tweetId })
        if(data.status === "error"){
          throw new Error(data.message)
        }
        if(this.tweet.id === tweetId){
          this.tweet.isFav = true
        }
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteLike (tweetId) {
      console.log('delete')
      try{
        const data = tweetsAPI.deleteLike({ tweetId })
        if(data.status === "error"){
          throw new Error(data.message)
        }
        if(this.tweet.id === tweetId){
          this.tweet.isFav = false
        }
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法刪除最愛，請稍後再試'
        })
      }
    },
    openModal (){
      return this.isShow = true
    },
    closeModal (show){
      return this.isShow = show
    },
    async fetchTweet (tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId })
        console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        return this.tweet = this.getLikedStatus (data)
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法找到推文，請稍後再試'
        })
      }
    },
    async getLikedStatus (data) {
      try{
        const response = await usersAPI.getCurrentFavorite(14) 
        let result = response.data.findIndex((obj)=>obj.TweetId === data.id)
        if(result > 0){
          this.tweet = {
            ...data,
            isFav: true
          }
          return
        }
        this.tweet = {
          ...data,
          isFav: false
        }
      }catch(err){
        console.error(err)
      }
    },
    async handleAfterSubmit (description) {
      try{
        const { data } = await tweetsAPI.addReply(14 , description )
        if(data.status === 'error'){
          throw new Error(data.message)
        }
      }catch(err){
        Toast.fire({
          icon: 'error',
          title: '無法新增貼文，說稍後再試'
        })
      }
    },
    refreshAgain (tweetId){
      this.fetchTweet(tweetId)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchTweet(id)
    next()
  },
  watch: {
    tweet: {
      handler: function () {
        const id = this.currentUser.id
        this.fetchTweet(id)
      },
      deep: true
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
@import '../assets/scss/tweet.scss';
</style>
