<template>
  <div class="ml-5 mt-3 suggest_user_list">
    <div class="suggest_user_list-title">
      <h4>推薦跟隨</h4>
    </div>
    <div class="suggest_user_list-item d-flex">
      <div class="avatar_image"><img src="../assets/empty_image.png"/></div>
      <div class="flex-fill">
        <h5>Pizza Hut</h5>
        <div class="account_name size-14">@pizza_hut</div>
      </div>
      <div class="btn unfollow my-auto">跟隨</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.suggest_user_list{
  background: var(--dark-20);
  border-radius: 16px;
  width: 273px;
  height: fit-content;
  &-title{
    padding: 24px;
    border-bottom: 1px solid #E6ECF0;
  }
  &-item{
    padding: 16px;
  }
  .account_name{
    color: var(--dark-70);
  }
}

</style>