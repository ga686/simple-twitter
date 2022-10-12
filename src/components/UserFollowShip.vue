<!-- <template>
  <div>
    <div v-for="tweet in followShip" :key="tweet.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="tweet.user.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{tweet.user.name}}</h5>
          <button :class="['btn',{unfollow: !tweet.user.isFollowed}]" @click.prevent.stop="toggleFollow(tweet.user.id)">{{ tweet.user.isFollowed ? '正在跟隨' :
          '跟隨'}}</button>
        </div>
        <div class="comment_wrap_body--content mb-3">{{tweet.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from '../utils/mixins'
export default {
  props: {
    initFollowShip: {
      type: Array,
      required: true,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      followShip: [],
    }
  },
  created() {
    this.fetchData()
  },
  watch:{
    initFollowShip(){
      this.fetchData()
    }  
  },
  methods: {
    fetchData() {
      this.followShip = this.initFollowShip
    },
    toggleFollow(userId) {
      this.followShip.filter((tweet)=>{
        if(tweet.user.id === userId){
          tweet.user.isFollowed = !tweet.user.isFollowed 
        }
      })
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
</style> -->
<template>
  <div>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>