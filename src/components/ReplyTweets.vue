<template>
    <div>
    <div class="comment_wrap detail tweet-list d-flex" >
      <div class="comment_wrap_body" v-for="reply in replies" :key="reply.TweetId">
        <div class="d-flex">
          <div class="avatar_image"><img :src="reply.User.avatar | emptyImage" /></div>
          <div>
            <div class="d-flex comment_wrap_body--title align-items-center">
              <h5 class="size-16">{{ reply.User.name }}</h5>
              <p class="size-14">{{ reply.User.account | account }}</p>
              ・
              <span class="size-14">{{ reply.createdAt | fromNow }}</span>
            </div>
            <div class="d-flex size-14 reply_to">回覆給<router-link :to="{name: 'userpage' ,params: {id: replyTo.User.id }}" class="reply_to-account ml-1">{{replyTo.User.account | account }}</router-link></div>
            <div class="comment_wrap_body--content mb-3 mt-1">{{reply.comment}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../apis/tweets'
import { Toast } from '@/utils/helpers'
import { accountFilter } from './../utils/mixins'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'


export default{
  data () {
    return {
      replies: []
    }
  },
  props: {
    replyTo: {
      type: Object,
      required: true
    }
  },
  mixins: [accountFilter,fromNowFilter,emptyImageFilter ],
  methods: {
    async fetchReplies (tweetId) {
      try {
        const { data } = await tweetsAPI.getReplies({ tweetId })
        console.log(data)
        if( data.status === "error" ){
          throw new Error(data.message)
        }
        this.replies = data
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新留言，請稍後再試'
        })
      }
    }
  },
  watch: {
    replyTo: {
      handler: function () {
        const { id: tweetId } = this.$route.params
        this.fetchReplies(tweetId)
      },
      deep: true
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    this.fetchReplies(tweetId)
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>