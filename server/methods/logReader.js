const fs = require("fs");
const path = require("path");

const LOG_FILE_PATH = path.join(__dirname, "log.txt");
let filePosition = 0;

/**
 * Reads the last `n` lines of a file.
 * better than readline because now we are reading backwards
 */
function readLastLines(filePath, n, callback) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") return callback(""); // File doesn't exist
      console.error("Error accessing log file:", err);
      return callback("");
    }

    if (stats.size === 0) return callback(""); // Empty file
    const logFileStream = fs.createReadStream(filePath, {
      start: Math.max(0, stats.size - 1024), // 1kb
      encoding: "utf8",
    });

    let data = "";
    let lines = [];

    logFileStream.on("data", (fileData) => {
      data += fileData;
      lines = data.trim().split("\n");

      if (lines.length >= n) {
        logFileStream.destroy();
        filePosition = stats.size;
        return callback(lines.slice(-n).join("\n"));
      }
    });

    logFileStream.on("end", () => {
      return callback(lines.slice(-n).join("\n"));
    });
    logFileStream.on("error", (error) => {
      console.error("Error reading log file:", error);
      callback("");
    });
  });
}

/**
 * Reads new log entries since the last read position.
 */
function readNewLogEntries(io) {
  fs.stat(LOG_FILE_PATH, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") return; // Ignore if file doesn't exist
      return console.error("Error accessing log file:", err);
    }
    if (stats.size < filePosition) {
      filePosition = 0; // Reset if the log file is rotated, or we can zip it using zlib
    }

    if (stats.size === 0) {
      throw new Error("Empty file");
    }

    const updatedLogFileStream = fs.createReadStream(LOG_FILE_PATH, {
      start: filePosition,
      encoding: "utf8",
    });

    let dataBuffer = "";

    updatedLogFileStream.on("data", (log) => {
      dataBuffer += log;
      io.emit("log-update", log);
      filePosition += Buffer.byteLength(log, "utf8"); // Update position , we cannot use log.lenght becuase it will give incorrect byte size
    });

    updatedLogFileStream.on("error", (error) => {
      console.error("Error reading log file:", error);
    });

    updatedLogFileStream.on("end", () => {
      updatedLogFileStream.close();
    });
  });
}

module.exports = { readLastLines, readNewLogEntries, LOG_FILE_PATH };
