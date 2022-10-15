<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex align-items-center justify-content-between">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32 close"></i>
          <i class="fa-solid fa-arrow-left size-20 back"></i>
        </div>
        <button type="submit" class="btn mobile" form="tweet-reply" :disabled="isProcessing">推文</button>
      </div>
      <div class="comment_wrap d-flex" v-if="tweet.User">
        <div class="avatar_wrap">
          <div class="avatar_image">
            <router-link :to="{name: 'user-page', params: {id: tweet.User.id }}">
              <img :src="tweet.User.avatar | emptyImage" />
            </router-link>
          </div>
          <span class="reply-span"></span>
        </div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <router-link :to="{name: 'user-page', params: {id: tweet.User.id }}">
              <h5 class="size-16">{{ tweet.User.name }}</h5>
            </router-link>
            <router-link :to="{name: 'user-page', params: {id: tweet.User.id }}">
              <p class="size-14">{{ tweet.User.account | account }}</p>
            </router-link>
            ・
            <span class="size-14">{{tweet.createdAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">{{ tweet.description }}</div>
          <div class="comment_wrap_footer d-flex reply_to">
            <p>回覆給</p><p class="ml-1 reply_to-account">{{ tweet.User.account | account }}</p>
          </div>
        </div>
      </div>
      <form class="tweet_list-box reply d-flex" id="tweet-reply" @submit.prevent.stop="handleSubmit(tweet.id)">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill" placeholder="推你的推文" v-model="newContent" maxlength="140"></textarea>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <p class="input-length size-12 mx-3" :class="{error: newContent.length > 140}" v-if="!showMsg">{{ newContent.length }}/140</p>
          <p class="input-length error size-12 mx-3" v-else>{{warning}}</p>
          <button type="submit" class="btn medium" :disabled="isProcessing">回應</button>
        </div>
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
      isProcessing: false,
      warning: '',
      showMsg: false
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
      this.newContent = ""
      this.showMsg = false
    },
    async handleSubmit (tweetId) {
      try{
          if (!this.newContent) {
            this.showMsg = true
            this.warning = '內容不可空白'
            return
          }

          if (this.newContent.length > 140) {
            this.showMsg = true
            return this.warning = '字數不可超過140字'
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