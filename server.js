const express = require("express");

//const userRouter = require("./users/userRouter");

const server = express();

//Sanity Check
server.get("/", (req, res) => {
  res.send(`<h2>This is my Sanity Check!</h2>`);
});

//custom middleware

server.use(express.json());

//server.use("/api/users", userRouter);

module.exports = server;