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
      <div class="btn my-auto" @click.prevent.stop="deleteFollow(followship.id)" v-if="followship.isFollowed">跟隨</div>
      <div class="btn my-auto unfollow" @click.prevent.stop="addFollow(followship.id)" v-else>跟隨</div>
    </div>
  </div>
</template>

<script>
import followshipsAPI from '@/apis/followships'
import { Toast } from '@/utils/helpers'
import { emptyImageFilter } from '../utils/mixins'
import { accountFilter } from './../utils/mixins'

export default{
  data () {
    return {followships: []}
  },
  methods: {
    async fetchFollowShips () {
      try{
        const { data } = await followshipsAPI.getFollowship()
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.followships = data.data
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得推薦，請稍後再試'
        })
      }
    },
    async addFollow (userId) {
      try {
        const { data } = await followshipsAPI.addFollow({userId})

        if(data.status === "error"){
          throw new Error(data.message)
        }

        this.followships = {
          ...this.followships,
          isFollowed: false
        }

        this.followships.filter((followship)=>{
          if( followship.id === userId ){
            followship.isFollowed = true
          }
        })
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollow (userId) {
      try {
        const { data } = await followshipsAPI.deleteFollow({userId})

        if(data.status === "error"){
          throw new Error(data.message)
        }

        this.followships = {
          ...this.followships,
          isFollowed: false
        }

        this.followships.filter((followship)=>{
          if( followship.id === userId ){
            followship.isFollowed = false
          }
        })
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法移除追蹤，請稍後再試'
        })
      }
    },
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