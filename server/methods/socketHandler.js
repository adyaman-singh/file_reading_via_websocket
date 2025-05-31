const {
  readLastLines,
  readNewLogEntries,
  LOG_FILE_PATH,
} = require("./logReader");
const fs = require("fs");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    readLastLines(LOG_FILE_PATH, 10, (logs) => {
      socket.emit("log-update", logs);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Watch for file changes, this si 
  fs.watchFile(LOG_FILE_PATH, { interval: 500 }, () => {
    readNewLogEntries(io);
  });
}

module.exports = setupSocket;
