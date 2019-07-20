<template>
  <div class="home">
    <DataTable src="product_skus"></DataTable>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

export default {
  name: "skus",
  components: {
    DataTable
  }
};
</script>
