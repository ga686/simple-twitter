<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <div class="tweet_list">
      <div class="tweet_list-title">
        <h4>首頁</h4>
      </div>
      <form class="tweet_list-box d-flex" @submit.prevent.stop="handleSubmit">
        <div class="d-flex">
          <div class="avatar_image"><img :src="currentUser.image" /></div>
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
import {mapState} from 'vuex'
import { Toast } from '../utils/helpers'


const dummyData = {
  tweets: [
    {
      id: 0,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: null
    },
    {
      id: 1,
      content: 'hello world 1',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: null
    },
    {
      id: 2,
      content: 'hello world 2',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true,
      avatar: null
    },
    {
      id: 3,
      content: 'hello world 3',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false,
      avatar: null
    }
  ]
}

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
    fetchComments() {
      return this.tweets = dummyData.tweets
    },
    handleSubmit (e) {
      if (!this.newContent) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文訊息'
        })
        return
      }
      const form = e.target
      const formData = new FormData(form)
      this.newContent = ""
      console.log(formData)
    }
  },
  created() {
    this.fetchComments()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss'
</style>
