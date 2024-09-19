<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <UCard class="space-y-4">
            <div class="space-y-4">
                <p>Login Page</p>
                <UDivider/>
                <UInput type="text" placeholder="Username" v-model="username"/>
                
                <div class="flex flex-row space-x-2">
                    <UInput :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="password"/>
                    <UButton @click="togglePasswordShow" color="gray"><UIcon :name="showPassword ? 'i-material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'"/></UButton>
                </div>
                
                <div class="space-x-2">
                    <UButton @click="submitLogin">Login</UButton>
                    <UButton color="gray">Forgot password?</UButton>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import axios from 'axios'

const showPassword = ref(false)
const password = ref('')
const username = ref('')

const togglePasswordShow = (event) => {
    showPassword.value = !showPassword.value
}

const submitLogin = async (event) => {
    
    const result = await axios.post("/api/auth/", {
        username: username.value,
        password: password.value
    })

    localStorage.setItem("token", result.data.token)
}
</script>