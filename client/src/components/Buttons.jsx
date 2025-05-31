import React from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
export const Buttons = ({ isPaused, togglePause }) => {
  return (
    <div className="button-container">
      <Button
        onClick={togglePause}
        variant="contained"
        startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        sx={
          !isPaused
            ? { color: "white", backgroundColor: "black" }
            : { color: "white", backgroundColor: "light-blue" }
        }
      >
        {isPaused ? "Play" : "Pause"}
      </Button>
    </div>
  );
};
