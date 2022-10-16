<template>
  <div>
    <div v-for="following in initFollowings" :key="following.followingId" class="comment_wrap d-flex">
      <div class="avatar_image"><router-link :to="{name: 'user-page', params: {id: following.followingId}}"><img :src="following.avatar | emptyImage " /></router-link></div>
      <div class="comment_wrap_body" :class="{'d-none':isShow}">
        <div class="d-flex comment_wrap_body--title align-items-center">
          <router-link :to="{name: 'user-page', params: {id: following.followingId}}"><h5 class="size-16" style="line-height: 50px;">{{following.name}}</h5></router-link>
          <button class="btn unfollow" v-if="!following.isFollowed"  @click.prevent.stop="addFollowing(following.followingId)">跟隨</button>
          <button class="btn" v-else @click.prevent.stop="deleteFollowing(following.followingId)">正在跟隨</button>
        </div>
        <div class="comment_wrap_body--content mb-3" v-if="following.introduction">{{following.introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
import { mapState } from 'vuex'
import followshipsAPI from '../apis/followships'
import { Toast } from '../utils/helpers'
import PubSub from 'pubsub-js';
export default {
  props: {
    initFollowings: {
      type: Array,
      required: true,
    }
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      followings: [],
      isFollowed: true,
      isShow: false
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    PubSub.subscribe('isEdit', (msg, show) => {
      this.isShow = show
    })
  },
  methods: {
    fetchData() {
      if(this.initFollowings !== -1){
        this.followings = this.initFollowings
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await followshipsAPI.deleteFollow({userId})
        if(data.status === 'error'){
          throw new Error(data.message)
        }
        this.followings.filter((following) => {
          if(userId === following.followingId){
            return following.isFollowed = false
          }
        })
     
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗，請稍後再試'
        })
      }

    },
    async addFollowing(userId) {
      try{  
        console.log(userId)
        const { data } = await followshipsAPI.addFollow(userId)
        if (data === 'error') {
          throw new Error(data.message)
        }
        this.followings.filter((following) => {
          if(userId === following.followingId){
            following.isFollowed = true
          }
        })
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試',
          background: '#FC5A5A',
          iconColor: '#fff',
          customClass: {
            container: 'sweetalert2-error-pop',
          },
        })
      }
    },
  },
  watch: {
    initFollowings: function (){
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';

.comment_wrap_body {
  width: 100%;
}

.comment_wrap_body--title {
  justify-content: space-between;
  align-items: center;
}
</style>