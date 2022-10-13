<template>
  <div>
    <div v-for="follower in followers" :key="follower.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="follower.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{follower.name}}</h5>
          <button :class="['btn',{'unfollow': !isFollowed}]" @click.prevent.stop="toggleFollow(follower.id)">{{ isFollowed ? '正在跟隨' :
          '跟隨'}}</button>
        </div>
        <div class="comment_wrap_body--content mb-3">{{follower.introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
import {mapState} from 'vuex'
export default {
  props: {
    initFollowers: {
      type: Array,
      required: true,
      isFollowed: false
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      followers: [],
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created(){
    this.fetchData()
  },
  watch:{
    initFollowers(){
      this.fetchData()
    }  
  },
  methods: {
    fetchData() {
      this.followers = this.initFollowers
    },
    toggleFollow(userId) {
      console.log(userId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
.comment_wrap_body{
  width: 100%;
}
.comment_wrap_body--title {
  justify-content: space-between;
  align-items: center;
}
</style>