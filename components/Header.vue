<!-- eslint-disable vue/this-in-template -->
<template>
  <header class="w-full h-[68px] bg-white fixed shadow-xl">
    <div
      class="flex justify-center items-center max-w-[1200px] m-auto h-full lg:justify-between"
    >
      <div class="flex items-center">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-[68px] h-full"
        />
        <h1 class="text-dark_primary text-[1.5rem] font-bold tracking-wider">
          MECSENZO
        </h1>
      </div>
      <div class="h-full">
        <div class="main-menu relative flex items-center h-full cursor-pointer">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p
            class="text-dark_bg leading-[1.4rem] text-[1.2rem] h-[1.4rem] ml-4"
          >
            {{ user && user.fullName }}
          </p>
          <fa icon="caret-down" class="text-dark_bg text-[1.2rem] ml-2" />
          <div
            class="sub-menu hidden absolute w-[300px] px-4 py-4 bg-white shadow-xl top-[110%] right-0 rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent"
          >
            <SubMenuItem
              icon="user"
              content="Profile"
              component="button"
              :handle="handleShowProfile"
            />
            <SubMenuItem
              icon="plus"
              content="Add friend"
              to="/add-friend"
              component="nuxt-link"
            />
            <SubMenuItem
              icon="chart-line"
              content="Statistic"
              to="/statistic"
              component="nuxt-link"
            />
            <SubMenuItem
              icon="moon"
              content="Dark mode"
              :is-dark-mode="true"
              component="button"
            />
            <SubMenuItem
              icon="arrow-right-from-bracket"
              content="Logout"
              component="button"
              :handle="handleLogout"
            />
          </div>
        </div>
      </div>
    </div>
    <ModalProfile
      :is-show="isShowModalProfile"
      @closeModal="updateCloseModalProfile"
    />
  </header>
</template>

<script>
import Avatar from './Avatar.vue'
import SubMenuItem from './SubMenuItem.vue'
import ModalProfile from './ModalProfile.vue'

export default {
  components: { Avatar, SubMenuItem, ModalProfile },

  data() {
    return {
      user: null,
      isShowModalProfile: false,
    }
  },
  created() {
    this.setUser()
  },

  methods: {
    setUser() {
      if (process.server) {
        console.log('server run')
      } else {
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    },
    handleLogout() {
      localStorage.removeItem('user')
      this.$store.dispatch('account/clearAccount')
      this.$router.push('/login')
    },
    handleShowProfile() {
      this.isShowModalProfile = true
    },
    updateCloseModalProfile() {
      this.isShowModalProfile = false
    },
  },
}
</script>

<style>
.main-menu:hover .sub-menu {
  display: block;
}
</style>
