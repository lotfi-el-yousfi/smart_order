<script setup lang="ts">

</script>

<template>
  <nav class="bg-gray-200 px-4 py-2 flex justify-center">
    <ul class="flex space-x-4">
      <li>
        <NuxtLink to="/" class="text-blue-500 hover:text-blue-700">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/product" class="text-blue-500 hover:text-blue-700">Product</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/order" class="text-blue-500 hover:text-blue-700">Order</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/user" class="text-blue-500 hover:text-blue-700">User</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/info" class="text-blue-500 hover:text-blue-700">Info</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>