<template>
  <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
  ></v-progress-circular>

  <v-alert
      v-if="!loading && products.length === 0"
      type="info"
      text
  >
    No products available.
  </v-alert>
  <v-row v-for="item in products">
    <v-list-item
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="indigo" icon="mdi-map-marker"></v-icon>
        </v-avatar>
      </template>

      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>

    </v-list-item>
    <v-btn @click="edit_product(item.id)">
      Edit
    </v-btn>
    <v-btn @click="delete_product(item.id)">
      Delete
    </v-btn>

  </v-row>
  <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      location="bottom"
      variant="contained"
      v-if="snack_text"
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
import {useproductStore} from "@/domain/product/store/productStore";
import {storeToRefs} from "pinia";
import router from "@/router";

const useProducts = useproductStore()

const {loading, error, products} = storeToRefs(useProducts)

const snackbar = ref(false)
const snack_text = ref("")

onMounted(() => {
  useProducts.fetchProducts()

})


const edit_product = (id) => {
  router.push({name: 'edit', params: {id: id}}); // Use the router instance
}
const delete_product = (id) => {
  try {
    useProducts.deleteProductById(id)

    snackbar.value = true
    snack_text.value = "Product deleted successfully"
  } catch (err) {
    snackbar.value = true
    snack_text.value = "Error deleting product"
  }

}

</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>