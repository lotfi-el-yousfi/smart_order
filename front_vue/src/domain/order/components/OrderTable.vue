<script setup lang="ts">
import {PropType} from 'vue'
import {OrderDto} from '@/domain/order/model/OrderDto'

// Props
const props = defineProps<{
  orders: OrderDto[]
  headers: { text: string, value: string }[]
  loading: boolean
  error: string | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'details', item: OrderDto): void
  (e: 'edit', item: OrderDto): void
  (e: 'delete', item: OrderDto): void
}>()
</script>

<template>
  <v-row class="text-center">
    <v-progress-circular
        v-if="props.loading"
        :size="50"
        color="primary"
        indeterminate
    />

    <v-alert v-else-if="props.error" type="error">
      {{ props.error }}
    </v-alert>

    <v-data-table
        v-else
        :headers="props.headers"
        :items="props.orders"
        class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn
            color="primary"
            variant="text"
            @click="emit('details', item)"
        >
          Show Details
        </v-btn>

        <v-btn
            color="primary"
            variant="text"
            @click="emit('edit', item)"
        >
          Edit
        </v-btn>

        <v-btn
            color="red"
            variant="text"
            @click="emit('delete', item)"
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </v-row>
</template>
