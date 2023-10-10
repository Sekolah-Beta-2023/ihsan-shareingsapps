<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      layout: 'empty',
      post: {
        content: '',
        to: '',
      },
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },

  methods: {
    async createPost() {
      try {
        if (!this.isAuthenticated) {
          return this.isLogin()
        }
        const data = await this.$axios.post('/post/createPost', this.post)
        this.posts = data.data.post
        location.reload()
        this.$toast.success(data.data.message)
      } catch (error) {
        this.$toast.success(error.response.data.message)
      }
    },
    isLogin() {
      this.$swal({
        title: 'Belum Login',
        text: 'Mohon Login terlebih dahulu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Login',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('/auth/login')
        }
      })
    },
  },
}
</script>
<template>
  <section
    class="w-auto text-center border-black border-2 b-radius rounded-3xl md:py-10 md:px-20 py-5 px-3 md:p-0 mx-2"
  >
    <form class="flex flex-col gap-5" @submit.prevent="createPost">
      <div class="text-center">
        <h2>Apa yang ingin kamu sampaikan</h2>
        <br />
        <p>Sampaikan disini</p>
      </div>
      <div class="relative w-full min-w-[200px]">
        <textarea
          v-model="post.content"
          class="p-5 h-full min-h-[150px] w-full rounded-3xl border border-black bg-[#d9d9d9]"
          placeholder=" "
        ></textarea>
      </div>
      <div class="w-72 m-auto">
        <div class="relative h-10 w-full min-w-[200px]">
          <input
            v-model="post.to"
            class="px-5 h-full w-full rounded-3xl border border-black bg-[#d9d9d9]"
            placeholder="Sampaikan Kepada"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-72 h-10 m-auto bg-[#d9d9d9] border border-black rounded-3xl"
      >
        submit
      </button>
    </form>
  </section>
</template>
