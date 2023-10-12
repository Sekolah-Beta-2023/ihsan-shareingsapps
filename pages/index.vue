<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isTerbaruActive: true,
      isPopulerActive: false,
      posts: [],
      originalPosts: [],
    }
  },
  async fetch() {
    try {
      const data = await this.$axios.get('/post/getAllPost')
      this.posts = data.data.post
      this.originalPosts = data.data.post
    } catch (error) {
      throw new Error('gagal mengambil data')
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async postPopuler() {
      try {
        const data = await this.$axios.get('/post/getPostByLikes')
        this.posts = data.data.post
      } catch (Error) {
        throw new Error('gagal mengambil data')
      }
    },
    toggleTerbaruButton() {
      this.isTerbaruActive = true
      this.posts = this.originalPosts
      this.isPopulerActive = false
    },
    togglePopulerButton() {
      this.isPopulerActive = true
      this.postPopuler()
      this.isTerbaruActive = false
    },
    postTerbaru() {
      this.posts = this.originalPosts
    },
  },
}
</script>

<template>
  <div class="my-12">
    <navBar />
    <FigurePage />
    <InputStatus />
    <section class="flex flex-col gap-7">
      <div class="text-center gap-4">
        <button
          type="button"
          class="w-28 h-10 m-auto mr-4 border border-black rounded-3xl"
          :class="{
            'bg-[#d9d9d9]': !isTerbaruActive,
            'bg-[your-active-color]': isTerbaruActive,
          }"
          @click="toggleTerbaruButton"
        >
          Terbaru
        </button>
        <button
          type="button"
          class="w-28 h-10 m-auto ml-4 border border-black rounded-3xl"
          :class="{
            'bg-[#d9d9d9]': !isPopulerActive,
            'bg-[your-active-color]': isPopulerActive,
          }"
          @click="togglePopulerButton"
        >
          Populer
        </button>
      </div>
      <div class="text-center">
        <h2>Pesan dari orang orang</h2>
      </div>
      <div
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col w-11/12 m-auto px-10 py-5 border-black border-2 b-radius rounded-3xl"
      >
        <div class="flex gap-7">
          <p class="text-sm">From : {{ post.users.username }}</p>
          <p class="text-sm">To : {{ post.to }}</p>
        </div>
        <div class="my-3">
          <h3>{{ post.content }}</h3>
        </div>
        <div class="text-end">
          <button-likes :id="post.id" />
          <button
            type="button"
            class="p-2 mx-2 bg-[#d9d9d9] border border-black rounded-3xl"
            @click="
              $router.push({
                path: `/post/${post.id}`,
              })
            "
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
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
