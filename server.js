const express = require("express");

const projectRouter = require("./routers/projectRouter");
const actionRouter = require('./routers/actionRouter.js');

const server = express();

//Sanity Check
server.get("/", (req, res) => {
  res.send(`<h2>This is my Sanity Check!</h2>`);
});

//middleware
server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/project", projectRouter);

module.exports = server;