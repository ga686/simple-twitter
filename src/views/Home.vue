<template>
  <main class="main-view">
    <Navbar />
    <div class="tweet_list_home">
      <div class="tweet_list_home-title">
        <h4>首頁</h4>
      </div>
      <form class="tweet_box">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <textarea class="flex-fill my-auto" placeholder="有什麼新鮮事？"></textarea>
        </div>
        <button></button>
      </form>
      <NewestComments />
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import Navbar from '../components/Navbar'
import SuggestUser from '../components/SuggestUser'
import NewestComments from '../components/NewestComments'

export default{
  components: {
    Navbar,
    SuggestUser,
    NewestComments
  }
}
</script>

<style lang="scss" scoped>
.tweet_list_home{
  border-right: 1px solid #E6ECF0;
  border-left: 1px solid #E6ECF0;
  &-title{
    padding: 24px 25px;
    border-bottom: 1px solid #E6ECF0;
  }
}

.tweet_box{
  padding: 26px 16px;
  border-bottom: 10px solid #E6ECF0;
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

</style>
