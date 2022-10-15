<template>
  <div class="navbar ml-auto d-flex justify-content-between">
    <div class="navbar_wrap">
      <div class="navbar_logo"><router-link to="/homepage"><img src="../assets/photos/acLogo.png" /></router-link></div>
      <div class="navbar_item">
        <router-link to="/homepage" class="nav_link">
          <div class="nav_link-icon home"></div><p>首頁</p>
        </router-link>
      </div>
      <div class="navbar_item">
        <router-link :to="{name:'user-page',params:{id:currentUser.id}}" class="nav_link">
          <div class="nav_link-icon user"></div><p>個人資料</p>
        </router-link>
      </div>
      <div class="navbar_item settings-wrap">
        <router-link to="/settings" class="nav_link">
          <div class="nav_link-icon setting"></div><p>設定</p>
        </router-link>
      </div>
      <div class="navbar_item tweet-wrap">
        <div class="btn" @click.stop.prevent="openModal">推文</div>
        <div class="nav_link-icon tweet" @click.stop.prevent="openModal"></div>
      </div>
    </div>
    <div class="navbar_item logout-wrap" @click="logout">
      <div class="nav_link">
        <div class="nav_link-icon logout" ></div><p>登出</p>
      </div>    
    </div>
    <UserTweetNew :is-show="isShow" @close-modal="closeModal" @refresh-tweet="refreshTweet"/>
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
    },
    refreshTweet (data) {
      this.$emit('return-new-data',data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>