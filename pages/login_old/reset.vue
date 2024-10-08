<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <UCard class="space-y-4">
            <div class="space-y-4">
                <p>Reset Page</p>
                <UDivider/>
                <UInput type="text" placeholder="Discord ID" v-model="discordId"/>
                
                <UButton @click="submitReset">Request Reset</UButton>
            </div>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import axios from 'axios'

const discordId = ref('')

const submitReset = async () => {
    const result = await axios.post('/api/auth/reset/', {
        discordId: discordId.value
    })

    if(result.status == 200) {
        alert("Check your discord DMs!")
    } else {
        alert("Server error!")
    }
}

</script>