<template>
  <div>
    <button type="button" :disabled="!hasPrevious">Previous</button>
    <button type="button" :disabled="!hasNext">Next</button>
    <table>
      <thead>
        <tr>
          <th v-for="(title, titleIndex) in productTitles" :key="titleIndex">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, dataIndex) in productData" :key="dataIndex">
          <td v-for="(rowData, rowIndex) in productTitles" :key="rowIndex">{{ row[rowIndex] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "datatable",
  data: () => ({}),
  computed: {
    productTitles() {
      return this.$store.getters.productTitles;
    },
    productData() {
      return this.$store.getters.productData;
    },
    hasNext() {
      return this.$store.getters.hasNext;
    },
    hasPrevious() {
      return this.$store.getters.hasPrevious;
    }
  }
};
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
