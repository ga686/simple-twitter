<template>
  <main class="admin-view">
    <NavbarAdmin />
    <LoadingSpinner v-if="isProcessing"/>
    <template v-else>
      <div class="admin_box">
        <div class="admin_box-title">
          <h5 class="size-18">使用者列表</h5>
        </div>
        <div class="admin_box_wrap card-wrap">
          <div class="admin_box-item card text-center" v-for="user in users" :key="user.id">
            <div style="position:relative">
              <img class="admin_box-item-banner" :src="user.coverPhoto | emptyBanner">
              <div class="admin_box-item-avatar"><img :src="user.avatar | emptyImage"></div>
            </div>
            <div class="admin_box-item-body mt-3">
              <h5>{{ user.name }}</h5>
              <p class="admin-account">{{ user.account | account }}</p>
              <div class="d-flex admin_box-item-actions justify-content-center">
                <div class="d-flex align-items-center mx-3">
                  <div class="icon reply"></div>
                  <span class="ml-2">{{ user.TweetsCount }}</span>
                </div>
                <div class="d-flex align-items-center mx-3">
                  <div class="icon liked"></div>
                  <span class="ml-2">{{ user.LikedCount }}</span>
                </div>
              </div>
              <div class="d-flex admin_box-item-footer justify-content-center">
                <div class="following size-14 mx-2">
                  <span>{{ user.FollowingsCount }}個</span>跟隨中
                </div>
                <div class="followers size-14 mx-2">
                  <span>{{ user.FollowersCount }}個</span>跟隨者
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import NavbarAdmin from '../components/NavbarAdmin'
import adminAPI from '../apis/admin'
import LoadingSpinner from '../components/LoadingSpinner'
import { emptyImageFilter } from '@/utils/mixins'
import { accountFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return {
      users: [],
      isProcessing: false
    }
  },
  mixins: [ emptyImageFilter , accountFilter ],
  components: {
    NavbarAdmin,
    LoadingSpinner
  },
  methods: {
    async fetchUsers () {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.getAllUsers()
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.users = data
        this.isProcessing = false
      }catch (err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin.scss';
</style>