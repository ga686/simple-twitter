<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
        <h5>編輯個人資訊</h5><button type="submit" form="profile-box" class="btn">儲存</button>
      </div>
      <form class="profile-box" id="profile-box" @submit.prevent.stop="handleSubmit">
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
          <img :src="user.banner | emptyBanner" alt="" />
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
          <label for="description">自我介紹</label>
          <textarea id="description" name="description" cols="30" rows="10" v-model="user.description" maxlength="170"></textarea>
        </div>
        <p class="input-length">{{user.description.length}}/170</p>
      </form>
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/users'
import { emptyImageFilter } from '@/utils/mixins'
import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'
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
      user: {},
      description: ''
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
      this.description = this.currentUser.introduction
      this.user = {   
        ...this.user,
        description: this.description
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
    async handleSubmit(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.updateProfile(this.initUser.id, formData)
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.closeModal()
        this.$emit('refresh-user',this.user.id)
      }catch(err){
        console.error(err)
        Toast.fire({
          icon: 'warning',
          title: '無法變更使用者資訊，請稍後再試'
        })
      }
    }
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/userPage/modal.scss';
</style>
