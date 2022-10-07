<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
      </div>
      <form class="profile-box">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal', !this.isShow)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/userPage/modal.scss';
</style>
