import React from 'react';
import moment from 'moment';
import { inject, observer, PropTypes } from 'mobx-react';

import HourTile from './hour-tile';

const propTypes = {
  weatherStore: React.PropTypes.shape({
    hourlyForecastData: React.PropTypes.shape({
      hourly_forecast: PropTypes.observableArrayOf(React.PropTypes.shape({
        FCTTIME: React.PropTypes.shape({
          epoch: React.PropTypes.string,
          civil: React.PropTypes.string,
        }),
        temp: React.PropTypes.shape({
          metric: React.PropTypes.string,
        }),
        pop: React.PropTypes.string,
        condition: React.PropTypes.string,
        icon: React.PropTypes.string,
      })),
    }),
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
      moon_phase: React.PropTypes.shape({
        ageOfMoon: React.PropTypes.string,
      }),
    }),
  }).isRequired,
};

const HourList = ({ weatherStore }) =>
{
  if (!weatherStore.tenDayForecastData)
  {
    return null;
  }

  // Times for sunrise and sunset
  const sunrise = moment()
    .date(1)
    .month(1)
    .year(1)
    .hour(weatherStore.astronomyData.sun_phase.sunrise.hour)
    .minute(weatherStore.astronomyData.sun_phase.sunrise.minute);
  const sunset = moment()
    .date(1)
    .month(1)
    .year(1)
    .hour(weatherStore.astronomyData.sun_phase.sunset.hour)
    .minute(weatherStore.astronomyData.sun_phase.sunset.minute);

  const days = weatherStore.hourlyForecastData.hourly_forecast.map((day, index) =>
  {
    if (index > 24)
    {
      return null;
    }

    const time = moment.unix(parseInt(day.FCTTIME.epoch, 10)).date(1).month(1).year(1);
    const isDayTime = time.isAfter(sunrise) && time.isBefore(sunset);

    return (
      <HourTile
        {...day}
        key={day.FCTTIME.epoch}
        isDayTime={isDayTime}
        ageOfMoon={weatherStore.astronomyData.moon_phase.ageOfMoon} />
    );
  });

  return (
    <div className="tile-container" style={{ height: 340, overflowY: 'scroll' }}>
      <div>
        {days}
      </div>
    </div>
  );
};

HourList.propTypes = propTypes;

export default inject('weatherStore')(observer(HourList));
