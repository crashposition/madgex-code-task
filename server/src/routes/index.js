"use strict";

const Boom = require("@hapi/boom");
//const hapiPgPromise = require("hapi-pg-promise");

module.exports.register = async server => {
  // Serve static content on root route
  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "public"
      }
    }
  });

  // Serve a 404 for anything not found
  server.route({
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      throw Boom.notFound("missing page");
    }
  });

  // Serve products API: e.g. GET /products?limit=20&offset=20
  server.route({
    method: "GET",
    path: "/api/products/{any*}",
    handler: async (request, h) => {
      const table = "products";
      const limit = request.query.limit || 10;
      const offset = request.query.offset || 0;

      // throttle results
      if (limit > 100) {limit = 100}

      try {
        const products = await request.db.any(
          `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset};`,
          [true]
        );
        // console.log("DATA:", products);
        return products;
      } catch (error) {
        // console.log("ERROR:", error);
        throw Boom.internal("Failed SQL Query");
      }
    }
  });

  // Serve advertisers API e.g. GET /advertisers?limit=20&offset=20
  server.route({
    method: "GET",
    path: "/api/advertisers/{any*}",
    handler: async (request, h) => {
      const table = "advertisers";
      const limit = request.query.limit || 10;
      const offset = request.query.offset || 0;

      // throttle results
      if (limit > 100) {limit = 100}

      try {
        const products = await request.db.any(
          `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset};`,
          [true]
        );
        // console.log("DATA:", products);
        return products;
      } catch (error) {
        // console.log("ERROR:", error);
        throw Boom.internal("Failed SQL Query");
      }
    }
  });

  // Serve skus API e.g. GET /product_skus?limit=20&offset=20
  server.route({
    method: "GET",
    path: "/api/product_skus/{any*}",
    handler: async (request, h) => {
      const table = "product_skus";
      const limit = request.query.limit || 10;
      const offset = request.query.offset || 0;

      // throttle results
      if (limit > 100) {limit = 100}

      try {
        const products = await request.db.any(
`SELECT product_sku, product_name, advertiser_name FROM ( SELECT * FROM product_skus INNER JOIN products ON product_skus.product_id = products.product_id INNER JOIN  advertisers ON product_skus.advertiser_id = advertisers.advertiser_id ) e1 LIMIT ${limit} OFFSET ${offset} ;`,
          [true]
        );
        // console.log("DATA:", products);
        return products;
      } catch (error) {
        // console.log("ERROR:", error);
        throw Boom.internal("Failed SQL Query");
      }
    }
  });

};
