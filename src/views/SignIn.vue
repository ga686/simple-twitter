<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/logo.png" alt="" class="logo">
      <h3>登入 Alphitter</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="form-label-group" :class="{'errorAccount': errorAccount}">
        <label for="account">帳號</label>
        <input id="account" name="account" autofocus v-model="account" type="name" placeholder="請輸入帳號"
          autocomplete="account">
      </div>
      <div class="form-label-group" :class="{'errorPassword': errorPassword}">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" placeholder="請輸入密碼"
          autocomplete="password">
      </div>
      <button class="btn" type="submit" :disabled="isProcessing">登入</button>
    </form>
    <div class="other-link d-flex justify-content-end">
      <router-link to='/signUp'>
        <div class="signup-link"><u>註冊</u></div>
      </router-link>
      <router-link to="/admin/signin">
        <div class="admin-link"><u>後台登入</u></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization';
import { alert } from './../utils/mixins'

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
          alert.warning('請輸入帳號及密碼')
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

        localStorage.setItem('token', data.token)

        this.$store.commit('setCurrentUser', data.user)

        alert.success('登入成功!')

        this.$router.push('/homepage')
        this.isProcessing = false

      } catch (err) {
        this.isProcessing = false
        let message = err.response.data.message

        if (message === "Error: user permission denied") {
          alert.error('帳號不存在')
          this.errorAccount = true
        } else if (message === "Error: The account is incorrect!") {
          alert.error('帳號輸入錯誤')
          this.errorAccount = true
        } else if (message === "Error: The password is incorrect!") {
          alert.error('密碼輸入錯誤')
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