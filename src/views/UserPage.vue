<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <div class="user-page">
      <UserEdit :is-show="isShow" :initUser="user" @close-modal="closeModal" />
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
          <img :src="user.avatar | emptyImage" alt="">
        </div>
        <div class="user-setting" @click.stop.prevent="openModal">編輯個人資料</div>
        <div class="user-info">
          <h5>{{user.name}}</h5>
          <div class="user-account number-wrap">{{user.account | account}}</div>
          <div class="user-decription number-wrap">{{user.description}}</div>
          <div class="user-follow d-flex number-wrap">
            <div class="user-info-following" @click="$router.push({name:'user-follow', params:{id: 'followings'}})"><span>34</span> 個跟隨中</div>
            <div class="user-info-follower" @click="$router.push({name:'user-follow', params:{id: 'followers'}})"><span>59</span> 位跟隨中</div>
          </div>
        </div>
        <div class="togglePage d-flex">
          <div @click.prevent.stop="togglePage('userTweets')"
            :class="['userTweets',{'active':currentContent === 'userTweets'}]">推文</div>
          <div @click.prevent.stop="togglePage('userReplies')"
            :class="['userReplies', {'active':currentContent === 'userReplies'}]">回覆</div>
          <div @click.prevent.stop="togglePage('userLikes')"
            :class="['userLikes', {'active':currentContent === 'userLikes'}]">喜歡的內容</div>
        </div>
      </div>
      <UserTweets :initTweets="user.tweets" v-show="currentContent === 'userTweets'" />
      <UserReplies :replyTweets="user.replyTweets" v-show="currentContent === 'userReplies'" />
      <UserLikes :initFavoriteTweets="user.favoriteTweets" v-show="currentContent === 'userLikes'" />
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
import UserEdit from '@/components/UserEdit.vue';

const dummyData = {
  tweets: [
    {
      id: 0,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
      video: null,
      createAt: '2022-10-04',
      account: "heyjohn",
      name: 'John Doe',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: ''
    },
    {
      id: 1,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: "heyjohn",
      name: 'John Doe',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    },
    {
      id: 2,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: "heyjohn",
      name: 'John Doe',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    },
    {
      id: 3,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: "heyjohn",
      name: 'John Doe',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: ''
    }
  ],
  replyTweets: [
    {
      id: 0,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      avatar: ''
    },
    {
      id: 1,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      avatar: ''
    },
    {
      id: 2,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      avatar: ''
    },
    {
      id: 3,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      avatar: ''
    }
  ],
  favoriteTweets: [
    {
      id: 0,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    },
    {
      id: 1,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    },
    {
      id: 2,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    },
    {
      id: 3,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      createAt: '2022-10-04',
      account: 'apple',
      name: 'apple',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: ''
    }
  ],
}
export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser,
    UserReplies,
    UserLikes,
    UserTweets,
    UserEdit
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
        avatar: '',
        description: '',
        tweetsLength: 0,
        tweets: [],
        replyTweets: [],
        favoriteTweets: [],
      },
      currentContent: 'userTweets',
      isShow: false
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
      const { tweets, replyTweets, favoriteTweets } = dummyData
      const { id, account, name, email, avatar, banner, description, tweetsLength, } = this.currentUser
      this.user = {
        ...this.user,
        id, account, name, email, avatar, banner, description, tweetsLength, tweets, replyTweets, favoriteTweets
      }
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