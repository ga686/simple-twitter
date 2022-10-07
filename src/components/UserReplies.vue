<template>
  <div>
    <div v-for="tweet in replyTweets" :key="tweet.id" class="comment_wrap d-flex" >
      <div class="avatar_image"><img :src="tweet.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{currentUser.name}}</h5>
          <p class="size-14">{{currentUser.account | account}}</p>
          ・
          <span class="size-14">{{tweet.createAt | fromNow }}</span>
        </div>
        <div class="replyAccount size-14">回覆 <span>{{tweet.account | account}}</span></div>
        <div class="comment_wrap_body--content mb-3"><router-link :to="{name: 'tweet', params: { id: tweet.id }}">{{tweet.content}}</router-link></div>
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
import { mapState } from 'vuex'

export default{
  data (){
    return{
      isShow: false,
      currentContent: this.initcurrentContent
    }
  },
  components: {
    TweetReply
  },
  props: {
    replyTweets:{
      type: Array,
      required: true
    }
  },
  mixins: [fromNowFilter, emptyImageFilter,accountFilter],
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
.replyAccount{
  color: var(--secondary-color);
  & span{
    color: var(--brand-color);
  }
}
</style>