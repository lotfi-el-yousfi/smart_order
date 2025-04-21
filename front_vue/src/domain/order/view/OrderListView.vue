<script setup lang="ts">
import {onMounted} from 'vue'
import {useOrderStore} from '@/domain/order/store/store'
import OrderTable from '@/domain/order/components/OrderTable.vue'
import {OrderDto} from "@/domain/order/model/OrderDto";
import {useRouter} from 'vue-router';

const router = useRouter();
// Store
const orderStore = useOrderStore()

// Fetch orders on mount
onMounted(() => {
  orderStore.dispatchFetchOrders()
})

// Headers definition
const headers = [
  {text: 'Name', value: 'name'},
  {text: 'Price', value: 'price'},
  {text: 'Status', value: 'status'},
  {text: 'User', value: 'user'},
  {text: 'Product', value: 'product'},
  {text: 'Actions', value: 'actions', sortable: false},
]

// Handlers
function handleEdit(order: OrderDto) {
  // Here you might open a dialog, navigate, or emit
  console.log('Edit order:', order)

  router.push({name: 'OrderEdit', params: {id: order.id}})

}

function handleDelete(order: OrderDto) {
  orderStore.dispatchRemoveOrder(order.id)
}

function handleDetails(order: OrderDto) {

  router.replace({name: 'OrderDetail', params: {id: order.id}});
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">Orders List</h1>

    <OrderTable
        :orders="orderStore.orders"
        :headers="headers"
        :loading="orderStore.isLoading"
        :error="orderStore.error"
        @details="handleDetails"
        @edit="handleEdit"
        @delete="handleDelete"
    />


  </v-container>
</template>
