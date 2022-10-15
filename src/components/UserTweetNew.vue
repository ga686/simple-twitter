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
          <div class="avatar_image"><img :src="currentUser.avatar | emptyImage" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent" maxlength="140"></textarea>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <p class="input-length size-12 mx-3" :class="{error: newContent.length > 140}" v-if="!showMsg">{{ newContent.length }}/140</p>
          <p class="input-length error size-12 mx-3" v-else>{{warning}}</p>
          <button type="submit" class="btn " :disabled="isProcessing">推文</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { emptyImageFilter } from '@/utils/mixins'
import { Toast } from '../utils/helpers'
import tweetsAPI from '../apis/tweets'


export default{
  data () {
    return {
      newContent: '',
      isProcessing: false,
      warning: '',
      showMsg: false
    }
  },
  mixins: [emptyImageFilter ],
  props: {
    isShow:{
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('close-modal',!this.isShow)
      this.newContent = ""
    },
    async fetchTweets() {
      try{
        const {data} = await tweetsAPI.getTweets()
 
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.$emit('refresh-tweet',data)
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新推文，請稍後再試',
          background: '#FC5A5A',
          iconColor: '#fff',
          customClass: {
            container: 'sweetalert2-error-pop',
          },
        })
      }
    },
   async handleSubmit () {
      try {
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
        const description  = this.newContent
        const { data } = await tweetsAPI.postNewTweet({description})
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.closeModal()
        this.newContent = ""
        this.isProcessing = false
        this.fetchTweets ()
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法新增貼文，請稍後再試'
        })
      }
   }
  },
  watch: {
    newContent: function () {
      if (this.newContent.length > 140) {
        return this.warning = '字數不可超過140字'
      }
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