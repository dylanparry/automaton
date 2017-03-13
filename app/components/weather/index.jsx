import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import ClassBuilder from '../../utils/class-builder';

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

const getIcon = (isDayTime, condition) =>
{
  switch (condition)
  {
    case 'chanceflurries':
      return 'wi-snow-wind';
    case 'chancerain':
      return 'wi-rain';
    case 'chancesleet':
      return 'wi-sleet';
    case 'chancesnow':
      return 'wi-snow';
    case 'chancestorms':
      return 'wi-tstorms';
    case 'clear':
      return isDayTime ? 'wi-day-sunny' : 'wi-night-clear'; // Get the moon phase instead?
    case 'cloudy':
      break;
    case 'flurries':
      return 'wi-snow-wind';
    case 'fog':
      return 'wi-fog';
    case 'hazy':
      return 'wi-day-haze';
    case 'mostlycloudy':
      return isDayTime ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
    case 'mostlysunny':
      return 'wi-day-sunny-overcast';
    case 'partlycloudy':
      return isDayTime ? 'wi-day-sunny-overcast' : 'wi-night-alt-partly-cloudy';
    case 'partlysunny':
      return isDayTime ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
    case 'sleet':
      return 'wi-sleet';
    case 'rain':
      return 'wi-rain';
    case 'snow':
      return 'wi-snow';
    case 'sunny':
      return 'wi-day-sunny';
    case 'tstorms':
      return 'wi-thunderstorm';
    default:
      return 'wi-na';
  }

  return 'clear';
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

  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile-large';
  tileClass.background = isDayTime ? 'bg-lightBlue' : 'bg-gray';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  const weather = weatherStore.conditionsData.current_observation;

  const icon = getIcon(isDayTime, weather.icon);

  return (
    <Link to="/weather">
      <div className={tileClass}>
        <div className="tile-content" style={{ padding: 20 }}>
          <span className="tile-badge top right" style={{ fontSize: 24 }}>{weather.temp_c}°C</span>
          <p style={{ fontSize: 100, marginTop: 30, marginBottom: 50, textAlign: 'center' }}>
            <span className={`wi ${icon}`} />
          </p>
          <p><strong>Currently:</strong> {weather.weather}</p>
          <p><strong>Wind:</strong> {weather.wind_string}. Feels like {weather.feelslike_c}°C.</p>
        </div>
      </div>
    </Link>
  );
};

WeatherTile.propTypes = propTypes;

export default inject('weatherStore')(observer(WeatherTile));
