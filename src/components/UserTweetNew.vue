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
.modal{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(23,23,37, 40%);
  pointer-events: none;
  opacity: 0;
  top: 0;
  left: 0;
  &_container{
    transform: translateY(56px);
    width: 634px;
    background: var(--dark-0);
    border-radius: 14px;
    &-header{
      border-bottom: 1px solid #E6ECF0;
      padding: 19px 18px;
    }
  }
  &.show{
    pointer-events: all;
    opacity: 1;
  }
}

.tweet_list-box{
    padding: 24px 16px;
    flex-direction: column;
    textarea{
      border-width: 0px;
      min-height: 211px;
      font-size: 18px;
      resize: none;
      &::placeholder{
        font-size: 16px;
        font-weight: regular;
        color: var(--secondary-color)
      }
    }
  }
</style>