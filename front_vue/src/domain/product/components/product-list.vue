<template>
  <v-data-table
      :headers="headers"
      :items="desserts" class="elevation-1"

  >

  </v-data-table>
  <h1>this is data table </h1>
</template>

<script setup>
const headers = [
  {title: 'Name', key: 'name'},
  {title: 'Age', key: 'age'},
];

const desserts = [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: 30},
];
</script>
