<template>
  <main class="main-view">
    <NavbarLeft/>
    <div class="tweet_list span-2">
      <div class="tweet_list-title">
        <h4>帳戶設定</h4>
      </div>
      <form class="tweet_list-account-form" @submit.prevent.stop="handleSubmit">
        <div class="form-label-group">
          <label for="account">帳號</label>
          <input id="account" name="account" autofocus v-model="account" >
        </div>
        <div class="form-label-group" :class="{overLimit: name.length > 50}">
          <label for="name">名稱</label>
          <input id="name" name="name" autofocus v-model="name" type="text" maxlength="50">
        </div>
        <div class="form-label-group">
          <label for="email">Email</label>
          <input id="email" name="email" autofocus v-model="email" type="email">
        </div>
        <div class="form-label-group">
          <label for="password">密碼</label>
          <input id="password" name="password" autofocus v-model="password" type="password" placeholder="請設定密碼">
        </div>
        <div class="form-label-group">
          <label for="checkPassword">密碼再確認</label>
          <input id="checkPassword" name="checkPassword" autofocus v-model="passwordConfrim" type="password" placeholder="請再次輸入密碼">
        </div>
        <div class="d-flex">
          <button class="btn ml-auto" type="submit" style="width:fit-content" :disabled="isProcessing">{{isProcessing? '儲存變更中...': '儲存'}}</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import NavbarLeft from '../components/NavbarLeft'
import usersAPI from '../apis/users'
import { mapState } from 'vuex'
import { alert } from '../utils/mixins'

export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordConfrim: '',
      isProcessing: false
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
          alert.warning('尚有欄位未填寫')
          return
        }
        
        if (this.password !== this.passwordConfrim ) {
          alert.warning('密碼輸入不一致')
          return
        }

        if (this.name.length > 50 ) {
          alert.warning('名稱不可超過50字')
          return
        }
        this.isProcessing = true
        const form = e.target
        const formData = new FormData(form)


        const { data } = await usersAPI.updateAccount(this.currentUser.id, Object.fromEntries(formData))

        if(data.status === "error"){
          throw new Error(data.message)
        }

        this.$router.push({name: "home-page"})
      }catch(err){
        this.isProcessing = false
        if(err.response.data.message === "Error: Account or email has already exist."){
          alert.error('帳號或信箱已註冊')
          return
        }
        alert.error('無法儲存變更，請稍後再試')
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
@import '../assets/scss/admin-signIn-Up/style.scss';

.warning{
    position: absolute;
    top: 100%;
    font-size: 12px;
  color: var(--error-color);
}

@media (min-width: 992px){
  .span-2{
    grid-column: span 2;
  }
}

@media (min-width: 1140px){
  .span-2{
    grid-column: span 1;
  }
}
</style>