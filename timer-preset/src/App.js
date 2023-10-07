import React, { Component } from 'react';

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60, // Initial timer duration in seconds (1 minute)
      isRunning: false,
      isBreak: false,
      focusTimeInput: '1', // Default focus time in minutes
      breakTimeInput: '1', // Default break time in minutes
    };
    this.notificationSound = new Audio('alarm.mp3'); 
  }

  componentDidMount() {
    this.focusTime = 60; // 1 minute
    this.breakTime = 60; // 1 minute
    Notification.requestPermission(); // Request notification permission
  }

  startTimer = () => {
    this.setState({ isRunning: true });
    this.timerInterval = setInterval(this.tick, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({
      timer: this.state.isBreak ? this.state.breakTimeInput * 60 : this.state.focusTimeInput * 60,
    });
    this.playNotificationSound();
    this.displayNotification();
  };

  tick = () => {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));

    if (this.state.timer <= 0) {
      this.stopTimer();
      this.setState((prevState) => ({
        isBreak: !prevState.isBreak,
        timer: !prevState.isBreak ? this.state.breakTimeInput * 60 : this.state.focusTimeInput * 60,
      }));
      this.startTimer();

      this.playNotificationSound();
      this.displayNotification();
    }
  };

  handleFocusTimeChange = (event) => {
    this.setState({ focusTimeInput: event.target.value });
  };

  handleBreakTimeChange = (event) => {
    this.setState({ breakTimeInput: event.target.value });
  };

  playNotificationSound = () => {
    this.notificationSound.play();
  };

  displayNotification = () => {
    const { isBreak } = this.state;
    const notification = new Notification(
      isBreak ? 'Break Time' : 'Focus Time',
      {
        body: isBreak ? 'Get back to work!' : 'Take a break!',
        icon: 'favicon.png',
      }
    );
  };

  

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  render() {
    const { isRunning, isBreak, timer, focusTimeInput, breakTimeInput } = this.state;

    return (
      <div className="PomodoroTimer">
        <h1>{isBreak ? 'Break Time' : 'Focus Time'}</h1>
        <div className="timer">{this.formatTime(timer)}</div>
        <div className="controls">
          {isRunning ? (
            <button onClick={this.stopTimer}>Pause</button>
          ) : (
            <button onClick={this.startTimer}>Start</button>
          )}
          <button onClick={this.resetTimer}>Reset</button>
          <div>
            <label>Focus Time (min): </label>
            <input
              type="number"
              min="1"
              value={focusTimeInput}
              onChange={this.handleFocusTimeChange}
            />
          </div>
          <div>
            <label>Break Time (min): </label>
            <input
              type="number"
              min="1"
              value={breakTimeInput}
              onChange={this.handleBreakTimeChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;
