<script setup>
import orderlist from "@/domain/order/components/order-list.vue";
import ordersearch from "@/domain/order/components/order-search.vue";
import orderedit from "@/domain/order/components/order-edit.vue";
import ordercards from "@/domain/order/components/order-cards.vue";
</script>

<template>
  <ordersearch></ordersearch>
  <orderedit></orderedit>
  <orderlist></orderlist>
  <ordercards></ordercards>
</template>

<style scoped>

</style>