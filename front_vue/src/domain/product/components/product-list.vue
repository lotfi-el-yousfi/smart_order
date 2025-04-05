<script setup>
import {onMounted, reactive} from "vue";
import ProductService
  from "@/domain/product/service/ressource/prodcut-service.js";

const products = reactive([]);

onMounted(() => {
  ProductService.getProducts()
      .then(response => {
        this.products = response.data
      })
});
</script>

<template>
  <h1>product list</h1>
  <ul>
    <li v-for="product in products">
      {{ product.name }}
    </li>
  </ul>
</template>

<style scoped>

</style>