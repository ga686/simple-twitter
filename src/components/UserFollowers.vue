<template>
  <div>
    <div v-for="follower in followers" :key="follower.id" class="comment_wrap d-flex">
      <div class="avatar_image"><router-link :to="{name: 'user-page', params: {id: follower.followerId}}"><img :src="follower.avatar | emptyImage " /></router-link></div>
      <div class="comment_wrap_body" :class="{'d-none':isShow}">
        <div class="d-flex comment_wrap_body--title align-items-center">
          <router-link :to="{name: 'user-page', params: {id: follower.followerId}}"><h5 class="size-16" style="line-height: 50px;">{{follower.name}}</h5></router-link>
          <button class="btn" :class="{'unfollow': !follower.isFollowed}" @click.prevent.stop="toggleFollow(follower)">{{
          follower.isFollowed ? '正在跟隨' :
          '跟隨'}}</button>
        </div>
        <div class="comment_wrap_body--content mb-3" v-if="follower.introduction">{{follower.introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import followshipsAPI from '../apis/followships'
import { Toast } from '../utils/helpers'
import PubSub from 'pubsub-js';
export default {
  props: {
    initFollowers: {
      type: Array,
      required: true,
    },
    initUserId:{
      type: Number,
      required: true
    }
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      followers: [],
      isShow: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    if(this.initUserId !== -1){
      this.fetchData(this.initUserId)
    }
  },
  mounted() {
    PubSub.subscribe('isEdit', (msg, show) => {
      this.isShow = show
    })
  },
  watch: {
    initFollowers() {
      if(this.initUserId !== -1){
      this.fetchData(this.initUserId)
    }
    }
  },
  methods: {
    async fetchData(userId) {
      const {data} = await usersAPI.getFollowers(userId)
     this.followers = data

    },
    async toggleFollow(follower) {
      try {
        const followerId = follower.followerId
        if (follower.isFollowed === false) {
          const { data } = await followshipsAPI.addFollow(followerId)
          if (data === 'success') {
            throw new Error(data.message)
          }
          
          Toast.fire({
            icon: 'success',
            title: '成功追蹤'
          })
          follower.isFollowed = !follower.isFollowed
          
        }else{
          const { data } = await followshipsAPI.deleteFollow(followerId)
          if (data === 'success') {
            throw new Error(data.message)
          }
          Toast.fire({
            icon: 'success',
            title: '成功取消追蹤'
          })
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '追蹤失敗，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/followPage/tweet.scss';

.comment_wrap_body {
  width: 100%;
}

.comment_wrap_body--title {
  justify-content: space-between;
  align-items: center;
}
</style>