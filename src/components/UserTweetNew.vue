<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
      </div>
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.image" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent"></textarea>
        </div>
        <button type="submit" class="btn ml-auto">推文</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    }
  },
  methods: {
    closeModal () {
      this.$emit('close-modal',!this.isShow)
    },
    handleSubmit (e) {
      if (!this.newContent) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文訊息'
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
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/modal.scss';
</style>