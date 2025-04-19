<template>

  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="product.name" label="Name" variant="outlined" density="compact"/>
    <v-text-field v-model="product.price" label="Price" type="number" variant="outlined" density="compact"/>
        <v-text-field v-model="product.description" label="description" variant="outlined" density="compact"/>
    <v-btn type="submit"
           color="primary"
           prepend-icon="mdi-content-save" variant="elevated">Submit
    </v-btn>
  </v-form>

  <v-snackbar
      v-model="snackbar"
      multi-line
  >
    {{ snack_text }}

    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getProductById} from "@/domain/product/service/ressource/product-service";

import {useRoute} from "vue-router";
import * as useProducts from "@/domain/product/service/ressource/product-service";
import router from "@/router";

const route = useRoute()


let product = ref({})
let operation = ref("")
let error = ref({})
let snack_text = ref("")
let snackbar = ref(false)

onMounted(() => {
  let id = route.params.id || null
  if (id !== null || id !== undefined) {
    if (id) {
      operation.value = "edit"
      getProductById(id)
          .then((response) => {
            product.value = response.data
          }).catch(error => {
        error.value = error.message
      })
    } else {
      operation.value = "create"
    }
  }


})
const onSubmit = () => {
  if (operation.value === "create") {
    useProducts.createProduct(product.value).then(() => {
      snackbar.value = true
      snack_text.value = "Product created successfully"
    }).catch(error => {
      snackbar.value = true
      snack_text.value = error
    })
  }
  if (operation.value === "edit") {
    useProducts.updateProduct(product.value.id,product.value).then(() => {
      snackbar.value = true
      snack_text.value = "Product updated successfully"
    }).catch(error => {
      snackbar.value = true
      snack_text.value = error
    })
  }

}
</script>

<style scoped>

</style>