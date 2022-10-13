<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <LoadingSpinner v-if="isLoading"/>
    <template v-else>
      <div class="user-page">
      <UserEdit :is-show="isShow" :initUser="user" @close-modal="closeModal" @refresh-user="refreshUser"/>
      <UserHeader :user="user"/>
      <div class="user-profile">
        <div class="user-banner">
          <img :src="user.coverPhoto | emptyBanner" alt="">
        </div>
        <div class="avatar">
          <img :src="user.avatar | emptyImage" alt="">
        </div>
        <div class="user-setting" @click.stop.prevent="openModal" v-show="user.id === currentUser.id">編輯個人資料</div>
        <div class="user-info">
          <h5>{{user.name}}</h5>
          <div class="user-account number-wrap">{{user.account | account}}</div>
          <div class="user-decription number-wrap">{{user.introduction}}</div>
          <div class="user-follow d-flex number-wrap">
            <div class="user-info-following" @click.prevent.stop="$router.push({path: `/user/follow/followings/${user.id}`})"><span>{{user.followingCount}}</span> 個跟隨中</div>
            <div class="user-info-follower" @click.prevent.stop="$router.push({path: `/user/follow/followers/${user.id}`})"><span>{{user.followerCount}}</span> 位跟隨者</div>
          </div>
        </div>
        <div class="togglePage d-flex">
          <div @click.prevent.stop="togglePage('userTweets')" class="userTweets"
            :class="{'active':currentContent === 'userTweets'}">推文</div>
          <div @click.prevent.stop="togglePage('userReplies')" class="userTweets"
            :class="{'active':currentContent === 'userReplies'}">回覆</div>
          <div @click.prevent.stop="togglePage('userLikes')" class="userTweets"
            :class="{'active':currentContent === 'userLikes'}">喜歡的內容</div>
        </div>
      </div>
      <UserTweets :initUser="user" v-if="currentContent === 'userTweets'" />
      <UserReplies :initUser="user" v-if="currentContent === 'userReplies'" />
      <UserLikes :initUser="user" v-if="currentContent === 'userLikes'" />
    </div>
    </template>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft.vue';
import SuggestUser from '../components/SuggestUser.vue';
import UserReplies from '../components/UserReplies.vue'
import UserLikes from '../components/UserLikes.vue'
import UserTweets from '../components/UserTweets.vue'
import UserEdit from '@/components/UserEdit.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { mapState } from 'vuex';
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import usersAPI from '../apis/users'
import UserHeader from '@/components/UserHeader.vue';
export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser,
    UserReplies,
    UserLikes,
    UserTweets,
    UserEdit,
    LoadingSpinner,
    UserHeader
},
  mixins: [emptyImageFilter, accountFilter],
  data() {
    return {
      user: {
        id: -1,
        account: '',
        email: '',
        name: '',
        password: '',
        role: '',
        avatar: '',
        coverPhoto: '',
        introduction: '',
        followerCount: 0,
        followingCount: 0,
        tweetsLength: 0,
      },
      currentContent: 'userTweets',
      isShow: false,
      isLoading: false
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
    async fetchUser(userId) {
      this.isLoading = true
      const {data} = await usersAPI.get(userId)
      const { id, account, name, email, avatar, coverPhoto, introduction, followerCount, followingCount, Tweets,} = data
      this.user = {
        ...this.user,
        id, account, name, email, avatar, coverPhoto, introduction, followerCount, followingCount, tweetsLength:Tweets.length,
      }
      this.isLoading = false
    },
    togglePage(content) {
      this.currentContent = content
    },
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    refreshUser(userId){
      this.fetchUser(userId)
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
@import '../assets/scss/userPage/style.scss';
</style>