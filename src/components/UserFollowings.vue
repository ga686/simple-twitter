<template>
  <div>
    <div v-for="following in followings" :key="following.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="following.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{following.name}}</h5>
          <button class="btn" :class="{unfollow: !isFollowed}" @click.prevent.stop="deleteFollowing(following.id)">{{
          isFollowed ? '正在跟隨' :
          '跟隨'}}</button>
        </div>
        <div class="comment_wrap_body--content mb-3">{{following.introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
import { mapState } from 'vuex'
import followshipsAPI from '../apis/followships'
import { Toast } from '../utils/helpers'
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
      isFollowed: true,
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  watch: {
    initFollowings() {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.followings = this.initFollowings
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await followshipsAPI.deleteFollow({userId})
        if(data.status !== 'success'){
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '成功取消追蹤'
        })
        this.followings = this.followings.filter(user=>user.id !== userId)
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗，請稍後再試'
        })
      }

    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/userPage/tweet.scss';

.comment_wrap_body {
  width: 100%;
}

.comment_wrap_body--title {
  justify-content: space-between;
  align-items: center;
}
</style>