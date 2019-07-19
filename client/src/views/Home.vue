<template>
  <div class="home">
    <ProductsTable/>
  </div>
</template>

<script>
import ProductsTable from "@/components/ProductsTable.vue";

export default {
  name: "home",
  components: {
    ProductsTable
  }
};
</script>
