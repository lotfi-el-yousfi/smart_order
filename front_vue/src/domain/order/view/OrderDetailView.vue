<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useOrderStore} from '@/domain/order/store/store'
import {useRoute} from 'vue-router'
import {OrderDto} from '@/domain/order/model/OrderDto'

// Store and route
const orderStore = useOrderStore()
const route = useRoute()

// Local state
const order = ref<OrderDto | null>(null)

// Fetch order by route param on mount
onMounted(async () => {
  const id = Number(route.params.id)
  await orderStore.dispatchFetchOrderById(id)
  order.value = orderStore.orders.find(o => o.id === id) || null
})
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">Order Details</h1>

    <v-progress-circular
        v-if="orderStore.isLoading"
        :size="50"
        color="primary"
        indeterminate
    />

    <v-alert v-else-if="orderStore.error" type="error">
      {{ orderStore.error }}
    </v-alert>

    <v-card v-else>
      <v-card-title>
        {{ order?.name }}
      </v-card-title>

      <v-card-text>
        <p><strong>Price:</strong> {{ order?.price }}</p>
        <p><strong>Status:</strong> {{ order?.status }}</p>
        <p><strong>User:</strong> {{ order?.user }}</p>
        <p><strong>Product:</strong> {{ order?.product }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :to="`/orders/edit/${order?.id}`">Edit</v-btn>
        <v-btn color="secondary" :to="`/orders`">Back to List</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
