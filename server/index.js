const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const setupSocket = require("./methods/socketHandler");

const app = express();
app.use(cors());

const server = http.createServer(app); // sockets need raw http servers which express does not provide
const io = new Server(server, { cors: "*" });

setupSocket(io);

// Start the server
const PORT = 3069; // can also store in an .env file
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server, io };
