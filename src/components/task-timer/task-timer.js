import React, { useState, useEffect } from 'react';

import './task-timer.css';

function TaskTimer() {
  const [timerStatus, setTimerStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const timerFormat = (timer) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setTimerStatus(() => true);
  };

  const stopTimer = () => {
    setTimerStatus(false);
  };

  useEffect(() => {
    if (!timerStatus) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStatus]);

  return (
    <span className="timer">
      <button className="icon-play" onClick={startTimer}></button>
      <button className="icon-pause" onClick={stopTimer}></button>
      {timerFormat(timer)}
    </span>
  );
}

export default TaskTimer;
