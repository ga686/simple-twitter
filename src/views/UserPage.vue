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
        <div class="tweetsPage">推文</div>
        <div class="replyPage">回覆</div>
        <div class="likesPage">喜歡的內容</div>
      </div>
      </div>
      <UserTweets />
      <UserComments />
      <UserLikes />
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
import UserComments from '../components/UserComments.vue'
import UserLikes from '../components/UserLikes.vue'
import UserTweets from '../components/UserTweets.vue'

export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser,
    UserComments,
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
      },
      tweetPage: true,
      replyPage: false,
      LikesPage: false,
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
      const { id, account, name, email, image, banner, description, tweetsLength, tweets } = this.currentUser
      this.user = {
        ...this.user,
        id, account, name, email, image, banner, description, tweetsLength, tweets
      }
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