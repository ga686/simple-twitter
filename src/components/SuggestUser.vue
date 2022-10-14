<template>
  <div class="suggest_user" v-if="!isProcessing">
    <div class="ml-5 my-3 suggest_user_list">
      <div class="suggest_user_list-title">
        <h4>推薦跟隨</h4>
      </div>
      <div class="suggest_user_list-item d-flex" v-for="followship in followships" :key="followship.id">
        <div class="avatar_image"><img :src="followship.avatar_image | emptyImage"/></div>
        <div class="flex-fill suggest_user_list-name">
          <h5><router-link :to="{name: 'user-page', params: {id: followship.id}}">{{followship.name}}</router-link></h5>
          <div class="account_name size-14"><router-link :to="{name: 'user-page', params: {id: followship.id}}">{{followship.account | account}}</router-link></div>
        </div>
        <div class="btn my-auto" @click.prevent.stop="deleteFollow(followship.id)" v-if="followship.isFollowed">正在跟隨</div>
        <div class="btn my-auto unfollow" @click.prevent.stop="addFollow(followship.id)" v-else>跟隨</div>
      </div>
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
    return {
      followships: [],
      isProcessing: false
    }
  },
  methods: {
    async fetchFollowShips () {
      try{
        this.isProcessing = true
        const { data } = await followshipsAPI.getFollowship()
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.followships = data.data
        this.isProcessing = false
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得推薦，請稍後再試'
        })
      }
    },
    async addFollow (userId) {
      try {
        const { data } = await followshipsAPI.addFollow(userId)

        if(data.status === "error"){
          throw new Error(data.message)
        }

        this.followships.filter((followship) => {
          if (followship.id === userId) {
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

        this.followships.filter((followship) => {
          if (followship.id === userId) {
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
@import '../assets/scss/suggest-user.scss';
</style>