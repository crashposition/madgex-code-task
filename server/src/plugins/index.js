"use strict";

const Inert = require("@hapi/inert");

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
  await server.register([
    {
        plugin: Inert,
        options: {}
      },
      ]);
};
