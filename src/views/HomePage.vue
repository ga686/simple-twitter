<template>
  <main class="main-view mx-auto">
    <NavbarLeft @return-new-data="fetchTweets"/>
    <LoadingSpinner v-if="isProcessing"/>
    <template v-else>
      <div class="tweet_list">
      <div class="tweet_list-title">
        <h4>首頁</h4>
      </div>
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent"></textarea>
        </div>
        <button type="submit" class="btn ml-auto" :disabled="isProcessing">推文</button>
      </form>
      <NewestTweets :tweets="tweets" @refresh-tweets="fetchTweets"/>
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
          icon: 'warning',
          title: '無法新增貼文，請稍後再試'
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
