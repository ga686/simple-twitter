<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/logo.png" alt="" class="logo">
      <h3>登入 Alphitter</h3>
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
      <button class="btn" type="submit" :disabled="isProcessing">登入</button>
    </form>
    <div class="other-link d-flex justify-content-end">
      <router-link to='/signUp'>
        <div class="signup-link"><u>註冊</u></div>
      </router-link>&#x2022;
      <router-link to="/adminsignin">
        <div class="admin-link"><u>後台登入</u></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization';
import { Toast } from '../utils/helpers'

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
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號及密碼'
          })
          return
        }

        this.isProcessing = true

        const { data } = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        if (data.status === 'error') {
          throw new Error()
        }

        this.$store.commit('setCurrentUser', data.user)
        localStorage.setItem('token', data.token)

        Toast.fire({
          icon: 'success',
          title: '登入成功！'
        })

        this.$router.push('/homepage')
        this.isProcessing = false

      } catch (err) {
        this.isProcessing = false
        let message = err.response.data.message

        if (message === "Error: user permission denied") {
          Toast.fire({
            icon: 'warning',
            title: '帳號輸入錯誤'
          })
          this.errorAccount = true
        } else if (message === "Error: The account is incorrect!") {
          Toast.fire({
            icon: 'warning',
            title: '帳號輸入錯誤'
          })
          this.errorAccount = true
        } else if (message === "Error: The password is incorrect!") {
          Toast.fire({
            icon: 'warning',
            title: '密碼輸入錯誤'
          })
          this.errorPassword = true
        }
      }
    }
  },
  watch: {
    account(){
      this.errorAccount = false
    },
    password(){
      this.errorPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin-signIn-Up/style.scss';
</style>