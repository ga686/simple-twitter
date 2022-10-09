<template>
  <div class="navbar ml-auto d-flex justify-content-between">
    <div class="navbar_wrap">
      <div class="navbar_logo"><router-link to="/homepage"><img src="../assets/photos/acLogo.png" /></router-link></div>
      <div class="navbar_item">
        <router-link to="/homepage" class="nav_link">
          <div class="nav_link-icon home"></div>首頁
        </router-link>
      </div>
      <div class="navbar_item">
        <router-link :to="{name:'userpage',params:{id:currentUser.id}}" class="nav_link">
          <div class="nav_link-icon user"></div>個人資料
        </router-link>
      </div>
      <div class="navbar_item">
        <router-link to="/settings" class="nav_link">
          <div class="nav_link-icon setting"></div>設定
        </router-link>
      </div>
      <div class="navbar_item">
        <div class="btn" @click.stop.prevent="openModal">推文</div>
      </div>
    </div>
    <div class="navbar_item" @click="logout">
      <router-link to="/signin" class="nav_link">
        <div class="nav_link-icon logout" ></div>登出
      </router-link>    
    </div>
    <UserTweetNew :is-show="isShow" @close-modal="closeModal" />
  </div>
</template>

<script>
import UserTweetNew from './UserTweetNew'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  components: {
    UserTweetNew
  },
  methods: {
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    logout () {
      this.$store.commit('rmAuthentication')
      this.$router.push('/signin')
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>