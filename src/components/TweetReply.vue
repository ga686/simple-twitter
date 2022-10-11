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
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill my-auto" placeholder="推你的推文" v-model="newContent" maxlength="140"></textarea>
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
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default{
  data () {
    return {
      newContent: ''
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
    handleSubmit (e) {
      if (!this.newContent) {
        Toast.fire({
          icon: 'warning',
          title: '內容不可空白'
        })
        return
      }
      const form = e.target
      const formData = new FormData(form)
      this.closeModal()
      this.newContent = ""
      console.log(formData)
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