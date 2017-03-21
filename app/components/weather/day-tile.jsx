import React from 'react';
import moment from 'moment';

import ClassBuilder from '../../utils/class-builder';
import { getBackground, getIcon } from './utils';

const propTypes = {
  date: React.PropTypes.shape({
    weekday: React.PropTypes.string,
    day: React.PropTypes.number,
    monthname: React.PropTypes.string,
  }).isRequired,
  period: React.PropTypes.number.isRequired,
  high: React.PropTypes.shape({
    celsius: React.PropTypes.string,
  }).isRequired,
  low: React.PropTypes.shape({
    celsius: React.PropTypes.string,
  }).isRequired,
  conditions: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
};

const getDisplayDate = (period, date) =>
{
  if (period === 1)
  {
    return <span>Today</span>;
  }
  else if (period === 2)
  {
    return <span>Tomorrow</span>;
  }
  else if (period <= 7)
  {
    return <span>{date.weekday}</span>;
  }

  const d = moment().month(date.monthname).date(date.day);
  const day = d.format('D');
  const suffix = d.format('Do').slice(-2);
  const month = d.format('MMM');

  return <span>{day}<sup>{suffix}</sup> {month}</span>;
};

const DayTile = ({ date, period, high, low, conditions, icon }) =>
{
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile';
  tileClass.background = getBackground(true, icon);
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  const image = getIcon(true, icon, null);

  const displayDate = getDisplayDate(period, date);

  return (
    <div className={tileClass}>
      <div className="tile-content">
        <span className="tile-badge top left">{displayDate}</span>
        <p style={{ height: 50, marginTop: 45, marginBottom: 15, textAlign: 'center' }}>
          <img src={`./images/weather/${image}.svg`} alt="" style={{ verticalAlign: 'middle', height: 50, filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))' }} />
        </p>
        <span className="tile-badge bottom left">{conditions}</span>
        <span className="tile-badge">{parseInt(high.celsius, 10)}°C</span>
      </div>
    </div>
  );
};

DayTile.propTypes = propTypes;

export default DayTile;
