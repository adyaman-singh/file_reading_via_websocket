import React, { useRef, useEffect } from "react";
import "../styles.css";

export const LogContainer = ({ logs, pauseToggle, isPaused }) => {
  const logContainerRef = useRef(null);

  useEffect(() => {
    const logContainer = logContainerRef.current;
    if (!logContainer) return;

    // addition
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = logContainer;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (!isAtBottom && !isPaused) {
        pauseToggle();
      }
    };

    logContainer.addEventListener("scroll", onScroll);
    return () => logContainer.removeEventListener("scroll", onScroll);
  }, [isPaused, pauseToggle]);
  // addition

  useEffect(() => {
    if (!isPaused && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  return (
    <div ref={logContainerRef} className="log-container">
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <p style={{ color: "black" }} key={index}>
            {index + 1}: {log}
          </p>
        ))
      ) : (
        <p>{"no data"}</p>
      )}
    </div>
  );
};
