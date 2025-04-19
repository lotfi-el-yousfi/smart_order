<template>
  <div style="  height: 100vh">
    <div style="display: flex; align-items: center; justify-content: center; padding: 1rem">
      <div style="max-width: 500px; width: 100%">
        <div style="display: flex; align-items: center; margin-top: 2.5rem">
          <img src="/img/logo_clear_fsj.png" alt="full stack   logo"
               style="height: 6rem; width: auto; margin: 0 auto"/>
          <h1 style="font-size: 3rem; font-weight: 700; margin: 0; ; padding: 2.25rem 0">
            Full Stack
          </h1>
        </div>
        <div>
          <h2 style="font-size: 2rem; font-weight: 700; margin-top: 1.25rem;  ">
            Sign In
          </h2>
        </div>
        <div v-if="response"
             style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.5); padding: 1rem; margin-top: 1.25rem"
             role="alert">
          <ul style="list-style: none; padding: 0; margin: 0">
            <li v-for="[key, value] in errors" :key="key">
              {{ value.message }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="postLoginForm" style="margin-top: 1.25rem">
          <input
              v-model="usernameOrEmail" id="username" name="username" required
              style="background-color: rgba(0, 0, 0, 0.05); ; border: 1px solid rgba(0, 0, 0, 0.1); padding: 0.5rem; width: 100%; margin-bottom: 1rem"
              placeholder="username"/>
          <input
              v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              required
              style="background-color: rgba(0, 0, 0, 0.05); ; border: 1px solid rgba(0, 0, 0, 0.1); padding: 0.5rem; width: 100%; margin-bottom: 1rem"
              placeholder="Password"/>
        </form>
        <button @click.prevent="postLoginForm"
                style="background-color: rgba(75, 85, 99, 0.7); ; border: none; padding: 0.5rem 1rem; font-size: 1rem; font-weight: 700; margin-top: 1.25rem; cursor: pointer">
          <span style="display: flex; align-items: center">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                 style="height: 1rem; width: 1rem; fill: white; margin-right: 0.5rem">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
            register
          </span>
        </button>

        <br>  <br> adding login mecchanisme soon
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router';

const router = useRouter();


const usernameOrEmail = ref('')
const password = ref('')
const response = ref(false)
const errors = ref({})

function postLoginForm() {
  // Add logic to handle the login form submission

  router.push("/");
}
</script>