<template>
  <div>
    <h2>Products</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
      </li>
    </ul>
    <router-link to="/products/create">Create New Product</router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const { products } = productStore

onMounted(() => {
  productStore.fetchProducts()
})
</script>
