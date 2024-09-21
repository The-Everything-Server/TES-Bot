<template>
  <div class="flex flex-row items start h-[calc(100vh-16px)] w-[calc(100vw-8px)]">
    <UCard class="flex flex-col items-start h-full w-[200px] m-2">
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
      </div>
    </UCard>

    <UCard v-if="panelNum == 1" class="flex flex-col h-full w-full my-2">
      <div class="flex flex-col gap-2">
        <p class="text-3xl">Admin Panel</p>
        <UDivider/>
        <UTable :rows="people" />
      </div>
    </UCard> 
  </div>
</template>


<script setup>
const panelNum = ref(0)

const people = [{
  id: 1,
  Hash: '44bd984ef966276ebd6f4ea1738f0ad2e2429aac6a781c60c6904ca0d4dd49ee',
  DiscordID: '192983401095'
}, {
  id: 2,
  Hash: '44bd984ef966276ebd6f4ea1738f0ad2e2429aac6a781c60c6904ca0d4dd49ee',
  DiscordID: '192983401095'
}]

const showPanel = (panel) => {
	panelNum.value = panel
}

onMounted(() => {
  const keys = useStorage("data").getKeys()

  console.log(keys)
})

</script>