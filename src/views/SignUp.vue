<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/photos/acLogo.png" alt="" class="logo">
      <h3>建立你的帳號</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="form-label-group">
        <label for="name">帳號</label>
        <input id="name" name="email" autofocus v-model="name" type="name" class="form-control" placeholder="請輸入帳號"
          autocomplete="name" required>
      </div>
      <div class="form-label-group">
        <label for="nickname">名稱</label>
        <input id="nickname" name="email" v-model="nickName" type="name" class="form-control" placeholder="請輸入使用者名稱"
          autocomplete="name" required>
      </div>
      <div class="form-label-group">
        <label for="email">Email</label>
        <input id="email" name="email" v-model="email" type="email" class="form-control" placeholder="請輸入Email"
          autocomplete="email" required>
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" class="form-control" placeholder="請輸入密碼"
          autocomplete="name" required>
      </div>
      <div class="form-label-group">
        <label for="passwordCheck">密碼確認</label>
        <input id="passwordCheck" name="passwordCheck" v-model="passwordCheck" type="password" class="form-control"
          placeholder="請再次輸入密碼" autocomplete="passwordCheck" required>
      </div>
      <button class="btn">註冊</button>
    </form>
    <div class="other-link">
      <router-link to='/signIn'>
        <div class="btn-cancel"><u>取消重填</u></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset.scss';

:root {
  --main-color: #FF6600;
  --label-font-family: 'Noto Sans TC';
}

.container {
  width: 375px;
  height: 100vh;
  padding: 0 24px;
  margin: 0 auto;
}

.header {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 29px;

  .logo {
    width: 50px;
    height: 50px;
    margin: 40px auto;
  }

  h3 {
    font-size: 26px;
    font-weight: 700;
    font-family: 'Noto Sans TC';
  }
}

.form-label-group {
  width: 100%;
  height: 54px;
  border-radius: 2px;
  background-color: #F5F8FA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 0 10.5px;
  border-bottom: 2px solid #657786;

  & ::placeholder {
    color: #B5B5BE;
  }

  & label {
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    font-weight: 400;
    font-family: 'Noto Sans TC';
    color: #696974;
  }

  & input {
    border: unset;
    font-size: 16px;
    height: 26px;
    line-height: 26px;
    font-weight: 400;
    font-family: 'Noto Sans TC';
    color: #171725;
  }
}

.form-label-group:hover {
  border-bottom: 2px solid #50B5FF;
}

.btn {
  width: 100%;
  height: 46px;
  border-radius: 50px;
  background-color: #FF6600;
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #FFFFFF;
}

.other-link {
  width: 100%;
  height: 36px;
  margin-top: 1rem;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  .btn-cancel {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 400;
    color: #0062FF;
    cursor: pointer;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 404px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  .container {
    width: 404px;
    margin: 0 auto;
  }
}
</style>