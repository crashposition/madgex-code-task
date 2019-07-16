"use strict";

const inert = require("@hapi/inert");
const blipp = require("blipp");
const pino = require("hapi-pino");
const serverStart = require("./serverStart");
const hapiPgPromise = require("hapi-pg-promise");

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
  await server.register([
    { plugin: inert, options: {} },
    { plugin: blipp, options: {} },
    {
      plugin: pino,
      options: {
        prettyPrint: isDev,
        logEvents: ["response", "onPostStart"]
      }
    },
    {
      plugin: serverStart,
      options: {
        message: `The API server is running at ${server.info.uri}`
      }
    },
    {
      plugin: hapiPgPromise,
      options: {
        cn: process.env.DATABASE_URL,
        settings: {} // pg-promise options
      }
    }
  ]);
};
