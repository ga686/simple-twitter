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
export default {
  props: {
    user: {
      name: '',
      tweetsLength: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    back() {
      if (this.$route.name !== 'user-follow') {
        this.$router.back()
      }else{
        this.$router.push({name:'user-page', params:{id: this.currentUser.id}})
      }
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
.user-header {
  background-color: #ffffff;
  height: 75px;

  & .link-icon {
    background-image: var(--icon-back-arrow);
    background-size: contain;
    background-repeat: no-repeat;
    width: 17px;
    height: 14px;
    margin: auto 19px auto 28px;
    cursor: pointer;
    position: relative;

    a {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  & .user-title {
    flex-direction: column;

    & .user-name {
      font-weight: 700;
      font-size: 18px;
      color: var(--dark-100);
    }

    & .user-tweetCounts {
      font-size: 13px;
      color: var(--secondary-color);
    }
  }
}
</style>

