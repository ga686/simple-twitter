<template>
  <div>
    <div v-for="reply in replyTweets" :key="reply.id" class="comment_wrap d-flex" >
      <div class="avatar_image"><img :src="reply.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{initUser.name}}</h5>
          <p class="size-14">{{initUser.account | account}}</p>
          ・
          <span class="size-14">{{reply.createdAt | fromNow }}</span>
        </div>
        <div class="replyAccount size-14">回覆 <span>{{reply.Tweet.id | account}}</span></div>
        <div class="comment_wrap_body--content mb-3"><router-link :to="{name: 'tweet', params: { id: reply.id }}">{{reply.comment}}</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default{
  data (){
    return{
      isShow: false,
    }
  },
  props: {
    replyTweets:{
      type: Array,
      required: true
    },
    initUser: {
            type: Object,
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
