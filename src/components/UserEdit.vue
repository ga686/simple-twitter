<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
        <h5>編輯個人資訊</h5><button class="btn">儲存</button>
      </div>
      <form class="profile-box">
        <div class="user-banner">
          <div class="filter"></div>
          <div class="icons">
            <label for="banner">
              <img class="icon-photo" src="~@/assets/icon_photo.png" alt="">
            </label>
            <input class="banner-edit" type="file" id="banner" accept="image/*" name="banner"
              @change="handleFileChange">
            <i class="icon-edit-done" @click.prevent.stop="user.banner = initUser.banner"></i>
          </div>
          <img :src="user.banner | emptyImage" alt="" />
        </div>
        <div class="avatar">
          <div class="filter"></div>
          <label for="avatar">
            <img class="icon-photo" src="~@/assets/icon_photo.png" alt="">
          </label>
          <input class="avatar-edit" type="file" id="avatar" accept="image/*" name="avatar" @change="handleFileChange">
          <img :src="user.avatar | emptyImage" alt="" />
        </div>
        <div class="user-name">
          <label for="">名稱</label>
          <input type="text" id="name" name="name" v-model="user.name" maxlength="50" />
        </div>
        <p class="input-length">{{user.name.length}}/50</p>
        <div class="user-description">
          <label for="">自我介紹</label>
          <textarea name="description" cols="30" rows="10" v-model="user.description" maxlength="170"></textarea>
        </div>
        <p class="input-length">{{user.description.length}}/170</p>
      </form>
    </div>
  </div>
</template>

<script>
const dummyData = {
  description: 'John Doe : )'
}
import { emptyImageFilter } from '@/utils/mixins'
import { mapState } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
    },
    initUser: {
      type: Object,
      required: true,
    }
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.user = this.initUser
      this.user = {
        ...this.user,
        description: dummyData.description
      }
    },
    closeModal() {
      this.$emit('close-modal', !this.isShow)
    },
    handleFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.image = ''
        return
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        if(e.target.name === 'banner'){
          this.user.banner = imageURL
        }else if(e.target.name === 'avatar'){
          this.user.avatar = imageURL
        }
      }
    },
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/userPage/modal.scss';
</style>
