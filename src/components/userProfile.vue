<template>
  <div>
    <UserEdit :is-show="isShow" :initUser="user" @close-modal="closeModal" @refresh-user="refreshUser" />
    <div class="scroll">
      <div class="user-profile">
        <div class="user-banner">
          <img :src="user.coverPhoto | emptyBanner" alt="">
        </div>
        <div class="avatar">
          <img :src="user.avatar | emptyImage" alt="">
        </div>
        <div class="d-flex justify-content-end btn-wrap">
          <div class="btn email" v-show="user.id !== currentUser.id"><a :href="`mailto:${user.email}`"></a></div>
          <div class="btn notify" v-show="user.id !== currentUser.id"></div>
          <div class="user-setting" @click.stop.prevent="openModal" v-show="user.id === currentUser.id">編輯個人資料</div>
          <div class="btn unfollow " v-if="user.id !== currentUser.id && !user.isFollowed"
            @click.prevent.stop="addFollow(user.id)">追蹤</div>
          <div class="btn" v-if="user.id !== currentUser.id && user.isFollowed"
            @click.prevent.stop="deleteFollow(user.id)">正在追蹤</div>
        </div>
        <div class="user-info">
          <h5>{{user.name}}</h5>
          <div class="user-account number-wrap">{{user.account | account}}</div>
          <div class="user-decription number-wrap">{{user.introduction}}</div>
          <div class="user-follow d-flex number-wrap">
            <div class="user-info-following" @click.prevent.stop="toFollowPage('followings')">
              <span>{{user.followingCount}}</span> 個跟隨中
            </div>
            <div class="user-info-follower" @click.prevent.stop="toFollowPage('followers')">
              <span>{{user.followerCount}}</span> 位跟隨者
            </div>
          </div>
        </div>
        <div class="togglePage d-flex" v-show="this.$route.name === 'user-page'">
          <div @click.prevent.stop="togglePage('userTweets')" class="userTweets"
            :class="{'active':currentContent === 'userTweets'}">推文</div>
          <div @click.prevent.stop="togglePage('userReplies')" class="userTweets"
            :class="{'active':currentContent === 'userReplies'}">回覆</div>
          <div @click.prevent.stop="togglePage('userLikes')" class="userTweets"
            :class="{'active':currentContent === 'userLikes'}">喜歡的內容</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserEdit from '@/components/UserEdit.vue'
import followshipsAPI from '@/apis/followships'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex';
import { emptyImageFilter } from './../utils/mixins'
import { accountFilter } from './../utils/mixins'
import usersAPI from '../apis/users'

export default {
  name: 'userProfile',
  components: {
    UserEdit,
  },
  props: {
    initUserId: {
      type: Number,
    }
  },
  mixins: [emptyImageFilter, accountFilter],
  data() {
    return {
      user: {
        id: -1,
        account: '',
        email: '',
        name: '',
        password: '',
        role: '',
        avatar: '',
        coverPhoto: '',
        introduction: '',
        followerCount: 0,
        followingCount: 0,
        tweetsLength: 0,
        isFollowed: false
      },
      currentContent: 'userTweets',
      isShow: false,
      isLoading: false
    }
  },
  created() {
    if (this.initUserId !== -1) {
      this.fetchUser(this.initUserId)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initUserId() {
      this.fetchUser(this.initUserId)
    }
  },
  methods: {
    async fetchUser(userId) {
      this.isLoading = true
      const { data } = await usersAPI.getUser(userId)
      const { id, account, name, email, avatar, coverPhoto, introduction, followerCount, followingCount, Tweets, isFollowed } = data
      this.user = {
        ...this.user,
        id, account, name, email, avatar, coverPhoto, introduction, followerCount, followingCount, tweetsLength: Tweets ? Tweets.length : 0, isFollowed
      }
      this.isLoading = false
    },
    togglePage(content) {
      this.currentContent = content
    },
    openModal() {
      return this.isShow = true
    },
    closeModal(show) {
      return this.isShow = show
    },
    async addFollow(userId) {
      try {
        const { data } = await followshipsAPI.addFollow(userId)

        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.user.isFollowed = true
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollow(userId) {
      try {
        const { data } = await followshipsAPI.deleteFollow({ userId })

        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.user.isFollowed = false
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法移除追蹤，請稍後再試'
        })
      }
    },
    refreshUser(userId) {
      this.fetchUser(userId)
    },
    toFollowPage(page) {
      if (this.$route.name === 'user-follow') {
        return
      } else {
        this.$router.push({ path: `/user/follow/${page}/${this.user.id}` })
      }
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

.active {
  pointer-events: none;
}
</style>