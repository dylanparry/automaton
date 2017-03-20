import React from 'react';
import { Link } from 'react-router-dom';
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

const getIcon = (isDayTime, condition, ageOfMoon) =>
{
  switch (condition)
  {
    case 'chanceflurries':
    case 'flurries':
      return 'flurries';

    case 'chancerain':
    case 'rain':
      return 'rain';

    case 'chancesleet':
    case 'sleet':
      return 'sleet';

    case 'chancesnow':
    case 'snow':
      return 'snow';

    case 'chancestorms':
    case 'tstorms':
      return 'tstorms';

    case 'clear':
    case 'sunny':
      return isDayTime ? 'sunny' : `moon-${ageOfMoon}`;

    case 'cloudy':
      return 'cloudy';

    case 'fog':
      return 'fog';

    case 'hazy':
      return 'hazy';

    case 'mostlycloudy':
    case 'partlysunny':
      return isDayTime ? 'day-mostly-cloudy' : 'night-mostly-cloudy';

    case 'mostlysunny':
    case 'partlycloudy':
      return isDayTime ? 'day-partly-cloudy' : 'night-partly-cloudy';

    default:
      return 'unknown';
  }
};

const getBackground = (isDayTime, condition) =>
{
  if (!isDayTime)
  {
    // Night colour is always grey
    return 'bg-gray';
  }

  switch (condition)
  {
    case 'clear':
    case 'mostlysunny':
    case 'sunny':
    case 'partlycloudy':
      return 'bg-lightBlue';

    case 'mostlycloudy':
    case 'partlysunny':
      return 'bg-darkCyan';

    case 'chanceflurries':
    case 'chancerain':
    case 'chancesleet':
    case 'chancesnow':
    case 'chancestorms':
    case 'cloudy':
    case 'flurries':
    case 'fog':
    case 'hazy':
    case 'sleet':
    case 'rain':
    case 'snow':
    case 'tstorms':
    default:
      return 'bg-grayLight';
  }
};

const getDescription = (condition, temperature) =>
{
  switch (condition)
  {
    case 'clear':
      return `It’s clear, and feels like ${temperature}°C`;

    case 'sunny':
      return `It’s sunny, and feels like ${temperature}°C`;

    case 'mostlysunny':
    case 'partlycloudy':
      return `It’s partly cloudy, and feels like ${temperature}°C`;

    case 'mostlycloudy':
    case 'partlysunny':
      return `It’s mostly cloudy, and feels like ${temperature}°C`;

    case 'chanceflurries':
      return `There’s a chance of snow flurries. It feels like ${temperature}°C`;

    case 'chancerain':
      return `There’s a chance of rain. It feels like ${temperature}°C`;

    case 'chancesleet':
      return `There’s a chance of sleet. It feels like ${temperature}°C`;

    case 'chancesnow':
      return `There’s a chance of snow. It feels like ${temperature}°C`;

    case 'chancestorms':
      return `There’s a chance of thunderstorms. It feels like ${temperature}°C`;

    case 'cloudy':
      return `It’s cloudy, and feels like ${temperature}°C`;

    case 'flurries':
      return `There are snow flurries. It feels like ${temperature}°C`;

    case 'fog':
      return `It’s foggy, and feels like ${temperature}°C`;

    case 'hazy':
      return `It’s hazzy, and feels like ${temperature}°C`;

    case 'sleet':
      return `It’s sleeting. It feels like ${temperature}°C`;

    case 'rain':
      return `It’s raining. It feels like ${temperature}°C`;

    case 'snow':
      return `It’s snowing. It feels like ${temperature}°C`;

    case 'tstorms':
      return `There are thunderstorms. It feels like ${temperature}°C`;

    default:
      return 'Not a clue, sorry. Weather service isn’t being particularly descriptive :)';
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
          <span className="tile-badge top right" style={{ fontSize: 24 }}>{weather.temp_c}°C</span>
          <p style={{ height: 100, marginTop: 55, marginBottom: 25, textAlign: 'center' }}>
            <img src={`./images/weather/${icon}.svg`} alt="" style={{ verticalAlign: 'middle', height: 100, filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))' }} />
          </p>
          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, padding: 10, borderRadius: 10, lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.15)' }}>
            <p style={{ marginTop: 0 }}>
              {getDescription(weather.icon, weather.feelslike_c)}
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
