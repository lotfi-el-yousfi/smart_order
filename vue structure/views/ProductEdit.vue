<template>
  <div>
    <h2>Edit {{ form.name }}</h2>
    <form @submit.prevent="save">
      <input v-model="form.name" placeholder="Name" />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as productService from '@/services/productService'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', description: '' })

onMounted(async () => {
  const res = await productService.getProductById(route.params.id)
  form.value = res.data
})

const save = async () => {
  await productService.updateProduct(route.params.id, form.value)
  router.push(`/products/${route.params.id}`)
}
</script>
