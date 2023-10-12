<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      posts: {
        id: this.$route.params.id,
        content: '',
        userId: '',
        to: '',
        comments: [],
      },
      comments: {
        comment: '',
      },
    }
  },
  async fetch() {
    const data = await this.$axios.get('/post/getPostById/' + this.posts.id)
    this.posts.content = data.data.data.content
    this.posts.to = data.data.data.to
    this.posts.userId = data.data.data.userId
    this.posts.username = data.data.data.users.username
    this.posts.comments = data.data.data.comments
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async changeData() {
      const data = await this.$axios.get('/post/getPostById/' + this.posts.id)
      this.posts.content = data.data.data.content
      this.posts.to = data.data.data.to
      this.posts.userId = data.data.data.userId
      this.posts.username = data.data.data.users.username
      this.posts.comments = data.data.data.comments
    },
    async createComment() {
      try {
        if (!this.isAuthenticated) {
          return this.isLogin()
        }
        const data = await this.$axios.post(
          '/comment/createComment/' + this.$route.params.id,
          this.comments
        )
        this.changeData()
        this.$toast.success(data.data.message)
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
      this.comments.comment = ''
    },
    async deleteComment(id) {
      try {
        const data = await this.$axios.delete(
          '/comment/deleteCommentById/' + id
        )
        this.$toast.success(data.data.message)
        this.changeData()
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    async deletePost(id) {
      try {
        const data = await this.$axios.delete('/post/deletePostById/' + id)
        this.$toast.success(data.data.message)
        this.$router.push('/')
      } catch (error) {
        this.$toast.error(error.response.data.message)
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
    isDeleteComment(id) {
      this.$swal({
        title: 'Delete Comment',
        text: 'Yakin ingin menghapus komen ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteComment(id)
        }
      })
    },
    isDeletePost(id) {
      this.$swal({
        title: 'Delete Post',
        text: 'Yakin ingin menghapus Post ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePost(id)
        }
      })
    },
  },
}
</script>

<template>
  <section class="flex flex-col gap-7">
    <div
      class="fixed md:top-10 md:right-10 top-5 right-5 z-10 flex flex-col gap-4"
    >
      <button
        type="button"
        class="w-auto m-auto p-2 border border-black rounded-xl"
        @click="$router.go(-1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-90deg-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
          />
        </svg>
      </button>
    </div>

    <div
      class="flex flex-col w-11/12 m-auto px-10 py-5 border-black border-2 b-radius rounded-3xl"
    >
      <div class="flex gap-7">
        <p class="text-sm">From : {{ posts.username }}</p>
        <p class="text-sm">To : {{ posts.to }}</p>
      </div>
      <div class="my-3">
        <h3>{{ posts.content }}</h3>
      </div>
      <div class="text-end">
        <button-likes :id="Number(posts.id)" />
        <button
          v-if="loggedInUser && loggedInUser.id === posts.userId"
          type="button"
          class="p-2 mx-2 bg-[#d9d9d9] border border-black rounded-3xl"
          @click="isDeletePost(posts.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="w-11/12 m-auto px-16 py-5">
      <h2>Tulis Komentarmu</h2>
    </div>
    <form
      class="flex flex-col w-11/12 m-auto px-16 py-5"
      @submit.prevent="createComment"
    >
      <div class="relative w-full min-w-[200px]">
        <textarea
          v-model="comments.comment"
          class="p-5 h-full min-h-[150px] w-full rounded-3xl border border-black bg-[#d9d9d9]"
          placeholder=" "
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="p-2 mx-2 bg-[#d9d9d9] border border-black rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
    <div class="w-11/12 m-auto px-16 py-5">
      <h2>Balasan dari orang lain</h2>
    </div>
    <div
      v-for="comment in posts.comments"
      :key="comment.id"
      class="flex flex-col w-11/12 m-auto px-10 py-5 border-black border-2 b-radius rounded-3xl"
    >
      <div class="flex">
        <p class="text-sm">From : {{ comment.user.username }}</p>
      </div>
      <div class="my-1">
        <h3>{{ comment.comment }}</h3>
      </div>
      <div class="text-end">
        <button
          v-if="loggedInUser && comment.userId === loggedInUser.id"
          type="button"
          class="p-2 mx-2 bg-[#d9d9d9] border border-black rounded-3xl"
          @click="isDeleteComment(comment.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
