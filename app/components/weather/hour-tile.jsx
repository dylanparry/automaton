import React from 'react';

import ClassBuilder from '../../utils/class-builder';
import { getBackground, getIcon } from './utils';

const propTypes = {
  FCTTIME: React.PropTypes.shape({
    civil: React.PropTypes.string,
  }).isRequired,
  temp: React.PropTypes.shape({
    metric: React.PropTypes.string,
  }).isRequired,
  pop: React.PropTypes.string.isRequired,
  condition: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  isDayTime: React.PropTypes.bool.isRequired,
  ageOfMoon: React.PropTypes.string.isRequired,
};

const getPercentage = (icon, pop) =>
{
  const reportFor = ['chancerain', 'chancesnow', 'chancesleet', 'chanceflurries'];
  if (reportFor.indexOf(icon) === -1)
  {
    return '';
  }

  return `${pop}%`;
};

const HourTile = ({ FCTTIME, temp, pop, condition, icon, isDayTime, ageOfMoon }) =>
{
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile';
  tileClass.background = getBackground(isDayTime, icon);
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  const image = getIcon(isDayTime, icon, ageOfMoon);

  return (
    <div className={tileClass}>
      <div className="tile-content">
        <span className="tile-badge top left">{FCTTIME.civil}</span>
        <span className="tile-badge top right">{parseInt(temp.metric, 10)}°C</span>
        <p style={{ height: 50, marginTop: 45, marginBottom: 15, textAlign: 'center' }}>
          <img src={`./images/weather/${image}.svg`} alt="" style={{ verticalAlign: 'middle', height: 50, filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))' }} />
        </p>
        <span className="tile-badge bottom centre">{getPercentage(icon, pop)} {condition}</span>
      </div>
    </div>
  );
};

HourTile.propTypes = propTypes;

export default HourTile;
