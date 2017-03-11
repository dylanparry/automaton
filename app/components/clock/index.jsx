import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import ClassBuilder from '../../utils/class-builder';

// Return the date split into an object
const getDate = () =>
{
  const date = moment();

  return {
    time: date.format('HH:mm:ss'),
  };
};

const style = {
  container: {
    marginTop: 55,
    textAlign: 'center',
  },

  time: {
    fontSize: 30,
    fontWeight: 'bold',
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
    }),
  };

  static defaultProps = {
    weatherStore: null,
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

    const tileClass = new ClassBuilder();
    // If it's before sunrise or after sunset, tile should be dark. Otherwise blue
    tileClass.background = time.isBefore(sunrise) || time.isAfter(sunset) ? 'bg-grayDark' : 'bg-lightBlue';
    tileClass.color = 'fg-white';
    tileClass.tile = 'tile-wide';
    tileClass.useTextShadow();

    return (
      <div className={tileClass}>
        <div className="tile-content">
          <div style={style.container}>
            <div style={style.time}>{this.state.time}</div>
          </div>
        </div>
      </div>
    );
  }
}
