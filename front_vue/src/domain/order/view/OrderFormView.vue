<script setup lang="ts">
import {ref} from 'vue'
import {OrderDto} from "@/domain/order/model/OrderDto";
import OrderForm from "@/domain/order/components/OrderForm.vue";  // Import the OrderForm component
import {useOrderStore} from "@/domain/order/store/store";
import {useRouter} from 'vue-router';

const router = useRouter();

// Store
const orderStore = useOrderStore()

const isEditMode = ref(false)
const selectedOrder = ref<OrderDto | null>(null)


function handleSubmit(form: OrderDto) {
  if (isEditMode.value && form.id) {
    orderStore.dispatchUpdateOrder(form.id, form)
  } else {
    orderStore.dispatchAddOrder(form)
  }

}

// Cancel handler
function handleCancel() {

  router.push({name: 'OrderList'});
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">
      {{ isEditMode ? 'Edit Order' : 'Create New Order' }}
    </h1>

    <OrderForm
        :order="selectedOrder"
        :mode="isEditMode ? 'edit' : 'create'"
        @submit="handleSubmit"
        @cancel="handleCancel"
    />
  </v-container>
</template>
