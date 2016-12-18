import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Backlight from '../../utils/backlight';

export default class IdleTimer extends Component {
  constructor() {
    super();

    this.state = {
      time: new Date().getTime(),
      idle: false,
    };

    this.updateTime = this.updateTime.bind(this);
    this.setIdle = this.setIdle.bind(this);
    this.setActive = this.setActive.bind(this);
    this.checkIdleTime = this.checkIdleTime.bind(this);

    document.body.addEventListener('mousemove', this.updateTime);
  }

  componentDidMount() {
    // Start checking for idle time
    this.checkIdleTime();

    // Make sure the screen is turned on
    Backlight.toMaximumBrightness();
  }

  returnToHomeScreen = null; // eslint-disable-line

  setIdle() {
    this.setState({
      idle: true,
    });

    Backlight.toMinimumBrightness();

    // Return to the home screen after five minutes
    this.returnToHomeScreen = setTimeout(() => {
      hashHistory.push('/');
    }, 300000);
  }

  setActive() {
    // Cancel the timeout to return to the home screen
    clearTimeout(this.returnToHomeScreen);

    this.setState({
      idle: false,
    });

    Backlight.toMaximumBrightness();

    // Start checking for idle time again
    this.checkIdleTime();
  }

  checkIdleTime() {
    // The current time less the last time the user did anything
    if (new Date().getTime() - this.state.time >= 60000) { // Time is one minute
      // Screen has been idle too long
      this.setIdle();
    }
    else {
      // Check again in another 10 seconds
      setTimeout(this.checkIdleTime, 10000);
    }
  }

  updateTime() {
    this.setState({
      time: new Date().getTime(),
    });
  }

  render() {
    const style = this.state.idle
      ? { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }
      : { display: 'none' };

    // The test env can't dim the brightness, so simulate it with a semi-transparent overlay
    if (process.env.NODE_ENV === 'test') {
      Object.assign(style, { background: 'rgba(0, 0, 0, 0.5)' });
    }

    return <div id="idle-timer" onClick={this.setActive} style={style} />; // eslint-disable-line jsx-a11y/no-static-element-interactions
  }
}
