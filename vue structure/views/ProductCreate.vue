<template>
  <div>
    <h2>Create Product</h2>
    <form @submit.prevent="create">
      <input v-model="form.name" placeholder="Name" />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as productService from '@/services/productService'

const router = useRouter()
const form = ref({ name: '', description: '' })

const create = async () => {
  const res = await productService.createProduct(form.value)
  router.push(`/products/${res.data.id}`)
}
</script>
