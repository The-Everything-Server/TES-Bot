<template>
  <div class="flex flex-row items start h-[calc(100vh-16px)] w-[calc(100vw-8px)]">
    <UCard class="flex flex-col items-start h-full w-[300px] m-2">
        <div class="space-y-2">
            <img src="../public/tes.jpg" class="rounded-lg"/>
            <p>THE EVERYTHING SERVER</p>
            <UDivider />
            <div class="flex flex-col w-full gap-2">
                <UButton @click="">Account Services</UButton>
                <UButton @click="" color="red">Log out</UButton>
            </div>
        </div>
    </UCard>

    <UCard v-if="panelNum == 0" class="flex flex-col h-full w-full my-2">
        <div class="flex flex-col gap-2">
            <p class="text-3xl">Account Services</p>
            <UDivider />
            <p class="text-2xl">Welcome back, Tobias!</p>
            <div class="flex flex-row gap-2">
                <UCard>
                    <div class="flex flex-col w-[200px] gap-2">
                        <p>Security</p>
                        <UButton>Change Password</UButton>
                        <UButton>Change Discord ID</UButton>
                    </div>
                </UCard>

                <UCard>
                    <div class="flex flex-col w-[200px] gap-2">
                        <p>Game Related</p>
                        <UButton>Redeem Gift Code</UButton>
                        <UButton>Link Account</UButton>
                    </div>
                </UCard>
            </div>
        </div>
    </UCard>

  </div>
</template>


<script setup>
const panelNum = ref(0)
const showPanel = (panel) => {
    panelNum.value = panel
}
</script>