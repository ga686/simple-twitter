<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <div class="user-page">
      <UserHeader :user='user' />
      <div class="follow-title">
        <div :class="['user-followers', {active: currentView === 'followers'}]"
        @click.prevent.stop="$router.push({path: `/user/follow/followers/${user.id}`})" >追蹤者</div>
        <div :class="['user-followings',{active: currentView === 'followings'}]"
        @click.prevent.stop="$router.push({path: `/user/follow/followings/${user.id}`})">正在追隨</div>
      </div>
      <UserFollowers :initFollowers="user.followers" :initUserId="user.id" v-show="currentView === 'followers'" />
      <UserFollowings :initFollowings="user.followings" v-show="currentView === 'followings'" />
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft.vue';
import SuggestUser from '../components/SuggestUser.vue';
import { mapState } from 'vuex';
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import UserFollowers from '../components/UserFollowers.vue';
import UserFollowings from '../components/UserFollowings.vue';
import usersAPI from '../apis/users'
import UserHeader from '@/components/UserHeader.vue';

export default {
  name: 'userFollow',
  components: {
    NavbarLeft,
    SuggestUser,
    UserFollowers,
    UserFollowings,
    UserHeader
},
  mixins: [emptyImageFilter, accountFilter],
  data() {
    return {
      user: {
        id: -1,
        name: '',
        tweetsLength: 0,
        followers: [],
        followings: [],
      },
      isShow: false,
      currentView: ''
    }
  },
  created() {
    const { id } = this.$route.params
    const userId = this.$route.params.user
    this.currentView = id
    this.fetchFollow(userId)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    const userId = to.params.user
    this.currentView = id
    this.fetchFollow(userId)
    next()
  },
  methods: {
    async fetchFollow(userId) {
      try {
        const { data } = await usersAPI.get(userId)
        const {id, name, Tweets, Followers:followers, Followings:followings} = data
        this.user = {
          ...this.user,
         id, name, tweetsLength: Tweets.length, followers ,followings
        }
      } catch (err) {
        console.log(err)
      }
    },
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    toggleContent(view) {
      this.currentView = view
    }
  },
  filters: {
    quantifier(length) {
      return length = length + ' ' + '推文'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/userPage/style.scss';

.follow-title {
  width: 100%;
  height: 52px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  align-items: center;

  & .user-followers {
    width: 130px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    cursor: pointer;
  }

  & .user-followings {
    width: 130px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    cursor: pointer;
  }

  & .active {
    border-bottom: 2px solid var(--brand-color);
    color: var(--brand-color);
    pointer-events: none;
  }
}
</style>