<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="comment_wrap d-flex" >
      <div class="avatar_image"><img :src="tweet.avatar" /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{tweet.name}}</h5>
          <p class="size-14">{{tweet.account}}</p>
          ・
          <span class="size-14">{{tweet.createAt}}</span>
        </div>
        <div class="comment_wrap_body--content mb-3">{{tweet.content}}</div>
        <div class="comment_wrap_footer d-flex">
          <div class="comment_wrap_footer--comments-num d-flex mr-10">
            <div class="icon my-auto"><img src="../assets/icon_reply.png" /></div>
            <span class="number-wrap">{{tweet.commentsLength}}</span>
          </div>
          <div class="comment_wrap_footer--liked-num d-flex">
            <div class="icon my-auto" :class="{liked: tweet.isFavorite}"><img src="../assets/icon_liked.png" /></div>
            <span class="number-wrap">{{tweet.likedLength}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    tweets:{
      type: Array,
      required: true
    }
  },
}
</script>


<style lang="scss" scoped>
.comment_wrap{
  padding: 24px 16px;
  border-bottom: 1px solid #E6ECF0;
  &_body{
    &--title{
      color: var(--secondary-color);
      line-height: 16px;
      margin-bottom: 10px;
      h5{
        color: var(--dark-100);
        margin-right: 8px;
      }
    }
  }
  &_footer{
    color: var(--secondary-color);
    .icon{
      width: 14px;
      height: 14px;
      margin-right: 9.5px;
    }
  }
}

</style>