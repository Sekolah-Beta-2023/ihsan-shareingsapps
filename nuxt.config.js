export default {
  mode: 'spa',
  head: {
    title: 'Shereings',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
      },
    ],
  },

  css: ['~/assets/css/main.css'],

  plugins: [
    { src: '~/plugins/vue-toastification', ssr: false },
    { src: '~/plugins/sweetalert.js', mode: 'client' },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  googleFonts: {
    families: {
      Roboto: true,
      Inter: true,
      Cabin: true,
    },
  },
  axios: {
    baseURL: 'https://shareings-api.cyclic.cloud/',
    // baseURL: 'http://localhost:8000',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.token',
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'data',
          },
          logout: false,
        },
      },
    },
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
