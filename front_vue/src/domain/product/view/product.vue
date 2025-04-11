<script setup>
import productlist from "@/domain/product/components/product-list.vue";
import productsearch from "@/domain/product/components/product-search.vue";
import productedit from "@/domain/product/components/product-edit.vue";
import productcards from "@/domain/product/components/product-cards.vue";
</script>

<template>
  <productsearch></productsearch>
  <productedit></productedit>
  <productlist></productlist>
  <productcards></productcards>
</template>

<style scoped>

</style>