<template>
  <div class="flex flex-row items start h-[calc(100vh-16px)] w-[calc(100vw-8px)]">
    <UCard class="flex flex-col items-start h-full w-[300px] m-2">
      <div class="space-y-2">
        <img src="../public/tes.jpg" class="rounded-lg"/>
        <p>THE EVERYTHING SERVER</p>
        <UDivider />
        <div class="flex flex-col w-full gap-2">
          <UButton @click="showPanel(0)">User Panel</UButton>
          <UButton @click="showPanel(1)">Admin Panel</UButton>
        </div>
      </div>
    </UCard>

    <UCard v-if="panelNum == 0" class="flex flex-col h-full w-full my-2">
      <div class="flex flex-col gap-2">
        <p class="text-3xl">User Panel</p>
        <UDivider />
        <UTable :rows="users" />
      </div>
    </UCard>

    <UCard v-if="panelNum == 1" class="flex flex-col h-full w-full my-2">
      <div class="flex flex-col gap-2">
        <p class="text-3xl">Admin Panel</p>
        <UDivider/>
      </div>
    </UCard> 
  </div>
</template>


<script setup>
import axios from 'axios';

const panelNum = ref(0)
const users = ref([])

const showPanel = (panel) => {
  panelNum.value = panel
}

onMounted(async () => {
  const result = await axios.get("/api/user/admin/")
  console.log("Users", result.data)
  users.value = result.data

  console.log("Users ref", users)
})

</script>