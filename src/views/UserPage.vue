<template>
  <main class="main-view mx-auto">
    <NavbarLeft/>
    <div class="tweet_list_home">
      <div class="tweet_list_home-title">
        <h4>{{user.name}}</h4>
      </div>
    </div>
    <SuggestUser />
  </main>
</template>
<script>
  import NavbarLeft from '../components/NavbarLeft.vue';
  import SuggestUser from '../components/SuggestUser.vue';
import { mapState } from 'vuex';

export default {
  name: 'userPage',
  components: {
    NavbarLeft,
    SuggestUser
  },
  data() {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        email: '',
        image: '',
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    fetchUser(userId) {
      if(this.currentUser.id !== userId){
        return 
      }
      const {id, account, name, email, image } = this.currentUser
      this.user = {
        ...this.user,
        id,account, name, email, image
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tweet_list_home{
    border-right: 1px solid #E6ECF0;
    border-left: 1px solid #E6ECF0;
    overflow: scroll;
    &-title{
      padding: 24px 25px;
      border-bottom: 1px solid #E6ECF0;
    }
    &-box{
      padding: 26px 16px;
      border-bottom: 10px solid #E6ECF0;
      flex-direction: column;
      textarea{
        border-width: 0px;
        height: fit-content;
        font-size: 18px;
        resize: none;
        &::placeholder{
          font-size: 18px;
          font-weight: bold;
          color: var(--secondary-color)
        }
      }
    }
  }
  </style>