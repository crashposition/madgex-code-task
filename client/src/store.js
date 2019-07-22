import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableName: "",
    tableData: []
  },
  getters: {
    tableData: state => state.tableData,
    tableTitles: state => {
      switch (state.tableName) {
        case "products":
          return ["Product ID", "Product Name"];
        case "advertisers":
          return ["Advertiser ID", "Advertiser Name"];
        case "product_skus":
          return ["Product SKU", "Product Name", "Advertiser Name"];
        default:
          return [];
      }
    },
    tableIDs: state => {
      switch (state.tableName) {
        case "products":
          return ["product_id", "product_name"];
        case "advertisers":
          return ["advertiser_id", "advertiser_name"];
        case "product_skus":
          return ["product_sku", "product_name", "advertiser_name"];
        default:
          return [];
      }
    }
  },
  mutations: {
    SET_TABLE_NAME(state, payload) {
      state.tableName = payload;
    },
    SET_TABLE_DATA(state, payload) {
      state.tableData = payload;
    }
  },
  actions: {
    async GET_DATA(context, payload) {
      var tableName = payload.table;
      var limit = payload.limit;
      var offset = payload.offset;
      console.log(
        `loading data:  http://localhost:3000/api/${tableName}?limit=${limit}&offset=${offset}`
      );
      var result = await axios.get(
        `http://localhost:3000/api/${tableName}?limit=${limit}&offset=${offset}`
      );
      context.commit("SET_TABLE_NAME", tableName);
      context.commit("SET_TABLE_DATA", result.data);
    }
  }
});
