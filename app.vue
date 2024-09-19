<template>
  <div>
    <NuxtRouteAnnouncer />
    
  </div>
  <NuxtPage />
</template>

<script lang="ts" setup>
const route = useRoute()

onMounted(() => {
  console.log("ROUTE", route.fullPath)

  if(route.path == "/login") {
    return
  }

  if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null) {
    window.location.href = "/login"
  }
})

</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

body {
  @apply min-h-screen bg-white dark:bg-cool-950 dark:text-gray-200;
  font-family: "Open Sans", sans-serif;
}
</style>