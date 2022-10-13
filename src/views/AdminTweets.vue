<template>
  <main class="admin-view">
    <NavbarAdmin />
    <LoadingSpinner v-if="isProcessing"/>
    <template v-else>
      <div class="admin_box">
        <div class="admin_box-title">
          <h5 class="size-18">推文清單</h5>
        </div>
        <div class="admin_box_wrap">
          <div class="admin_box_wrap-item d-flex" v-for="tweet in tweets" :key="tweet.id">
            <div class="d-flex flex-fill">
              <div class="avatar_image"><img :src="tweet.userData.avatar | emptyImage" /></div>
              <div>
                <div class="d-flex admin_box_wrap-title align-items-center">
                  <h5 class="size-16">{{ tweet.userData.name }}</h5>
                  <p class="size-14 ml-1">{{ tweet.userData.account | account }}</p>
                  ・
                  <span class="size-14">{{ tweet.createAt | fromNow }}</span>
                </div>
                <div class="mb-3 mt-1 admin_box_wrap-content">{{ tweet.description }}</div>
              </div>
            </div>
            <div class="tweet-delete-btn" @click.stop.prevent = "deleteTweet(tweet.id)"><i class="fa-solid fa-xmark size-20"></i></div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import NavbarAdmin from '../components/NavbarAdmin'
import adminAPI from '../apis/admin'
import LoadingSpinner from '../components/LoadingSpinner'
import { emptyImageFilter } from '@/utils/mixins'
import { fromNowFilter } from '@/utils/mixins'
import { accountFilter } from '../utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return{
      tweets: [],
      isProcessing: false
    }
  },
  components: {
    NavbarAdmin,
    LoadingSpinner
  },
  mixins:[ emptyImageFilter , fromNowFilter , accountFilter ],
  methods: {
    async fetchTweets () {
      try{
        this.isProcessing = true
        const { data } = await adminAPI.getAllTweets()
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.tweets = data
        this.isProcessing = false
      }catch(err){
        this.isProcessing = false
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    },
    async deleteTweet (tweetId) {
      try{
        const { data } = await adminAPI.deleteTweet(tweetId)
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
      }catch(err){
        Toast.fire({
          icon: 'error',
          title: '無法刪除推文，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchTweets()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin.scss';
</style>