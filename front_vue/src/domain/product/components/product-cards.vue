<template>
  <v-container>
    <v-row>
      <v-col v-for="p in products" :key="p.id">
        <v-card>
          <v-img
              :src="`https://picsum.photos/200/300`"
              cover
              class="rounded-t"
          />
          <v-card-title>{{ p.name }}</v-card-title>
          <v-card-subtitle>{{ p.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="$router.push({name: 'productEdit',
            params: {id: p.id}})">Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {
  getProducts
} from "@/domain/product/service/ressource/product-service.ts";


const route = useRoute()
const products = ref({})

onMounted(async () => {

  const response = await getProducts()
  products.value = response.data;

})


</script>
