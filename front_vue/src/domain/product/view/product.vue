<script setup>
import ProductList from "@/domain/product/components/ProductList.vue";
</script>

<template>
  <v-row>
    <v-banner class="mb-4" color="primary" icon="mdi-store">
      <v-banner-text>Product Page</v-banner-text>
    </v-banner>
    <v-spacer></v-spacer>
    <v-btn
        to="/product/"
        icon="mdi-menu"
        variant="text"
    ></v-btn>
    <v-btn
        to="/product/edit"
        icon="mdi-plus"
        variant="text"
    ></v-btn>
    <v-btn
        to="/product/search"
        icon="mdi-magnify"
        variant="text"
    ></v-btn>
  </v-row>

  <v-container>
    <router-view></router-view>
  </v-container>
</template>

<style scoped>

</style>