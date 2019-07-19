import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productTitles: ["Product", "Advertiser", "SKU"],
    productData: [
      ["Product name 1", "Advertiser name 1", "SKU 1"],
      ["Product name 2", "Advertiser name 2", "SKU 2"],
      ["Product name 3", "Advertiser name 3", "SKU 3"]
    ],
    totalRecords: 3,
    currentRecord: 0,
    recordsPerPage: 3
  },
  getters: {
    productTitles: state => state.productTitles,
    productData: state => state.productData,
    hasNext: state => {
      return state.currentRecord < state.totalRecords;
    },
    hasPrevious: state => {
      return state.currentRecord > 0;
    }
  },
  mutations: {},
  actions: {}
});
