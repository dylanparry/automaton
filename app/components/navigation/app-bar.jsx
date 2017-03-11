import React from 'react';
import { inject, observer, observableArray } from 'mobx-react';
import { Link } from 'react-router';

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
};

const AppBar = ({ heatingStore }) =>
{
  const rooms = heatingStore.rooms.map(room => (
    <li key={room.id}><Link to={`/heating/${room.id}`}>{room.name}</Link></li>
  ));

  return (
    <div className="app-bar navy" style={style.container}>
      <Link to="/" className="app-bar-element branding no-hover"><span className="fa fa-fw fa-cogs" /> automaton</Link>
      <span className="app-bar-divider" />
      <ul className="app-bar-menu">
        <li>
          <a className="dropdown-toggle"><span className="fa fa-fw fa-thermometer" /> Central Heating</a>
          <ul className="d-menu navy" data-role="dropdown">
            <li><Link to="/heating">Heating Summary</Link></li>
            <li><Link to="/heating/activity">Heating Activity Chart</Link></li>
            <li className="menu-title">Heating by Room</li>
            {rooms}
          </ul>
        </li>
        <li>
          <a className="dropdown-toggle"><span className="fa fa-fw fa-cloud" /> Weather</a>
          <ul className="d-menu" data-role="dropdown">
            <li><Link to="/weather">Weather Summary</Link></li>
            <li><Link to="/weather/today">Weather Today</Link></li>
            <li><Link to="/weather/week">Weather Week</Link></li>
          </ul>
        </li>
        <li><Link to="/settings"><span className="fa fa-fw fa-cog" /> Settings</Link></li>
      </ul>
    </div>
  );
};

AppBar.propTypes = {
  heatingStore: React.PropTypes.shape({
    rooms: observableArray,
  }).isRequired,
};

export default inject('heatingStore')(observer(AppBar));
