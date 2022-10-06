<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/logo.png" alt="" class="logo">
      <h3>建立你的帳號</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div :class="['form-label-group',{'accountDuplicated':accountDuplicated}]">
        <label for="account">帳號</label>
        <input :blur="checkAccount(account)" id="account" name="account" autofocus v-model="account" type="name"
          placeholder="請輸入帳號" autocomplete="account" required>
      </div>
      <div :class="['form-label-group',{'overLimit':overlimit}]">
        <label for="name">名稱</label>
        <input :blur="checkNameLength()" id="name" name="name" v-model="name" type="name" placeholder="請輸入使用者名稱" autocomplete="name"
          maxlength="50" required>
      </div>
      <div :class="['form-label-group',{'emailDuplicated':emailDuplicated}]">
        <label for="email">Email</label>
        <input :blur="checkEmail(email)" id="email" name="email" v-model="email" type="email" placeholder="請輸入Email"
          autocomplete="email" required>
      </div>
      <div :class="['form-label-group']">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" placeholder="請輸入密碼"
          autocomplete="password" required>
      </div>
      <div :class="['form-label-group',{'errorPassword': errorPassword}]">
        <label for="passwordCheck">密碼確認</label>
        <input :blur="checkPassword()" id="passwordCheck" name="passwordCheck" v-model="passwordCheck" type="password" placeholder="請再次輸入密碼"
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
import { Toast } from '../utils/helpers'

const dummyData = {
  users: [
    {
      id: 1,
      account: 'user1',
      email: 'user1@example.com',
      name: 'ellenlee',
      password: '12345678'
    },
    {
      id: 2,
      account: 'user2',
      email: 'user2@example.com',
      name: 'darrenlin',
      password: '12345678'
    },
    {
      id: 3,
      account: 'user3',
      email: 'user3@example.com',
      name: 'davidlin',
      password: '12345678'
    },
    {
      id: 4,
      account: 'user4',
      email: 'user4@example.com',
      name: 'penny',
      password: '12345678'
    },
    {
      id: 4,
      account: 'user5',
      email: 'user5@example.com',
      name: 'alley',
      password: '12345678'
    }
  ]
}

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
    checkAccount(account) {
      dummyData.users.forEach((user) => {
        if (user.account === account) {
          Toast.fire({
            icon: 'warning',
            title: '帳號已被註冊，請再輸入一次'
          })
          this.accountDuplicated = true
        }
      })
    },
    checkNameLength(){
      if(this.name.length >= 50){
        Toast.fire({
          icon: 'warning',
          title: '字數超出上限！'
        })
        this.overlimit = true
      }
    },
    checkEmail(email) {
      dummyData.users.forEach((user) => {
        if (user.email === email) {
          Toast.fire({
            icon: 'warning',
            title: 'Email已被註冊，請再輸入一次'
          })
          this.emailDuplicated = true
        }
      })
    },
    checkPassword(){
      if(!this.password || !this.passwordCheck){
        this.errorPassword = false
        return
      }
      if(this.passwordCheck !== this.password || this.password !== this.passwordCheck){
        Toast.fire({
          icon: 'warning',
          title: '密碼輸入錯誤，請再試一次！'
        })
        this.errorPassword = true
      }
    },
    handleSubmit() {
      if(!this.account || !this.email || !this.name ||!this.password || !this.passwordCheck){
        Toast.fire({
          icon: 'warning',
          title: '請確認已填寫所有欄位'
        })
        return
      }
      dummyData.users.forEach((user) => {
        if (user.email === this.email) {
          Toast.fire({
            icon: 'warning',
            title: 'Email已被註冊，請再輸入一次'
          })
          this.emailDuplicated = true
        }
        return
      })

      if(this.name.length >= 50){
        Toast.fire({
          icon: 'warning',
          title: '字數超出上限！'
        })
        this.overlimit = true
      }

      if(!this.password || !this.passwordCheck){
        this.errorPassword = false
        return
      }

      if(this.passwordCheck !== this.password || this.password !== this.passwordCheck){
        Toast.fire({
          icon: 'warning',
          title: '密碼輸入錯誤，請再試一次！'
        })
        this.errorPassword = true
        return 
      }
      

      Toast.fire({
        icon: 'success',
        title: '註冊成功！'
      })

      this.$router.push('/signIn')
    },
  },
  watch: {
    account() {
      this.accountDuplicated = false
    },
    name(){
      this.overlimit = false
    },  
    email() {
      this.emailDuplicated = false
    },
    passwordCheck(){
      this.errorPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/admin-signIn-Up/style.scss';
</style>