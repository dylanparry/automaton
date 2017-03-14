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
      moon_phase: React.PropTypes.shape({
        ageOfMoon: React.PropTypes.number,
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

const getMoonPhase = (day) =>
{
  const phases = [
    'wi-moon-new',
    'wi-moon-waxing-crescent-1',
    'wi-moon-waxing-crescent-2',
    'wi-moon-waxing-crescent-3',
    'wi-moon-waxing-crescent-4',
    'wi-moon-waxing-crescent-5',
    'wi-moon-waxing-crescent-6',
    'wi-moon-first-quarter',
    'wi-moon-waxing-gibbous-1',
    'wi-moon-waxing-gibbous-2',
    'wi-moon-waxing-gibbous-3',
    'wi-moon-waxing-gibbous-4',
    'wi-moon-waxing-gibbous-5',
    'wi-moon-waxing-gibbous-6',
    'wi-moon-full',
    'wi-moon-waning-gibbous-1',
    'wi-moon-waning-gibbous-2',
    'wi-moon-waning-gibbous-3',
    'wi-moon-waning-gibbous-4',
    'wi-moon-waning-gibbous-5',
    'wi-moon-waning-gibbous-6',
    'wi-moon-third-quarter',
    'wi-moon-waning-crescent-1',
    'wi-moon-waning-crescent-2',
    'wi-moon-waning-crescent-3',
    'wi-moon-waning-crescent-4',
    'wi-moon-waning-crescent-5',
    'wi-moon-waning-crescent-6',
  ];

  return phases[day - 1];
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
      return isDayTime ? 'wi-day-sunny' : getMoonPhase();
    case 'cloudy':
      return 'wi-cloud';
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

  const icon = getIcon(isDayTime, weather.icon, weatherStore.astronomyData.moon_phase.ageOfMoon);

  return (
    <Link to="/weather">
      <div className={tileClass}>
        <div className="tile-content" style={{ padding: 20 }}>
          <span className="tile-badge top right" style={{ fontSize: 24 }}>{weather.temp_c}°C</span>
          <p style={{ fontSize: 100, marginTop: 45, marginBottom: 35, textAlign: 'center' }}>
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
