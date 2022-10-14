<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/logo.png" alt="" class="logo">
      <h3>建立你的帳號</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="form-label-group" :class="{'accountDuplicated':accountDuplicated}">
        <label for="account">帳號</label>
        <input id="account" name="account" autofocus v-model="account" type="name" placeholder="請輸入帳號"
          autocomplete="account" required>
      </div>
      <div class="form-label-group" :class="{'overLimit':overlimit}">
        <label for="name">名稱</label>
        <input id="name" name="name" v-model="name" type="name" placeholder="請輸入使用者名稱" autocomplete="name"
          maxlength="50" required>
      </div>
      <div class="form-label-group" :class="{'emailDuplicated':emailDuplicated}">
        <label for="email">Email</label>
        <input id="email" name="email" v-model="email" type="email" placeholder="請輸入Email" autocomplete="email"
          required>
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" placeholder="請輸入密碼"
          autocomplete="password" required>
      </div>
      <div class="form-label-group" :class="{'errorPassword': errorPassword}">
        <label for="passwordCheck">密碼確認</label>
        <input id="passwordCheck" name="passwordCheck" v-model="passwordCheck" type="password" placeholder="請再次輸入密碼"
          autocomplete="passwordCheck" required>
      </div>
      <button class="btn">註冊</button>
    </form>
    <div class="other-link d-flex justify-content-center">
      <router-link to='/signIn'>
        <div class="btn-cancel"><u>取消重填</u></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      account: '',
      email: '',
      name: '',
      password: '',
      passwordCheck: '',
      accountDuplicated: false,
      emailDuplicated: false,
      errorPassword: false,
      overlimit: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.email || !this.name || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }
        if (this.name.length >= 50) {
          Toast.fire({
            icon: 'warning',
            title: '字數超出上限！'
          })
          this.overlimit = true
          return
        }
        const { data } = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.passwordCheck
        })

        if (data.status === 'error') {
          throw new Error()
        }

        Toast.fire({
          icon: 'success',
          title: '註冊成功'
        })

        this.$router.push('/signin')
      }
      catch (err) {
        const message = err.response.data.message
        if (message === "Error: Account already exists!") {
          Toast.fire({
            icon: 'error',
            title: '帳號已被註冊'
          })
          this.accountDuplicated = true
          this.emailDuplicated = true
          return
        }
        if (message === "Error: Passwords do not match!") {
          Toast.fire({
            icon: 'error',
            title: '密碼輸入有誤'
          })
          this.errorPassword = true
        }
      }
    }
  },
  watch: {
    account() {
      this.accountDuplicated = false
    },
    name() {
      this.overlimit = false
    },
    email() {
      this.emailDuplicated = false
    },
    passwordCheck() {
      this.errorPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin-signIn-Up/style.scss';
</style>