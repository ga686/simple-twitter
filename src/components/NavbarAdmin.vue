<template>
  <div class="navbar ml-auto d-flex justify-content-between">
    <div class="navbar_wrap">
      <div class="navbar_logo"><router-link to="/admin/tweets"><img src="../assets/photos/acLogo.png" /></router-link></div>
      <div class="navbar_item">
        <router-link to="/admin/tweets" class="nav_link">
          <div class="nav_link-icon home"></div><p>推文清單</p>
        </router-link>
      </div>
      <div class="navbar_item">
        <router-link to="/admin/users" class="nav_link">
          <div class="nav_link-icon user"></div><p>使用者列表</p>
        </router-link>
      </div>
      <div class="navbar_item mobile" @click="logout">
      <div class="nav_link">
        <div class="nav_link-icon logout" ></div><p>登出</p>
      </div>   
    </div>
    </div>
    <div class="navbar_item medium" @click="logout">
      <div class="nav_link">
        <div class="nav_link-icon logout" ></div><p>登出</p>
      </div>   
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