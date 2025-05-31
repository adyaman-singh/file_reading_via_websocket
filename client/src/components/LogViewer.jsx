import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Buttons } from "./Buttons";
import { LogContainer } from "./LogContainer";
import "../styles.css";

export const LogViewer = () => {
  const socketRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    socketRef.current = io("http://localhost:3069");
    // sending data back in a single line

    socketRef.current.on("log-update", (data) => {
      if (!isPaused) {
        setLogs((prev) => {
          const newLogs = data.split("\n");
          return [...prev, ...newLogs];
        });
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("log-update", handleLogUpdate);
        socketRef.current.disconnect();
      }
    };
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="wrapper">
      <div>
        {" "}
        <LogContainer
          logs={logs}
          pauseToggle={togglePause}
          isPaused={isPaused}
        />
      </div>

      <div className="buttons">
        <Buttons isPaused={isPaused} togglePause={togglePause} />
      </div>
    </div>
  );
};
