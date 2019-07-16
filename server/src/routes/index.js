"use strict";

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

  // Serve 404 for anything not found
  server.route({
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "404 Error! Page Not Found!";
    }
  });

  /*
    // Serve products
    server.route({
      method: "GET",
      path: "/products/{any*}",
      handler: (request, h) => {
        return "Products";
      }
    });
  
    // Serve advertisers
    server.route({
      method: "GET",
      path: "/advertisers/{any*}",
      handler: (request, h) => {
        return "Advertisers";
      }
    });
  */
};
