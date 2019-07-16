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
    path: "/products/{any*}",
    handler: async (request, h) => {
      const table = "raw";
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

  // Serve advertisers API
  server.route({
    method: "GET",
    path: "/advertisers/{any*}",
    handler: (request, h) => {
      return "Advertisers";
    }
  });
};
