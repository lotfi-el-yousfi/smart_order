<template>

  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="product.name" label="Name" variant="outlined" density="compact"/>
    <v-text-field v-model="product.price" label="Price" type="number" variant="outlined" density="compact"/>
    <v-btn type="submit" color="primary" prepend-icon="mdi-content-save" variant="elevated">Submit</v-btn>
  </v-form>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {createProduct, getProductById, updateProduct} from "@/domain/product/service/ressource/product-service.ts";


const route = useRoute()
let operation = ref("create");
const product = ref({})

onMounted(async () => {
  if (route.params.id) {

    operation = "edit"
    const response = await getProductById(route.params.id)
    product.value = response.data;
  } else {
    operation = "create"
  }
})

async function onSubmit() {
  if (operation === "create") {
    console.log(product.value)
    await createProduct(product.value);

  } else {

    await updateProduct(route.params.id, product.value)
  }
  //await router.push({name: 'product.list'})
}

</script>

<style scoped>

</style>