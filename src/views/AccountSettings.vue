<template>
  <main class="main-view">
    <NavbarLeft/>
    <div class="tweet_list">
      <div class="tweet_list-title">
        <h4>帳戶設定</h4>
      </div>
      <form class="tweet_list-account-form" @submit.prevent.stop="handleSubmit">
        <div class="form-label-group">
          <label for="account">帳號</label>
          <input id="account" name="account" autofocus v-model="account" >
        </div>
        <div class="form-label-group">
          <label for="name">名稱</label>
          <input id="name" name="name" autofocus v-model="name" type="text">
        </div>
        <div class="form-label-group">
          <label for="email">Email</label>
          <input id="email" name="email" autofocus v-model="email" type="email">
        </div>
        <div class="form-label-group">
          <label for="account">密碼</label>
          <input id="account" name="account" autofocus v-model="password" type="password" placeholder="請設定密碼">
        </div>
        <div class="form-label-group">
          <label for="account">密碼再確認</label>
          <input id="account" name="account" autofocus v-model="passwordConfrim" type="password" placeholder="請再次輸入密碼">
        </div>
        <div class="d-flex">
          <button class="btn ml-auto" type="submit" style="width:fit-content">儲存</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import NavbarLeft from '../components/NavbarLeft'
import usersAPI from '../apis/users'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordConfrim: ''
    }
  },
  components: {
    NavbarLeft,
  },
  methods: {
    getCurrentInfo () {
      this.account = this.currentUser.account
      this.name = this.currentUser.name
      this.email = this.currentUser.email
    },
    async handleSubmit (e) {
      try {
        if(this.account.length === 0 | this.name.length === 0 | this.email.length === 0 | this.password.length === 0 | this.passwordConfrim.length === 0){
          Toast.fire({
            icon: 'warning',
            title: '尚有欄位未填寫'
          })
          return
        }

        if (this.password !== this.passwordConfrim ) {
          Toast.fire({
            icon: 'warning',
            title: '密碼輸入不一致'
          })
          return
        }

        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.updateAccount(this.currentUser.id, formData)

        if(data.status === "error"){
          throw new Error(data.message)
        }

        // this.$router.push({name: "home-page"})
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法更新資料，請稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.getCurrentInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
@import '../assets/scss/admin-signIn-Up/style.scss'
</style>