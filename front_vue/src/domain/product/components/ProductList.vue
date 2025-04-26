<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import ProductForm from './ProductForm.vue';
import {ProductDto} from "@/domain/product/model/ProductDto";
import {useProductStore} from "@/domain/product/store/productStore";

const router = useRouter();
const productStore = useProductStore();
const showForm = ref(false);
const isEditing = ref(false);

onMounted(async () => {
  await productStore.fetchProducts();
});

const handleEdit = (id: number) => {
  productStore.fetchProductById(id);
  isEditing.value = true;
  showForm.value = true;
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await productStore.deleteProduct(id);
  }
};

const handleFormSubmit = async (product: ProductDto) => {
  try {
    if (isEditing.value && product.id) {
      await productStore.updateProduct(product.id, product);
    } else {
      await productStore.createProduct(product);
    }
    showForm.value = false;
    isEditing.value = false;
  } catch (error) {
    // Error is already handled in the store
  }
};

const handleCancel = () => {
  showForm.value = false;
  isEditing.value = false;
  productStore.currentProduct = null;
};
</script>

<template>
  <div class="product-management">
    <h1>Product Management</h1>

    <v-alert v-if="productStore.error" type="error" dismissible @click="productStore.clearError">
      {{ productStore.error }}
    </v-alert>

    <v-btn
        color="primary"
        @click="() => { showForm = true; isEditing = false; productStore.currentProduct = null; }"
        :disabled="productStore.isLoading"
    >
      Add New Product
    </v-btn>

    <v-dialog v-model="showForm" max-width="800">
      <ProductForm
          :product="productStore.currentProduct"
          :isEditing="isEditing"
          @submit="handleFormSubmit"
          @cancel="handleCancel"
      />
    </v-dialog>

    <v-progress-linear v-if="productStore.isLoading" indeterminate/>

    <v-data-table
        :headers="[
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name' },
        { title: 'Price', key: 'price' },
        { title: 'Stock', key: 'stock' },
        { title: 'Category', key: 'category' },
        { title: 'Actions', key: 'actions' },
      ]"
        :items="productStore.products"
        class="elevation-1 mt-4"
    >
      <template #item.price="{ item }">
        {{ item.price.toFixed(2) }}
      </template>
      <template #item.actions="{ item }">
        <v-btn icon small @click="handleEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="error" @click="handleDelete(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.product-management {
  padding: 20px;
}
</style>