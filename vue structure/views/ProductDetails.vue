<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <router-link :to="`/products/${product.id}/edit`">Edit</router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const productStore = useProductStore()
const { selectedProduct: product } = productStore

onMounted(() => {
  productStore.fetchProduct(route.params.id)
})
</script>
