import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import ClassBuilder from '../../utils/class-builder';
import { getBackground, getDescription, getIcon } from './utils';

const propTypes = {
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
      moon_phase: React.PropTypes.shape({
        ageOfMoon: React.PropTypes.string,
      }),
    }),
    current_observation: React.PropTypes.shape({
      weather: React.PropTypes.string,
      wind_string: React.PropTypes.string,
      temp_c: React.PropTypes.number,
      feelslike_c: React.PropTypes.number,
      icon: React.PropTypes.string,
    }),
  }).isRequired,
};

const WeatherTile = ({ weatherStore }) =>
{
  if (!weatherStore.astronomyData || !weatherStore.conditionsData)
  {
    return null;
  }

  // Is it daytime?
  const now = moment();
  const sunrise = moment()
    .hour(weatherStore.astronomyData.sun_phase.sunrise.hour)
    .minute(weatherStore.astronomyData.sun_phase.sunrise.minute);
  const sunset = moment()
    .hour(weatherStore.astronomyData.sun_phase.sunset.hour)
    .minute(weatherStore.astronomyData.sun_phase.sunset.minute);
  const isDayTime = now.isAfter(sunrise) && now.isBefore(sunset);

  const weather = weatherStore.conditionsData.current_observation;

  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile-large';
  tileClass.background = getBackground(isDayTime, weather.icon);
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  const icon = getIcon(isDayTime, weather.icon, weatherStore.astronomyData.moon_phase.ageOfMoon);

  return (
    <Link to="/weather">
      <div className={tileClass}>
        <div className="tile-content">
          <span className="tile-badge top right" style={{ fontSize: 24 }}>{parseInt(weather.temp_c, 10)}°C</span>
          <p style={{ height: 100, marginTop: 55, marginBottom: 25, textAlign: 'center' }}>
            <img src={`./images/weather/${icon}.svg`} alt="" style={{ verticalAlign: 'middle', height: 100, filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))' }} />
          </p>
          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, padding: 10, borderRadius: 10, lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.15)' }}>
            <p style={{ marginTop: 0 }}>
              {getDescription(weather.icon, parseInt(weather.feelslike_c, 10))}
            </p>
            <p style={{ marginBottom: 0 }}>
              Wind is {weather.wind_string.charAt(0).toLowerCase()}{weather.wind_string.slice(1).replace(' Gusting', ', gusting').replace(/MPH/g, 'mph')}.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

WeatherTile.propTypes = propTypes;

export default inject('weatherStore')(observer(WeatherTile));
