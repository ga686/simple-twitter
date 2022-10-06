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
            <img src="../assets/empty_image.png" />
          </div>
          <span class="reply-span"></span>
        </div>
        <div class="comment_wrap_body">
          <div class="d-flex comment_wrap_body--title">
            <h5 class="size-16">Apple</h5>
            <p class="size-14">@apple</p>
            ・
            <span class="size-14">3小時</span>
          </div>
          <div class="comment_wrap_body--content mb-3">hello world</div>
          <div class="comment_wrap_footer d-flex reply_to">
            <p>回覆給</p><p class="ml-1 reply_to-account">@apple</p>
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
export default{
  props: {
    isShow:{
      type: Boolean,
      required: true
    }
  },
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