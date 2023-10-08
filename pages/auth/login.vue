<script>
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'empty',
  data() {
    return {
      inputValue: {
        username: '',
        password: '',
      },
      messageErr: '',
    }
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
    ...mapActions(['setUser']),

    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.inputValue,
        })
        this.$toast.success('Selamat, anda sukses login.')
        this.$router.go('/')
      } catch (e) {
        this.messageErr = e
        this.$toast.error(this.messageErr)
      }
    },
  },
}
</script>

<template>
  <section class="container-auth md:w-[800px] w-full text-center px-5">
    <div>
      <img src="../../assets/image/shinchan login.gif" alt="" class="m-auto" />
      <h1>Login</h1>
    </div>
    <div>
      <form
        class="flex flex-col gap-3 text-start md:w-2/3 w-full m-auto"
        @submit.prevent="login"
      >
        <label for="username">Username :</label>
        <input
          v-model="inputValue.username"
          type="text"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
          required
        />
        <label for="username">Password :</label>
        <input
          v-model="inputValue.password"
          type="password"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
          required
        />
        <br />
        <button
          class="h-10 w-48 m-auto rounded-2xl border-2 border-black px-4 bg-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
