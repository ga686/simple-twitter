<template>
  <div>
    <div v-for="following in followings" :key="following.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="following.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{following.name}}</h5>
          <button :class="['btn',{unfollow: !following.isFollowed}]" @click.prevent.stop="toggleFollow(following.id)">{{ following.isFollowed ? '正在跟隨' :
          '跟隨'}}</button>
        </div>
        <div class="comment_wrap_body--content mb-3">{{following.introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
export default {
  props: {
    initFollowings: {
      type: Array,
      required: true,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      followings: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.followings = this.initFollowings

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