<template>
    <div>
    <div class="comment_wrap detail tweet-list d-flex" >
      <div class="comment_wrap_body" v-for="reply in replies" :key="reply.id">
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
  watch: {
    replyTo: {
      handler: function () {
        return this.replies = this.replyTo.Replies
      },
      deep: true
    }
  },
  created () {
    return this.replies = this.replyTo.Replies
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>