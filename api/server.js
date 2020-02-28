const express = require("express");
const helmet = require("helmet");

const carsRouter = require("../cars/carsRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.send("<h2> Welcome to node-db2-project server! <h3>");
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong 🙁"
  });
});

module.exports = server;
