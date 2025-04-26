<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {OrderDto} from '@/domain/order/model/OrderDto'
import {Status} from '@/domain/order/model/status'

import {useOrderStore} from
      '@/domain/order/store/store'
import {useRoute, useRouter} from "vue-router";

const router = useRouter();

const route = useRoute();

const orderStore = useOrderStore()

const form = ref<OrderDto>({
  id: 0,
  name: '',
  price: 0,
  status: Status.EN_COURS, // or a sensible default
  user: '',
  product: ''
})
const isEditMode = ref(false)

onMounted(async () => {

  const idParam = route.params.id
  if (idParam) {
     isEditMode.value = true

    await orderStore.dispatchFetchOrders()
    const id = Number(idParam)
    const order = orderStore.orders.find(o => o.id === id) || null
    if (order) {
      form.value = {...order}
    }
  }

})

// Local form state


const handleSubmit = () => {
  if (isEditMode.value) {

    orderStore.dispatchUpdateOrder(Number(route.params.id), form.value);
  } else {

    orderStore.dispatchAddOrder(form.value);
  }
}
const handleCancel = () => {
  router.push({name: 'OrderList'});
}
</script>

<template>
  <v-card>
    <v-card-title>
      {{ isEditMode ? 'Edit Order' : 'Create Order' }}
    </v-card-title>

    <v-card-text>
      <v-text-field v-model="form.name" label="Name"/>
      <v-text-field v-model="form.price" label="Price" type="number"/>
      <v-select
          v-model="form.status"
          :items="Object.values(Status)"
          label="Status"
      />
      <v-text-field v-model="form.user" label="User"/>
      <v-text-field v-model="form.product" label="Product"/>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="handleSubmit">
        {{ isEditMode ? 'Update' : 'Create' }}
      </v-btn>
      <v-btn text @click="handleCancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
