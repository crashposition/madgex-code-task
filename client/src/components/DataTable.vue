<template>
  <div>
    <button type="button" @click="getPreviousPage" :disabled="!hasPrevious">Previous</button>
    <button type="button" @click="getNextPage" :disabled="!hasNext">Next</button>
    <table>
      <thead>
        <tr>
          <th v-for="(title, titleIndex) in tableTitles" :key="titleIndex">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, dataIndex) in tableData" :key="dataIndex">
          <td v-for="(rowData, rowIndex) in tableIDs" :key="rowIndex">{{ row[rowData] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "datatable",
  props: {
    src: String
  },
  data: () => ({
    isBusy: Boolean,
    limit: 10,
    offset: 0
  }),
  computed: {
    tableTitles() {
      return this.$store.getters.tableTitles;
    },
    tableIDs() {
      return this.$store.getters.tableIDs;
    },
    tableData() {
      return this.$store.getters.tableData;
    },
    hasNext() {
      return true;
    },
    hasPrevious() {
      return this.offset > 0;
    }
  },
  methods: {
    getNextPage() {
      this.getData(this.limit, this.offset + this.limit);
    },
    getPreviousPage() {
      this.getData(this.limit, this.offset - this.limit);
    },
    async getData(limit, offset) {
      this.limit = limit;
      this.offset = offset;

      this.isBusy = true;
      var payload = { table: this.src, limit, offset };
      try {
        await this.$store.dispatch("GET_DATA", payload);
      } catch (ex) {
        this.error = "Failed to load data";
      }
      this.isBusy = false;
    }
  },
  mounted() {
    // get initial batch of data
    this.getData(10, 0);
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
