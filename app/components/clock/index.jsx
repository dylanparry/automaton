import React, { Component } from 'react';
import moment from 'moment';

// Return the date split into an object
const getDate = () =>
{
  const date = moment();

  return {
    time: date.format('HH:mm:ss'),
  };
};

const style = {
  container: {
    marginTop: 55,
    textAlign: 'center',
  },

  time: {
    fontSize: 30,
    fontWeight: 'bold',
  },
};

export default class CalendarTile extends Component
{
  constructor()
  {
    super();

    this.state = getDate();
  }

  componentDidMount()
  {
    this.timer = setInterval(() =>
    {
      this.setState(getDate());
    }, 1000);
  }

  componentWillUnmount()
  {
    clearInterval(this.timer);
  }

  render()
  {
    return (
      <div className="tile bg-teal fg-white">
        <div className="tile-content">
          <div style={style.container}>
            <div style={style.time}>{this.state.time}</div>
          </div>
        </div>
      </div>
    );
  }
}
