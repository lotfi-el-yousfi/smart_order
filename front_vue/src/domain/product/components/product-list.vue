<template>
  <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
  ></v-data-table-server>
</template>
<script setup>
import {ref} from 'vue'

const cars = [
  {
    name: 'Ford Mustang',
    horsepower: 450,
    fuel: 'Gasoline',
    origin: 'USA',
    price: 55000,
  },
  {
    name: 'Tesla Model S',
    horsepower: 670,
    fuel: 'Electric',
    origin: 'USA',
    price: 79999,
  },

]

const FakeAPI = {
  async fetch({page, itemsPerPage, sortBy}) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = cars.slice()
        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }
        const paginated = items.slice(start, end)
        resolve({items: paginated, total: items.length})
      }, 500)
    })
  },
}
const itemsPerPage = ref(5)
const headers = ref([
  {title: 'Car Model', key: 'name', align: 'start'},
  {title: 'Horsepower', key: 'horsepower', align: 'end'},
  {title: 'Fuel Type', key: 'fuel', align: 'start'},
  {title: 'Origin', key: 'origin', align: 'start'},
  {title: 'Price ($)', key: 'price', align: 'end'},
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

function loadItems({page, itemsPerPage, sortBy}) {
  loading.value = true
  FakeAPI.fetch({page, itemsPerPage, sortBy}).then(({items, total}) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}
</script>