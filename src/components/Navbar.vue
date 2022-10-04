<template>
  <header class="navbar ml-auto">
    <div class="navbar_logo"><img src="../assets/photos/acLogo.png" /></div>
    <div class="navbar_wrap">
      <div class="navbar_item"><router-link to="/home" class="nav_link"><div class="nav_link-icon"><img src="../assets/icon_home.png" /></div>首頁</router-link></div>
      <div class="navbar_item"><router-link to="/" class="nav_link"><div class="nav_link-icon"><img src="../assets/icon_user.png" /></div>個人資料</router-link></div>
      <div class="navbar_item"><router-link to="/" class="nav_link"><div class="nav_link-icon"><img src="../assets/icon_setting.png" /></div>設定</router-link></div>
      <div class="navbar_item"><div class="btn">推文</div></div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar{
  padding: 13px 16px;
  width:178px;
  &_logo{
    width: 40px;
    height: 40px;
  }
  .nav_link{
    display: flex;
    font-size: 18px;
    line-height: 26px;
    font-weight: bold;
    color: var(--dark-90);
    padding:16px 0px;
    &-icon{
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
}

</style>