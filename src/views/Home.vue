<template>
  <main class="main-view">
    <Navbar/>
    <div class="tweet_list_home">
      <div class="tweet_list_home-title">
        <h4>首頁</h4>
      </div>
      <form class="tweet_list_home-box d-flex">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？"></textarea>
        </div>
        <button class="btn ml-auto">推文</button>
      </form>
      <NewestTweets :tweets = "tweets" />
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import Navbar from '../components/Navbar'
import SuggestUser from '../components/SuggestUser'
import NewestTweets from '../components/NewestTweets'


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
      isFavorite: false
    },
    {
      id: 1,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true
    },
    {
      id: 2,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: true
    },
    {
      id: 3,
      content: 'hello world',
      video: null,
      createAt: '2022-10-04',
      account: 'root',
      name: 'root',
      likedLength: 72,
      commentsLength: 13,
      isFavorite: false
    }
  ]
}

export default{
  data(){
    return {
      tweets: [],
      modalIsShow: false,
    }
  },
  components: {
    Navbar,
    SuggestUser,
    NewestTweets,
  },
  methods: {
    fetchComments () {
      return this.tweets = dummyData.tweets 
    }
  },
  created () {
    this.fetchComments()
  }
}
</script>

<style lang="scss" scoped>
.tweet_list_home{
  border-right: 1px solid #E6ECF0;
  border-left: 1px solid #E6ECF0;
  overflow: scroll;
  &-title{
    padding: 24px 25px;
    border-bottom: 1px solid #E6ECF0;
  }
  &-box{
    padding: 26px 16px;
    border-bottom: 10px solid #E6ECF0;
    flex-direction: column;
    textarea{
      border-width: 0px;
      height: fit-content;
      font-size: 18px;
      resize: none;
      &::placeholder{
        font-size: 18px;
        font-weight: bold;
        color: var(--secondary-color)
      }
    }
  }
}
</style>
