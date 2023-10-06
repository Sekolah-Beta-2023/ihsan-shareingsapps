<script>
export default {
  layout: 'empty',
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        gender: '',
      },
      messageErr: '',
    }
  },
  methods: {
    async register() {
      const data = await this.$axios.post('/auth/register', this.registerData)
      this.showNotification(data.data.message)
      setTimeout(() => {
        this.$router.push('/auth/login')
      }, '2000')
    },
    showNotification(message) {
      this.$notify({
        title: 'Notifikasi',
        text: message,
        type: 'success',
      })
    },
  },
  handleFocus() {
    if (this.messageErr !== '') this.messageErr = ''
  },
}
</script>
<template>
  <section class="container-auth md:w-[800px] w-full text-center px-5">
    <notifications />
    <div>
      <img
        src="../../assets/image/shinchan login.gif"
        alt=""
        class="m-auto max-h-52"
      />
      <h1>Register</h1>
    </div>
    <div>
      <form
        class="flex flex-col gap-3 text-start md:w-2/3 w-full m-auto"
        @submit.prevent="register"
      >
        <label for="username">Username :</label>
        <input
          v-model="registerData.username"
          type="text"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
          required
        />
        <label for="username">Password :</label>
        <input
          v-model="registerData.password"
          type="password"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
          required
        />
        <label>Gender :</label>
        <select
          id="genderSelect"
          v-model="registerData.gender"
          name="genderSelect"
          class="w-full border rounded-3xl py-2 px-3 bg-[#d9d9d9] border-black appearance-none"
          required
        >
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">perempuan</option>
        </select>
        <br />
        <button
          type="submit"
          class="h-10 w-48 m-auto rounded-2xl border-2 border-black px-4 bg-[#d9d9d9] cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
