import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

import Backlight from '../../utils/backlight';

const style = {
  show: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
  },

  hide: {
    display: 'none',
  },
};

export default class IdleTimer extends Component
{
  constructor()
  {
    super();

    this.state = {
      time: moment.utc(),
      idle: false,
    };

    this.updateTime = this.updateTime.bind(this);
    this.setIdle = this.setIdle.bind(this);
    this.setActive = this.setActive.bind(this);
    this.checkIdleTime = this.checkIdleTime.bind(this);

    document.body.addEventListener('mousemove', this.updateTime);
  }

  componentDidMount()
  {
    // Start checking for idle time
    this.checkIdleTime();

    // Make sure the screen is turned on
    Backlight.toMaximumBrightness();
  }

  returnToHomeScreen = null; // eslint-disable-line

  setIdle()
  {
    this.setState({
      idle: true,
    });

    Backlight.toMinimumBrightness();

    // Return to the home screen after five minutes
    this.returnToHomeScreen = setTimeout(() =>
    {
      hashHistory.push('/');
    }, 300000);
  }

  setActive()
  {
    // Cancel the timeout to return to the home screen
    clearTimeout(this.returnToHomeScreen);

    this.setState({
      idle: false,
    });

    Backlight.toMaximumBrightness();

    // Start checking for idle time again
    this.checkIdleTime();
  }

  checkIdleTime()
  {
    // The current time less the last time the user did anything
    if (moment.utc().diff(this.state.time) >= 60000)
    { // Time is one minute
      // Screen has been idle too long
      this.setIdle();
    }
    else
    {
      // Check again in another 10 seconds
      setTimeout(this.checkIdleTime, 10000);
    }
  }

  updateTime()
  {
    this.setState({
      time: moment.utc(),
    });
  }

  render()
  {
    // The test env can't dim the brightness, so simulate it with a semi-transparent overlay
    if (process.env.NODE_ENV === 'test')
    {
      Object.assign(style, { background: 'rgba(0, 0, 0, 0.5)' });
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        id="idle-timer"
        onClick={this.setActive}
        style={this.state.idle ? style.show : style.hide} />
    );
  }
}
