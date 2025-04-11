<template>
  <v-data-table
      :headers="headers"
      :items="desserts" class="elevation-1"
  >
  </v-data-table>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getorders} from "@/domain/order/service/ressource/order-service";

const headers = ref([])
const desserts = ref([])

onMounted(() => {
  getorders().then((orders) => {
    console.log(orders.data)
    headers.value = orders.data[0].keys;
    desserts.value = orders.data
  })
})

</script>
