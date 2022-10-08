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
      const { id, account, name, email, image, banner, description, tweetsLength, } = this.currentUser
      this.user = {
        ...this.user,
        id, account, name, email, image, banner, description, tweetsLength, tweets, replyTweets, favoriteTweets
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