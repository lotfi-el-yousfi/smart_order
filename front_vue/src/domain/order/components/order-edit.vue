<template>

  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="order.name" label="Name" variant="outlined" density="compact"/>
    <v-text-field v-model="order.price" label="Price" type="number" variant="outlined" density="compact"/>
    <v-text-field v-model="order.status" label="Status" variant="outlined" density="compact"/>
    <v-text-field v-model="order.user" label="User" variant="outlined" density="compact"/>
    <v-text-field v-model="order.product" label="Product" variant="outlined" density="compact"/>


    <v-btn type="submit" color="primary" prepend-icon="mdi-content-save" variant="elevated">Submit</v-btn>
  </v-form>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {createorder, getorderById, updateorder} from "@/domain/order/service/ressource/order-service.ts";


const route = useRoute()
let operation = ref("create");
const order = ref({})

onMounted(async () => {
  if (route.params.id) {
    operation = "edit"
    const response = await getorderById(route.params.id)
    order.value = response.data;
  } else {
    operation = "create"
  }
})

async function onSubmit() {
  if (operation === "create") {
    console.log(order.value)
    await createorder(order.value);

  } else {
    await updateorder(route.params.id, order.value)
  }
  //await router.push({name: 'order.list'})
}

</script>

<style scoped>

</style>