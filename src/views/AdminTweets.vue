<template>
  <main class="admin-view">
    <NavbarAdmin />
    <div class="admin_box">
      <div class="admin_box-title">
        <h5 class="size-18">推文清單</h5>
      </div>
      <div class="admin_box_wrap">
        <div class="admin_box_wrap-item d-flex" v-for="tweet in tweets" :key="tweet.id">
          <div class="d-flex flex-fill">
            <div class="avatar_image"><img :src="tweet.avatar | emptyImage" /></div>
            <div>
              <div class="d-flex admin_box_wrap-title align-items-center">
                <h5 class="size-16">{{ tweet.name }}</h5>
                <p class="size-14 ml-1">{{ tweet.account | account }}</p>
                ・
                <span class="size-14">{{ tweet.createAt | fromNow }}</span>
              </div>
              <div class="mb-3 mt-1 admin_box_wrap-content">{{ tweet.content }}</div>
            </div>
          </div>
          <div class="tweet-delete-btn" @click.stop.prevent = "deleteTweet(tweet.id)"><i class="fa-solid fa-xmark size-20"></i></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavbarAdmin from '../components/NavbarAdmin'
import { emptyImageFilter } from '@/utils/mixins'
import { fromNowFilter } from '@/utils/mixins'
import { accountFilter } from '../utils/mixins'

const dummyData = {
  tweets: [
    {
      id: 0,
      content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
      video: null,
      createAt: '2022-10-04',
      account: 'root1',
      name: 'root1',
      avatar: null
    },
    {
      id: 1,
      content: 'hello world 1',
      video: null,
      createAt: '2022-10-04',
      account: 'root2',
      name: 'root2',
      avatar: null
    },
    {
      id: 2,
      content: 'hello world 2',
      video: null,
      createAt: '2022-10-04',
      account: 'root3',
      name: 'root3',
      avatar: null
    },
    {
      id: 3,
      content: 'hello world 3',
      video: null,
      createAt: '2022-10-04',
      account: 'root4',
      name: 'root4',
      avatar: null
    }
  ]
}

export default {
  data () {
    return{
      tweets: []
    }
  },
  components: {
    NavbarAdmin,
  },
  mixins:[ emptyImageFilter , fromNowFilter , accountFilter ],
  methods: {
    fetchTweets () {
      return this.tweets = dummyData.tweets
    },
    deleteTweet (tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
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