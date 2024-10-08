<template>
  <div>
    <NuxtRouteAnnouncer />
    
  </div>
  <NuxtPage />
</template>

<script lang="ts" setup>
import {useAuth} from 'vue-clerk'
const route = useRoute()

onMounted(async () => {
  console.log("ROUTE", route.fullPath)
  const pathname = route.path
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const unprotectedPaths = [ '/sign-up', '/sign-in']

  if(unprotectedPaths.some(path => pathname.includes(path))) {
    return
  }

  const token = await getToken.value()

  console.log(token)
})

</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

body {
  @apply min-h-screen bg-white dark:bg-cool-950 dark:text-gray-200;
  font-family: "Open Sans", sans-serif;
}
</style>