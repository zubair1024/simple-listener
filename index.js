require("dotenv").config();

const net = require("net");

const PORT = process.env.PORT;

net
  .createServer(function (sock) {
    "use strict";

    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

    sock.on("data", function (data) {
      const now = new Date().toISOString();

      //logging the incoming traffic
      console.log(`${now}\t${sock.remoteAddress}\n`);

      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(`Received Data at ${now}`);
      console.log(`String data: `, data.toString());
      console.log(`Hex data: `, data.toString("hex"));
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });
    sock.on("close", function (data) {
      console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
    });
    sock.on("error", function (data) {
      console.log("ERROR: " + sock.remoteAddress + " " + sock.remotePort);
    });
  })
  .listen(PORT);

console.log(`Server listening on port ${PORT}...`);
