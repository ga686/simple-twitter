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
        <div class="comment_wrap_body--content mb-3">{{tweet.content}}</div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon comment my-auto"></div>
            <span class="number-wrap">{{tweet.commentsLength}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon liked my-auto" :class="{isliked: tweet.isFavorite}" @click.stop.prevent="toggleLiked (tweet.id)"></div>
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
        if(tweet.id === tweetId){
          tweet.isFavorite = !tweet.isFavorite
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.comment_wrap{
  padding: 24px 16px;
  border-bottom: 1px solid #E6ECF0;
  &_body{
    &--title{
      color: var(--secondary-color);
      line-height: 16px;
      margin-bottom: 10px;
      h5{
        color: var(--dark-100);
        margin-right: 8px;
      }
    }
  }
  &_footer{
    color: var(--secondary-color);
    .icon{
      width: 14px;
      height: 14px;
      margin-right: 9.5px;
      cursor: pointer;
      background-position: center !important;
      background-size: contain !important;
      &.comment{
        background: var(--icon-comment);
      }
      &.liked{
        background: var(--icon-liked);
      }
      &.liked.isliked{
        background: var(--icon-liked-active);
      }
    }
  }
}

</style>