
<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/logo.png" alt="logo" class="logo">
      <h3>後台登入</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div :class="['form-label-group',{'errorAccount': errorAccount}]">
        <label for="account">帳號</label>
        <input id="account" name="account" autofocus v-model="account" type="name" placeholder="請輸入帳號"
          autocomplete="account">
      </div>
      <div :class="['form-label-group',{'errorPassword': errorPassword}]">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" placeholder="請輸入密碼"
          autocomplete="password">
      </div>
      <button class="btn">登入</button>
    </form>
    <div class="other-link d-flex justify-content-end">
      <router-link to='/signIn'>
      <div class="btn-cancel"><u>前台登入</u></div>
    </router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
const dummyData = {
  id: 1,
  account: 'user1',
  password: '12345678',
  isAdmin: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9e1vstA8ybc930xrvOcF8denO4ImYK8',
}

export default {
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false,
      errorAccount: false,
      errorPassword: false
    }
  },
  methods: {
    handleSubmit() {
      if (!this.account || !this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入帳號及密碼'
        })
        this.isInputNull = true
        return
      }

      const user = dummyData
      this.isProcessing = true

      if(user.isAdmin !== true){
        Toast.fire({
          icon: 'error',
          title: '請由前台登入'
        })
        this.account = ''
        this.password = ''
        return 
      }

      if (user.account !== this.account) {
        Toast.fire({
          icon: 'error',
          title: '帳號不存在！'
        })
        this.errorAccount = true
        this.isProcessing = false
        return
      } else if (user.password !== this.password) {
        Toast.fire({
          icon: 'error',
          title: '密碼有誤！'
        })
        this.errorPassword = true
        this.isProcessing = false
        return
      }

      localStorage.setItem('token', dummyData.token)

      Toast.fire({
        icon: 'success',
        title: '登入成功！'
      })
      this.$router.push('/AdminPage')
    }
  },
  watch: {
    account() {
      this.errorAccount = false
    },
    password() {
      this.errorPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin-signIn-Up/basic.scss';

</style>