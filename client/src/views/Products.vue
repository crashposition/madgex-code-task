<template>
  <div class="home">
    <DataTable src="products"></DataTable>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

export default {
  name: "products",
  components: {
    DataTable
  }
};
</script>
