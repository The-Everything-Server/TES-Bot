<script setup>
import { useClerk } from 'vue-clerk'

const clerk = useClerk()
</script>

<template>
  <button @click="clerk.openSignIn">
    Sign in
  </button>
</template>