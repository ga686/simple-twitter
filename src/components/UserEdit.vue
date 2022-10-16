<template>
  <div class="modal" :class="{show: isShow}">
    <div class="modal_container mx-auto">
      <div class="modal_container-header d-flex">
        <div class="cancel-btn" @click.stop.prevent="closeModal">
          <div class="link-icon" @click.stop.prevent="closeModal"></div>
          <i class="fa-solid fa-xmark size-32"></i>
        </div>
        <h5>編輯個人資訊</h5><button type="submit" form="profile-box" class="btn" :disabled="isProcessing">儲存</button>
      </div>
      <form class="profile-box" id="profile-box" @submit.prevent.stop="handleSubmit">
        <div class="user-banner">
          <div class="filter"></div>
          <div class="icons">
            <label for="coverPhoto">
              <img class="icon-photo" src="~@/assets/icon_photo.png" alt="">
            </label>
            <input class="banner-edit" type="file" id="coverPhoto" accept="image/*" name="coverPhoto"
              @change="handleFileChange">
            <i class="icon-edit-done" @click.prevent.stop="defaultCover(currentUser.coverPhoto)"></i>
          </div>
          <img :src="user.coverPhoto | emptyBanner" alt="" />
        </div>
        <div class="avatar">
          <div class="filter"></div>
          <label for="avatar">
            <img class="icon-photo" src="~@/assets/icon_photo.png" alt="">
          </label>
          <input class="avatar-edit" type="file" id="avatar" accept="image/*" name="avatar" @change="handleFileChange">
          <img :src="user.avatar | emptyImage" alt="" />
        </div>
        <div class="user-name" :class="{error: user.name.length > 50}">
          <label for="">名稱</label>
          <input type="text" id="name" name="name" v-model="user.name" maxlength="50" required/>
        </div>
        <p class="input-length" :class="{error: user.name.length > 50}">{{user.name.length}}/50</p>
        <div class="user-description"  :class="{error: user.introduction.length > 160}">
          <label for="introduction">自我介紹</label>
          <textarea id="introduction" name="introduction" cols="30" rows="10" v-model="user.introduction" maxlength="160" required></textarea>
        </div>
        <p class="input-length" :class="{error: user.introduction.length > 160}">{{user.introduction.length || 0}}/160</p>
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
      introduction: '',
      isProcessing: false
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
      this.introduction = this.currentUser.introduction
      this.user = {   
        ...this.user,
        introduction: this.introduction ? this.introduction : ''
      }
    },
    closeModal() {
      this.$emit('close-modal', !this.isShow)
      this.user.name = this.initUser.name
      this.user.avatar = this.initUser.avatar
      this.user.coverPhoto = this.initUser.coverPhoto
      this.user.introduction = this.initUser.introduction || 'type something here...'
    },
    back(){
      if (this.$route.name !== 'user-follow') {
        this.$router.back()
      }else{
        this.$router.push({name:'user-page', params:{id: this.currentUser.id}})
      }
    },
    handleFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.image = ''
        return
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        if(e.target.name === 'coverPhoto'){
          this.user.coverPhoto = imageURL
        }else if(e.target.name === 'avatar'){
          this.user.avatar = imageURL
        }
      }
    },
    async handleSubmit(e) {
      try {
        if(this.user.name.length === 0 || this.user.introduction.length === 0){
          Toast.fire({
            icon: 'warning',
            title: '內容不可空白',
            background: '#FF6600',
            iconColor: '#fff',
            customClass: {
            container: 'sweetalert2-warning-pop',
            },
          })
          return
        }

        if(this.user.name.length > 50 || this.user.introduction.length > 160){
          Toast.fire({
            icon: 'warning',
            title: '字數超過限制',
            background: '#FF6600',
            iconColor: '#fff',
            customClass: {
            container: 'sweetalert2-warning-pop',
            },
          })
          return
        }

        this.isProcessing = true
        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.updateProfile(this.initUser.id, formData)
        if(data.status === "error"){
          throw new Error(data.message)
        }
        this.closeModal()
        this.$emit('refresh-user',this.user.id)
        this.isProcessing = false
      }catch(err){
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法儲存變更，請稍後再試',
          background: '#FC5A5A',
          iconColor: '#fff',
          customClass: {
            container: 'sweetalert2-error-pop',
          },
        })
      }
    },
    defaultCover(data) {
      this.user.coverPhoto = data
    }
  },
  watch: {
    /* eslint-disable */
    initUser(newvalue, oldValue) {
      this.user = {
        ...this.user,
        ...newvalue
      }
    }
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/userPage/modal.scss';
</style>