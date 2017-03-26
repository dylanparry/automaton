export const getBackground = (isDayTime, condition) =>
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
    case 'chancetstorms':
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

export const getIcon = (isDayTime, condition, ageOfMoon) =>
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

    case 'chancetstorms':
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

export const getDescription = (condition, temperature) =>
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
