<template>
  <div class="ml-5 mt-3 suggest_user_list">
    <div class="suggest_user_list-title">
      <h4>推薦跟隨</h4>
    </div>
    <div class="suggest_user_list-item d-flex" v-for="followship in followships" :key="followship.id">
      <div class="avatar_image"><img :src="followship.avatar_image | emptyImage"/></div>
      <div class="flex-fill suggest_user_list-name">
        <h5>{{followship.name}}</h5>
        <div class="account_name size-14">{{followship.account | account}}</div>
      </div>
      <div class="btn my-auto" :class="{unfollow: !followship.isFollowed}" @click.prevent.stop="toggleFollow(followship.id)">{{ followship.isFollowed ? '正在跟隨' : '跟隨'}}</div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins'
import { accountFilter } from './../utils/mixins'

const dummyData = {
 followships:[
    {
      id: 1,
      account: 'root',
      name: 'root',
      followerLength: 100,
      isFollowed: true,
      avatar_image: null
    },
    {
      id: 2,
      account: 'root',
      name: 'root',
      followerLength: 90,
      isFollowed: true,
      avatar_image: null
    },
    {
      id: 25,
      account: 'root24343',
      name: 'root24343',
      followerLength: 50,
      isFollowed: false,
      avatar_image: null
    },
    {
      id: 37,
      account: 'root8888888990',
      name: 'root8888888990',
      followerLength: 30,
      isFollowed: false,
      avatar_image: null
    }
  ]
}

export default{
  data () {
    return {followships: []}
  },
  methods: {
    fetchFollowShips () {
      return this.followships = dummyData.followships
    },
    toggleFollow (userId) {
      this.followships.filter((followship)=>{
        if( followship.id === userId ){
          followship.isFollowed = !followship.isFollowed
        }
      })
    }
  },
  mixins: [emptyImageFilter,accountFilter],
  created () {
    this.fetchFollowShips()
  }
}

</script>


<style lang="scss" scoped>
.suggest_user_list{
  background: var(--dark-20);
  border-radius: 16px;
  width: 273px;
  height: fit-content;
  &-title{
    padding: 24px;
    border-bottom: 1px solid #E6ECF0;
  }
  &-item{
    padding: 16px;
    flex-wrap: wrap;
  }
  &-name{
    overflow: hidden;
    h5,.account_name{
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .account_name{
      color: var(--dark-70);
    }
  }
}

</style>