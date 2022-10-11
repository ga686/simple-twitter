<template>
  <main class="main-view mx-auto">
    <NavbarLeft @return-new-data="getNewData"/>
    <div class="tweet_list">
      <div class="tweet_list-title">
        <h4>首頁</h4>
      </div>
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.avatar" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？" v-model="newContent"></textarea>
        </div>
        <button type="submit" class="btn ml-auto">推文</button>
      </form>
      <NewestTweets :tweets="tweets" />
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft'
import SuggestUser from '../components/SuggestUser'
import NewestTweets from '../components/NewestTweets'
import tweetsAPI from '../apis/tweets'
import usersAPI from '../apis/users'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      tweets: [],
      newContent: ''
    }
  },
  components: {
    NavbarLeft,
    SuggestUser,
    NewestTweets,
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchTweets() {
      try{
        const {data} = await tweetsAPI.getTweets()
 
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = this.getLikedStatus(data)
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
        this.newContent = ""
        this.fetchTweets()
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法新增貼文，請稍後再試'
        })
      }
    },
    getNewData (data){
      return this.tweets = data
    },
    async getLikedStatus (data) {
      try{
        const response = await usersAPI.getCurrentFavorite(14)
        console.log(response.data)
        let result = data.map(obj => {
          if(!response.data.some(o2 => obj.id === o2.TweetId)){
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
        this.tweets = result

      }catch(err){
        console.error(err)
      }
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
