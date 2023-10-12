<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      buttonHide: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    toggleHideButton() {
      this.buttonHide = !this.buttonHide
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.error('berhasil logout')
    },
    confirmLogout() {
      this.$swal({
        title: 'Konfirmasi Logout',
        text: 'Apakah Anda yakin ingin logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      })
    },
  },
}
</script>
<template>
  <nav
    class="fixed md:top-10 md:right-10 top-5 right-5 flex flex-col gap-4 z-10"
  >
    <button
      type="button"
      class="w-auto m-auto p-2 border border-black rounded-xl"
      @click="toggleHideButton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
    <div class="relative group">
      <button
        v-if="buttonHide"
        type="button"
        class="w-auto m-auto p-2 border border-black rounded-xl"
        @click="$router.push('/')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-house-door"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"
          />
        </svg>
      </button>
      <div
        class="hidden absolute bg-gray-100 p-1 rounded-lg top-1 left-0 mt-10 group-hover:block"
      >
        home
      </div>
    </div>
    <div v-if="buttonHide && isAuthenticated" class="relative group">
      <button
        type="button"
        class="w-auto m-auto p-2 border border-black rounded-xl"
        @click="confirmLogout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-bar-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
          />
        </svg>
      </button>
      <div
        class="hidden absolute bg-gray-100 p-1 rounded-lg top-1 left-0 mt-10 group-hover:block"
      >
        logout
      </div>
    </div>
    <div v-if="buttonHide && !isAuthenticated" class="relative group">
      <button
        type="button"
        class="w-auto m-auto p-2 border border-black rounded-xl"
        @click="$router.push('/auth/login')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"
          />
        </svg>
      </button>
      <div
        class="hidden absolute bg-gray-100 p-1 rounded-lg top-1 left-0 mt-10 group-hover:block"
      >
        register
      </div>
    </div>
  </nav>
</template>
