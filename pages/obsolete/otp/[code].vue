<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <UCard v-if="!isSuccessful">
            <div class="flex flex-col space-y-2">
                <p>Hash: {{ code }}</p>
                <UInput v-model="password" placeholder="New Password"/>
                <UDivider/>
                <UButton @click="submitPassword">Set Password</UButton>
            </div>
        </UCard>

        <UCard v-if="isSuccessful">
            <UAlert title="You can now login via your new password!" class="w-64" color="primary" variant="solid"/>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import axios from "axios"

const route = useRoute()
const code = route.params.code
const password = ref('')
const isSuccessful = ref(false)

const submitPassword = async () => {
    try {
        const result = await axios.post(`/api/auth/${code}`, {
            newPassword: password.value
        })

        if(result.status == 200) {
            isSuccessful.value = true
        }
    } catch (error: any) {
        if(error.response.status == 401) {
            alert("Challenge phrase is wrong")
        } else {
            alert("Unknown other error")
            console.log("UnknownError", error)
        }
    }
}

</script>