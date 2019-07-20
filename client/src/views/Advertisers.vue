<template>
  <div class="home">
    <DataTable src="advertisers"></DataTable>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

export default {
  name: "advertisers",
  components: {
    DataTable
  }
};
</script>
