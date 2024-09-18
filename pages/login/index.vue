<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <div class="flex flex-col gap-4 max-w-md border border-slate-700 shadow-2xl shadow-slate-700/50 p-8 rounded-2xl bg-slate-600">
            <input class="rounded-lg h-8 bg-gray-800 shadow-gray-800/50 text-center focus:bg-neutral-100 focus:text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-neutral-100 hover:text-black hover:border-neutral-100 hover:shadow-neutral-100" placeholder="Username"/>
            <div class="flex flex-row gap-2">
                <input 
                    class="rounded-lg h-8 bg-gray-800 shadow-gray-800/50 text-center focus:bg-neutral-100 focus:text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-neutral-100 hover:text-black hover:border-neutral-100 hover:shadow-neutral-100" 
                    placeholder="Password" 
                    :type="showPassword ? 'text' : 'password'"
                />
                <button @click="togglePasswordShow">{{ showPassword ? 'Hide' : 'Show' }}</button>
            </div>
            <button class="h-12 border border-gray-700 bg-gray-700 shadow-gray-700/50 w-full rounded-lg transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-zinc-950 hover:border-green-400 hover:shadow-green-400/50 shadow-2xl">Login</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const showPassword = ref(false)

const togglePasswordShow = (event) => {
    showPassword.value = !showPassword.value
}
</script>