import React, { Component } from 'react';

import './task-timer.css';

export default class TaskTimer extends Component {
  state = {
    timer: 0,
  };

  timerFormat = (timer) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${seconds}`;
  };

  updateTimer = () => {
    this.setState(({ timer }) => {
      return {
        timer: timer + 1,
      };
    });
  };

  startTimer = () => {
    this.interval = setInterval(this.updateTimer, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span className="timer">
        <button className="icon-play" onClick={this.startTimer}></button>
        <button className="icon-pause" onClick={this.stopTimer}></button>
        {this.timerFormat(this.state.timer)}
      </span>
    );
  }
}
