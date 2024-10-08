// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'vue-clerk/nuxt'],
  devtools: { enabled: true },
  nitro: {
    experimental: {
      database: true
    },
    routeRules: {
      '/api/**': {cors: true, headers: { 'access-control-allow-methods': 'GET' } }
    },
    plugins: ['~/server/db']
  },
  clerk: {
    appearance: {},
  } 
})