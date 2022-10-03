<template>
  <div class="container">
    <div class="header">
      <img src="./../assets/photos/acLogo.png" alt="" class="logo">
      <h3>登入 Alphitter</h3>
    </div>
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="form-label-group">
        <label for="name">帳號</label>
        <input id="name" name="email" autofocus v-model="name" type="name" class="form-control" placeholder="請輸入帳號"
          autocomplete="name" required>
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input id="password" name="password" v-model="password" type="password" class="form-control" placeholder="請輸入密碼"
          autocomplete="name" required>
      </div>
      <button class="btn">登入</button>
    </form>
    <div class="other-link">
      <router-link to='/signUp'>
        <div class="signup-link"><u>註冊</u></div>
      </router-link>&#x2022;
      <router-link to='/adminsignin'>
        <div class="admin-link"><u>後台登入</u></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password:''
    }
  }
}
</script>

<style lang="scss" scoped>
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
  justify-content: flex-end;
  align-items: center;

  .signup-link {
    width: 32px;
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 400;
    margin-right: 12px;
    color: #0062FF;
    cursor: pointer;
  }
  .admin-link {
    width: 64px;
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 400;
    margin-left: 12px;
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