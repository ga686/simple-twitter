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
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent" maxlength="140"></textarea>
        </div>
        <button type="submit" class="btn ml-auto">推文</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Toast } from '../utils/helpers'
import tweetsAPI from '../apis/tweets'

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
          title: '無法更新推特，請稍後再試'
        })
      }
    },
   async handleSubmit () {
      try {
        if (!this.newContent) {
        Toast.fire({
          icon: 'warning',
          title: '內容不可空白'
        })
        return
      }
        const description  = this.newContent
        const { data } = await tweetsAPI.postNewTweet({description})
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.closeModal()
        this.newContent = ""
        this.fetchTweets ()
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法新增貼文，請稍後再試'
        })
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