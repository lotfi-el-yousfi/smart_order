<template>
  <v-data-table
      :headers="headers"
      :items="desserts" class="elevation-1"

  >

  </v-data-table>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getProducts} from "@/domain/product/service/ressource/product-service";

const headers = ref([])
const desserts = ref([])

onMounted(() => {
  getProducts().then((products) => {
    console.log(products.data)
    headers.value =  products.data.keys
    desserts.value = products.data
  })
})

</script>
