<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
      </div>
      <div class="comment_wrap d-flex" >
        <div class="avatar_wrap">
          <div class="avatar_image">
            <img :src="tweet.avatar | emptyImage" />
          </div>
          <span class="reply-span"></span>
        </div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">{{ tweet.name }}</h5>
            <p class="size-14">{{ tweet.account | account }}</p>
            ・
            <span class="size-14">{{tweet.createAt | fromNow }}</span>
          </div>
          <div class="comment_wrap_body--content mb-3">{{ tweet.content }}</div>
          <div class="comment_wrap_footer d-flex reply_to">
            <p>回覆給</p><p class="ml-1 reply_to-account">{{ tweet.account | account }}</p>
          </div>
        </div>
      </div>
      <form class="tweet_list-box d-flex">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <textarea class="flex-fill my-auto" placeholder="推你的推文"></textarea>
        </div>
        <button class="btn ml-auto">回應</button>
      </form>
    </div>
  </div>
</template>

<script>
import { accountFilter } from './../utils/mixins'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'

export default{
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
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
@import '../assets/scss/modal.scss';
</style>