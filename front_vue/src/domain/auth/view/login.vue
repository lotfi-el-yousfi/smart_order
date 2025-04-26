<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (response.ok) {

      router.push('/')
    } else {

      console.error('Login failed')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <v-container>
    <v-col cols="12" class="text-center">
      <h1 class="display-2">Login</h1>
    </v-col>
    <v-col cols="6" offset="4">
      <v-form @submit.prevent="handleSubmit">
        <v-text-field v-model="email" label="Email" type="email" required/>
        <v-text-field v-model="password" label="Password" type="password" required/>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<style scoped>

</style>