import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';

import DayTile from './day-tile';

const propTypes = {
  weatherStore: React.PropTypes.shape({
    tenDayForecastData: React.PropTypes.shape({
      forecast: React.PropTypes.shape({
        simpleforecast: React.PropTypes.shape({
          forecastday: PropTypes.observableArrayOf(React.PropTypes.shape({
            date: React.PropTypes.shape({
              weekday: React.PropTypes.string,
              day: React.PropTypes.number,
              monthname: React.PropTypes.string,
            }),
            period: React.PropTypes.number,
            high: React.PropTypes.shape({
              celsius: React.PropTypes.string,
            }),
            low: React.PropTypes.shape({
              celsius: React.PropTypes.string,
            }),
            conditions: React.PropTypes.string,
            icon: React.PropTypes.string,
          })),
        }),
      }),
    }),
  }).isRequired,
};

const DayList = ({ weatherStore }) =>
{
  if (!weatherStore.tenDayForecastData)
  {
    return null;
  }

  const days = weatherStore.tenDayForecastData.forecast.simpleforecast.forecastday.map(
    day => <DayTile {...day} key={day.period} />,
  );

  return (
    <div className="tile-container">
      {days}
    </div>
  );
};

DayList.propTypes = propTypes;

export default inject('weatherStore')(observer(DayList));
