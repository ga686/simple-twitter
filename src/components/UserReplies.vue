<template>
  <div>
    <LoadingSpinner v-if=isLoading />
    <template v-else>
      <div v-for="reply in replyTweets" :key="reply.id" class="comment_wrap d-flex">
      <div class="avatar_image"><img :src="initUser.avatar | emptyImage " /></div>
      <div class="comment_wrap_body">
        <div class="d-flex comment_wrap_body--title">
          <h5 class="size-16">{{initUser.name}}</h5>
          <p class="size-14">{{initUser.account | account}}</p>
          ・
          <span class="size-14">{{reply.createdAt | fromNow }}</span>
        </div>
        <div class="replyAccount size-14">回覆 <span><router-link :to="{name:'user-page',params:{id: reply.userData.id}}">{{reply.userData.account | account}}</router-link></span></div>
        <div class="comment_wrap_body--content">{{reply.comment}}</div>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
    data() {
        return {
            isShow: false,
            replyTweets: [],
            isLoading: false,
        };
    },
    props: {
        initUser: {
            type: Object,
            required: true
        }
    },
    mixins: [fromNowFilter, emptyImageFilter, accountFilter],
    computed: {
        ...mapState(["currentUser", "isAuthenticated"])
    },
    created() {
        this.fetchReplies(this.initUser.id);
    },
    methods: {
        async fetchReplies(userId) {
          try{
            this.isLoading = true
            const { data } = await usersAPI.getReplies(userId);
            this.replyTweets = data
            this.isLoading = false
          }
          catch(err){
            console.log(err)
          }
        }
    },
    components: { LoadingSpinner }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/userPage/tweet.scss';

.replyAccount {
  color: var(--secondary-color);
  line-height: 22px;
  & a {
    color: var(--brand-color) !important;
  }
}
</style>
