<template>
    <div>
    <div class="comment_wrap detail tweet-list d-flex" >
      <div class="comment_wrap_body">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <div>
            <div class="d-flex comment_wrap_body--title align-items-center">
              <h5 class="size-16">root</h5>
              <p class="size-14">@root</p>
              ・
              <span class="size-14">12小時</span>
            </div>
            <div class="d-flex size-14 reply_to">回覆給<p class="reply_to-account ml-1">@apple</p></div>
            <div class="comment_wrap_body--content mb-3 mt-1"><router-link :to="{name: 'tweet', params: { id: 1}}">hello</router-link></div>
          </div>
        </div>
      </div>
      <div class="comment_wrap_body">
        <div class="d-flex">
          <div class="avatar_image"><img src="../assets/empty_image.png" /></div>
          <div>
            <div class="d-flex comment_wrap_body--title align-items-center">
              <h5 class="size-16">root</h5>
              <p class="size-14">@root</p>
              ・
              <span class="size-14">12小時</span>
            </div>
            <div class="d-flex size-14 reply_to">回覆給<p class="reply_to-account ml-1">@apple</p></div>
            <div class="comment_wrap_body--content mb-3 mt-1"><router-link :to="{name: 'tweet', params: { id: 1}}">hello</router-link></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/tweet.scss';
</style>