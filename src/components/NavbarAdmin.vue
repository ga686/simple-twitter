<template>
  <div class="navbar ml-auto d-flex justify-content-between">
    <div class="navbar_wrap">
      <div class="navbar_logo"><router-link to="/admin/tweets"><img src="../assets/photos/acLogo.png" /></router-link></div>
      <div class="navbar_item">
        <router-link to="/admin/tweets" class="nav_link">
          <div class="nav_link-icon home"></div>推文清單
        </router-link>
      </div>
      <div class="navbar_item">
        <router-link to="/admin/users" class="nav_link">
          <div class="nav_link-icon user"></div>使用者列表
        </router-link>
      </div>
    </div>
    <div class="navbar_item" @click="logout">
      <router-link to="/admin/signin" class="nav_link">
        <div class="nav_link-icon logout" ></div>登出
      </router-link>    
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default{
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout () {
      this.$store.commit('rmAuthentication')
      this.$router.push('/admin/signin')
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/navbar.scss';
</style>