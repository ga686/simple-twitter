<template>
  <main class="admin-view">
    <NavbarAdmin />
    <div class="admin_box">
      <div class="admin_box-title">
        <h5 class="size-18">使用者列表</h5>
      </div>
      <div class="admin_box_wrap card-wrap">
        <div class="admin_box-item card text-center" v-for="user in users" :key="user.id">
          <div style="position:relative">
            <img class="admin_box-item-banner" :src="user.homeBanner | emptyBanner">
            <div class="admin_box-item-avatar"><img :src="user.avatar | emptyImage"></div>
          </div>
          <div class="admin_box-item-body mt-3">
            <h5>{{ user.name }}</h5>
            <p class="admin-account">{{ user.account | account }}</p>
            <div class="d-flex admin_box-item-actions justify-content-center">
              <div class="d-flex align-items-center mx-3">
                <div class="icon reply"></div>
                <span class="ml-2">{{ user.commentsLength }}</span>
              </div>
              <div class="d-flex align-items-center mx-3">
                <div class="icon liked"></div>
                <span class="ml-2">{{ user.likedLength }}</span>
              </div>
            </div>
            <div class="d-flex admin_box-item-footer justify-content-center">
              <div class="following size-14 mx-2">
                <span>{{ user.followingLength }}個</span>跟隨中
              </div>
              <div class="followers size-14 mx-2">
                <span>{{ user.followerLength }}個</span>跟隨者
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavbarAdmin from '../components/NavbarAdmin'
import { emptyImageFilter } from '@/utils/mixins'
import { accountFilter } from '@/utils/mixins'

const dummyData = {
  users: [
    {
      id: 1,
      account: 'apple1',
      name: 'apple1',
      likedLength: 72,
      commentsLength: 13,
      followerLength: 1000,
      followingLength: 100,
      avatar: null,
      homeBanner: null
    },
    {
      id: 2,
      account: 'apple2',
      name: 'apple2',
      likedLength: 72,
      commentsLength: 13,
      followerLength: 1000,
      followingLength: 100,
      avatar: null,
      homeBanner: null
    },
    {
      id: 3,
      account: 'apple3',
      name: 'apple3',
      likedLength: 72,
      commentsLength: 13,
      followerLength: 1000,
      followingLength: 100,
      avatar: null,
      homeBanner: null
    },
    {
      id: 4,
      account: 'apple4',
      name: 'apple4',
      likedLength: 72,
      commentsLength: 13,
      followerLength: 1000,
      followingLength: 100,
      avatar: null,
      homeBanner: null
    }
  ]
}

export default {
  data () {
    return {
      users: []
    }
  },
  mixins: [ emptyImageFilter , accountFilter ],
  components: {
    NavbarAdmin,
  },
  methods: {
    fetchUsers () {
      return this.users = dummyData.users
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