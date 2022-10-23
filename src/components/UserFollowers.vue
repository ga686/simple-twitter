<template>
  <div>
    <div v-for="follower in followers" :key="follower.id" class="comment_wrap d-flex">
      <div class="avatar_image"><router-link :to="{name: 'user-page', params: {id: follower.followerId}}"><img :src="follower.avatar | emptyImage " /></router-link></div>
      <div class="comment_wrap_body" :class="{'d-none':isShow}">
        <div class="d-flex comment_wrap_body--title align-items-center">
          <router-link :to="{name: 'user-page', params: {id: follower.followerId}}"><h5 class="size-16" style="line-height: 50px;">{{follower.name}}</h5></router-link>
          <button class="btn" v-if="follower.isFollowed" @click.prevent.stop="deleteFollow(follower.followerId)">正在跟隨</button>
          <button class="btn unfollow" v-else @click.prevent.stop="addFollow(follower.followerId)">跟隨</button>
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
import { alert } from '../utils/mixins'
import PubSub from 'pubsub-js';
export default {
  data() {
    return {
      followers: [],
      isShow: false
    }
  },
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
    async addFollow(followerId) {
      try {       
        const { data } = await followshipsAPI.addFollow(followerId)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.followers.filter((follower) => {
          if(followerId === follower.followerId){
            return follower.isFollowed = true
          }
        })
        this.$emit('refresh-following')
      } catch (err) {
        console.log(err)
        alert.error('追蹤失敗，請稍後再試')
      }
    },
    async deleteFollow(userId) {
      try {       
        const { data } = await followshipsAPI.deleteFollow({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.followers.filter((follower) => {
          if(userId === follower.followerId){
            return follower.isFollowed = false
          }
        })
        this.$emit('refresh-following')
      } catch (err) {
        console.log(err)
        alert.error('移除追蹤失敗，請稍後再試')
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