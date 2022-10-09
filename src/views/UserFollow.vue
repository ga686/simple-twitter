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
      <div class="follow-title">
        <div :class="['user-followers', {active: currentView === 'followers'}]"
          @click.prevent.stop="toggleContent('followers')">追蹤者</div>
        <div :class="['user-followings',{active: currentView === 'followings'}]"
          @click.prevent.stop="toggleContent('followings')">正在追隨</div>
      </div>
      <UserFollowers :initFollowersTweets='followersTweets' v-show="this.currentView === 'followers'"/>
      <UserFollowings :initFollowingsTweets="followingsTweets" v-show="this.currentView === 'followings'"/>
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
import UserFollowers from '../components/UserFollowers.vue'
import UserFollowings from '@/components/UserFollowings.vue';

const dummyData = {
  followersTweets: [
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 0,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
    },
    {
      user:{
        id: 4,
        name: 'David',
        avatar: null,
        isFollowed: false,
      },
      id: 1,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true, 
      },
      id: 2,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 3,
        name: 'Will',
        avatar: null,
        isFollowed: false,
      },
      id: 3,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 4,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
    },
    {
      user:{
        id: 1,
        name: 'Karen',
        avatar: null,
        isFollowed: false,
      },
      id: 5,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 6,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 2,
        name: 'Will',
        avatar: null,
        isFollowed: false,
      },
      id: 7,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    }
  ],
  followingsTweets: [
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 0,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true, 
      },
      id: 1,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      user:{
        id: 5,
        name: 'Josh',
        avatar: null,
        isFollowed: true, 
      },
      id: 2,
      content: 'You only live once!',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 3,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
    },
    {
      user:{
        id: 0,
        name: 'Apple',
        avatar: null,
        isFollowed: true,
      },
      id: 4,
      content: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
  ],
}

export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser,
    UserFollowers,
    UserFollowings
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
      isShow: false,
      followersTweets: dummyData.followersTweets,
      followingsTweets: dummyData.followingsTweets,
      currentView: ''
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
      const { id, account, name, email, image, banner, description, tweetsLength, } = this.currentUser
      this.user = {
        ...this.user,
        id, account, name, email, image, banner, description, tweetsLength, tweets, replyTweets, favoriteTweets
      }
      this.currentView = userId
    },
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    toggleContent(view) {
      this.currentView = view
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

.follow-title {
  width: 100%;
  height: 52px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  align-items: center;

  & .user-followers {
    width: 130px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    cursor: pointer;
  }

  & .user-followings {
    width: 130px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    cursor: pointer;
  }

  & .active {
    border-bottom: 2px solid var(--brand-color);
    color: var(--brand-color);
  }
}
</style>