<template>
  <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import ProductService from '@/domain/product/service/ressource/prodcut-service.ts'

const products = ref([])
const headers = [
  {text: 'Name', value: 'name'},
  {text: 'Price', value: 'price'},
  {text: 'Actions', value: 'actions', sortable: false}
]

onMounted(() => {
  ProductService.getProducts()
      .then(response => {
        products.value = response.data;
        console.log("--------------------",response.data)
      })
})

function editItem(item) {
  console.log(item)
}

function deleteItem(item) {
  console.log(item)
}
</script>