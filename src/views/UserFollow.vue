<template>
  <main class="main-view mx-auto">
    <NavbarLeft />
    <LoadingSpinner v-if="isLoading"/>
    <div class="user-page" v-else >
      <UserHeader :user='user'/>
      <div class='scroll'>
        <UserProfile :initUserId='user.id' v-if="fullWidth < 991"/>
        <div class="follow-title">
          <div class="user-followers" :class="{active: currentView === 'followers'}"
            @click.prevent.stop="$router.push({path: `/user/follow/followers/${user.id}`})">追蹤者</div>
          <div class="user-followers" :class="{active: currentView === 'followings'}"
            @click.prevent.stop="$router.push({path: `/user/follow/followings/${user.id}`})">正在追隨</div>
        </div>
        <div class="scroll follow">
          <UserFollowers :initFollowers="user.followers" :initUserId="user.id" v-show="currentView === 'followers'" @refresh-following="refreshSuggestUser"/>
          <UserFollowings :init-followings="user.followings" :initUserId="user.id" v-show="currentView === 'followings'" @refresh-following="refreshSuggestUser"/>
        </div>
      </div>
    </div>
    <SuggestUser @refresh-follow="refreshFollowship" @return-refresh-status="refreshSuggestUser" :is-refreshed="refresh"/>
  </main>
</template>
<script>
import NavbarLeft from '../components/NavbarLeft';
import SuggestUser from '../components/SuggestUser';
import { mapState } from 'vuex';
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import UserFollowers from '../components/UserFollowers';
import UserFollowings from '../components/UserFollowings';
import usersAPI from '../apis/users'
import UserHeader from '@/components/UserHeader'
import UserProfile from '@/components/UserProfile';
import LoadingSpinner from '../components/LoadingSpinner'

export default {
  name: 'userFollow',
  components: {
    NavbarLeft,
    SuggestUser,
    UserFollowers,
    UserFollowings,
    UserHeader,
    UserProfile,
    LoadingSpinner
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
      currentView: '',
      fullWidth: 0,
      isLoading: false,
      refresh: false
    }
  },
  created() {
    const { id } = this.$route.params
    const userId = this.$route.params.user
    this.currentView = id
    this.fetchFollow(userId)
    this.fetchFollowing(userId)
  },
  computed: {
    ...mapState(['currentUser']),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    const userId = to.params.user
    this.currentView = id
    if(userId !== -1){
      this.fetchFollow(userId)
    this.fetchFollowing(userId)
    }
    next()
  },
  methods: {
    async fetchFollow(userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getUser(userId)
        const { id, name, Tweets, Followers: followers, isFollowed } = data
        this.user = {
          ...this.user,
          id, name, tweetsLength: Tweets.length, followers, isFollowed
        }
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFollowing(userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getFollowings(userId)
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.user.followings = data
        this.isLoading = false
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
    },
    refreshFollowship() {
      const { user } = this.$route.params
      this.fetchFollowing(user)
    },
    refreshSuggestUser() {
      this.refresh = !this.refresh
    }
  },
  mounted() {
    this.fullWidth = window.innerWidth
    window.onresize = () => {
    this.fullWidth = window.innerWidth
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

@media screen and (min-width:992px) {}

@media(min-width: 1199px) {}
</style>