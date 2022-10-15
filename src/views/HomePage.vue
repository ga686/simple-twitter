<template>
  <main class="main-view mx-auto">
    <NavbarLeft @return-new-data="fetchTweets"/>
    <LoadingSpinner v-if="isProcessing"/>
    <template v-else>
      <div class="tweet_list">
        <div class="tweet_list-title d-flex">
          <div class="avatar_image mobile"><img :src="currentUser.avatar | emptyImage" /></div>
          <h4>首頁</h4>
        </div>
        <div class="scroll">
          <form class="tweet_list-box main d-flex" @submit.prevent.stop="handleSubmit">
            <div class="d-flex">
              <div class="avatar_image"><img :src="currentUser.avatar | emptyImage" /></div>
              <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent"></textarea>
            </div>
            <div class="d-flex justify-content-end"><button type="submit" class="btn ml-auto" :disabled="isProcessing">推文</button></div>
          </form>
          <NewestTweets :tweets="tweets" @refresh-tweets="fetchTweets"/>
        </div>
      </div>
    </template>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft'
import SuggestUser from '../components/SuggestUser'
import NewestTweets from '../components/NewestTweets'
import tweetsAPI from '../apis/tweets'
import LoadingSpinner from '../components/LoadingSpinner'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      tweets: [],
      newContent: '',
      isProcessing: false
    }
  },
  components: {
    NavbarLeft,
    SuggestUser,
    NewestTweets,
    LoadingSpinner
  },
  mixins: [emptyImageFilter],
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchTweets() {
      try{
        this.isProcessing = true
        const {data} = await tweetsAPI.getTweets()
 
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = this.getLikedStatus(data)
        this.isProcessing = false
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新貼文，請稍後再試',
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
          Toast.fire({
            icon: 'warning',
            title: '內容不可空白',
            background: '#FF6600',
            iconColor: '#fff',
            customClass: {
            container: 'sweetalert2-warning-pop',
            },
          })  
          return
        }
        this.isProcessing = false
        const description  = this.newContent
        const { data } = await tweetsAPI.postNewTweet({description})
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.newContent = ""
        this.fetchTweets()
        this.isProcessing = true
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法新增貼文，請稍後再試',
          background: '#FC5A5A',
          iconColor: '#fff',
          customClass: {
          container: 'sweetalert2-error-pop',
          },
        })
      }
    },
    getLikedStatus (data) {
        let result = data.map((obj) => {
          if(!obj.Likes.some(o2 => this.currentUser.id === o2.UserId)){
            return obj = {
              ...obj,
              isFav: false
            }
          }
          return obj = {
            ...obj,
            isFav: true
          }
        })
        return this.tweets = result
    }
  },
  created() {
    this.fetchTweets()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss'
</style>
