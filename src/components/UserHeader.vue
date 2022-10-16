<template>
  <div class="user-header d-flex align-item-center">
    <div class="link-icon" @click.prevent="back()"></div>
    <div class="user-title d-flex justify-content-center">
      <h5 class="user-name">{{user.name}}</h5>
      <div class="user-tweetCounts number-wrap">{{user.tweetsLength | quantifier}}</div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  props:{
    user:{
      name: '',
      tweetsLength: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods:{
    back(){
      this.$router.push('/homepage')
    }
  },
  filters: {
    quantifier(length) {
      return length = length + ' ' + '推文'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/userPage/style.scss';
</style>

