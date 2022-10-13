<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
      </div>
      <div class="comment_wrap d-flex"  v-if="tweet.User">
        <div class="avatar_wrap">
          <div class="avatar_image">
            <img :src="tweet.User.avatar | emptyImage" />
          </div>
          <span class="reply-span"></span>
        </div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">{{ tweet.User.name }}</h5>
            <p class="size-14">{{ tweet.User.account | account }}</p>
            ・
            <span class="size-14">{{tweet.createdAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">{{ tweet.description }}</div>
          <div class="comment_wrap_footer d-flex reply_to">
            <p>回覆給</p><p class="ml-1 reply_to-account">{{ tweet.User.account | account }}</p>
          </div>
        </div>
      </div>
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit(tweet.id)">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill my-auto" placeholder="推你的推文" v-model="newContent" maxlength="140"></textarea>
        </div>
        <button type="submit" class="btn ml-auto" :disabled="isProcessing">回應</button>
      </form>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../apis/tweets'
import { accountFilter } from './../utils/mixins'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default{
  data () {
    return {
      newContent: '',
      isProcessing: false
    }
  },
  props: {
    isShow:{
      type: Boolean,
      required: true
    },
    tweet: {
      type: Object,
      required: true
    }
  },
  mixins: [accountFilter,fromNowFilter,emptyImageFilter],
  methods: {
    closeModal () {
      this.$emit('close-modal',!this.isShow)
    },
    async handleSubmit (tweetId) {
      try{
          if (!this.newContent) {
          Toast.fire({
            icon: 'warning',
            title: '內容不可空白'
          })
          return
        }
        this.isProcessing = true
        const { data } = await tweetsAPI.addReply(tweetId , this.newContent )
        if(data.status === 'error'){
          throw new Error(data.message)
        }
        this.closeModal()
        this.newContent = ""
        this.$emit('refresh-replies', tweetId)
        this.isProcessing = false
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法新增貼文，說稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
@import '../assets/scss/modal.scss';
</style>