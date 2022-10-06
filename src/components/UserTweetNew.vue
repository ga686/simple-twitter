<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
      </div>
      <form class="tweet_list-box d-flex">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？"></textarea>
        </div>
        <button class="btn ml-auto">推文</button>
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
@import '../assets/scss/modal.scss';
</style>