<script setup>
definePageMeta({
  middleware: 'auth',
  auth: {
    guestRedirectUrl: '/sign-in',
    // permission: 'org:invoices:create',
    // role: 'org:billing'
    // condition: (has) => has('org:invoices:create')
  }
})
</script>

<template>
  <h1>Authenticated only</h1>
</template>