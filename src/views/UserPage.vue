<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <div class="user-page">
      <div class="user-header d-flex align-item-center">
        <div class="link-icon" @click="$router.back()"></div>
        <div class="user-title d-flex justify-content-center">
          <h5 class="user-name">{{user.name}}</h5>
          <div class="user-tweetCounts number-wrap">{{user.tweetsLength | quantifier}}</div>
        </div>
      </div>
      <div class="user-profile">
        <div class="user-banner">
          <img :src="user.banner | emptyImage" alt="">
        </div>
        <div class="avatar">
          <img :src="user.image | emptyImage" alt="">
        </div>
        <div class="user-setting">編輯個人資料</div>
        <div class="user-info">
          <h5>{{user.name}}</h5>
          <div class="user-account number-wrap">{{user.account | account}}</div>
          <div class="user-decription number-wrap">{{user.description}}</div>
          <div class="user-follow d-flex number-wrap">
            <div class="user-info-following">34 個跟隨中</div>
            <div class="user-info-follower">59 位跟隨中</div>
          </div>
        </div>
        <div class="togglePage d-flex">
          <div @click.prevent.stop="togglePage('userTweets')" :class="['userTweets',{'active':currentContent === 'userTweets'}]">推文</div>
          <div @click.prevent.stop="togglePage('userReplies')" :class="['userReplies', {'active':currentContent === 'userReplies'}]">回覆</div>
          <div @click.prevent.stop="togglePage('userLikes')" :class="['userLikes', {'active':currentContent === 'userLikes'}]">喜歡的內容</div>
        </div>
      </div>
      <UserTweets :tweets="user.tweets" v-show="currentContent === 'userTweets'"/>
      <UserReplies :replyTweets="user.replyTweets" v-show="currentContent === 'userReplies'"/>
      <UserLikes :favoriteTweets="user.favoriteTweets" v-show="currentContent === 'userLikes'"/>
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft.vue';
import SuggestUser from '../components/SuggestUser.vue';
import { mapState } from 'vuex';
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import UserReplies from '../components/UserReplies.vue'
import UserLikes from '../components/UserLikes.vue'
import UserTweets from '../components/UserTweets.vue'

export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser,
    UserReplies,
    UserLikes,
    UserTweets
  },
  mixins: [emptyImageFilter, accountFilter],
  data() {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        email: '',
        banner: '',
        image: '',
        description: '',
        tweetsLength: 0,
        tweets: [],
        replyTweets: [],
        favoriteTweets: [],
      },
      currentContent: 'userTweets'
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    fetchUser(userId) {
      console.log(userId)
      const { id, account, name, email, image, banner, description, tweetsLength, tweets,replyTweets,favoriteTweets } = this.currentUser
      this.user = {
        ...this.user,
        id, account, name, email, image, banner, description, tweetsLength, tweets,replyTweets,favoriteTweets
      }
    },
    togglePage(content){
      this.currentContent = content
    }
  },
  filters: {
    quantifier(length) {
      return length = length + ' ' + '推文'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/userPage/style.scss'
</style>