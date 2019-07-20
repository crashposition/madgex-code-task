import Vue from "vue";
import Router from "vue-router";
import Products from "./views/Products.vue";
import Advertisers from "./views/Advertisers.vue";
import SKUs from "./views/SKUs.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "products",
      component: Products
    },
    {
      path: "/advertisers",
      name: "advertisers",
      component: Advertisers
    },
    {
      path: "/skus",
      name: "skus",
      component: SKUs
    }
  ]
});
