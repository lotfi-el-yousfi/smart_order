<script setup lang="ts">
import {ref, watch} from 'vue';
import {ProductDto} from '../model/ProductDto';

const props = defineProps<{
  product: ProductDto | null;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', product: ProductDto): void;
  (e: 'cancel'): void;
}>();

const form = ref<ProductDto>({
  id: 0,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
});

// Initialize form when product prop changes
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    form.value = {...newProduct};
  } else {
    resetForm();
  }
}, {immediate: true});

const resetForm = () => {
  form.value = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  };
};

const handleSubmit = () => {
  emit('submit', {...form.value});
};

const handleCancel = () => {
  resetForm();
  emit('cancel');
};
</script>

<template>
  <v-card>
    <v-card-title>
      {{ isEditing ? 'Edit Product' : 'Create Product' }}
    </v-card-title>

    <v-card-text>
      <v-text-field
          v-model="form.name"
          label="Name"
          :rules="[v => !!v || 'Name is required']"
          required
      />

      <v-textarea
          v-model="form.description"
          label="Description"
          rows="3"
      />

      <v-row>
        <v-col cols="6">
          <v-text-field
              v-model.number="form.price"
              label="Price"
              type="number"
              min="0"
              step="0.01"
              prefix="$"
              :rules="[v => v > 0 || 'Price must be positive']"
              required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
              v-model.number="form.stock"
              label="Stock"
              type="number"
              min="0"
              :rules="[v => v >= 0 || 'Stock cannot be negative']"
              required
          />
        </v-col>
      </v-row>

      <v-text-field
          v-model="form.category"
          label="Category"
          :rules="[v => !!v || 'Category is required']"
          required
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn text @click="handleCancel">Cancel</v-btn>
      <v-btn color="primary" @click="handleSubmit">
        {{ isEditing ? 'Update' : 'Create' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>