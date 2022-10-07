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
            <div class="avatar_image"><img :src="tweet.avatar | emptyImage" /></div>
            <div class="comment_wrap_body--title">
              <h5 class="size-16">{{tweet.name}}</h5>
              <p class="size-14">{{tweet.account | account}}</p>
            </div>
          </div>
          <div class="comment_wrap_body--content size-24 mb-2">{{tweet.content}}</div>
          <div class="comment_wrap_body--time">
            <span class="size-14">{{tweet.createAt | getTime }}</span>
            ・
            <span class="size-14">{{tweet.createAt | fullDate }}</span>
          </div>
        </div>
        <div class="comment_wrap_footer d-flex mt-3 detail">
            <div class="comment_wrap_footer--comments-num d-flex mr-10">
              <div class="number-wrap mr-1">{{tweet.commentsLength}}</div><p>回覆</p>
            </div>
            <div class="comment_wrap_footer--liked-num d-flex">
              <div class="number-wrap mr-1">{{tweet.likedLength}}</div><p>喜歡次數</p>
            </div>
          </div>
      </div> 
      <div class="tweet_list-detail btn-wrap d-flex">
        <div class="icon-btn reply" @click.stop.prevent="openModal"></div>
        <div class="icon-btn liked" :class="{isliked: tweet.isFavorite}" @click.stop.prevent="toggleLiked"></div>
      </div>
      <ReplyTweets />
    </div>
    <SuggestUser />
    <TweetReply :is-show="isShow" :tweet = "tweet" @close-modal="closeModal"/>
  </main>
</template>
<script>
import NavbarLeft from "../components/NavbarLeft"
import SuggestUser from "../components/SuggestUser"
import ReplyTweets from "../components/ReplyTweets"
import TweetReply from "../components/TweetReply"
import { accountFilter } from './../utils/mixins'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'

const dummyData = {
  id: 0,
  content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
  video: null,
  createAt: '2022-10-08T11:35:48.000Z',
  account: 'root',
  name: 'root',
  likedLength: 72,
  commentsLength: 13,
  isFavorite: false,
  avatar: null,
  comments: [
    {
      id: 0,
      content: 'hello 1',
      video: null,
      createAt: '2022-10-04T11:35:48.000Z',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: null,
    },
    {
      id: 0,
      content: 'hello 2',
      video: null,
      createAt: '2022-10-05T11:35:48.000Z',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: null,
    },
  ]
}

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
    toggleLiked () {
      console.log(this.tweet.isFavorite)
      return this.tweet.isFavorite = !this.tweet.isFavorite
    },
    openModal (){
      return this.isShow = true
    },
    closeModal (show){
      return this.isShow = show
    },
    fetchTweet () {
      return this.tweet = dummyData
    }
  },
  created () {
    this.fetchTweet()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
@import '../assets/scss/tweet.scss';
</style>
