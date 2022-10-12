<template>
  <div>
    <div v-for="tweet in favoriteTweets" :key="tweet.id" class="comment_wrap d-flex" >
      <div class="avatar_image"><img :src="tweet.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{initUser.name}}</h5>
          <p class="size-14">{{tweet.account | account}}</p>
          ・
          <span class="size-14">{{tweet.createdAt | fromNow }}</span>
        </div>
        <div class="comment_wrap_body--content mb-3"><router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.content}}</router-link></div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon comment my-auto" @click.stop.prevent = "openModal"></div>
            <span class="number-wrap">{{tweet.commentsLength}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}"></div>
            <span class="number-wrap">{{tweet.likedLength}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'

export default{
  data (){
    return{
      isShow: false,
      favoriteTweets: this.initFavoriteTweets
    }
  },
  props: {
    initFavoriteTweets:{
      type: Array,
      required: true
    },
    initUser: {
            type: Object,
            required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter,accountFilter],
  methods: {
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
