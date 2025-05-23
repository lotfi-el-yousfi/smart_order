<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const usernameOrEmail = ref('')
const password = ref('')
const response = ref({})
const errors = ref({})

async function postLoginForm() {
  try {
    const res = await authStore.login({
      username: usernameOrEmail.value,
      password: password.value,
    })
    response.value = res
    errors.value = res.data.errors
    if (res.data.errors) return
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>


<template>
  <div class="dark:bg-black h-screen">
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <div class="lg:flex mt-10">
          <v-img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full stack jack logo"/>
          <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400">
            Full Stack Jack
          </h1>
        </div>
        <div>
          <h2 class="text-center text-3xl font-extrabold mt-5 text-gray-900 dark:text-white">
            Sign In
          </h2>
        </div>
        <div v-if="response?.hasErrors && errors"
             class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
          <ul class="block sm:inline">
            <li v-for="[key, value] in errors">
              {{ value.message }}
            </li>
          </ul>
        </div>
        <v-form v-on:submit.prevent class="mt-8 space-y-6" action="#" method="POST">
          <v-text-field 7
                        v-model="usernameOrEmail" id="username" name="username" required
                        class="dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        :class="errors?.has('username') ? ' border-red-500' : ''" placeholder="username"/>
          <v-text-field 7
                        v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                        required
                        class="dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        :class="errors?.has('password') ? ' border-red-500' : ''" placeholder="Password"/>
        </v-form>
        <v-btn @click.prevent="postLoginForm"
               class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
          register
        </v-btn>
      </div>
    </div>
  </div>
</template>