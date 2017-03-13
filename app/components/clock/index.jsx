import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import ClassBuilder from '../../utils/class-builder';

const round5 = (x) =>
{
  if (x % 5 >= 2.5)
  {
    return (parseInt(x / 5, 10) * 5) + 5;
  }

  return parseInt(x / 5, 10) * 5;
};

// Return the date split into an object
const getDate = () =>
{
  const date = moment();

  return {
    time: date.format('HH:mm:ss'),
  };
};

// Return the sun position as a percentage
const getSunPosition = (sunrise, sunset) =>
{
  // time now
  const now = moment();

  // If before sunrise
  if (now.isBefore(sunrise))
  {
    return 0;
  }

  // If after sunset
  if (now.isAfter(sunset))
  {
    return 100;
  }

  // Get the total number of minutes of daylight hours
  const minutesBetweenSunriseAndSunset = sunrise.diff(sunset, 'minutes');

  // Get the current number of minutes after sunrise
  const minutesSinceSunrise = sunrise.diff(now, 'minutes');

  // Calculate the percentage of daylight that has already gone to nearest 5%
  const percentage = round5((minutesSinceSunrise / minutesBetweenSunriseAndSunset) * 100);

  // Don't return higher than 95%
  if (percentage > 95)
  {
    return 95;
  }

  // Don't return lower than 5%
  if (percentage < 5)
  {
    return 5;
  }

  return percentage;
};

const style = {
  time: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
};

@inject('weatherStore')
@observer
export default class ClockTile extends Component
{
  static propTypes = {
    weatherStore: React.PropTypes.shape({
      astronomyData: React.PropTypes.shape({
        sun_phase: React.PropTypes.shape({
          sunrise: React.PropTypes.shape({
            hour: React.PropTypes.string,
            minute: React.PropTypes.string,
          }),
          sunset: React.PropTypes.shape({
            hour: React.PropTypes.string,
            minute: React.PropTypes.string,
          }),
        }),
      }),
    }).isRequired,
  };

  constructor()
  {
    super();

    this.state = getDate();
  }

  componentDidMount()
  {
    this.timer = setInterval(() =>
    {
      this.setState(getDate());
    }, 1000);
  }

  componentWillUnmount()
  {
    clearInterval(this.timer);
  }

  render()
  {
    // If there's no sunrise/sunset data yet, return null
    if (!this.props.weatherStore.astronomyData)
    {
      return null;
    }

    // Get the current time, sunrise time, and sunset time
    const time = moment();
    const sunrise = moment()
      .hour(this.props.weatherStore.astronomyData.sun_phase.sunrise.hour)
      .minute(this.props.weatherStore.astronomyData.sun_phase.sunrise.minute);
    const sunset = moment()
      .hour(this.props.weatherStore.astronomyData.sun_phase.sunset.hour)
      .minute(this.props.weatherStore.astronomyData.sun_phase.sunset.minute);

    const sunPosition = getSunPosition(sunrise, sunset);

    const tileClass = new ClassBuilder();
    // If it's before sunrise or after sunset, tile should be dark. Otherwise blue
    tileClass.background = time.isBefore(sunrise) || time.isAfter(sunset) ? 'bg-gray' : 'bg-lightBlue';
    tileClass.color = 'fg-white';
    tileClass.tile = 'tile-wide';
    tileClass.useTextShadow();

    return (
      <div className={tileClass}>
        <div className="tile-content">
          <img src={`./images/azimuth/${sunPosition}.png`} alt="50%" />
          <div style={style.time}>{this.state.time}</div>
        </div>
      </div>
    );
  }
}
