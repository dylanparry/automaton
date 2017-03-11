import React from 'react';
import { Link } from 'react-router';

import ClassBuilder from '../../utils/class-builder';

const WeatherTile = () =>
{
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile-large';
  tileClass.background = 'bg-steel';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  return (
    <Link to="/weather">
      <div className={tileClass}>
        <div className="tile-content">
          <span className="tile-label">Weather</span>
        </div>
      </div>
    </Link>
  );
};

export default WeatherTile;
