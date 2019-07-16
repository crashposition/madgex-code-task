"use strict";

const Boom = require("@hapi/boom");

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

  // Serve products API
  server.route({
    method: "GET",
    path: "/products/{any*}",
    handler: (request, h) => {
      return "Products";
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
