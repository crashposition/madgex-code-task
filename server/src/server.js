"use strict";

require("dotenv").config();
const app = require("./app");

const port = parseInt(process.env.APP_SERVER_PORT) || 80;
const host = process.env.APP_SERVER_HOST || "localhost";
const config = { port, host };

const init = async () => {
  try {
    // create the server
    const server = await app.createServer(config);

    // start the server
    await server.start();

    // log server running
    server.log(["init"], "Server running on %s", server.info.uri);
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    // log server error
    console.log(`Error while starting server: ${err.message}`);
    process.exit(1);
  }
};

init();
